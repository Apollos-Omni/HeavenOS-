import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { db } from '../firebase/config';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

export default function HelpDashboard() {
  const user = useAuthStore(state => state.user);
  const [roleInfo, setRoleInfo] = useState(null);
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const roleDoc = await getDoc(doc(db, 'userRoles', user.uid));
      setRoleInfo(roleDoc.data());

      const questSnap = await getDocs(collection(db, 'helpQuests'));
      const relevant = questSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(q => q.roleRequired === roleDoc.data().dreamRole);
      setQuests(relevant);
    };
    fetchDashboard();
  }, []);

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">📊 Help Dashboard</Text>

      {roleInfo && (
        <>
          <Text className="text-indigo-400 text-xl mb-1">🌟 {roleInfo.dreamRole}</Text>
          <Text className="text-white mb-2">Tier: {roleInfo.currentTier} | XP: {roleInfo.xp} | Karma: {roleInfo.karma}</Text>
          <Text className="text-white mb-4">Completed Quests: {roleInfo.completedTasks}</Text>
        </>
      )}

      <Text className="text-white text-lg mb-2">🧭 Recommended Quests:</Text>
      <FlatList
        data={quests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded mb-3">
            <Text className="font-bold text-indigo-600">{item.title}</Text>
            <Text className="italic">{item.steps[0]}</Text>
            <Button title="Begin Quest" onPress={() => {/* nav to quest */}} color="#8b5cf6" />
          </View>
        )}
      />
    </View>
  );
}
