import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function BarterMarket() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const querySnapshot = await getDocs(collection(db, 'barterListings'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(data);
    };
    fetchListings();
  }, []);

  return (
    <View className="bg-black p-4">
      <Text className="text-white text-2xl mb-4">BarterSync Public Market</Text>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white rounded p-4 mb-3">
            <Text className="text-xl font-bold">{item.title}</Text>
            <Text>Price: {item.priceHeavenCoin} HCN or {item.priceBarter}</Text>
            <Text>Location: {item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
