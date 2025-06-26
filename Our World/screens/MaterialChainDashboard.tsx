import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function MaterialChainDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ref = collection(db, 'billOfDreams');
      const snapshot = await getDocs(ref);
      setOrders(snapshot.docs.map(doc => doc.data()));
    };
    fetchOrders();
  }, []);

  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-lime-400 text-2xl mb-4">📦 Material Chain Orders</Text>
      {orders.map((order, i) => (
        <View key={i} className="bg-gray-900 p-4 rounded mb-4">
          <Text className="text-white text-xl">{order.projectId}</Text>
          {order.materials.map((mat, j) => (
            <Text key={j} className="text-gray-300">• {mat.name} x{mat.qty} ({mat.vendor})</Text>
          ))}
          <Text className="text-emerald-400 mt-2">Status: {order.fulfillmentProgress}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
