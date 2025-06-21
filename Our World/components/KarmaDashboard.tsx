import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

type KarmaUser = {
  id: string;
  username: string;
  karmaScore: number;
  role: string;
};

export default function KarmaDashboard() {
  const [users, setUsers] = useState<KarmaUser[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'karmaStats'), orderBy('karmaScore', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as KarmaUser[]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="karma-dashboard">
      <h2>Karma Leaderboard</h2>
      {users.map(u => (
        <div key={u.id}>
          <strong>{u.username}</strong> — {u.karmaScore} points — Role: {u.role}
        </div>
      ))}
    </div>
  );
}
