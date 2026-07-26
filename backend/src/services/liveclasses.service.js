const { supabase } = require('../config/supabase');

function slugify(text) {
  return 'eduflowai-' + text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).slice(2, 7);
}

async function createClass(user_id, title, scheduled_at) {
  const room_name = slugify(title);
  const { data, error } = await supabase
    .from('live_classes')
    .insert([{ user_id, title, room_name, scheduled_at: scheduled_at || null }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function listClasses() {
  const { data, error } = await supabase
    .from('live_classes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data;
}

module.exports = { createClass, listClasses };