import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

type LegacyVision = {
  id: string;
  author: string;
  vision: string;
  date: any;
};

export default function LegacyArchive() {
  const [legacies, setLegacies] = useState<LegacyVision[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'legacyVisions'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLegacies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as LegacyVision[]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="legacy-archive">
      <h2>Legacy Visions</h2>
      {legacies.map(l => (
        <div key={l.id}>
          <blockquote>"{l.vision}"</blockquote>
          <footer>— {l.author} ({new Date(l.date.seconds * 1000).toLocaleDateString()})</footer>
        </div>
      ))}
    </div>
  );
}
