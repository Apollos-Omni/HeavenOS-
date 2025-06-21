import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

export default function AuraCleanser() {
  const user = useAuthStore(state => state.user);
  const [aura, setAura] = useState(null);

  useEffect(() => {
    const fetchAura = async () => {
      const docRef = doc(db, 'auraState', user.uid);
      const snapshot = await getDoc(docRef);
      setAura(snapshot.data());
    };
    fetchAura();
  }, []);

  const handleCleanse = async () => {
    const docRef = doc(db, 'auraState', user.uid);
    await updateDoc(docRef, { lastCleanse: new Date().toISOString() });
    alert('Aura realigned. Breath becomes clear.');
  };

  return (
    <View className="bg-black p-6">
      <Text className="text-white text-xl mb-4">🧼 Aura Cleanser</Text>

      {aura && (
        <>
          <Text className="text-gray-300 mb-2">Karma last 7 days: {aura.karmaDelta7d}</Text>
          <Text className="text-gray-300 mb-4">Dream Abandonments: {aura.dreamAbandonment}</Text>
          <Text className="text-indigo-300 italic mb-4">
            Recommended Cleanse: {aura.recommendation}
          </Text>

          <Button title="Cleanse Now" onPress={handleCleanse} color="#8b5cf6" />
        </>
      )}
    </View>
  );
}
