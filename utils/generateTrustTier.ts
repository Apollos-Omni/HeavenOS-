// utils/generateTrustTier.ts

export function generateTrustTier(karmaScore: number): string {
    if (karmaScore >= 1000) return 'Diamond';
    if (karmaScore >= 500) return 'Platinum';
    if (karmaScore >= 200) return 'Gold';
    if (karmaScore >= 100) return 'Silver';
    return 'Bronze';
  }
  