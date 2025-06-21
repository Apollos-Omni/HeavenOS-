import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

export default function GroupAuraHealing() {
  const [sessions, setSessions] = useState([]);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchSessions = async () => {
      const snapshot = await getDocs(collection(db, 'auraSessions'));
      const activeSessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(s => s.active);
      setSessions(activeSessions);
    };
    fetchSessions();
  }, []);

  const joinSession = async (sessionId) => {
    const sessionRef = doc(db, 'auraSessions', sessionId);
    await updateDoc(sessionRef, {
      participants: [...sessions.find(s => s.id === sessionId).participants, user.uid]
    });
  };

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">🕊️ Group Aura Healing</Text>

      <FlatList
        data={sessions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded mb-3">
            <Text className="font-bold text-indigo-600">{item.title}</Text>
            <Text>Participants: {item.participants.length}</Text>
            <Button title="Enter Sanctum" onPress={() => joinSession(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
