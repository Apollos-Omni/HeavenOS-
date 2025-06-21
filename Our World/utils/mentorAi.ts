export const getMentorGuidance = (role: string, questStage: number) => {
    const guides = {
      dreamEngineer: [
        "Dreams aren’t ideas — they’re blueprints. Start by solving one small pain in your street.",
        "Is this task scalable? Would your idea work for others in your area? Prototype small.",
        "Invite one more mind. Every great system is co-engineered.",
      ],
      peaceKnight: [
        "Peace starts with presence. How have you defused tension with listening?",
        "Where’s the loudest silence in your neighborhood? That’s your call to act.",
        "Bring unity through a local story. Find it, share it, build from it.",
      ],
      healerOfStreets: [
        "You’re not fixing people — you’re reminding them they matter. Start there.",
        "Who do you avoid walking past? Heal starts with facing that truth.",
        "Build a safe space, even if it’s temporary. That’s a temple in disguise.",
      ],
    };
  
    return guides[role]?.[questStage] || "Keep walking. The path opens as you move.";
  };
  