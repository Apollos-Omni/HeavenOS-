import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

export default function RedemptionBoard() {
  const user = useAuthStore(state => state.user);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'redemptionTasks'));
      setTasks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-xl mb-4">🛠 Redemption Quests</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded mb-3">
            <Text className="text-indigo-700 font-bold">{item.title}</Text>
            <Text className="italic mb-2">{item.description}</Text>
            <Button title="Complete and Upload Proof" onPress={() => {/* trigger upload + karma update */}} />
          </View>
        )}
      />
    </View>
  );
}
