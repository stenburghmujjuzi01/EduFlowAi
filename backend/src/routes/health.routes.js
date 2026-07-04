const express = require('express');
const { checkConnection } = require('../config/supabase');

const router = express.Router();

router.get('/health', async (req, res) => {
  const db = await checkConnection();
  res.json({
    status: 'ok',
    service: 'EduFlow Ai API',
    timestamp: new Date().toISOString(),
    database: db,
  });
});

module.exports = router;
