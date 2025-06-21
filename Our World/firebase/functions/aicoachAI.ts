import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();

export const aiCoachOnVision = onDocumentCreated('users/{userId}/visions/{visionId}', async (event) => {
  const data = event.data?.data();
  const userId = event.params.userId;

  if (!data) return;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an AI coach guiding a visionary user to success.' },
        { role: 'user', content: `My dream is: ${data.text}` }
      ]
    })
  });

  const { choices } = await response.json();
  const reply = choices?.[0]?.message?.content;

  await db.collection('coaches').doc(userId).set({ intro: reply }, { merge: true });
});
