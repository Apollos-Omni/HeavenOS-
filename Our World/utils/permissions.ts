// utils/permissions.ts

const ROLE_LEVELS = {
    user: 0,
    moderator: 1,
    admin: 2,
    founder: 3,
  } as const;
  
  type Role = keyof typeof ROLE_LEVELS;
  
  export function canModerate(role: Role): boolean {
    return ROLE_LEVELS[role] >= ROLE_LEVELS['moderator'];
  }
  
  export function canAdmin(role: Role): boolean {
    return ROLE_LEVELS[role] >= ROLE_LEVELS['admin'];
  }
  
  export function isFounder(role: Role): boolean {
    return role === 'founder';
  }
  
  export function getRoleLevel(role: Role): number {
    return ROLE_LEVELS[role];
  }
  