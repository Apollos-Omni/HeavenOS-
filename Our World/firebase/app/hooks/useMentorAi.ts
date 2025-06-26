// hooks/useMentorAi.ts
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';

const mentorAvatars = {
  calm: 'https://example.com/avatars/mentor_calm.png',
  inspired: 'https://example.com/avatars/mentor_inspired.png',
  stern: 'https://example.com/avatars/mentor_stern.png',
};

export default function useMentorAi() {
  const [message, setMessage] = useState('Welcome back, Visionary.');
  const [avatar, setAvatar] = useState(mentorAvatars.calm);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (!user) return;
    const fetchMentorMessage = async () => {
      const docRef = doc(db, 'mentors', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMessage(data.message || 'Keep going — the world is watching.');
        setAvatar(mentorAvatars[data.mood] || mentorAvatars.calm);
      }
    };
    fetchMentorMessage();
  }, [user]);

  return { message, avatar };
}
