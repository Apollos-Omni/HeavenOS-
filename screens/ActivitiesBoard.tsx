import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';

export default function ActivityBoard() {
  const user = useAuthStore(state => state.user);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const q = query(
          collection(db, 'visions'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const raw = querySnapshot.docs.map(doc => doc.data());
        const activityLogs = raw.map((vision, idx) => ({
          id: idx,
          type: 'Vision Post',
          title: vision.title,
          time: vision.timestamp?.toDate().toLocaleString() || 'Unknown'
        }));
        setActivities(activityLogs);
      } catch (error) {
        console.error('Activity fetch failed:', error);
      }
    };

    if (user?.uid) {
      fetchActivities();
    }
  }, [user]);

  return (
    <ScrollView className="flex-1 bg-black p-4">
      <Text className="text-white text-3xl font-bold mb-4">Activity Board</Text>
      {activities.length === 0 ? (
        <Text className="text-gray-400">No tracked activity yet.</Text>
      ) : (
        activities.map(activity => (
          <View key={activity.id} className="bg-gray-900 mb-3 p-4 rounded">
            <Text className="text-purple-300 font-bold">{activity.type}</Text>
            <Text className="text-white">{activity.title}</Text>
            <Text className="text-gray-400 text-sm">{activity.time}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
