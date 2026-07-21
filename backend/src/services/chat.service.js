const { supabase } = require('../config/supabase');

const HISTORY_LIMIT = 20;

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

async function saveMessage(user_id, role, content, mode) {
  const { error } = await supabase
    .from('chat_messages')
    .insert([{ user_id, role, content, mode }]);

  if (error) throw error;
}

module.exports = { getRecentMessages, saveMessage };