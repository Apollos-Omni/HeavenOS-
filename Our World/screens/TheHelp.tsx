import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image } from 'react-native';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

export default function TheHelp() {
  const [quests, setQuests] = useState([]);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchQuests = async () => {
      const snap = await getDocs(collection(db, 'helpQuests'));
      const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = all.filter(q => q.region === user.region || q.region === 'global');
      setQuests(filtered);
    };
    fetchQuests();
  }, []);

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">🛠️ The Help - Your Real Quest</Text>
      <FlatList
        data={quests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded mb-3">
            <Text className="text-lg font-bold text-indigo-700">{item.title}</Text>
            <Text>XP: {item.xpReward} | Karma: {item.karmaReward} | Tier: {item.difficulty}</Text>
            <Text className="mt-1 italic">“{item.steps[0]}...”</Text>
            <Button title="Start Quest" onPress={() => {/* navigate to quest screen */}} />
          </View>
        )}
      />
    </View>
  );
}
