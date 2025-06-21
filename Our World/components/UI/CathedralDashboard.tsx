import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function CathedralDashboard({ userId }) {
  const [cathedral, setCathedral] = useState(null);

  useEffect(() => {
    const fetchCathedral = async () => {
      const snap = await getDoc(doc(db, 'cathedrals', userId));
      if (snap.exists()) setCathedral(snap.data());
    };
    fetchCathedral();
  }, []);

  if (!cathedral) return <Text className="text-white">Loading Cathedral...</Text>;

  return (
    <ScrollView className="p-4 bg-black">
      <Text className="text-purple-300 text-2xl font-bold mb-4">⛪ Your Cloud Cathedral</Text>
      
      <Text className="text-white">Modules Installed:</Text>
      {cathedral.heavenModules.map((mod, i) => (
        <Text key={i} className="text-green-400 ml-2">• {mod}</Text>
      ))}

      <Text className="text-white mt-4">Synced Visions:</Text>
      {cathedral.syncedVisions.map((v, i) => (
        <Text key={i} className="text-blue-300 ml-2">• {v}</Text>
      ))}

      <Text className="text-white mt-4">AI Channels:</Text>
      {Object.entries(cathedral.aiChannels).map(([k, v], i) => (
        <Text key={i} className="ml-2 text-yellow-300">• {k}: {v}</Text>
      ))}

      <Text className="text-white mt-4">Legacy Capsule:</Text>
      <Text className="text-blue-400 underline">{cathedral.legacyCapsuleLink}</Text>

      <Button title="Backup Now" onPress={() => alert("Backup feature pending full server sync")} />
    </ScrollView>
  );
}
/visionMapPins/{pinId}
{
    visionId: 'abc123',
    userId: 'uid123',
    coordinates: {
      lat: 29.3014,
      lng: -94.7977
    },
    locationName: 'Galveston, TX',
    tags: ['homelessness', 'housing', 'hope'],
    status: 'seed' | 'growing' | 'ignited',
    upvotes: 102,
    comments: 17,
    createdAt: '2025-06-07T00:00:00Z'
  }
  