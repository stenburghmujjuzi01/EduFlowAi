const { supabase } = require('../config/supabase');

async function createAssignment(user_id, topic, prompt) {
  const { data, error } = await supabase
    .from('assignments')
    .insert([{ user_id, topic, prompt }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function listAssignments(user_id) {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function getAssignment(user_id, id) {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('id', id)
    .eq('user_id', user_id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function submitAssignment(id, submission, score, feedback) {
  const { data, error } = await supabase
    .from('assignments')
    .update({ submission, score, feedback })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

module.exports = { createAssignment, listAssignments, getAssignment, submitAssignment };