const userService = require('./user.service');

// Simple XP thresholds -> level name. Easy to extend later with real badges.
const LEVELS = [
  { name: 'Beginner', min: 0 },
  { name: 'Learner', min: 20 },
  { name: 'Achiever', min: 50 },
  { name: 'Scholar', min: 100 },
  { name: 'Master', min: 200 },
];

function getLevel(xp) {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.min) current = level;
  }
  return current.name;
}

/**
 * Awards XP to a user and returns info about whether they leveled up,
 * so the caller can send a congratulatory message if so.
 */
async function awardXp(user, amount) {
  const oldXp = user.xp || 0;
  const newXp = oldXp + amount;

  const oldLevel = getLevel(oldXp);
  const newLevel = getLevel(newXp);

  await userService.updateUser(user.phone_number, { xp: newXp });

  return {
    newXp,
    leveledUp: newLevel !== oldLevel,
    newLevel,
  };
}

module.exports = { getLevel, awardXp, LEVELS };