// utils/emotionInterpreter.ts

type Emotion = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'black' | 'white';

export function emotionInterpreter(color: Emotion): string {
  const emotionMap: Record<Emotion, string> = {
    red: 'Passion Quest: Lead or initiate a bold vision.',
    blue: 'Calm Quest: Mentor someone with gentle guidance.',
    green: 'Growth Quest: Learn or teach a life-skill.',
    yellow: 'Joy Quest: Brighten someone’s day in a meaningful way.',
    purple: 'Spiritual Quest: Reflect or meditate, then share insight.',
    black: 'Shadow Quest: Heal a broken trust, face an inner truth.',
    white: 'Unity Quest: Connect people, build bridges.',
  };

  return emotionMap[color] || 'Undefined Emotion — draw again.';
}
