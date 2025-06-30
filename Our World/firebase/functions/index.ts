// File: functions/index.ts

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();

// Utility: Calculate Trust Tier
function calculateTrustTier(karma: number): string {
  if (karma >= 1000) return 'Gold';
  if (karma >= 500) return 'Silver';
  if (karma >= 100) return 'Bronze';
  return 'Initiate';
}

// Utility: Role-based bonus multiplier
function getRoleBonus(role: string): number {
  switch (role) {
    case 'Mentor': return 1.2;
    case 'Visionary': return 1.1;
    default: return 1.0;
  }
}

// Core Karma Updater
export async function updateUserKarma(uid: string, delta: number, reason: string, referrer: string | null = null) {
  const userRef = db.collection('users').doc(uid);
  const logRef = db.collection('karmaTransactions').doc();
  const notificationRef = db.collection('notifications').doc();

  await db.runTransaction(async (tx) => {
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists) throw new Error('User not found');

    const userData = userSnap.data();
    const prevKarma = userData?.karma || 0;
    const currentTier = userData?.trustTier || 'Initiate';
    const userRole = userData?.role || 'Initiate';
    const dailyStreak = userData?.dailyStreak || 1.0;

    const multiplier = getRoleBonus(userRole) * dailyStreak;
    const adjustedDelta = Math.round(delta * multiplier);

    const newKarma = Math.max(0, prevKarma + adjustedDelta);
    const newTier = calculateTrustTier(newKarma);

    tx.update(userRef, {
      karma: newKarma,
      trustTier: newTier,
      lastKarmaUpdate: admin.firestore.FieldValue.serverTimestamp(),
    });

    tx.set(logRef, {
      uid,
      delta: adjustedDelta,
      baseDelta: delta,
      multiplier,
      reason,
      referrer,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    if (Math.abs(adjustedDelta) > 100) {
      tx.set(db.collection('karmaFlags').doc(), {
        uid,
        delta: adjustedDelta,
        reason,
        triggeredBy: 'system',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    if (newTier !== currentTier) {
      tx.set(notificationRef, {
        uid,
        message: `🎖️ You’ve ascended to ${newTier} Trust Tier!`,
        read: false,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });
}

// Trigger: On Work Log Created
export const karmaFromWorkLogs = functions.firestore
  .document('workLogs/{logId}')
  .onCreate(async (snap) => {
    const log = snap.data();
    if (log.karmaEarned && log.userId) {
      await updateUserKarma(log.userId, log.karmaEarned, 'Task completed');
    }
  });

// Trigger: On Task Abandoned
export const karmaPenaltyFromAbandonment = functions.firestore
  .document('tasks/{taskId}')
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== 'abandoned' && after.status === 'abandoned' && after.assignedTo) {
      await updateUserKarma(after.assignedTo, -20, 'Task abandoned');
    }
  });

// Trigger: On Redemption Task Completed
export const karmaFromRedemption = functions.firestore
  .document('redemptionTasks/{taskId}')
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== 'completed' && after.status === 'completed') {
      await updateUserKarma(after.assignedTo, after.karmaRestore || 0, 'Redemption task completed');
    }
  });

// Trigger: On DAO Vote
export const karmaFromVotes = functions.firestore
  .document('votes/{voteId}')
  .onCreate(async (snap) => {
    const vote = snap.data();
    if (vote.createdBy) {
      await updateUserKarma(vote.createdBy, 5, 'DAO voting participation');
    }
  });
