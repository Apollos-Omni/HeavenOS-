import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function DreamCardGallery({ cards }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16 }}>
      {cards.map((card, i) => (
        <View key={i} style={{ marginRight: 12, backgroundColor: '#1f1f1f', borderRadius: 8 }}>
          <Image
            source={{ uri: card.image }}
            style={{ width: 200, height: 300, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          />
          <View style={{ padding: 12 }}>
            <Text className="text-white font-bold">{card.title}</Text>
            <Text className="text-gray-300">{card.creator}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
