import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { triggerRecalibration } from '../utils/recalibration';

const db = admin.firestore();

export const HeavenCoin = functions.firestore
  .document('visions/{visionId}')
  .onCreate(async (snap, context) => {
    try {
      const vision = snap.data();
      if (!vision || !vision.userId) {
        console.warn('🚫 Missing vision or userId');
        return null;
      }

      const { userId } = vision;
      const userRef = db.collection('users').doc(userId);

      await userRef.update({
        heavenCoin: admin.firestore.FieldValue.increment(10),
        karma: admin.firestore.FieldValue.increment(10),
        lastVisionTimestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      await triggerRecalibration(userId);

      console.log(`✅ HeavenCoin/Karma updated & recalibrated for ${userId}`);
      return null;
    } catch (error) {
      console.error('🔥 updateHeavenCoin error:', error);
      return null;
    }
  });
