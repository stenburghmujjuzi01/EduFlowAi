const { supabase } = require('../config/supabase');

async function listNotes(user_id) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user_id)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function createNote(user_id, title, content) {
  const { data, error } = await supabase
    .from('notes')
    .insert([{ user_id, title, content: content || '' }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateNote(user_id, id, fields) {
  const { data, error } = await supabase
    .from('notes')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user_id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function deleteNote(user_id, id) {
  const { error } = await supabase.from('notes').delete().eq('id', id).eq('user_id', user_id);
  if (error) throw error;
}

module.exports = { listNotes, createNote, updateNote, deleteNote };