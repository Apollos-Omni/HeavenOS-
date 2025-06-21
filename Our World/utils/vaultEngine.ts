import { db } from '../firebase/config';
import { doc, updateDoc, increment } from 'firebase/firestore';

export async function depositToVault(amount: number, userId: string) {
  const vaultRef = doc(db, 'vaults', 'globalVault');
  await updateDoc(vaultRef, {
    balance: increment(amount),
    [`stakeholders.${userId}`]: increment(amount),
  });
}

export async function requestProjectFunds(cityId: string, projectId: string, amount: number) {
  const cityVaultRef = doc(db, 'vaults/cityVaults', cityId);
  await updateDoc(cityVaultRef, {
    [`dreamProjects.${projectId}`]: {
      requested: amount,
      status: 'awaiting-approval',
    },
  });
}
