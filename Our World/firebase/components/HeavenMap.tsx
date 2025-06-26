import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function HeavenMap() {
  const [karmaHotspots, setKarmaHotspots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHotspots = async () => {
      const snapshot = await getDocs(collection(db, 'karmaHotspots'));
      const spots = snapshot.docs.map(doc => doc.data());
      setKarmaHotspots(spots);
      setLoading(false);
    };
    loadHotspots();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#a855f7" />
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 29.3,
            longitude: -94.8,
            latitudeDelta: 20,
            longitudeDelta: 20,
          }}
        >
          {karmaHotspots.map((spot, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: spot.lat, longitude: spot.lng }}
              title={spot.title}
              description={`${spot.karmaScore} karma`}
              pinColor="#a855f7"
            />
          ))}
        </MapView>
      )}
    </View>
  );
}
