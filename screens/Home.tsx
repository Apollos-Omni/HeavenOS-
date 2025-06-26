import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

import { EquityTracker } from '../components/Equity/EquityTracker';
import { AiCoach } from '../components/AiCoach/AiCoach';
import { GovHomeSync } from '../components/GovHomeSync/GovHomeSync';
import WorkLogFeed from '../components/WorkLog';
import SponsorPortal from '../components/SponsorPortal';
import MirrorBoard from './MirrorBoard';
import GlobalFeed from './GlobalFeed';
import VisionCard from '../components/VisionCard';
import ProgressCircle from 'react-native-progress/Circle';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

export default function Home() {
  const [userId, setUserId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [userData, setUserData] = useState<any>(null);
  const [feedData, setFeedData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setUserId(user.uid);
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        setUserData(docSnap.exists() ? docSnap.data() : null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!userId) return;
      const snap = await getDocs(collection(db, 'workLogs'));
      const filteredLogs = snap.docs.map(doc => doc.data()).filter(log => log.userId === userId);
      setLogs(filteredLogs);
    };

    const fetchSponsors = async () => {
      const snap = await getDocs(collection(db, 'sponsors'));
      setSponsors(snap.docs.map(doc => doc.data()));
    };

    const fetchVisions = async () => {
      const snap = await getDocs(collection(db, 'visions'));
      setFeedData(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchLogs();
    fetchSponsors();
    fetchVisions();
  }, [userId]);

  if (!userId || !userData) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-lg">Authenticating...</Text>
      </View>
    );
  }

  const { karmaScore = 0, trustTier = 'Bronze', photoURL = '' } = userData;
  const tierColors: Record<string, string> = {
    Platinum: '#e5e7eb',
    Gold: '#facc15',
    Silver: '#9ca3af',
    Bronze: '#6b7280',
  };

  const progressColor = karmaScore > 85
    ? '#ffd700'
    : karmaScore > 70
    ? '#a855f7'
    : '#d97706';

  return (
    <ScrollView className="bg-black p-4 space-y-6">
      <Text className="text-white text-3xl font-bold mb-4">🌍 Our World Dashboard</Text>

      {/* HeavenScore */}
      <View style={styles.scoreCard}>
        <Text className="text-purple-300 text-lg font-semibold">Your HeavenScore</Text>

        <ProgressCircle
          progress={karmaScore / 100}
          size={120}
          strokeWidth={8}
          color={progressColor}
          backgroundColor="rgba(255,255,255,0.1)"
        />

        <Text className="text-white mt-2 text-center italic">{trustTier} Tier</Text>
      </View>

      {/* Avatar */}
      {photoURL ? (
        <Image
          source={{ uri: photoURL }}
          style={[
            styles.avatar,
            { borderColor: tierColors[trustTier] || '#6b7280' },
          ]}
        />
      ) : null}

      {/* Animated Vision Feed */}
      <Animated.FlatList
        data={feedData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <VisionCard item={item} />}
        entering={FadeInRight.springify().delay(100)}
        exiting={FadeOutLeft.duration(300)}
        scrollEnabled={false}
      />

      {/* Existing Modules */}
      <EquityTracker userId={userId} />
      <AiCoach userId={userId} />
      <GovHomeSync />
      <WorkLogFeed logs={logs} />
      <SponsorPortal sponsors={sponsors} />
      <MirrorBoard />
      <GlobalFeed />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scoreCard: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#9333ea',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    borderWidth: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
});
