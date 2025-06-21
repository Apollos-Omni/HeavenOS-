import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Button } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function DAODashboard() {
  const [daos, setDAOs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'daos'), (snap) => {
      const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDAOs(items);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView className="bg-black p-4">
      <Text className="text-white text-3xl font-bold mb-4">🗳 Visionary DAOs</Text>
      {daos.map(dao => (
        <View key={dao.id} className="bg-gray-900 p-4 mb-4 rounded">
          <Text className="text-purple-400 text-lg font-bold">{dao.name}</Text>
          <Text className="text-gray-300 mb-2">{dao.description}</Text>
          <Text className="text-white">Supporters: {dao.totalSupporters}</Text>
          <Button title="Join DAO" color="#a855f7" onPress={() => joinDAO(dao.id)} />
        </View>
      ))}
    </ScrollView>
  );
}

async function joinDAO(daoId: string) {
  const { awardUser } = await import('../utils/karmaEngine');
  const { joinDAO } = await import('../utils/daoEngine');
  const userId = "demoUserId123"; // replace with actual UID
  await joinDAO(daoId, userId, 100, 20, 5);
  await awardUser(userId, { karma: 5, influence: 2 });
}
