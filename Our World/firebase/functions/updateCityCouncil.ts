import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import { db } from "./config"; // Make sure this imports your initialized Firestore instance

export const updateCityCouncil = functions.firestore
  .document('heavenMap/{countryId}/states/{stateId}/cities/{cityId}/visions/{visionId}')
  .onCreate(async (snap, context) => {
    const vision = snap.data();

    if (!vision || !vision.userId || !vision.karma) {
      console.error("🛑 Invalid vision data:", vision);
      return;
    }

    const { countryId, stateId, cityId } = context.params;

    const cityRef = db
      .collection("heavenMap")
      .doc(countryId)
      .collection("states")
      .doc(stateId)
      .collection("cities")
      .doc(cityId);

    const leaderRef = cityRef.collection("leaders").doc(vision.userId);

    const leaderData = {
      lastPosted: firestore.FieldValue.serverTimestamp(),
      karma: vision.karma,
      influence: 10, // default influence score — can be scaled later
    };

    try {
      await leaderRef.set(leaderData, { merge: true });

      console.log(`✅ ${vision.userId} ascended to city leadership of ${cityId}`);
    } catch (error) {
      console.error("❌ Failed to update city council:", error);
    }
  });
