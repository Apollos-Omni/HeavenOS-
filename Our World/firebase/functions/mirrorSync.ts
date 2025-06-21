import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

export const mirrorVisionPost = functions.firestore
  .document('visions/{visionId}')
  .onCreate(async (snap, context) => {
    const vision = snap.data();
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
    });
  });
