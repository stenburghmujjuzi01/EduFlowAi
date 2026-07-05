const { supabase } = require('../config/supabase');

async function createUser({ phone_number, name }) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ phone_number, name: name || null }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getUserByPhone(phone_number) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('phone_number', phone_number)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function updateUser(phone_number, fields) {
  const { data, error } = await supabase
    .from('users')
    .update(fields)
    .eq('phone_number', phone_number)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Returns the top N users by XP, for the leaderboard command (Module 5.3 Community Features).
 */
async function getLeaderboard(limit = 5) {
  const { data, error } = await supabase
    .from('users')
    .select('name, xp')
    .order('xp', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('name, phone_number, current_topic, current_lesson_number, xp, final_assessment_score, certificate_issued, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

module.exports = { createUser, getUserByPhone, updateUser, getLeaderboard, getAllUsers };