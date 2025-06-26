import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, Modal } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function MapScreen() {
  const [visions, setVisions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchVisions = async () => {
      const snapshot = await getDocs(collection(db, 'visions'));
      setVisions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchVisions();
  }, []);

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 20.0,
          longitude: 0.0,
          latitudeDelta: 90,
          longitudeDelta: 180
        }}
      >
        {visions.map(vision => (
          <Marker
            key={vision.id}
            coordinate={vision.location}
            title={vision.text}
            onPress={() => setSelected(vision)}
          />
        ))}
      </MapView>

      {selected && (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View className="bg-black/80 p-4 m-4 rounded-xl">
            <Text className="text-white text-xl">{selected.text}</Text>
            <Text className="text-purple-400">City: {selected.city}</Text>
            <Text className="text-purple-300">Karma: {selected.karma}</Text>
          </View>
        </Modal>
      )}
    </View>
  );
}
