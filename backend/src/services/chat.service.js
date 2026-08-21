const { supabase } = require('../config/supabase');

const HISTORY_LIMIT = 20;
const MODE_HISTORY_LIMIT = 40;

async function getRecentMessages(user_id) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('role, content, mode, created_at')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .limit(HISTORY_LIMIT);

  if (error) throw error;
  return (data || []).reverse();
}

// Powers the per-mode chat history panel: everything the user has said/heard
// within one specific mode (e.g. "coding_assistant"), optionally narrowed by
// a keyword search - scoped to that mode only, per the request that history
// search should stay confined to "that specific mode that was selected."
async function getModeMessages(user_id, mode, q) {
  let query = supabase
    .from('chat_messages')
    .select('id, role, content, mode, created_at')
    .eq('user_id', user_id)
    .eq('mode', mode)
    .order('created_at', { ascending: false })
    .limit(MODE_HISTORY_LIMIT);

  if (q) query = query.ilike('content', `%${q}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

async function saveMessage(user_id, role, content, mode) {
  const { error } = await supabase
    .from('chat_messages')
    .insert([{ user_id, role, content, mode }]);

  if (error) throw error;
}

module.exports = { getRecentMessages, getModeMessages, saveMessage };