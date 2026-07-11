const { supabase } = require('../config/supabase');

async function createTeam(name, leaderPhone) {
  const { data: team, error: teamErr } = await supabase
    .from('teams')
    .insert([{ name, leader_phone: leaderPhone }])
    .select()
    .single();

  if (teamErr) throw teamErr;

  const { error: memberErr } = await supabase
    .from('team_members')
    .insert([{ team_id: team.id, phone_number: leaderPhone }]);

  if (memberErr) throw memberErr;

  return team;
}

async function addMember(teamId, phoneNumber) {
  const { data, error } = await supabase
    .from('team_members')
    .insert([{ team_id: teamId, phone_number: phoneNumber }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getTeamByLeader(phoneNumber) {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('leader_phone', phoneNumber)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function getTeamByMember(phoneNumber) {
  const { data, error } = await supabase
    .from('team_members')
    .select('team_id, teams(*)')
    .eq('phone_number', phoneNumber)
    .maybeSingle();

  if (error) throw error;
  return data?.teams || null;
}

async function getTeamMembers(teamId) {
  const { data, error } = await supabase
    .from('team_members')
    .select('phone_number, joined_at, users(name, xp)')
    .eq('team_id', teamId);

  if (error) throw error;
  return data.map((row) => ({
    phone_number: row.phone_number,
    joined_at: row.joined_at,
    name: row.users?.name,
    xp: row.users?.xp || 0,
  }));
}

async function getTeamLeaderboard() {
  const { data: teams, error } = await supabase.from('teams').select('id, name, leader_phone');
  if (error) throw error;

  const results = [];
  for (const team of teams) {
    const members = await getTeamMembers(team.id);
    const totalXp = members.reduce((sum, m) => sum + m.xp, 0);
    results.push({ ...team, totalXp, memberCount: members.length });
  }

  results.sort((a, b) => b.totalXp - a.totalXp);
  return results;
}

module.exports = {
  createTeam,
  addMember,
  getTeamByLeader,
  getTeamByMember,
  getTeamMembers,
  getTeamLeaderboard,
};