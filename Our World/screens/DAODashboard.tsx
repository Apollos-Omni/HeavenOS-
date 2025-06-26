import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Button, Alert, ActivityIndicator } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export default function DAODashboard() {
  const [daos, setDAOs] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "daos"), (snap) => {
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDAOs(items);
    });
    return () => unsubscribe();
  }, []);

  const handleJoinDAO = async (daoId: string) => {
    try {
      setLoadingId(daoId);

      const { awardUser } = await import("../utils/karmaEngine");
      const { joinDAO } = await import("../utils/daoEngine");

      const userId = "demoUserId123"; // Replace this with actual authenticated user
      const karmaStake = 100;
      const influenceBoost = 20;
      const initialKarmaReward = 5;

      await joinDAO(daoId, userId, karmaStake, influenceBoost, initialKarmaReward);
      await awardUser(userId, { karma: initialKarmaReward, influence: 2 });

      Alert.alert("🌟 Success", "You’ve joined the DAO and earned karma.");
    } catch (error: any) {
      console.error("DAO join error:", error);
      Alert.alert("❌ Error", error.message || "Unable to join DAO.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <ScrollView className="bg-black p-4">
      <Text className="text-white text-3xl font-bold mb-4">🗳 Visionary DAOs</Text>

      {daos.length === 0 ? (
        <Text className="text-gray-400 text-center mt-8">No DAOs active… yet.</Text>
      ) : (
        daos.map((dao) => (
          <View key={dao.id} className="bg-gray-900 p-4 mb-4 rounded-xl border border-purple-700">
            <Text className="text-purple-400 text-xl font-bold mb-1">{dao.name}</Text>
            <Text className="text-gray-300 italic mb-2">{dao.description}</Text>
            <Text className="text-white mb-2">Supporters: {dao.totalSupporters ?? 0}</Text>

            {loadingId === dao.id ? (
              <ActivityIndicator size="small" color="#a855f7" />
            ) : (
              <Button title="Join DAO" color="#a855f7" onPress={() => handleJoinDAO(dao.id)} />
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
