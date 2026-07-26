const { supabase } = require('../config/supabase');

async function createPost(user_id, author_name, title, body) {
  const { data, error } = await supabase
    .from('community_posts')
    .insert([{ user_id, author_name, title, body }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function listPosts() {
  const { data, error } = await supabase
    .from('community_posts')
    .select('*, community_replies(id)')
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data.map((p) => ({ ...p, replyCount: p.community_replies.length, community_replies: undefined }));
}

async function getPost(id) {
  const { data: post, error: postErr } = await supabase
    .from('community_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (postErr) throw postErr;
  if (!post) return null;

  const { data: replies, error: repliesErr } = await supabase
    .from('community_replies')
    .select('*')
    .eq('post_id', id)
    .order('created_at', { ascending: true });
  if (repliesErr) throw repliesErr;

  return { ...post, replies };
}

async function createReply(post_id, user_id, author_name, body) {
  const { data, error } = await supabase
    .from('community_replies')
    .insert([{ post_id, user_id, author_name, body }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

module.exports = { createPost, listPosts, getPost, createReply };