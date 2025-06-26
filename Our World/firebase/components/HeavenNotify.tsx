import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { onMessage } from 'firebase/messaging';
import { messaging } from '../firebase/firebaseConfig';

export default function HeavenNotify() {
  const [message, setMessage] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      const text = payload?.notification?.body || '📡 New update in HeavenOS!';
      setMessage(text);

      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();

      // Auto dismiss after 6 seconds
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }).start(() => setMessage(null));
      }, 6000);
    });

    return () => unsubscribe();
  }, []);

  if (!message) return null;

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#7e22ce',
    padding: 16,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
});
