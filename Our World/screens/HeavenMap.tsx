import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function HeavenMap() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchMap = async () => {
      const countrySnap = await getDocs(collection(db, 'heavenMap'));
      const regionsData = await Promise.all(
        countrySnap.docs.map(async (doc) => {
          const statesSnap = await getDocs(collection(doc.ref, 'states'));
          return {
            country: doc.id,
            states: statesSnap.docs.map((s) => s.id),
          };
        })
      );
      setRegions(regionsData);
    };

    fetchMap();
  }, []);

  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-white text-3xl font-bold mb-4">🗺 HeavenMap</Text>
      {regions.map((region) => (
        <View key={region.country} className="mb-6">
          <Text className="text-purple-400 text-xl">{region.country}</Text>
          {region.states.map((state) => (
            <TouchableOpacity
              key={state}
              className="mt-2 bg-gray-800 p-2 rounded"
              onPress={() => navigateToCity(state)}
            >
              <Text className="text-white">{state}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

function navigateToCity(stateId: string) {
  // Navigate to HeavenCityView screen
}
