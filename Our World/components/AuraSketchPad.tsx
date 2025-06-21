import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import SketchCanvas from '@terrylinla/react-native-sketch-canvas';

export default function AuraSketchPad() {
  const canvasRef = useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SketchCanvas
        ref={canvasRef}
        style={{ flex: 1 }}
        strokeColor={'#a855f7'}
        strokeWidth={4}
      />
      <Button
        title="Submit Emotion"
        color="#9333ea"
        onPress={() => {
          // Future: AI Emotion Interpreter
          canvasRef.current.getBase64('jpg', false, false, false, false, (err, result) => {
            console.log('Emotion Art Base64:', result);
          });
        }}
      />
    </View>
  );
}
