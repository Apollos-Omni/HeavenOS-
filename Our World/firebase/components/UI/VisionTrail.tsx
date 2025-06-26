import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../hooks/useAuth';

export default function VisionTrail() {
  const { user } = useAuth();
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const fetchTrail = async () => {
      const ref = doc(db, 'visionTrails', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setTrail(snap.data().history || []);
    };
    fetchTrail();
  }, []);

  return (
    <ScrollView className="bg-black p-4">
      <Text className="text-white text-2xl mb-4">Your Vision Trail</Text>
      {trail.map((v, i) => (
        <View key={i} className="bg-gray-800 p-4 mb-2 rounded-xl">
          <Text className="text-purple-400 text-lg italic">"{v.text}"</Text>
          <Text className="text-white text-sm mt-1">📍 {v.location.city}</Text>
          <Text className="text-gray-400 text-xs">🕒 {new Date(v.timestamp).toLocaleString()}</Text>
          <Text className="text-yellow-500">🔥 Karma: {v.karma}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
