import { db } from '../firebase/config';
import { doc, setDoc, increment, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function createDAO({ name, description, creatorId }) {
  const daoRef = doc(db, 'daos', name.replace(/\s+/g, '-').toLowerCase());
  await setDoc(daoRef, {
    name,
    description,
    creatorId,
    totalSupporters: 1,
    totalVotes: 0,
    status: 'active',
    createdAt: serverTimestamp(),
  });
}

export async function joinDAO(daoId: string, userId: string, karma: number, influence: number, staked = 0) {
  const supporterRef = doc(db, `daos/${daoId}/supporters/${userId}`);
  await setDoc(supporterRef, {
    karma,
    influence,
    staked,
    joinedAt: serverTimestamp(),
  });

  const daoRef = doc(db, 'daos', daoId);
  await updateDoc(daoRef, {
    totalSupporters: increment(1),
  });
}
