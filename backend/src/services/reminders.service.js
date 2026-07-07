const { supabase } = require('../config/supabase');

const REMINDER_AFTER_HOURS = 48;
const REMINDER_COOLDOWN_HOURS = 72;

async function getUsersDueForReminder() {
  const cutoff = new Date(Date.now() - REMINDER_AFTER_HOURS * 3600 * 1000).toISOString();
  const reminderCutoff = new Date(Date.now() - REMINDER_COOLDOWN_HOURS * 3600 * 1000).toISOString();

  const { data, error } = await supabase
    .from('users')
    .select('phone_number, name, current_topic, last_active_at, last_reminder_sent_at, certificate_issued')
    .not('current_topic', 'is', null)
    .eq('certificate_issued', false)
    .lt('last_active_at', cutoff)
    .or(`last_reminder_sent_at.is.null,last_reminder_sent_at.lt.${reminderCutoff}`);

  if (error) throw error;
  return data;
}

async function markReminderSent(phone_number) {
  const { error } = await supabase
    .from('users')
    .update({ last_reminder_sent_at: new Date().toISOString() })
    .eq('phone_number', phone_number);

  if (error) throw error;
}

module.exports = { getUsersDueForReminder, markReminderSent };