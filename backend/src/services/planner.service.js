const { supabase } = require('../config/supabase');

async function listTasks(user_id) {
  const { data, error } = await supabase
    .from('planner_tasks')
    .select('*')
    .eq('user_id', user_id)
    .order('due_at', { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data;
}

async function createTask(user_id, title, due_at) {
  const { data, error } = await supabase
    .from('planner_tasks')
    .insert([{ user_id, title, due_at: due_at || null }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function toggleTask(user_id, id, done) {
  const { data, error } = await supabase
    .from('planner_tasks')
    .update({ done })
    .eq('id', id)
    .eq('user_id', user_id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function deleteTask(user_id, id) {
  const { error } = await supabase.from('planner_tasks').delete().eq('id', id).eq('user_id', user_id);
  if (error) throw error;
}

module.exports = { listTasks, createTask, toggleTask, deleteTask };