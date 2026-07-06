const express = require('express');
const crypto = require('crypto');
const conversationService = require('../services/conversation.service');
const whatsappService = require('../services/whatsapp.service');

const router = express.Router();

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const APP_SECRET = process.env.WHATSAPP_APP_SECRET;

const lastMessageAt = new Map();
const COOLDOWN_MS = 2000;

function isValidSignature(req) {
  if (!APP_SECRET) {
    console.warn('[webhook] WHATSAPP_APP_SECRET not set - skipping signature check (not recommended for production)');
    return true;
  }

  const signatureHeader = req.header('x-hub-signature-256');
  if (!signatureHeader || !req.rawBody) {
    console.log('[webhook-debug] missing header or rawBody. header present:', !!signatureHeader, 'rawBody present:', !!req.rawBody);
    return false;
  }

  const expected = 'sha256=' + crypto
    .createHmac('sha256', APP_SECRET)
    .update(req.rawBody)
    .digest('hex');

  console.log('[webhook-debug] secretLen:', APP_SECRET.length, 'received:', signatureHeader, 'expected:', expected);

  const a = Buffer.from(signatureHeader);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

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
  if (!isValidSignature(req)) {
    console.warn('[webhook] Rejected request with invalid or missing signature');
    return res.sendStatus(401);
  }

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

    const now = Date.now();
    const last = lastMessageAt.get(from) || 0;
    if (now - last < COOLDOWN_MS) {
      console.warn(`[webhook] Ignoring rapid duplicate/spam message from ${from}`);
      return;
    }
    lastMessageAt.set(from, now);

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