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

module.exports = { saveLesson, getLesson };