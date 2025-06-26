// screens/RealityQuestChainScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';

export default function RealityQuestChainScreen() {
  const [quests, setQuests] = useState([]);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchQuests = async () => {
      const snapshot = await getDocs(collection(db, 'realityQuests'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuests(data);
    };

    fetchQuests();
  }, []);

  const handleComplete = async (questId: string) => {
    try {
      const ref = doc(db, 'realityQuests', questId);
      await updateDoc(ref, {
        completedBy: user.uid,
        status: 'completed',
      });
      Alert.alert('Complete', 'Quest marked as completed.');
    } catch (err) {
      Alert.alert('Error', err.message || 'Quest update failed.');
    }
  };

  return (
    <FlatList
      style={{ backgroundColor: 'black' }}
      data={quests}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16, margin: 8, backgroundColor: '#1a1a1a', borderRadius: 10 }}>
          <Text style={{ color: '#facc15', fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
          <Text style={{ color: '#eee', marginBottom: 8 }}>{item.description}</Text>
          <Button title="Complete Quest" onPress={() => handleComplete(item.id)} color="#f59e0b" />
        </View>
      )}
    />
  );
}
