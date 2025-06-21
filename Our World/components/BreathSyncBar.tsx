// BreathSyncBar.tsx
import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';

export default function BreathSyncBar() {
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.4, duration: 4000, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 4000, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View style={{
      height: 20,
      width: 200,
      borderRadius: 10,
      backgroundColor: '#6d28d9',
      transform: [{ scale }]
    }} />
  );
}
