const { supabase } = require('../config/supabase');

async function createSet(user_id, topic, cards) {
  const { data: set, error: setErr } = await supabase
    .from('flashcard_sets')
    .insert([{ user_id, topic }])
    .select()
    .single();
  if (setErr) throw setErr;

  const rows = cards.map((c) => ({ set_id: set.id, front: c.front, back: c.back }));
  const { data: savedCards, error: cardErr } = await supabase
    .from('flashcards')
    .insert(rows)
    .select();
  if (cardErr) throw cardErr;

  return { ...set, cards: savedCards };
}

async function listSets(user_id) {
  const { data, error } = await supabase
    .from('flashcard_sets')
    .select('*, flashcards(id)')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map((s) => ({ ...s, cardCount: s.flashcards.length, flashcards: undefined }));
}

async function getSetWithCards(user_id, set_id) {
  const { data: set, error: setErr } = await supabase
    .from('flashcard_sets')
    .select('*')
    .eq('id', set_id)
    .eq('user_id', user_id)
    .maybeSingle();
  if (setErr) throw setErr;
  if (!set) return null;

  const { data: cards, error: cardErr } = await supabase
    .from('flashcards')
    .select('*')
    .eq('set_id', set_id)
    .order('created_at', { ascending: true });
  if (cardErr) throw cardErr;

  return { ...set, cards };
}

async function reviewCard(card_id, knewIt) {
  const { data: card, error: getErr } = await supabase
    .from('flashcards')
    .select('*')
    .eq('id', card_id)
    .maybeSingle();
  if (getErr) throw getErr;
  if (!card) throw new Error('Card not found');

  const newInterval = knewIt ? Math.min(card.interval_days * 2, 60) : 1;
  const nextReview = new Date(Date.now() + newInterval * 24 * 3600 * 1000).toISOString();

  const { data, error } = await supabase
    .from('flashcards')
    .update({ interval_days: newInterval, next_review_at: nextReview })
    .eq('id', card_id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteSet(user_id, set_id) {
  const { error } = await supabase.from('flashcard_sets').delete().eq('id', set_id).eq('user_id', user_id);
  if (error) throw error;
}

module.exports = { createSet, listSets, getSetWithCards, reviewCard, deleteSet };