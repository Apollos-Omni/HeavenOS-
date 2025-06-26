import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { db } from '../firebase/config';
import {
  collectionGroup,
  onSnapshot,
  Timestamp,
  doc,
  updateDoc,
  increment,
  query,
  collection,
  orderBy,
} from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

interface FeedItem {
  id: string;
  type: 'vision' | 'raffle' | 'workLog' | 'homeEquity' | 'milestone' | string;
  title?: string;
  description?: string;
  imageUrl?: string;
  content?: string;
  karma?: number;
  timestamp: Timestamp;
  userId: string;
  reactions?: Record<string, number>;
}

const FILTERS: Array<'all' | 'vision' | 'raffle' | 'workLog'> = ['all', 'vision', 'raffle', 'workLog'];
const EMOJIS = ['🔥', '❤️', '💡', '👏', '🧠'];

export default function GlobalFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'vision' | 'raffle' | 'workLog'>('all');
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const q = query(collection(db, 'visions'), orderBy('timestamp', 'desc'));
    const unsubscribeVisions = onSnapshot(q, (snapshot) => {
      const visionPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        type: 'vision',
        title: doc.data().title,
        description: doc.data().description,
        imageUrl: doc.data().imageUrl,
        karma: doc.data().karma || 0,
        timestamp: doc.data().timestamp,
        userId: doc.data().userId,
        reactions: doc.data().reactions || {},
      }));
      setFeedItems((prev) =>
        mergeAndSort([...prev.filter((item) => item.type !== 'vision'), ...visionPosts])
      );
    });

    const unsubscribeGlobalFeed = onSnapshot(collectionGroup(db, 'globalFeed'), (snapshot) => {
      const globalItems = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          type: data.type,
          title: data.title,
          content: data.content,
          timestamp: data.timestamp,
          userId: data.userId,
          reactions: data.reactions || {},
        };
      });
      setFeedItems((prev) =>
        mergeAndSort([...prev.filter((item) => item.type === 'vision'), ...globalItems])
      );
    });

    return () => {
      unsubscribeVisions();
      unsubscribeGlobalFeed();
    };
  }, []);

  const mergeAndSort = (items: FeedItem[]) => {
    return [...items].sort(
      (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
    );
  };

  const filteredItems =
    filter === 'all' ? feedItems : feedItems.filter((item) => item.type === filter);

  const addReaction = async (id: string, emoji: string) => {
    try {
      const ref = doc(db, 'visions', id); // adjust for type if needed
      await updateDoc(ref, {
        [`reactions.${emoji}`]: increment(1),
      });
    } catch (error) {
      console.error('Failed to add reaction:', error);
    }
  };

  const handleBoostKarma = async (visionId: string, userId: string) => {
    try {
      const { incrementKarmaForVision, awardUser } = await import('../utils/karmaEngine');
      await incrementKarmaForVision(visionId, 5);
      await awardUser(userId, { karma: 5, influence: 1 });
      Alert.alert('✨ Boosted', 'You boosted karma for this vision.');
    } catch (err) {
      console.error(err);
    }
  };

  const getReadableType = (type: string) => {
    switch (type) {
      case 'raffle':
        return '🎟️ Raffle Entry';
      case 'vision':
        return '🌟 Vision';
      case 'workLog':
        return '📋 Work Log';
      case 'homeEquity':
        return '🏡 Home Equity';
      case 'milestone':
        return '🚀 Milestone';
      default:
        return '📌 Post';
    }
  };

  const renderItem = ({ item }: { item: FeedItem }) => {
    const formattedDate = item.timestamp?.seconds
      ? new Date(item.timestamp.seconds * 1000).toLocaleString()
      : 'No Timestamp';

    return (
      <View style={styles.card}>
        <Text style={styles.type}>{getReadableType(item.type)}</Text>
        {item.title && <Text style={styles.title}>{item.title}</Text>}
        {item.description && <Text style={styles.content}>{item.description}</Text>}
        {item.content && <Text style={styles.content}>{item.content}</Text>}
        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
        )}
        <Text style={styles.meta}>🕒 {formattedDate}</Text>
        <Text style={styles.user}>👤 {item.userId}</Text>

        {item.type === 'vision' && (
          <>
            <Text style={styles.karma}>🔥 Karma: {item.karma || 0}</Text>
            <TouchableOpacity
              style={styles.boostButton}
              onPress={() => handleBoostKarma(item.id, user.uid)}
            >
              <Text style={styles.boostText}>✨ Boost Karma</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.reactionBar}>
          {EMOJIS.map((emoji) => (
            <TouchableOpacity
              key={emoji}
              onPress={() => addReaction(item.id, emoji)}
              style={styles.reactionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.reaction}>
                {emoji} {item.reactions?.[emoji] || 0}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌍 Global Vision Feed</Text>

      <View style={styles.filterBar}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No feed items yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#fff' },

  filterBar: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#555',
    marginHorizontal: 6,
  },
  filterButtonActive: {
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
  },
  filterText: {
    color: '#aaa',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#000',
  },

  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  type: { fontWeight: 'bold', color: '#bb86fc', fontSize: 16, marginBottom: 4 },
  title: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 4 },
  content: { fontSize: 16, color: '#ccc' },
  karma: { fontSize: 16, color: '#facc15', marginTop: 8 },
  meta: { fontSize: 12, color: '#999', marginTop: 8 },
  user: { fontSize: 12, color: '#888', marginTop: 4 },
  image: { width: '100%', height: 180, borderRadius: 8, marginTop: 10 },

  reactionBar: {
    flexDirection: 'row',
    marginTop: 10,
  },
  reactionButton: {
    marginHorizontal: 5,
  },
  reaction: {
    fontSize: 20,
  },
  boostButton: {
    marginTop: 10,
    backgroundColor: '#a855f7',
    padding: 10,
    borderRadius: 6,
  },
  boostText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },

  empty: { textAlign: 'center', color: '#aaa', marginTop: 50 },
});
