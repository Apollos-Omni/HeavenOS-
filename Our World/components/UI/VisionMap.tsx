import MapView, { Marker } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function VisionMap() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      const snapshot = await getDocs(collection(db, 'visionMapPins'));
      setPins(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPins();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 29.3014,
        longitude: -94.7977,
        latitudeDelta: 40,
        longitudeDelta: 40
      }}
    >
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          coordinate={{ latitude: pin.coordinates.lat, longitude: pin.coordinates.lng }}
          title={pin.locationName}
          description={`Vision: ${pin.tags.join(', ')}`}
          pinColor={pin.status === 'ignited' ? 'red' : pin.status === 'growing' ? 'yellow' : 'green'}
        />
      ))}
    </MapView>
  );
}
