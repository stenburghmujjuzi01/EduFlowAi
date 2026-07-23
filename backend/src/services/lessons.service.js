const { supabase } = require('../config/supabase');

async function saveLesson({ user_id, topic, lesson_number, content }) {
  const { data, error } = await supabase
    .from('lessons')
    .insert([{ user_id, topic, lesson_number, content }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getLesson(user_id, topic, lesson_number) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('user_id', user_id)
    .eq('topic', topic)
    .eq('lesson_number', lesson_number)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function getLessonsForUser(user_id, topic) {
  const { data, error } = await supabase
    .from('lessons')
    .select('lesson_number, content, created_at')
    .eq('user_id', user_id)
    .eq('topic', topic)
    .order('lesson_number', { ascending: true });

  if (error) throw error;
  return data;
}

async function getAllLessonsForUser(user_id) {
  const { data, error } = await supabase
    .from('lessons')
    .select('topic, lesson_number, content, created_at')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

module.exports = { saveLesson, getLesson, getLessonsForUser, getAllLessonsForUser };