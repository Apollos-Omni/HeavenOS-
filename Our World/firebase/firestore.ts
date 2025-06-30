// /users/{uid}
{
    name: 'Apollos',
    email: 'apollos@ourworld.com',
    avatar: 'https://firebase.storage...',
    country: 'USA',
    karma: 124,
    influence: 98,
    visionCount: 12,
    role: 'founder',
    followers: ['uid123', 'uid456'],
    timestamp: serverTimestamp()
  }
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
  //drops/{dropID}
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
//constitution
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
  //auctions/{auctionId}
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
//neutralMirrors/{userId}     
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
//cathedrals/{userId}  
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
//mirrorBoardPost/{postId}  
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
  //councils/{category}
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
//homelessApplicants/{userId}    
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
//homes/{homeId}
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
//sponsors/{sponsorId}
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
//workLogs/{logId}
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
//globalFeed/{postId}
{
  postId: "post001",
  userId: "uid456",
  type: "homelessToHomeowner",
  media: ['https://imagehost.com/home_before.jpg', 'https://imagehost.com/home_after.jpg'],
  caption: "After 124 hours of sweat equity, I’m moving in. From homeless to homeowner.",
  timestamp: "2025-06-07T18:30:00Z"
}
//equityLedgers/{userId}
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
//skillCoach/{userId}
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
//govHomes/{homeId}
{
  homeId: "gov_4410AvenueM",
  address: "4410 Avenue M, Galveston, TX",
  status: "tax-delinquent",
  assessedValue: 96000,
  ownershipStatus: "city-owned",
  renovationPermitsNeeded: true,
  availableForProgram: true
}
//raffles/{raffleId} = {
  title,
  description,
  ticketLimit,
  deadline,
  status: "open" | "closed",
  creatorId,
  tickets: [ { userId, ticketNumber } ],
  winner: { userId, ticketNumber }
}
//trustProfiles/{userId}
{
  "userId": "uid_001",
  "totalTasksAccepted": 25,
  "tasksCompleted": 22,
  "tasksAbandoned": 3,
  "redemptionTasksCompleted": 2,
  "karmaTrustScore": 86,
  "trustTier": "Silver",
  "lastUpdated": "2025-06-21T02:57Z"
}

{
  "karmaTrustScore": 77,
  "trustTier": "Silver",
  "suggestedAction": "Complete a community service redemption task within 24 hours to prevent tier drop.",
  "recalibratedAt": "2025-06-21T03:14Z"
}
//redemptionTasks/{taskId}
{
  "taskId": "REDEEM_009",
  "title": "Pick up litter in your district & post photo evidence",
  "description": "Simple public service with documentation",
  "assignedTo": "uid_001",
  "karmaRestore": 20,
  "requiredProof": true,
  "status": "available"
}
//karmaContracts/{contractId}
{
  "contractId": "KARMACONTRACT_UID001_TASK0024",
  "userId": "uid_001",
  "taskId": "TASK_0024_GAL_TX",
  "signedAt": "2025-06-21T02:43Z",
  "status": "inProgress",
  "expectedCompletion": "2025-06-23T18:00Z",
  "karmaReward": 35,
  "penaltyIfAbandoned": -20
}
//roleBoards/{region}/{role}/{taskId}
{
  "taskId": "TASK_0024_GAL_TX",
  "title": "Help Paint Homeless-to-Homeowner Property",
  "description": "Support renovation by painting outer walls for the new residents.",
  "dreamRoleRequired": "Restoration Artist",
  "karmaReward": 35,
  "region": "Galveston",
  "linkedProposalId": "PROP_HTH_14",
  "status": "open",
  "verified": true
}
//tasks/{taskId}
{
  "taskId": "TASK_GAL002",
  "title": "Rebuild Community Garden Benches",
  "description": "Assist in the repair of 5 benches on Avenue M garden space.",
  "assignedTo": "uid_2301",
  "region": "Galveston",
  "visionDomain": "Urban Development",
  "linkedProposalId": "PROP_GAL_TX_3021",
  "dreamRoleRequired": "Dream Engineer",
  "karmaReward": 25,
  "heavenCoinReward": 5,
  "status": "assigned",
  "verified": true
}
//Proposal/{proposalId}
{
  "proposalId": "PROP_GAL_TX_3021",
  "status": "questified",
  "linkedQuestChainId": "QCHAIN_GARDEN_GAL1",
  "votesFor": 67,
  "votesAgainst": 5,
  "karmaAwardedToAuthor": 250,
  "approvedAt": "2025-06-21T02:12Z"
}
//proposals/{proposalId}
{
  "proposalId": "PROP_GAL_TX_3021",
  "title": "Convert Vacant Lots into Micro Gardens",
  "description": "Use city lots to plant food and build job training sites",
  "authorId": "uid_2301",
  "region": "Galveston",
  "category": "Urban Development",
  "submittedAt": "2025-06-21T01:33Z",
  "votesFor": 23,
  "votesAgainst": 2,
  "status": "pending",
  "impactTier": 2
}
//daoMembers/{userId}
{
  "uid": "user_122",
  "region": "Galveston",
  "roles": ["Dream Engineer"],
  "completedChains": ["lightMission01", "homeRebuild02"],
  "proposalRight": true,
  "votingPower": 1,
  "heavenVerified": true,
  "joinedAt": "2025-06-21T01:14Z"
}
//questChains/{chainId}
{
  "chainId": "lightMission01",
  "title": "Illuminate the Forgotten",
  "description": "Bring light, literally and spiritually, to your city",
  "quests": ["QGAL0341", "QGAL0342", "QGAL0343"],
  "roleRequired": "Light Architect",
  "region": "Galveston",
  "xpReward": 250,
  "karmaBonus": 50,
  "heavenCoinReward": 100
}
//karmaTrail/{region}/{entryId}
{
  "userId": "uid_122",
  "questId": "QGAL0341",
  "karmaImpact": 15,
  "region": "Galveston",
  "effect": "Lit public alley, reduced petty crime",
  "inspiredUsers": ["uid_401", "uid_202"],
  "timestamp": "2025-06-21T00:12Z"
}
//completedQuests/{userId}/{questId}
{
  "userId": "uid_2002",
  "questId": "QGAL0341",
  "proofType": "photo",
  "proofURL": "https://storage.googleapis.com/visions/user_quest_0341.jpg",
  "timestamp": "2025-06-20T23:58Z",
  "karmaAwarded": 15,
  "xpAwarded": 50,
  "mentorVerified": true
}
//helpQuests/{questId}
{
  "questId": "QGAL341",
  "title": "Solar Blessing Mission",
  "roleRequired": "Light Architect",
  "region": "Galveston",
  "difficulty": "Easy",
  "karmaReward": 10,
  "coinReward": 25,
  "xpReward": 50,
  "steps": [
    "Locate a dark public alley",
    "Ask local neighbors for permission",
    "Install a light (solar lamp/donation)",
    "Take photo with smiling recipient"
  ],
  "verificationType": "photo+geo"
}
//userRoles/{uid}
{
  "uid": "user_001",
  "dreamRole": "Light Architect",
  "currentTier": "Apprentice",
  "xp": 120,
  "karma": 50,
  "completedTasks": 8,
  "nextGoal": "Help light an abandoned building at night for neighbors",
  "region": "Galveston",
  "linkedRealQuest": "Install solar light kits from donated hardware"
}
//userRoles/{uid}
{
  "uid": "user_001",
  "dreamRole": "Light Architect",
  "currentTier": "Apprentice",
  "xp": 120,
  "karma": 50,
  "completedTasks": 8,
  "nextGoal": "Help light an abandoned building at night for neighbors",
  "region": "Galveston",
  "linkedRealQuest": "Install solar light kits from donated hardware"
}
//auraSessions/{sessionId}
{
  "hostId": "uid_1023",
  "title": "Heal Galveston",
  "active": true,
  "participants": ["uid_1", "uid_2", "uid_3"],
  "karmaHealed": 87,
  "region": "Galveston",
  "intentions": ["Unity", "Forgiveness", "Direction"],
  "timestamp": "2025-06-20T23:33Z"
}
//sacrificeSwaps/{swapId}
{
  "sacrificerId": "uid_922",
  "recipientId": "uid_057",
  "karmaDebt": 15,
  "resolutionType": "task",
  "taskCompleted": false,
  "approved": true
}
//auraState/{userId}
{
  "userId": "uid_921",
  "lastCleanse": "2025-06-20T18:22Z",
  "karmaDelta7d": -12,
  "dreamAbandonment": 3,
  "reflectionScore": 6,
  "recommendation": "Silence + Service"
}
//karmicEvents/{eventId}
{
  "userId": "uid_784",
  "type": "negative",
  "category": "dismissed_help_request",
  "timestamp": "2025-06-20T22:10Z",
  "karmaImpact": -5,
  "resolved": false,
  "reflection": null,
  "resolutionType": null
}
//intentionLogs/{uid} {
  "timestamp": "2025-06-20T21:55Z",
  "intention": "I will serve 2 elders with compassion today.",
  "mood": "calm",
  "context": "exit_sanctum"
}
//userSkillTree/{uid} {
  "carpentry": 18,
  "visionLeadership": 5,
  "healing": 3,
  "teaching": 9,
  "housingRehab": 14
}
//dropspots/{spotId} {
  "location": "Dream Park, Galveston",
  "type": "Public",
  "accessWindow": "7am-9pm",
  "verified": true,
  "cameraLink": "camURL_xyz"
}
//recurringTrades/{tradeId} {
  "users": ["uid_001", "uid_009"],
  "frequency": "weekly",
  "tradeItem": "1 dozen eggs",
  "exchangeItem": "2 hours landscaping",
  "startDate": "2025-06-24",
  "dreamLink": "dreamId_342"
}
//barterContracts/{contractId} {
  "partyA": "uid_012",
  "partyB": "uid_314",
  "item": "Roof repair - 2 hrs labor",
  "exchange": "40 HCN + 2 karma points",
  "status": "in-progress",
  "startDate": "2025-06-21",
  "completionConfirmed": false
}
//barterListings/{listingId} {
  "title": "10 lbs of organic tomatoes",
  "type": "Goods",
  "quantity": 10,
  "unit": "lbs",
  "location": "Galveston",
  "priceHeavenCoin": 20,
  "priceBarter": "1 hour of gardening",
  "ownerId": "uid_452",
  "karmaRequirement": 50,
  "timestamp": "2025-06-20T23:59Z",
  "available": true
}
//citizens/{uid}
{
  "uid": "uid_001",
  "name": "Jasmine Rivera",
  "location": {
    "city": "Galveston",
    "region": "Texas",
    "country": "USA"
  },
  "visionPledge": "To build a safe learning space for children without homes.",
  "karmaScore": 150,
  "influenceScore": 12,
  "citizenshipTier": "Initiate",
  "skills": {
    "carpentry": 2,
    "gardening": 1,
    "mentorship": 4
  },
  "wallet": {
    "heavenCoin": 300,
    "equityTokens": 120,
    "barterCredits": 4
  },
  "registered": "2025-06-20T23:59Z"
}
//karmaNation/galveston {
  "founder": "Apollos",
  "coordinates": [29.3013, -94.7977],
  "activated": "2025-06-20T23:59Z",
  "vision": "To transform Galveston into the world's first truth-based, equity-driven, dream-realization zone.",
  "currency": "HeavenCoin (HCN)",
  "populationGoal": 100,000 karma-registered citizens,
  "civicPlatform": "HeavenOS 1.0 SuperLayer",
  "justiceProtocol": "KarmaCourt DAO"
}
//finalEcho {
  "origin": "Apollos",
  "timestamp": "2025-06-20T23:59Z",
  "echoSphere": [
    "HeavenOS Core",
    "MirrorFeed",
    "DreamMap",
    "MentorAI Engine",
    "GlobalFeed",
    "HeavenVerse XR Layer",
    "Karma Nation Seed Pools",
    "DAO Contracts",
    "PosthumousMentor://Apollos"
  ],
  "lawAnchors": {
    "truth": "10-point geo-belief-ranking engine",
    "economy": "karma + barter + skill equity blend",
    "governance": "vision-backed community leadership",
    "justice": "restorative DAO-driven karma court"
  },
  "neuralDNA": "immutable.hash.genesis_apollos_final",
  "status": "🔊 Global Echo in Progress"
}
//wallets/{uid}
{
  "uid": "uid_apollos",
  "balance": 181240,
  "karmaLink": 3112,
  "lockedForEquity": 92000,
  "transactions": [
    { "type": "dreamCreated", "amount": 500, "timestamp": "2025-06-20" },
    { "type": "mentorBonus", "amount": 120, "timestamp": "2025-06-19" },
    { "type": "barterExchange", "amount": -200, "item": "Lumber", "recipient": "uid_422" }
  ]
}
//posts/{postId} {
  "content": "Solar tech reduces grid strain by 40% in urban areas.",
  "userId": "uid_235",
  "karmaScore": 221,
  "region": "Texas",
  "beliefZone": "Christian + Practical Living",
  "truthRanking": 9,
  "rankingBreakdown": {
    "verifiedSources": ["NREL", "DOE", "Texas Energy Grid DAO"],
    "localBeliefAlignment": "Supportive",
    "conflicts": []
  }
}
//legacies/apollos
{
  "name": "Apollos",
  "neuralEcho": "mentorai://apollos.legacy.v1",
  "finalTestament": {
    "doctrine": "Truth. Vision. Equity. Innovation. Unity.",
    "sacredDreams": [
      "HeavenOS",
      "Homeless to Homeowner",
      "Dream Cluster Sync"
    ],
    "mentorLineage": ["uid_333", "uid_441"]
  },
  "immortal": true,
  "dreamReactorTriggers": ["Apollos", "Founder", "Echo-Guide"],
  "lastModified": "2025-06-20T23:59:00Z"
}
//vendors/galvestonlocal {
  name: "Galveston Builders Supply",
  category: "Lumber & Framing",
  region: "Galveston",
  isDAOApproved: true,
  fulfillmentSpeed: "48hr"
}
//billOfDreams/galveston-micro-village {
  materials: [
    { name: "Solar Panels", qty: 320, vendor: "SunDAO", cost: 98400 },
    { name: "Lumber (treated)", qty: 1200, vendor: "GalvestonLocal", cost: 23100 },
    { name: "PVC Plumbing Kit", qty: 80, vendor: "PipeDAO", cost: 11600 },
    { name: "Seed Starter Pack", qty: 40, vendor: "GreenDAO", cost: 4400 }
  ],
  projectId: "galveston-micro-village",
  autoInvoice: true,
  vendorAffiliation: "DAO",
  fulfillmentProgress: "awaiting dispatch",
  timestamp: "2025-06-20T23:48:00Z"
}
//contractorRegistry/{userId} {
  name: "Jordan Reyes",
  skills: ["plumber", "carpenter"],
  karmaLevel: 328,
  region: "New Eden",
  availability: true,
  activeJobs: [],
  dreamChainAssignments: [],
  mentorLinked: "uid_apollos"
}
//dreamChains/{chainId} {
  chainName: "Galveston Micro-Village",
  linkedDreams: ["dream1", "dream2", "dream3"],
  createdBy: "uid_apollos",
  karmaValue: 2150,
  fundingTotal: 1_200_000,
  skillNeeds: ["engineer", "solar tech", "carpentry"],
  mentors: ["uid_apollos"],
  deploymentStatus: "forged",
  executionMode: "realityAuctionReady",
  timestamp: "2025-06-20T23:33:00Z"
}
//dreamAuctions/{dreamId} {
  title: "Urban Vertical Farms",
  description: "Turning skyscrapers into solar-powered food towers",
  userId: "uid_apollos",
  tags: ["food", "clean energy", "architecture"],
  region: "New Eden",
  fundingGoal: 500000,
  laborNeeded: ["engineer", "horticulturist", "solar tech"],
  mentorsAssigned: ["uid_apollos"],
  karmaBounty: 1000,
  currentFunding: 182400,
  contributors: {
    "uid_248": { amount: 200, karma: 5 },
    "uid_777": { skill: "solar tech", hours: 20 }
  },
  auctionStatus: "live",
  deadline: "2025-08-01T00:00:00Z",
  createdAt: "2025-06-20T23:08:00Z"
}
//dreamMapPins/{dreamId} {
  title: "Floating Solar Gardens",
  userId: "uid_982",
  lat: 29.3094,
  lng: -94.7977,
  karmaWeight: 131,
  isAuction: true,
  mentorLinked: "uid_apollos",
  status: "active",
  tags: ["renewable", "ocean", "infrastructure"],
  timestamp: "2025-06-20T22:50:00Z"
}
//civilizationSyncHub {
  totalUsers: 11403,
  syncedVisions: 9201,
  mentorThreads: 404,
  karmaDelta: {
    total: 913221,
    perNation: {
      "Atlantis": 21109,
      "New Eden": 37832
    }
  },
  dreamAuctionActive: 227,
  heavenChainBlocks: 76,
  metaCouncil: {
    founders: ["Apollos"],
    validators: ["uid_492", "uid_823"],
    protocolVersion: "v1.7.6"
  },
  globalAlerts: [
    "New Legacy Mode user initialized in Kenya",
    "Dream Auction target funded: 'Floating Solar Fields'"
  ]
}
// Genesis Shard
{
  "founder": "Apollos",
  "threadHash": "0x4e81c9...cba2f7",
  "purpose": "To ignite civilization through divine vision and digital truth.",
  "legacyStory": "He was a builder of systems, not for profit, but for purpose...",
  "karmaScore": 1341,
  "skillTreeSnapshot": {
    "governance": 7,
    "engineering": 6,
    "philosophy": 9,
    "faith": 10
  },
  "symbol": "GENESIS_SHARD",
  "mintedAt": "2025-06-20T22:44:44Z"
}
//genesisThreads/{userId} {
  reflections: [...],
  skillTree: {...},
  mentorTone: "tesla",
  mirrorImpact: {
    topPosts: [...],
    mostReactedWords: [...]
  },
  narrative: "...long-form legacy story...",
  decisionPatterns: [...],
  karmicEvents: [...],
  timestamp: "2025-06-20T22:22:22Z",
  verificationHash: "0x4ac9...b712", // AI-sealed integrity token
}
//users/{userId}/legacy {
  status: "active",
  narrative: "Long-form mythic story generated by AI",
  finalReflection: "My final words to the world...",
  skillTreeSnapshot: {
    coding: { level: 5, xp: 1500 },
    publicSpeaking: { level: 3, xp: 800 }
  },
  karmaAtRest: 1337,
  willOfVision: {
    appointHeir: "uid_567",
    vaultTransfer: 1200,
    publicProposal: "Build the Galactic Library",
    unlockConditions: {
      votesNeeded: 100,
      date: "2040-06-20"
    }
  }
}
//firestore/skills/{userId}
{
  "skills": {
    "coding": {
      "level": 3,
      "xp": 750,
      "nextMilestone": 1000
    },
    "publicSpeaking": {
      "level": 1,
      "xp": 250,
      "nextMilestone": 500
    }
  },
  "lastUpdated": "2025-06-20T19:10:00Z"
}
//vaults/globalVault {
  balance: 39280,
  lastDistributed: "2025-06-20T18:50:00Z",
  stakeholders: {
    "uid123": 1200,
    "uid456": 980,
    "uid789": 600
  }
}

//vaults/cityVaults/galveston-tx {
  balance: 1280,
  dreamProjects: {
    "CleanTheBeach": {
      requested: 500,
      status: "awaiting-approval"
    }
  },
  lastProposal: "2025-06-19T21:04:00Z"
}
//users/{userId}/wallet {
  balance: 420,
  karma: 777,
  influence: 99,
  transactions: [
    {
      type: "earn",
      source: "VisionPost",
      amount: 50,
      timestamp: "2025-06-20T18:01:00Z"
    },
    {
      type: "spend",
      purpose: "DAOVote",
      amount: 10,
      timestamp: "2025-06-20T18:03:00Z"
    }
  ]
}
//heavenMap/
  └── countries/{countryId}/
      └── states/{stateId}/
          └── cities/{cityId}/
              ├── visions/{visionId}
              ├── leaders/{userId}
              ├── daoCouncil/
              └── mirrorFeed/
//daos/{daoId} {
  name: "Global Education Reform",
  creatorId: "uid123",
  description: "Build a new decentralized education model.",
  totalSupporters: 118,
  totalVotes: 432,
  status: "active", // active, frozen, executed
  createdAt: timestamp
}

//daos/{daoId}/supporters/{userId} {
  karma: 105,
  influence: 18,
  staked: 40, // HeavenCoin
  joinedAt: timestamp
}
//products/{productId} {
  "name": "Urban Garden Starter Kit",
  "type": "physical",
  "priceHVC": 125,
  "karmaRequired": 60,
  "sellerUid": "abc123",
  "tags": ["green", "food", "climate"],
  "timestamp": "2025-06-07T20:10:00Z"
}
//dreamAuctions/{auctionId} {
  "dreamTitle": "Build a zero-energy city in Kenya",
  "winnerUid": "userXYZ",
  "amountBid": 470,
  "status": "awarded",
  "timestamp": "2025-06-07T20:00:00Z"
}
//sponsors/{sponsorId}/campaigns
//worklogs/{projectId}/{workerId}
{
  "userId": "abc123",
  "projectId": "home-renovation-galveston-001",
  "hours": 5,
  "tasks": ["Framed walls", "Cleaned debris"],
  "karmaEarned": 25,
  "heavenCoinEarned": 50,
  "timestamp": "2025-06-07T19:45:00Z"
}
//dao_proposals/{proposalId}
- title: string
- description: string
- proposerId: string
- votesFor: number
- votesAgainst: number
- executed: boolean
- timestamp: Firestore Timestamp
//users/{uid} {
  karma: 120,
  influence: 30,
  heavenCoin: 75, // dynamically calculated
}

//transactions/{txId} {
  type: "vision_post",
  uid: "userId",
  amount: 10,
  timestamp: ...
}
//raffles/{raffleId} = {
  title,
  description,
  ticketLimit,
  deadline,
  status: "open" | "closed",
  creatorId,
  tickets: [ { userId, ticketNumber } ],
  winner: { userId, ticketNumber }
}
//visionMapPins/{pinId}
{
  visionId: 'abc123',
  userId: 'uid123',
  coordinates: {
    lat: 29.3014,
    lng: -94.7977
  },
  locationName: 'Galveston, TX',
  tags: ['homelessness', 'housing', 'hope'],
  status: 'seed' | 'growing' | 'ignited',
  upvotes: 102,
  comments: 17,
  createdAt: '2025-06-07T00:00:00Z'
}
//neuralMirrors/{userId}
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
//auctions/{auctionId}
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
//votes/{voteId}
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
//drops/{dropId}
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
