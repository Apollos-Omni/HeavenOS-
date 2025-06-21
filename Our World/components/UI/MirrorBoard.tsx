import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { collection, query, orderBy, limit, startAfter, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

const PAGE_SIZE = 10;

export default function MirrorBoard() {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch first page
  const fetchInitialPosts = useCallback(async () => {
    setRefreshing(true);
    try {
      const q = query(
        collection(db, 'mirrorBoardPosts'),
        orderBy('timestamp', 'desc'),
        limit(PAGE_SIZE)
      );
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(fetched);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setRefreshing(false);
  }, []);

  // Fetch next page
  const fetchMorePosts = async () => {
    if (loadingMore || !lastDoc) return;
    setLoadingMore(true);
    try {
      const q = query(
        collection(db, 'mirrorBoardPosts'),
        orderBy('timestamp', 'desc'),
        startAfter(lastDoc),
        limit(PAGE_SIZE)
      );
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(prev => [...prev, ...fetched]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchInitialPosts();
  }, [fetchInitialPosts]);

  // Render post item
  const renderItem = ({ item }) => (
    <View className="bg-gray-800 p-3 rounded-xl mb-4">
      <Text className="text-white italic mb-1">
        {item.anonymous ? '🕶 Anonymous' : `👤 ${item.userId}`}
      </Text>
      <Text className="text-white mb-2">{item.content}</Text>
      <Text className="text-green-400 text-xs">
        Reflection Score: {item.reflectionScore} | Me Too: {item.meTooVotes}
      </Text>
    </View>
  );

  // Render footer loader
  const renderFooter = () =>
    loadingMore ? (
      <ActivityIndicator size="small" color="#a855f7" style={{ marginVertical: 20 }} />
    ) : null;

  return (
    <View className="bg-black p-4 flex-1">
      <Text className="text-purple-300 text-2xl mb-2 font-bold">🎭 Mirror Board</Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchInitialPosts} tintColor="#a855f7" />
        }
      />
    </View>
  );
}
