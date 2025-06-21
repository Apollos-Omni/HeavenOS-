import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

type MirrorPost = {
  id: string;
  content: string;
  author: string;
  timestamp: any;
};

export default function MirrorFeed() {
  const [posts, setPosts] = useState<MirrorPost[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'mirrorBoard'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MirrorPost[]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="mirror-feed">
      {posts.length === 0 ? <p>No reflections yet.</p> :
        posts.map(post => (
          <div key={post.id} className="mirror-post">
            <p>{post.content}</p>
            <small>— {post.author}</small>
          </div>
        ))
      }
    </div>
  );
}
