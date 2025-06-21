/**
 * Calculates the user's Karma Trust Score.
 * @param completed - Number of completed tasks
 * @param abandoned - Number of abandoned tasks
 * @param redemption - Number of redemption tasks completed
 * @returns A score from 0 to 100
 */
export const calculateKarmaTrustScore = (
    completed: number,
    abandoned: number,
    redemption: number
  ): number => {
    const total = completed + abandoned || 1;
    const baseScore = (completed / total) * 100;
    const bonus = redemption * 5;
    return Math.min(100, Math.round(baseScore + bonus));
  };
  
  /**
   * Determines the trust tier based on Karma Trust Score.
   * @param score - Trust score (0 to 100)
   * @returns The trust tier as a string
   */
  export const determineTrustTier = (score: number): 'Platinum' | 'Gold' | 'Silver' | 'Bronze' => {
    if (score >= 95) return 'Platinum';
    if (score >= 85) return 'Gold';
    if (score >= 70) return 'Silver';
    return 'Bronze';
  };
  