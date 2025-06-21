interface Task {
  id: string;
  title: string;
  region: string;
  dreamRoleRequired: string;
  verified: boolean;
  [key: string]: any; // Future-proof for extra fields
}

interface UserProfile {
  uid: string;
  region: string;
  dreamRole: string;
  [key: string]: any;
}

/**
 * Filters and returns tasks that match a user's region and dream role.
 * @param tasks - An array of task objects
 * @param user - The user profile to match against
 * @returns Filtered list of matching tasks
 */
export const matchTasksToUser = (
  tasks: Task[],
  user: UserProfile
): Task[] => {
  if (!tasks || !user) return [];

  return tasks.filter(
    (task) =>
      task.verified === true &&
      task.region === user.region &&
      task.dreamRoleRequired === user.dreamRole
  );
};
