import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export async function generateImmortalPersona(userId: string) {
  const legacyRef = doc(db, 'users', userId, 'legacy');
  const skillsRef = doc(db, 'skills', userId);
  const reflectionsRef = doc(db, 'users', userId, 'mentorAI');

  const [legacySnap, skillSnap, reflectSnap] = await Promise.all([
    getDoc(legacyRef),
    getDoc(skillsRef),
    getDoc(reflectionsRef),
  ]);

  const persona = {
    name: legacySnap.data()?.name || 'Apollos',
    finalWords: legacySnap.data()?.finalReflection,
    skillTree: skillSnap.data()?.skills,
    reflections: reflectSnap.data()?.reflections,
    mentorTone: legacySnap.data()?.mode || 'tesla',
  };

  return persona;
}
