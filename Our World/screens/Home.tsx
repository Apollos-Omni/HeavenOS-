import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

import { EquityTracker } from '../components/Equity/EquityTracker';
import { AiCoach } from '../components/AiCoach/AiCoach';
import { GovHomeSync } from '../components/GovHomeSync/GovHomeSync';
import WorkLogFeed from '../components/WorkLog';
import SponsorPortal from '../components/SponsorPortal';
import MirrorBoard from './MirrorBoard';
import GlobalFeed from './GlobalFeed';

export default function Home() {
  const [userId, setUserId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) setUserId(user.uid);
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
      const allSponsors = snap.docs.map(doc => doc.data());
      setSponsors(allSponsors);
    };

    fetchLogs();
    fetchSponsors();
  }, [userId]);

  if (!userId) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-lg">Authenticating...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-black p-4 space-y-6">
      <Text className="text-white text-3xl font-bold mb-4">🌍 Our World Dashboard</Text>

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