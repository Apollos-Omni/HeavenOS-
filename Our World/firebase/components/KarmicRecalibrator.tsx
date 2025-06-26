import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { db } from '../firebase/config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

export default function KarmicRecalibrator() {
  const [events, setEvents] = useState([]);
  const [reflection, setReflection] = useState('');
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, 'karmicEvents'));
      const unresolved = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(e => e.userId === user.uid && !e.resolved);
      setEvents(unresolved);
    };
    fetchEvents();
  }, []);

  const handleResolve = async (eventId) => {
    const eventRef = doc(db, 'karmicEvents', eventId);
    await updateDoc(eventRef, {
      resolved: true,
      resolutionType: 'reflection',
      reflection,
    });
    Alert.alert('Karma Shifted', 'Your energy has been realigned.');
    setReflection('');
  };

  return (
    <View className="bg-black p-4">
      <Text className="text-white text-2xl mb-4">Karmic Recalibrator</Text>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded mb-3">
            <Text className="text-red-600 font-bold">⚠️ Event: {item.category}</Text>
            <Text className="mb-2">Karma Impact: {item.karmaImpact}</Text>

            <TextInput
              placeholder="Reflect on this moment..."
              value={reflection}
              onChangeText={setReflection}
              className="bg-gray-100 p-2 rounded mb-2"
            />

            <Button
              title="Submit Reflection"
              onPress={() => handleResolve(item.id)}
              color="#8b5cf6"
            />
          </View>
        )}
      />
    </View>
  );
}
