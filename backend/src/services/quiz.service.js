const { supabase } = require('../config/supabase');

async function saveAttempt(user_id, topic, questions, answers, score, total) {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert([{ user_id, topic, questions, answers, score, total }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function listAttempts(user_id) {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('id, topic, score, total, created_at')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

module.exports = { saveAttempt, listAttempts };