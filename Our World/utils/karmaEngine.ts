// utils/karmaEngine.ts
import { db } from '../firebase/config';
import { doc, updateDoc, increment, setDoc } from 'firebase/firestore';

export async function incrementKarma(userId: string, value: number) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { karma: increment(value) });
}

export async function incrementInfluence(userId: string, value: number) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { influence: increment(value) });
}

export async function incrementKarmaForVision(visionId: string, amount: number) {
  const visionRef = doc(db, 'visions', visionId);
  await updateDoc(visionRef, { karma: increment(amount) });
}

export async function awardUser(uid: string, { karma, influence }: { karma: number; influence: number }) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    karma: increment(karma),
    influence: increment(influence),
  });
}

export interface Drop {
  unlockedBy: string[];
  karmaRequired?: number;
}

export function canUnlock(drop: Drop, userKarma: number, userId: string): boolean {
  if (drop.unlockedBy.includes(userId)) return true;
  if (drop.karmaRequired && userKarma >= drop.karmaRequired) return true;
  return false;
}

export function computeVoteWeight(karma: number, accountAgeInDays: number): number {
  const trustFactor = Math.log10(accountAgeInDays + 10); // Anti-spam mechanism
  return Math.floor(karma * trustFactor);
}

export async function castVote({
  userId,
  userKarma,
  createdAt,
  contextId,
  choice
}: {
  userId: string;
  userKarma: number;
  createdAt: Date;
  contextId: string;
  choice: 'Yes' | 'No' | 'Abstain';
}) {
  const accountAgeInDays = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  const weight = computeVoteWeight(userKarma, accountAgeInDays);

  const voteRef = doc(db, 'votes', contextId);
  await updateDoc(voteRef, {
    [`votes.${userId}`]: { choice, weight },
    [`totalVotes.${choice}`]: increment(weight)
  });
}