import { firestore } from 'firebase-admin';

export const triggerRecalibration = async (userId: string) => {
  const userRef = firestore().doc(`trustProfiles/${userId}`);
  const userSnap = await userRef.get();
  const profile = userSnap.data();

  if (!profile) return;

  const {
    tasksCompleted = 0,
    tasksAbandoned = 0,
    redemptionTasksCompleted = 0
  } = profile;

  const total = tasksCompleted + tasksAbandoned || 1;
  const score = Math.round((tasksCompleted / total) * 100 + redemptionTasksCompleted * 5);

  const trustTier =
    score >= 95 ? 'Platinum' :
    score >= 85 ? 'Gold' :
    score >= 70 ? 'Silver' : 'Bronze';

  const suggestedAction =
    trustTier === 'Bronze'
      ? 'Complete a redemption task within 24 hours to prevent karma lock.'
      : trustTier === 'Silver'
      ? 'Earn 2 more completions to unlock Gold Tier bonus.'
      : null;

  await userRef.update({
    karmaTrustScore: score,
    trustTier,
    suggestedAction,
    recalibratedAt: new Date().toISOString()
  });
};
