import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';

const ProductCard = ({ product }) => {
  const user = useAuthStore((state) => state.user);

  const handlePurchase = async (product) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      if (userData.karma < product.karmaRequired) {
        Alert.alert('🛑 Access Denied', `You need at least ${product.karmaRequired} karma.`);
        return;
      }

      if (userData.wallet < product.priceHVC) {
        Alert.alert('❌ Insufficient Funds', `You need ${product.priceHVC} HVC.`);
        return;
      }

      // Deduct wallet balance and log purchase
      await updateDoc(userRef, {
        wallet: increment(-product.priceHVC),
      });

      await updateDoc(doc(db, 'orders', `${user.uid}_${product.id}`), {
        userId: user.uid,
        productId: product.id,
        timestamp: new Date().toISOString(),
        status: 'purchased',
      });

      Alert.alert('✅ Purchase Complete', `You've bought ${product.name}`);
    } catch (err) {
      console.error(err);
      Alert.alert('⚠️ Error', 'Purchase failed.');
    }
  };

  return (
    <View className="bg-gray-900 p-4 rounded-lg mb-4 border border-purple-700">
      <Text className="text-white text-xl font-bold mb-1">{product.name}</Text>
      <Text className="text-purple-400 mb-1">💰 {product.priceHVC} HVC</Text>
      <Text className="text-gray-300 mb-2">✨ Karma Required: {product.karmaRequired}</Text>

      <Button
        title="Buy Now"
        color={user?.karma >= product.karmaRequired ? '#22c55e' : '#9ca3af'}
        onPress={() => handlePurchase(product)}
      />
    </View>
  );
};

export default ProductCard;
