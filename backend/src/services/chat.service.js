const { supabase } = require('../config/supabase');

const HISTORY_LIMIT = 20;
const MODE_HISTORY_LIMIT = 50;

// Session markers are stored as ordinary role:'user' rows (a role value we
// know is always valid) with content prefixed by this invisible-character
// tag, rather than introducing a new 'role' value that might not be allowed
// by a CHECK constraint on the chat_messages table. Real user messages will
// essentially never contain U+2063 (invisible separator), so this can't
// collide with genuine chat content.
const SESSION_MARKER = '\u2063EDUFLOW_SESSION_MARKER\u2063';

async function getRecentMessages(user_id) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('role, content, mode, created_at')
    .eq('user_id', user_id)
    .not('content', 'like', `${SESSION_MARKER}%`)
    .order('created_at', { ascending: false })
    .limit(HISTORY_LIMIT);

  if (error) throw error;
  return (data || []).reverse();
}

async function saveMessage(user_id, role, content, mode) {
  const { error } = await supabase
    .from('chat_messages')
    .insert([{ user_id, role, content, mode }]);

  if (error) throw error;
}

// Records the start of a fresh session for one mode. Stored as a normal
// user-role message so it never risks violating a role constraint; the
// marker prefix keeps it out of every other query that reads real messages.
async function saveSessionMarker(user_id, mode, heading) {
  await saveMessage(user_id, 'user', SESSION_MARKER + heading, mode);
}

// "Continue" - messages since the most recent session marker for this mode.
// If the mode has no marker yet (e.g. it was used before this feature
// existed), falls back to that mode's whole recent history so nothing looks
// broken for existing users.
async function getModeContinuationMessages(user_id, mode) {
  const { data: markers, error: markerErr } = await supabase
    .from('chat_messages')
    .select('created_at')
    .eq('user_id', user_id).eq('mode', mode)
    .like('content', `${SESSION_MARKER}%`)
    .order('created_at', { ascending: false })
    .limit(1);
  if (markerErr) throw markerErr;

  let query = supabase
    .from('chat_messages')
    .select('role, content, created_at')
    .eq('user_id', user_id).eq('mode', mode)
    .in('role', ['user', 'assistant'])
    .not('content', 'like', `${SESSION_MARKER}%`)
    .order('created_at', { ascending: true })
    .limit(MODE_HISTORY_LIMIT);

  if (markers && markers.length) query = query.gte('created_at', markers[0].created_at);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// Session HEADINGS only for the history panel - never raw message content,
// matching the request that search results shouldn't show "the portion of
// the chat", just which session (by title) contains a match.
async function getModeSessions(user_id, mode, q) {
  const { data: markerRows, error: markerErr } = await supabase
    .from('chat_messages')
    .select('id, content, created_at')
    .eq('user_id', user_id).eq('mode', mode)
    .like('content', `${SESSION_MARKER}%`)
    .order('created_at', { ascending: true });
  if (markerErr) throw markerErr;

  const sessions = (markerRows || []).map((m) => ({
    id: m.id, heading: m.content.slice(SESSION_MARKER.length), created_at: m.created_at,
  }));

  if (!q) return sessions.slice().reverse();

  const qLower = q.toLowerCase();
  const matchedIds = new Set(sessions.filter((s) => s.heading.toLowerCase().includes(qLower)).map((s) => s.id));

  const { data: matches, error: matchErr } = await supabase
    .from('chat_messages')
    .select('created_at')
    .eq('user_id', user_id).eq('mode', mode)
    .in('role', ['user', 'assistant'])
    .not('content', 'like', `${SESSION_MARKER}%`)
    .ilike('content', `%${q}%`);
  if (matchErr) throw matchErr;

  (matches || []).forEach((msg) => {
    let owner = null;
    for (const s of sessions) {
      if (s.created_at <= msg.created_at) owner = s; else break;
    }
    if (owner) matchedIds.add(owner.id);
  });

  return sessions.filter((s) => matchedIds.has(s.id)).reverse();
}

// All real messages belonging to one specific past session, bounded by that
// session's marker and whichever marker (if any) came after it.
async function getSessionMessages(user_id, mode, sessionId) {
  const { data: marker, error: markerErr } = await supabase
    .from('chat_messages')
    .select('id, created_at')
    .eq('id', sessionId).eq('user_id', user_id).eq('mode', mode)
    .like('content', `${SESSION_MARKER}%`)
    .maybeSingle();
  if (markerErr) throw markerErr;
  if (!marker) return [];

  const { data: nextMarkers, error: nextErr } = await supabase
    .from('chat_messages')
    .select('created_at')
    .eq('user_id', user_id).eq('mode', mode)
    .like('content', `${SESSION_MARKER}%`)
    .gt('created_at', marker.created_at)
    .order('created_at', { ascending: true })
    .limit(1);
  if (nextErr) throw nextErr;

  let query = supabase
    .from('chat_messages')
    .select('role, content, created_at')
    .eq('user_id', user_id).eq('mode', mode)
    .in('role', ['user', 'assistant'])
    .not('content', 'like', `${SESSION_MARKER}%`)
    .gte('created_at', marker.created_at)
    .order('created_at', { ascending: true })
    .limit(MODE_HISTORY_LIMIT);

  if (nextMarkers && nextMarkers.length) query = query.lt('created_at', nextMarkers[0].created_at);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

module.exports = {
  getRecentMessages,
  saveMessage,
  saveSessionMarker,
  getModeContinuationMessages,
  getModeSessions,
  getSessionMessages,
};