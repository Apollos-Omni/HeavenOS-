import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

export default function LocalRoleBoard() {
  const user = useAuthStore(state => state.user);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const q = query(
        collection(db, 'tasks'),
        where('region', '==', user.region),
        where('dreamRoleRequired', '==', user.dreamRole),
        where('status', '==', 'open')
      );
      const snapshot = await getDocs(q);
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTasks();
  }, []);

  const acceptTask = (taskId: string) => {
    // Trigger Karma Contract Mode below
  };

  return (
    <View className="bg-black p-4">
      <Text className="text-white text-xl mb-4">🧭 Tasks for {user.dreamRole} in {user.region}</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-3 rounded">
            <Text className="font-bold text-indigo-700">{item.title}</Text>
            <Text className="text-sm italic mb-2">{item.description}</Text>
            <Text>+{item.karmaReward} Karma</Text>
            <Button title="Accept Task" onPress={() => acceptTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
