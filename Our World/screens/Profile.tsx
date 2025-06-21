import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, Image } from 'react-native';
import { collection, query, where, getDocs, orderBy, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';
import { pickAndUploadImage } from '../utils/uploadImage';

export default function ProfileScreen() {
  const user = useAuthStore(state => state.user);
  const [visions, setVisions] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [karma, setKarma] = useState(0);
  const [influence, setInfluence] = useState(0);

  // Fetch user's visions
  useEffect(() => {
    if (!user?.uid) return;

    const fetchUserVisions = async () => {
      try {
        const q = query(
          collection(db, 'visions'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        setVisions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error loading visions:', error);
      }
    };

    fetchUserVisions();
  }, [user?.uid]);

  // Fetch karma & influence stats
  useEffect(() => {
    if (!user?.uid) return;

    const fetchUserStats = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setKarma(data.karma || 0);
          setInfluence(data.influence || 0);
        } else {
          console.warn('User stats document not found for:', user.uid);
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    };

    fetchUserStats();
  }, [user?.uid]);

  // Upload avatar handler
  const handleUploadAvatar = async () => {
    const url = await pickAndUploadImage('avatars');
    if (url) {
      setAvatarUrl(url);
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { avatar: url });
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Your Profile
      </Text>
      <Text style={{ color: 'gray', marginBottom: 8 }}>
        Logged in as: {user?.email}
      </Text>

      {/* Avatar Section */}
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 8 }}
            resizeMode="cover"
          />
        ) : (
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#444', marginBottom: 8 }} />
        )}
        <Button title="Upload Profile Pic" onPress={handleUploadAvatar} />
      </View>

      {/* User Stats Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#a78bfa', fontSize: 16, fontWeight: 'bold' }}>Karma</Text>
          <Text style={{ color: 'white', fontSize: 18 }}>{karma}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#a78bfa', fontSize: 16, fontWeight: 'bold' }}>Influence</Text>
          <Text style={{ color: 'white', fontSize: 18 }}>{influence}</Text>
        </View>
      </View>

      {/* Vision Posts */}
      <Text style={{ color: '#a78bfa', fontSize: 20, marginBottom: 8 }}>
        Your Visions:
      </Text>
      {visions.length === 0 ? (
        <Text style={{ color: '#888' }}>You haven't posted any visions yet.</Text>
      ) : (
        visions.map(vision => (
          <View key={vision.id} style={{ backgroundColor: '#333', marginBottom: 12, padding: 16, borderRadius: 8 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{vision.title}</Text>
            <Text style={{ color: '#ccc' }}>{vision.description}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
