const { supabase } = require('../config/supabase');

function generateShareCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function createQuiz(user_id, title, questions) {
  const share_code = generateShareCode();
  const { data, error } = await supabase
    .from('custom_quizzes')
    .insert([{ user_id, title, questions, share_code }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function listMyQuizzes(user_id) {
  const { data, error } = await supabase
    .from('custom_quizzes')
    .select('id, title, share_code, created_at')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function getQuizByCode(code) {
  const { data, error } = await supabase
    .from('custom_quizzes')
    .select('*')
    .eq('share_code', code.toUpperCase())
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function saveAttempt(quiz_id, user_id, score, total) {
  const { data, error } = await supabase
    .from('custom_quiz_attempts')
    .insert([{ quiz_id, user_id, score, total }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

module.exports = { createQuiz, listMyQuizzes, getQuizByCode, saveAttempt };