import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function DreamMap() {
  const [dreamPins, setDreamPins] = useState([]);

  useEffect(() => {
    const fetchDreams = async () => {
      const dreamsRef = collection(db, 'dreamMapPins');
      const snapshot = await getDocs(dreamsRef);
      const pins = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDreamPins(pins);
    };

    fetchDreams();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 20.0,
        longitude: 0.0,
        latitudeDelta: 100,
        longitudeDelta: 100,
      }}
    >
      {dreamPins.map(pin => (
        <Marker
          key={pin.id}
          coordinate={{ latitude: pin.lat, longitude: pin.lng }}
          pinColor={pin.isAuction ? '#facc15' : '#8b5cf6'}
        >
          <Callout>
            <View style={{ width: 200 }}>
              <Text style={{ fontWeight: 'bold' }}>{pin.title}</Text>
              <Text>Karma Weight: {pin.karmaWeight}</Text>
              {pin.mentorLinked && <Text>Mentored by: {pin.mentorLinked}</Text>}
              <Text>Status: {pin.status}</Text>
              <Text>Tags: {pin.tags.join(', ')}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}
