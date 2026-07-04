const express = require('express');
const conversationService = require('../services/conversation.service');
const whatsappService = require('../services/whatsapp.service');

const router = express.Router();

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[webhook] Verified successfully');
    return res.status(200).send(challenge);
  }

  console.warn('[webhook] Verification failed - token mismatch');
  return res.sendStatus(403);
});

router.post('/', async (req, res) => {
  res.sendStatus(200);

  try {
    const entry = req.body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    if (!message) {
      return;
    }

    const from = message.from;
    const text = message.text?.body;

    console.log(`[webhook] Message from ${from}: ${text}`);

    if (!text) {
      await whatsappService.sendTextMessage(
        from,
        "I can only understand text messages right now. Please reply with words 🙂"
      );
      return;
    }

    await conversationService.handleIncomingMessage(from, text);
  } catch (err) {
    console.error('[webhook] Error handling incoming message:', err);
  }
});

module.exports = router;