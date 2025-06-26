import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function DropZoneMap() {
  const [drops, setDrops] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    const fetchDrops = async () => {
      const snap = await getDocs(collection(db, 'drops'));
      setDrops(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchDrops();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }}
    >
      {drops.map((drop) => (
        <Marker
          key={drop.id}
          coordinate={drop.location}
          title={drop.isAnonymous ? "Anonymous Drop" : drop.userId}
          description={drop.karmaRequired ? `Unlock with Karma ${drop.karmaRequired}` : 'Free drop'}
        />
      ))}
    </MapView>
  );
}
