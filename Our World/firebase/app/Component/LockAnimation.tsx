import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';

interface LockAnimationProps {
  locked: boolean;
}

export default function LockAnimation({ locked }: LockAnimationProps) {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (locked) {
      animationRef.current?.play(0, 50);     // Lock frames
    } else {
      animationRef.current?.play(50, 100);   // Unlock frames
    }
  }, [locked]);

  return (
    <LottieView
      ref={animationRef}
      source={require('../assets/animations/lock-unlock.json')}
      autoPlay={false}
      loop={false}
      style={{ width: 100, height: 100 }}
    />
  );
}
