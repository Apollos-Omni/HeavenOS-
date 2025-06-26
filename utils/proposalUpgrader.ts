import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const upgradeProposal = async (proposalId, statusUpdate, karmaAward = 0, questChainId = null) => {
  const update: any = {
    status: statusUpdate
  };

  if (karmaAward) update.karmaAwardedToAuthor = karmaAward;
  if (questChainId) update.linkedQuestChainId = questChainId;

  await updateDoc(doc(db, 'proposals', proposalId), update);
};
