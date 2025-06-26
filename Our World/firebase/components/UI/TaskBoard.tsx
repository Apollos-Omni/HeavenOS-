import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await getDocs(collection(db, 'repairTasks'));
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTasks();
  }, []);

  return (
    <ScrollView className="bg-gray-950 p-4">
      <Text className="text-yellow-300 text-xl font-bold mb-3">🏚️ Work-to-Own TaskBoard</Text>
      {tasks.map(task => (
        <View key={task.id} className="bg-gray-800 rounded-xl p-3 mb-4">
          <Text className="text-white text-lg">{task.title}</Text>
          <Text className="text-gray-400">Status: {task.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
