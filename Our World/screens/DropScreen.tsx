import React from 'react';
import { View, Text } from 'react-native';
import { canUnlock } from '../utils/karmaEngine';

export default function DropScreen({ drop, user }) {
  const hasAccess = canUnlock(drop, user.karma, user.uid);

  return (
    <View>
      {hasAccess ? (
        <Text>You unlocked: {drop.title}</Text>
      ) : (
        <Text>You need {drop.karmaRequired} karma to unlock this drop.</Text>
      )}
    </View>
  );
}
