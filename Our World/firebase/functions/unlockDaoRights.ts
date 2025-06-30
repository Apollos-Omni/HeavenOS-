import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';

interface DaoMember {
  uid: string;
  region: string;
  completedChains: string[];
  proposalRight: boolean;
  votingPower: number;
  heavenVerified: boolean;
  joinedAt: string;
}

export const unlockDaoRights = async (
  userId: string,
  region: string,
  completedChainId: string
): Promise<void> => {
  const memberRef = doc(db, 'daoMembers', userId);

  try {
    const docSnap = await getDoc(memberRef);

    if (docSnap.exists()) {
      // If user already exists, update completedChains & ensure voting rights remain
      await updateDoc(memberRef, {
        completedChains: arrayUnion(completedChainId),
        proposalRight: true,
        votingPower: 1,
        heavenVerified: true,
      });
    } else {
      // New user, create full profile
      const newMember: DaoMember = {
        uid: userId,
        region,
        completedChains: [completedChainId],
        proposalRight: true,
        votingPower: 1,
        heavenVerified: true,
        joinedAt: new Date().toISOString(),
      };
      await setDoc(memberRef, newMember);
    }
  } catch (error: any) {
    console.error('Error unlocking DAO rights:', error);
    throw new Error(`Failed to unlock DAO rights: ${error.message}`);
  }
};
