import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function logReflection(userId: string, reflection: string) {
  const ref = doc(db, 'users', userId, 'mentorAI');
  await updateDoc(ref, {
    reflections: arrayUnion({
      text: reflection,
      timestamp: serverTimestamp(),
    }),
    lastInteraction: serverTimestamp(),
  });
}

export async function storeMilestone(userId: string, skill: string, level: number) {
  const ref = doc(db, 'users', userId, 'mentorAI');
  await updateDoc(ref, {
    milestones: arrayUnion({ skill, level, timestamp: serverTimestamp() }),
  });
}
