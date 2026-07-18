const { supabase } = require('../config/supabase');

const BADGE_DEFINITIONS = {
  first_steps: { emoji: '🌱', name: 'First Steps', description: 'Completed your first lesson' },
  halfway: { emoji: '📖', name: 'Halfway There', description: 'Reached the midpoint of a course' },
  graduate: { emoji: '🎓', name: 'Course Graduate', description: 'Completed all lessons in a course' },
  perfect_score: { emoji: '💯', name: 'Perfect Score', description: 'Scored 10/10 on a final assessment' },
  certified: { emoji: '📜', name: 'Certified', description: 'Earned a certificate' },
  team_champion: { emoji: '🏆', name: 'Team Champion', description: 'Won a team contest' },
};

async function awardBadge(user_id, code) {
  const { error } = await supabase
    .from('badges')
    .insert([{ user_id, badge_code: code }]);

  if (error) {
    if (error.code === '23505') return false;
    throw error;
  }
  return true;
}

async function getUserBadges(user_id) {
  const { data, error } = await supabase
    .from('badges')
    .select('badge_code, awarded_at')
    .eq('user_id', user_id)
    .order('awarded_at', { ascending: true });

  if (error) throw error;
  return data;
}

module.exports = { BADGE_DEFINITIONS, awardBadge, getUserBadges };