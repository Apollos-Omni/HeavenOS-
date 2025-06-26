// /raffle/createRaffle.ts
import { db } from '../firebaseConfig';
import { addDoc, collection, Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';

export interface RaffleInput {
  title: string;
  description: string;
  ticketLimit: number;
  deadline: Date;
  createdBy: string;
}

export const createRaffle = async (raffleData: RaffleInput) => {
  try {
    const raffleRef = collection(db, 'raffles');
    const docRef = await addDoc(raffleRef, {
      ...raffleData,
      deadline: Timestamp.fromDate(raffleData.deadline),
      createdAt: Timestamp.now(),
      tickets: [],
      winner: null,
      isClosed: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating raffle:', error);
    throw error;
  }
};

export const joinRaffle = async (raffleId: string, userId: string) => {
  try {
    const raffleDoc = doc(db, 'raffles', raffleId);
    const raffleSnap = await getDoc(raffleDoc);

    if (!raffleSnap.exists()) throw new Error('Raffle not found');

    const raffleData = raffleSnap.data();
    const currentTickets = raffleData.tickets || [];

    if (currentTickets.length >= raffleData.ticketLimit) {
      throw new Error('All tickets sold out');
    }

    const newTicket = {
      userId,
      number: currentTickets.length + 1,
      timestamp: Timestamp.now()
    };

    const updatedTickets = [...currentTickets, newTicket];

    await updateDoc(raffleDoc, {
      tickets: updatedTickets
    });

    return newTicket.number;
  } catch (error) {
    console.error('Error joining raffle:', error);
    throw error;
  }
};
