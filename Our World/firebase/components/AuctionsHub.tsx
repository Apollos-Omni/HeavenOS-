import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';

type Auction = {
  id: string;
  title: string;
  description: string;
  highestBid: number;
  highestBidder: string;
};

export default function AuctionHub() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [newBid, setNewBid] = useState<number>(0);
  const [selectedAuction, setSelectedAuction] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'dreamAuctions'), orderBy('highestBid', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAuctions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Auction[]);
    });
    return () => unsubscribe();
  }, []);

  async function placeBid(auctionId: string, bid: number) {
    if (bid <= 0) return;
    // Call cloud function or update Firestore document atomically here
    // Example:
    await addDoc(collection(db, `dreamAuctions/${auctionId}/bids`), {
      amount: bid,
      bidder: 'currentUserId', // replace with auth user id
      timestamp: new Date()
    });
  }

  return (
    <div className="auction-hub">
      {auctions.map(a => (
        <div key={a.id}>
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          <p>Highest Bid: {a.highestBid} by {a.highestBidder}</p>
          <input
            type="number"
            value={selectedAuction === a.id ? newBid : 0}
            onChange={e => {
              setSelectedAuction(a.id);
              setNewBid(parseInt(e.target.value));
            }}
          />
          <button onClick={() => placeBid(a.id, newBid)}>Place Bid</button>
        </div>
      ))}
    </div>
  );
}
