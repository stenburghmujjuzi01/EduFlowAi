const { supabase } = require('../config/supabase');
const badgesService = require('./badges.service');

async function startContest(name) {
  const { data: contest, error: contestErr } = await supabase
    .from('contests')
    .insert([{ name, status: 'active' }])
    .select()
    .single();

  if (contestErr) throw contestErr;

  const { data: members, error: membersErr } = await supabase
    .from('team_members')
    .select('phone_number, team_id, users(xp)');

  if (membersErr) throw membersErr;

  if (members.length) {
    const snapshots = members.map((m) => ({
      contest_id: contest.id,
      phone_number: m.phone_number,
      team_id: m.team_id,
      xp_at_start: m.users?.xp || 0,
    }));

    const { error: snapErr } = await supabase.from('contest_snapshots').insert(snapshots);
    if (snapErr) throw snapErr;
  }

  return contest;
}

async function getActiveContest() {
  const { data, error } = await supabase
    .from('contests')
    .select('*')
    .eq('status', 'active')
    .order('started_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function getContestStandings(contestId) {
  const { data: snapshots, error } = await supabase
    .from('contest_snapshots')
    .select('phone_number, team_id, xp_at_start, users(xp), teams(name)')
    .eq('contest_id', contestId);

  if (error) throw error;

  const teamTotals = {};
  for (const snap of snapshots) {
    const earned = (snap.users?.xp || 0) - snap.xp_at_start;
    if (!teamTotals[snap.team_id]) {
      teamTotals[snap.team_id] = { team_id: snap.team_id, name: snap.teams?.name || 'Unknown', xpEarned: 0 };
    }
    teamTotals[snap.team_id].xpEarned += Math.max(0, earned);
  }

  return Object.values(teamTotals).sort((a, b) => b.xpEarned - a.xpEarned);
}

async function endContest(contestId) {
  const standings = await getContestStandings(contestId);
  const winner = standings[0] || null;

  const { error } = await supabase
    .from('contests')
    .update({
      status: 'ended',
      ended_at: new Date().toISOString(),
      winner_team_id: winner?.team_id || null,
      winner_name: winner?.name || null,
      final_standings: standings,
    })
    .eq('id', contestId);

  if (error) throw error;

  if (winner) {
    const { data: members } = await supabase
      .from('team_members')
      .select('phone_number, users(id)')
      .eq('team_id', winner.team_id);

    for (const m of members || []) {
      if (m.users?.id) {
        await badgesService.awardBadge(m.users.id, 'team_champion');
      }
    }
  }

  return { standings, winner };
}

async function getContestHistory() {
  const { data, error } = await supabase
    .from('contests')
    .select('*')
    .eq('status', 'ended')
    .order('ended_at', { ascending: false });

  if (error) throw error;
  return data;
}

module.exports = { startContest, getActiveContest, getContestStandings, endContest, getContestHistory };