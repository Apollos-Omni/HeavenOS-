// firestoreSchemas.ts

import { Timestamp } from 'firebase/firestore';

// ---------------------- USERS ----------------------
export interface User {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  country: string;
  karma: number;
  influence: number;
  visionCount: number;
  role: string;
  followers: string[];
  timestamp: Timestamp;
}

// ---------------------- WALLET ----------------------
export interface WalletTransaction {
  type: 'earn' | 'spend';
  source?: string;
  purpose?: string;
  amount: number;
  timestamp: string;
}

export interface Wallet {
  balance: number;
  karma: number;
  influence: number;
  transactions: WalletTransaction[];
}

// ---------------------- VISION ----------------------
export interface VisionMapPin {
  visionId: string;
  userId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  locationName: string;
  tags: string[];
  status: 'seed' | 'growing' | 'ignited';
  upvotes: number;
  comments: number;
  createdAt: string;
}

// ---------------------- NEURAL MIRRORS ----------------------
export interface MemoryThread {
  title: string;
  type: 'vision' | 'audio' | 'text';
  summary?: string;
  url?: string;
  lastUpdated?: string;
}

export interface NeuralMirror {
  ownerId: string;
  memoryThreads: MemoryThread[];
  aiReflection: string;
  posthumousEnabled: boolean;
  continuationMode: 'adaptiveGPT';
  lastSynced: string;
}

// ---------------------- AUCTIONS ----------------------
export interface AuctionBid {
  bidderId: string;
  amount: number;
  timestamp: string;
}

export interface Auction {
  visionId: string;
  ownerId: string;
  auctionType: 'partner' | 'donate' | 'ip-sale';
  startingPrice: number;
  currentHighestBid: AuctionBid;
  bidHistory: AuctionBid[];
  karmaBackers: string[];
  expiration: string;
  status: 'active' | 'closed';
}

// ---------------------- VOTES ----------------------
export interface VoteRecord {
  choice: string;
  weight: number;
}

export interface Vote {
  contextType: 'amendment' | 'vision' | 'election' | 'trial';
  contextId: string;
  createdBy: string;
  title: string;
  description: string;
  choices: string[];
  votes: Record<string, VoteRecord>;
  totalVotes: Record<string, number>;
  expiresAt: string;
}

// ---------------------- DROPS ----------------------
export interface Drop {
  userId: string;
  text: string;
  isAnonymous: boolean;
  location: {
    lat: number;
    lng: number;
  };
  geohash: string;
  karmaRequired: number;
  unlockedBy: string[];
  timestamp: Timestamp;
}

// ---------------------- PRODUCTS ----------------------
export interface Product {
  name: string;
  type: 'physical' | 'digital';
  priceHVC: number;
  karmaRequired: number;
  sellerUid: string;
  tags: string[];
  timestamp: string;
}

// ---------------------- DREAM AUCTIONS ----------------------
export interface DreamAuction {
  dreamTitle: string;
  winnerUid: string;
  amountBid: number;
  status: 'open' | 'awarded' | 'cancelled';
  timestamp: string;
}

// ---------------------- WORKLOG ----------------------
export interface WorkLog {
  userId: string;
  projectId: string;
  hours: number;
  tasks: string[];
  karmaEarned: number;
  heavenCoinEarned: number;
  timestamp: string;
}

// ---------------------- DAO PROPOSAL ----------------------
export interface DaoProposal {
  title: string;
  description: string;
  proposerId: string;
  votesFor: number;
  votesAgainst: number;
  executed: boolean;
  timestamp: Timestamp;
}

// ---------------------- RAFFLE ----------------------
export interface RaffleTicket {
  userId: string;
  ticketNumber: number;
}

export interface Raffle {
  title: string;
  description: string;
  ticketLimit: number;
  deadline: string;
  status: 'open' | 'closed';
  creatorId: string;
  tickets: RaffleTicket[];
  winner: RaffleTicket;
}

// ---------------------- TRANSACTION ----------------------
export interface Transaction {
  type: string;
  uid: string;
  amount: number;
  timestamp: string;
}

// ---------------------- DAO USER ----------------------
export interface DaoUser {
  karma: number;
  influence: number;
  staked: number;
  joinedAt: string;
}
// ─── Heaven Map ────────────────────────────────────────────────────────────────

export interface HeavenVision {
    visionId: string;
    title: string;
    description: string;
    userId: string;
    region: string;
    timestamp: FirebaseFirestore.Timestamp;
  }
  
  export interface HeavenLeader {
    userId: string;
    influence: number;
    karma: number;
  }

  export interface HeavenMapVision {
    visionId: string;
    userId: string;
    coordinates: { lat: number; lng: number };
    locationName: string;
    tags: string[];
    status: 'seed' | 'growing' | 'ignited';
    upvotes: number;
    comments: number;
    createdAt: any;
  }
  
  // ─── DAO Governance ─────────────────────────────────────────────────────────────
  
  export interface DAO {
    daoId: string;
    name: string;
    creatorId: string;
    description: string;
    totalSupporters: number;
    totalVotes: number;
    status: 'active' | 'frozen' | 'executed';
    createdAt: FirebaseFirestore.Timestamp;
  }
  
  export interface DAOSupporter {
    userId: string;
    karma: number;
    influence: number;
    staked: number;
    joinedAt: FirebaseFirestore.Timestamp;
  }
  
  export interface DAOProposal {
    proposalId: string;
    title: string;
    description: string;
    proposerId: string;
    votesFor: number;
    votesAgainst: number;
    executed: boolean;
    timestamp: FirebaseFirestore.Timestamp;
  }

  // ─── Vision System ─────────────────────────────────────────────────────────────

export interface VisionPin {
    visionId: string;
    userId: string;
    coordinates: { lat: number; lng: number };
    locationName: string;
    tags: string[];
    status: 'seed' | 'growing' | 'ignited';
    upvotes: number;
    comments: number;
    createdAt: string;
  }
  
  export interface VisionTrail {
    userId: string;
    history: Array<{
      text: string;
      timestamp: string;
      location: { city: string; lat: number; lng: number };
      karma: number;
    }>;
  }

  // ─── Mirror Board ──────────────────────────────────────────────────────────────

export interface MirrorBoardPost {
    postId: string;
    userId: string;
    content: string;
    anonymous: boolean;
    tags: string[];
    meTooVotes: number;
    reflectionScore: number;
    createdAt: string;
    threadParent: string | null;
    threadChildren: string[];
  }

  // ================= MODULE: AURA STATE =================
export interface AuraState {
    userId: string;
    lastCleanse: any;
    karmaDelta7d: number;
    dreamAbandonment: number;
    reflectionScore: number;
    recommendation: string;
  }
  
  // ================= MODULE: SACRIFICE SWAPS =================
  export interface SacrificeSwap {
    swapId: string;
    sacrificerId: string;
    recipientId: string;
    karmaDebt: number;
    resolutionType: 'task';
    taskCompleted: boolean;
    approved: boolean;
  }
  
  // ================= MODULE: INTENTION LOGS =================
  export interface IntentionLog {
    timestamp: any;
    intention: string;
    mood: string;
    context: string;
  }
  
  // ================= MODULE: SKILL TREE =================
  export interface UserSkillTree {
    carpentry: number;
    visionLeadership: number;
    healing: number;
    teaching: number;
    housingRehab: number;
  }
  
  // ================= MODULE: VISION TRAILS =================
  export interface VisionTrailEntry {
    text: string;
    timestamp: string;
    location: { city: string; lat: number; lng: number };
    karma: number;
  }
  
  export interface VisionTrail {
    userId: string;
    history: VisionTrailEntry[];
  }
  