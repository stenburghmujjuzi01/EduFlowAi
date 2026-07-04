const express = require('express');
const whatsappService = require('../services/whatsapp.service');

const router = express.Router();

// POST /api/whatsapp/test-send
// Body: { "to": "256700000000", "message": "Hello from EduFlow Ai" }
router.post('/test-send', async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'to and message are required' });
  }

  try {
    const result = await whatsappService.sendTextMessage(to, message);
    return res.json({ sent: true, result });
  } catch (err) {
    console.error(err.details || err);
    return res.status(500).json({ error: err.message, details: err.details });
  }
});

module.exports = router;