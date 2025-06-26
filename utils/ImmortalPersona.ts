// app/state/useImmortalPersona.ts
import { useState, useEffect } from "react";
import { generateImmortalPersona } from "@/lib/mentorAI";

export const useImmortalPersona = (userId: string) => {
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    if (!userId) return;
    generateImmortalPersona(userId).then(setPersona);
  }, [userId]);

  return persona;
};
