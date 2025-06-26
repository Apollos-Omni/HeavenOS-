import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { matchTasksToUser } from '../utils/taskMatcher';

// Assume props or context provides these:
const filteredTasks = matchTasksToUser(allTasks, user);

export default function TaskList() {
  const handleAccept = (taskId: string) => {
    // Handle logic to accept a task (update Firestore, etc.)
    acceptTask(taskId);
  };

  return (
    <FlatList
      data={filteredTasks}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text className="text-white text-center mt-4">
          No matching tasks found.
        </Text>
      }
      renderItem={({ item }) => (
        <View className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <Text className="font-bold text-indigo-800 text-lg">{item.title}</Text>
          <Text className="text-gray-700 mb-2">{item.description}</Text>
          <Text className="text-sm text-green-600 mb-2">
            +{item.karmaReward} Karma | {item.heavenCoinReward} HeavenCoin
          </Text>
          <Button title="Accept Task" onPress={() => handleAccept(item.id)} />
        </View>
      )}
    />
  );
}
