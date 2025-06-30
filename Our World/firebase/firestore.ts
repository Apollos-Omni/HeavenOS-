// /users/{uid}
// Example user document structure:
// {
//     name: 'Apollos',
//     email: 'apollos@ourworld.com',
//     avatar: 'https://firebase.storage...',
//     country: 'USA',
//     karma: 124,
//     influence: 98,
//     visionCount: 12,
//     role: 'founder',
//     followers: ['uid123', 'uid456'],
//     timestamp: serverTimestamp()
// }

// /visionTrails/{userId}
{
    history: [
      {
        text: 'End plastic waste in Galveston',
        timestamp: '2025-06-01T14:32:00Z',
        location: { city: 'Galveston', lat: 29.3013, lng: -94.7977 },
        karma: 12,
      },
      {
        text: 'Make biodegradable packaging global',
        timestamp: '2025-06-15T09:12:00Z',
        location: { city: 'Houston', lat: 29.7604, lng: -95.3698 },
        karma: 30,
      }
    ]
  }
// /comments/{visionId}/{commentId}
{
    userId: 'abc123',
    text: 'I support this fully!',
    timestamp: serverTimestamp(),
    karma: 3
  }
  /drops/{dropID}
  {
    userId: 'user123',
    text: 'I wish I told you I loved you before you moved.',
    isAnonymous: true,
    location: { lat: 34.0522, lng: -118.2437 },
    geohash: '9q5ctr2k',
    karmaRequired: 10,
    unlockedBy: ['uid456'],
    timestamp: serverTimestamp()
  }
/constitution
{
    preamble: "We, the people of Our World...",
    articles: [
      {
        title: "I. Freedom of Vision",
        body: "Every user shall have the right to post visions without censorship, unless violating hate speech or proven misinformation."
      },
      {
        title: "II. Transparent Karma Economy",
        body: "All karma calculations shall be publicly auditable and immutable. Karma fraud is grounds for account freeze."
      },
      {
        title: "III. Vision Ownership",
        body: "Users retain full IP ownership of their visions unless sold through Dream Auctions."
      }
    ],
    amendments: [
      {
        title: "Amendment 1: Vision Moderation Clarity",
        proposedBy: "user123",
        status: "proposed",
        votesFor: 202,
        votesAgainst: 17,
        createdAt: '2025-06-07T00:00:00Z'
      }
    ]
  }
  {
    contextType: "amendment" | "vision" | "election" | "trial",
    contextId: "xyz123",
    createdBy: "uid456",
    title: "Should we adopt Amendment 2: Vision Privacy?",
    description: "This amendment would...",
    choices: ["Yes", "No", "Abstain"],
    votes: {
      "uid123": { choice: "Yes", weight: 129 },
      "uid789": { choice: "No", weight: 42 }
    },
    totalVotes: {
      Yes: 129,
      No: 42,
      Abstain: 0
    },
    expiresAt: "2025-06-14T00:00:00Z"
  }
  /auctions/{auctionId}
  {
    visionId: 'xyz456',
    ownerId: 'uid123',
    auctionType: 'partner' | 'donate' | 'ip-sale',
    startingPrice: 0,
    currentHighestBid: {
      amount: 500,
      bidderId: 'uid999'
    },
    bidHistory: [
      { bidderId: 'uid888', amount: 200, timestamp: '...' },
      { bidderId: 'uid999', amount: 500, timestamp: '...' }
    ],
    karmaBackers: ['uid321', 'uid222'],
    expiration: '2025-06-14T00:00:00Z',
    status: 'active' | 'closed'
  }
/neutralMirrors/{userId}
{
    ownerId: 'uid123',
    memoryThreads: [
      {
        title: 'Why I Believe in Earth Unity',
        type: 'vision',
        summary: 'Your original post on unity + 5 key updates + top user questions you answered',
        lastUpdated: '2025-06-07T00:00:00Z'
      },
      {
        title: 'Legacy Message',
        type: 'audio',
        url: 'https://cloudcathedral/uid123/finalmsg.mp3'
      }
    ],
    aiReflection: "You're a visionary focused on global connection and ethics-first tech...",
    posthumousEnabled: true,
    continuationMode: 'adaptiveGPT',
    lastSynced: '2025-06-07T12:00:00Z'
  }
/cathedrals/{userId}
{
    ownerId: 'uid123',
    heavenModules: ['karma', 'coach', 'mirror', 'vision'],
    syncedVisions: ['abc123', 'def456'],
    mirrorSyncEnabled: true,
    lastBackup: '2025-06-07T08:23:00Z',
    legacyCapsuleLink: 'https://ourworld.cloud/uid123/capsule.zip',
    aiChannels: {
      'GPT-Sage': 'active',
      'HeavenOS-Guide': 'learning',
      'NeuralMirror': 'syncing'
    }
  }
/mirrorBoardPost/{postId}
{
    userId: 'uid123',
    content: "Sometimes I feel like I’m building something no one understands...",
    anonymous: true,
    tags: ['isolation', 'visionary', 'lateNightThoughts'],
    meTooVotes: 42,
    reflectionScore: 87, // Out of 100
    createdAt: '2025-06-07T04:20:00Z',
    threadParent: null,
    threadChildren: []
  }
  /councils/{category}
  {
    category: "housing",
    currentLeaderId: "uid456",
    leaderboard: [
      { userId: "uid123", karma: 98 },
      { userId: "uid789", karma: 91 }
    ],
    electionStatus: "active",
    termEnd: "2025-07-07T00:00:00Z",
    followers: 3087,
    proposals: ['home_for_all', 'tinyhome_reform']
  }
/homelessApplicants/{userId}
{
  userId: 'uid456',
  name: 'John Doe',
  currentStatus: 'unsheltered',
  skills: ['painting', 'landscaping'],
  profilePhoto: '',
  hoursWorked: 124,
  homeIdAssigned: 'home789',
  progressStatus: 'renovating'
}
/homes/{homeId}
{
  address: '4410 Avenue M, Galveston, TX',
  condition: 'vandalized',
  assignedUsers: ['uid456'],
  status: 'in-progress',
  estimatedValue: 94000,
  equityEarned: {
    'uid456': 5400
  },
  repairTasks: [
    { taskId: 'task01', title: 'Paint walls', status: 'complete' },
    { taskId: 'task02', title: 'Install plumbing', status: 'pending' }
  ]
}
/sponsors/{sponsorId}
{
  sponsorId: "sponsor_001",
  name: "Galveston Hardware Co.",
  type: "business",
  contributionType: ["materials", "labor"],
  donations: [
    { type: "paint", value: 200, taskId: "task_007" }
  ],
  supportedHomes: ["home001", "home004"],
  website: "https://galvestonhardware.com",
  taxReceiptsEnabled: true
}
/workLogs/{logId}
{
  logId: "log123",
  userId: "uid456",
  homeId: "home001",
  taskId: "task_009",
  hoursWorked: 5,
  timestamp: "2025-06-07T14:00:00Z",
  photoEvidence: ['https://.../proof1.jpg'],
  verifiedBy: "sponsor_001"
}
/globalFeed/{postId}
{
  postId: "post001",
  userId: "uid456",
  type: "homelessToHomeowner",
  media: ['https://imagehost.com/home_before.jpg', 'https://imagehost.com/home_after.jpg'],
  caption: "After 124 hours of sweat equity, I’m moving in. From homeless to homeowner.",
  timestamp: "2025-06-07T18:30:00Z"
}
/equityLedgers/{userId}
{
  userId: "uid456",
  totalHours: 146,
  hourlyRateValue: 35, // Based on avg. labor & materials donated
  totalEquityValue: 5110,
  milestoneProgress: [
    { label: "First 40 hours", achieved: true },
    { label: "Halfway Home", achieved: true },
    { label: "Full Ownership", achieved: false }
  ]
}
/skillCoach/{userId}
{
  userId: "uid456",
  skills: {
    painting: 4,
    drywall: 2,
    electrical: 1
  },
  recommendedNext: ['plumbing basics', 'roof patching'],
  tutorialsCompleted: ['introPainting.mp4', 'paintFinishing.mp4'],
  badges: ['Level 2 Painter']
}
/govHomes/{homeId}
{
  homeId: "gov_4410AvenueM",
  address: "4410 Avenue M, Galveston, TX",
  status: "tax-delinquent",
  assessedValue: 96000,
  ownershipStatus: "city-owned",
  renovationPermitsNeeded: true,
  availableForProgram: true
}
/raffles/{raffleId} = {
  title,
  description,
  ticketLimit,
  deadline,
  status: "open" | "closed",
  creatorId,
  tickets: [ { userId, ticketNumber } ],
  winner: { userId, ticketNumber }
}