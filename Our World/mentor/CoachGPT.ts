import { getDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function recommendNextSkill(userId: string): Promise<string> {
  const snap = await getDoc(doc(db, 'skills', userId));
  const skillData = snap.data()?.skills || {};

  const underdeveloped = Object.entries(skillData)
    .sort((a, b) => (a[1].xp / a[1].nextMilestone) - (b[1].xp / b[1].nextMilestone));

  return underdeveloped.length ? underdeveloped[0][0] : 'coding';
}

export async function awardSkillXP(userId: string, skill: string, xp: number) {
  const skillRef = doc(db, 'skills', userId);
  await updateDoc(skillRef, {
    [`skills.${skill}.xp`]: increment(xp),
  });

  // Check for milestone reward
  const snap = await getDoc(skillRef);
  const current = snap.data()?.skills[skill];
  if (current.xp >= current.nextMilestone) {
    await updateDoc(skillRef, {
      [`skills.${skill}.level`]: increment(1),
      [`skills.${skill}.nextMilestone`]: current.nextMilestone * 2,
    });

    const walletRef = doc(db, 'users', userId, 'wallet');
    await updateDoc(walletRef, {
      balance: increment(50),
      karma: increment(25),
    });
  }
}
