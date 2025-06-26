import React, { useEffect, useState } from 'react';

type CoachData = {
  goals: string[];
  skills: string[];
  progress: number;
};

interface Props {
  uid: string;
}

export default function GenesisCoach({ uid }: Props) {
  const [coachData, setCoachData] = useState<CoachData | null>(null);

  useEffect(() => {
    async function fetchCoach() {
      // Fetch from AI backend or Firestore path `/coaches/{uid}`
      const res = await fetch(`/api/coaches/${uid}`);
      const data = await res.json();
      setCoachData(data);
    }
    fetchCoach();
  }, [uid]);

  if (!coachData) return <p>Loading coach data...</p>;

  return (
    <div className="genesis-coach">
      <h2>Your Genesis Coach</h2>
      <h3>Goals</h3>
      <ul>{coachData.goals.map((g, i) => <li key={i}>{g}</li>)}</ul>
      <h3>Skills</h3>
      <ul>{coachData.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
      <p>Progress: {coachData.progress}%</p>
    </div>
  );
}
