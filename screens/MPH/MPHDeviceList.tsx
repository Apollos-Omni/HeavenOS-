// app/screens/MPH/MPHDeviceList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase/config';
import { useNavigation } from '@react-navigation/native';

export default function MPHDeviceList() {
  const [devices, setDevices] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDevices = async () => {
      const querySnapshot = await getDocs(collection(db, 'MPHDevices'));
      const list: any[] = [];
      querySnapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setDevices(list);
    };
    fetchDevices();
  }, []);

  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ padding: 16, borderBottomWidth: 1, borderColor: '#444' }}
          onPress={() => navigation.navigate('MPHControlPanel', { deviceId: item.id })}
        >
          <Text style={{ color: '#fff' }}>{item.id}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
