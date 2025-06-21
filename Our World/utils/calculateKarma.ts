// utils/calculateKarma.ts

interface KarmaInput {
    taskType: 'vision' | 'help' | 'donation' | 'completion';
    impactLevel: number; // 1 - 10
    trustDelta: number;  // -5 to +5
  }
  
  export function calculateKarma({ taskType, impactLevel, trustDelta }: KarmaInput): number {
    const base = {
      vision: 10,
      help: 20,
      donation: 30,
      completion: 15,
    }[taskType] || 5;
  
    const total = base + impactLevel * 2 + trustDelta * 3;
    return Math.max(0, total);
  }
  