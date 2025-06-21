import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const updateHeavenCoin = functions.firestore
  .document('visions/{visionId}')
  .onCreate(async (snap, context) => {
    const vision = snap.data();
    const userId = vision.userId;

    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      heavenCoin: admin.firestore.FieldValue.increment(10),
      karma: admin.firestore.FieldValue.increment(10)
    });

    return null;
  });
