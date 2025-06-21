import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const createKarmaContract = async (userId: string, taskId: string, reward: number) => {
  const contractId = `KARMACONTRACT_${userId}_${taskId}`;
  await setDoc(doc(db, 'karmaContracts', contractId), {
    contractId,
    userId,
    taskId,
    status: 'inProgress',
    signedAt: new Date().toISOString(),
    expectedCompletion: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    karmaReward: reward,
    penaltyIfAbandoned: -reward * 0.6
  });
};
