// Firestore Database Structure Documentation
// This file contains example document structures for each collection

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
// {
//     history: [
//       {
//         text: 'End plastic waste in Galveston',
//         timestamp: '2025-06-01T14:32:00Z',
//         location: { city: 'Galveston', lat: 29.3013, lng: -94.7977 },
//         karma: 12,
//       },
//       {
//         text: 'Make biodegradable packaging global',
//         timestamp: '2025-06-15T09:12:00Z',
//         location: { city: 'Houston', lat: 29.7604, lng: -95.3698 },
//         karma: 30,
//       }
//     ]
// }

// /comments/{visionId}/{commentId}
// {
//     userId: 'abc123',
//     text: 'I support this fully!',
//     timestamp: serverTimestamp(),
//     karma: 3
// }

// /drops/{dropID}
// {
//     userId: 'user123',
//     text: 'I wish I told you I loved you before you moved.',
//     isAnonymous: true,
//     location: { lat: 34.0522, lng: -118.2437 },
//     geohash: '9q5ctr2k',
//     karmaRequired: 10,
//     unlockedBy: ['uid456'],
//     timestamp: serverTimestamp()
// }

// /constitution
// {
//     preamble: "We, the people of Our World...",
//     articles: [
//       {
//         title: "I. Freedom of Vision",
//         body: "Every user shall have the right to post visions without censorship, unless violating hate speech or proven misinformation."
//       },
//       {
//         title: "II. Transparent Karma Economy",
//         body: "All karma calculations shall be publicly auditable and immutable. Karma fraud is grounds for account freeze."
//       },
//       {
//         title: "III. Vision Ownership",
//         body: "Users retain full IP ownership of their visions unless sold through Dream Auctions."
//       }
//     ],
//     amendments: [
//       {
//         title: "Amendment 1: Vision Moderation Clarity",
//         proposedBy: "user123",
//         status: "proposed",
//         votesFor: 202,
//         votesAgainst: 17,
//         createdAt: '2025-06-07T00:00:00Z'
//       }
//     ]
// }

// Export empty object to make this a valid TypeScript module
export {};
