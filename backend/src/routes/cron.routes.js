const express = require('express');
const { requireCronSecret } = require('../middleware/cronAuth.middleware');
const remindersService = require('../services/reminders.service');
const whatsappService = require('../services/whatsapp.service');

const router = express.Router();

router.post('/send-reminders', requireCronSecret, async (req, res) => {
  try {
    const users = await remindersService.getUsersDueForReminder();

    let sent = 0;
    let failed = 0;

    for (const user of users) {
      try {
        await whatsappService.sendTemplateMessage(
          user.phone_number,
          'learning_reminder',
          'en_US',
          [user.name || 'there', user.current_topic]
        );
        await remindersService.markReminderSent(user.phone_number);
        sent++;
      } catch (err) {
        console.error(`[cron] Failed to remind ${user.phone_number}:`, err.details || err);
        failed++;
      }
    }

    res.json({ eligible: users.length, sent, failed });
  } catch (err) {
    console.error('[cron] Failed to run reminders:', err);
    res.status(500).json({ error: 'Failed to run reminders' });
  }
});

module.exports = router;