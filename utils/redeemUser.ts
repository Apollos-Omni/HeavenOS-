import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';

export const completeRedemptionTask = async (userId, karmaBoost) => {
  const userRef = doc(db, 'trustProfiles', userId);
  await updateDoc(userRef, {
    tasksCompleted: increment(1),
    redemptionTasksCompleted: increment(1),
    karmaTrustScore: increment(karmaBoost)
  });
};
