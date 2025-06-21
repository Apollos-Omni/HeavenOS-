import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';
import { canModerate } from '../utils/permissions';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface VisionCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    userId: string;
    timestamp?: any;
  };
}

export default function VisionCard({ item }: VisionCardProps) {
  const user = useAuthStore(state => state.user);
  const isModerator = canModerate(user?.role);

  const handleDelete = async () => {
    Alert.alert('Delete Vision?', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'visions', item.id));
            Alert.alert('Deleted', 'Vision deleted successfully.');
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  return (
    <Animated.View entering={FadeInDown.springify()} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.meta}>
          Posted by: <Text style={styles.userId}>{item.userId.slice(0, 6)}...</Text>
        </Text>

        {isModerator && (
          <TouchableOpacity onPress={handleDelete}>
            <Icon name="trash-outline" size={22} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9333ea',
    padding: 16,
    marginVertical: 8,
    shadowColor: '#9333ea',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    color: '#d1d5db',
    fontSize: 14,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: {
    color: '#a78bfa',
    fontSize: 12,
  },
  userId: {
    fontWeight: '600',
    color: '#facc15',
  },
