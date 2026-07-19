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

async function resetUserProgress(phone_number) {
  return updateUser(phone_number, {
    current_topic: null,
    current_lesson_number: 0,
    skill_level: null,
    placement_question: null,
    final_assessment_question: null,
    final_assessment_score: null,
    certificate_issued: false,
  });
}

async function setUserXp(phone_number, xp) {
  return updateUser(phone_number, { xp });
}

async function deleteUser(phone_number) {
  const { data: ledTeam } = await supabase
    .from('teams')
    .select('id, name')
    .eq('leader_phone', phone_number)
    .maybeSingle();

  if (ledTeam) {
    const err = new Error(`This user leads the team "${ledTeam.name}". Delete that team first.`);
    err.code = 'IS_TEAM_LEADER';
    throw err;
  }

  await supabase.from('contest_snapshots').delete().eq('phone_number', phone_number);
  await supabase.from('team_members').delete().eq('phone_number', phone_number);

  const { error } = await supabase.from('users').delete().eq('phone_number', phone_number);
  if (error) throw error;
}

async function getUserByAuthId(auth_user_id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', auth_user_id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function linkAuthToPhone(auth_user_id, phone_number) {
  const existing = await getUserByPhone(phone_number);

  if (existing) {
    if (existing.auth_user_id && existing.auth_user_id !== auth_user_id) {
      const err = new Error('This phone number is already linked to a different account.');
      err.code = 'ALREADY_LINKED';
      throw err;
    }
    return updateUser(phone_number, { auth_user_id });
  }

  const { data, error } = await supabase
    .from('users')
    .insert([{ phone_number, auth_user_id }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

module.exports = {
  createUser,
  getUserByPhone,
  updateUser,
  getLeaderboard,
  getAllUsers,
  resetUserProgress,
  setUserXp,
  deleteUser,
  getUserByAuthId,
  linkAuthToPhone,
};