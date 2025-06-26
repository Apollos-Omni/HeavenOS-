import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function castVote(daoId: string, userId: string, amount: number) {
  const daoRef = doc(db, 'daos', daoId);
  const userWalletRef = doc(db, 'users', userId, 'wallet');

  // Subtract from user's wallet
  await updateDoc(userWalletRef, {
    balance: increment(-amount),
  });

  // Add to DAO's vote count
  await updateDoc(daoRef, {
    totalVotes: increment(amount),
  });
}
