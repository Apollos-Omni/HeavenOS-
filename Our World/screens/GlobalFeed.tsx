import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebase/config';
import { collectionGroup, onSnapshot, Timestamp, doc, updateDoc, increment } from 'firebase/firestore';

interface FeedItem {
  id: string;
  type: 'raffle' | 'vision' | 'workLog' | 'homeEquity' | 'milestone' | string;
  content: string;
  timestamp: Timestamp;
  userId: string;
  title?: string;
  reactions?: Record<string, number>;
}

const FILTERS: Array<'all' | 'raffle' | 'vision' | 'workLog'> = ['all', 'raffle', 'vision', 'workLog'];
const EMOJIS = ['🔥', '❤️', '💡', '👏', '🧠'];

export default function GlobalFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'raffle' | 'vision' | 'workLog'>('all');

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionGroup(db, 'globalFeed'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FeedItem[];
      const sorted = items.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setFeedItems(sorted);
    });

    return () => unsubscribe();
  }, []);

  const filteredItems = filter === 'all'
    ? feedItems
    : feedItems.filter(item => item.type === filter);

  const addReaction = async (id: string, emoji: string) => {
    try {
      const ref = doc(db, 'globalFeed', id);
      await updateDoc(ref, {
        [`reactions.${emoji}`]: increment(1),
      });
    } catch (error) {
      console.error('Failed to add reaction:', error);
    }
  };

  const getReadableType = (type: string) => {
    switch (type) {
      case 'raffle': return '🎟️ Raffle Entry';
      case 'vision': return '🌟 Vision';
      case 'workLog': return '📋 Work Log';
      case 'homeEquity': return '🏡 Home Equity Update';
      case 'milestone': return '🚀 Milestone';
      default: return '📌 Post';
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
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.meta}>🕒 {formattedDate}</Text>
        <Text style={styles.user}>👤 {item.userId}</Text>

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
      <Text style={styles.header}>🌍 Global Feed</Text>

      <View style={styles.filterBar}>
        {FILTERS.map(f => (
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
        keyExtractor={item => item.id}
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
    backgroundColor: '#bb86fc',
    borderColor: '#bb86fc',
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
  meta: { fontSize: 12, color: '#999', marginTop: 8 },
  user: { fontSize: 12, color: '#888', marginTop: 4 },

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

  empty: { textAlign: 'center', color: '#aaa', marginTop: 50 },
});
