import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, addDoc } from 'firebase/firestore';

type WorkItem = {
  id: string;
  description: string;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed';
};

export default function SponsorPortal() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'sponsorHub'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setWorkItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as WorkItem[]);
    });
    return () => unsubscribe();
  }, []);

  async function addWork() {
    if (!newDesc) return;
    await addDoc(collection(db, 'sponsorHub'), {
      description: newDesc,
      assignedTo: '',
      status: 'pending'
    });
    setNewDesc('');
  }

  return (
    <div className="sponsor-portal">
      <h2>Sponsor + Work Portal</h2>
      <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="New work item" />
      <button onClick={addWork}>Add Work</button>
      {workItems.map(w => (
        <div key={w.id}>
          <p>{w.description}</p>
          <small>Assigned to: {w.assignedTo || 'Unassigned'}</small>
          <small>Status: {w.status}</small>
        </div>
      ))}
    </div>
  );
}
