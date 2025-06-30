import * as functions from 'firebase-functions';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { Configuration, OpenAIApi } from 'openai';

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // secure env var
  })
);

export const evaluateAndMirrorVision = functions.firestore
  .document('visions/{visionId}')
  .onCreate(async (snap, context) => {
    const vision = snap.data();

    if (
      !vision ||
      !vision.description ||
      !vision.userId ||
      !vision.location ||
      !vision.location.country ||
      !vision.location.state ||
      !vision.location.city
    ) {
      console.error('Invalid vision data:', vision);
      return null;
    }

    // 1️⃣ AI Karma Scoring
    const prompt = `Rate the impact of this vision post on a scale from 0 to 100: "${vision.description}"`;

    let score = 0;
    try {
      const completion = await openai.createCompletion({
        model: 'gpt-4',
        prompt,
        max_tokens: 10,
        temperature: 0.1,
      });

      const rawScore = completion.data.choices[0].text?.trim() || '0';
      score = Math.min(Math.max(parseInt(rawScore), 0), 100);

      console.log(`Vision ${context.params.visionId} impact score: ${score}`);

      // Increment user karma
      await db.collection('users').doc(vision.userId).update({
        karma: FieldValue.increment(score),
      });
    } catch (error) {
      console.error('Error during AI scoring:', error);
    }

    // 2️⃣ Mirror the vision post in HeavenMap
    try {
      const { country, state, city } = vision.location;

      const mirrorRef = db
        .collection('heavenMap')
        .doc(country)
        .collection('states')
        .doc(state)
        .collection('cities')
        .doc(city)
        .collection('mirrorFeed')
        .doc(context.params.visionId);

      await mirrorRef.set({
        ...vision,
        mirroredAt: new Date().toISOString(),
        karmaScore: score, // optionally store the karma score here
      });

      console.log(`Vision ${context.params.visionId} mirrored to HeavenMap.`);
    } catch (error) {
      console.error('Error during mirroring vision:', error);
    }

    return null;
  });
