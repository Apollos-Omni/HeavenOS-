import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import OpenAI from 'openai'; // or any AI text model if external allowed

const openai = new OpenAI({ apiKey: 'YOUR_API_KEY' });

export async function generateNarrative(userId: string) {
  const userRef = doc(db, 'users', userId);
  const skillsRef = doc(db, 'skills', userId);
  const reflectionsRef = doc(db, 'users', userId, 'mentorAI');

  const [userSnap, skillsSnap, reflectionsSnap] = await Promise.all([
    getDoc(userRef),
    getDoc(skillsRef),
    getDoc(reflectionsRef)
  ]);

  const user = userSnap.data();
  const skills = skillsSnap.data()?.skills || {};
  const reflections = reflectionsSnap.data()?.reflections || [];

  const storyPrompt = `
  Create a compelling, cinematic narrative based on the following:
  - Name: ${user.name || 'Anonymous'}
  - Skills: ${Object.entries(skills).map(([k, v]) => `${k} (Lv ${v.level})`).join(', ')}
  - Reflections: ${reflections.slice(-3).map(r => r.text).join('\n')}
  - Karma Score: ${user.karma}
  - Role: ${user.role || 'Visionary'}

  Make it sound like the intro to a future myth or Netflix bio-series.
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: storyPrompt }]
  });

  return completion.choices[0].message.content;
}
