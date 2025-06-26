// hooks/useKarmaTrail.ts
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';

export default function useKarmaTrail() {
  const [trail, setTrail] = useState([]);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, 'karmaTrail', user.uid, 'entries'),
      orderBy('timestamp', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTrail(data);
    });

    return () => unsub();
  }, [user?.uid]);

  return trail;
}
