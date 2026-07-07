const CRON_SECRET = process.env.CRON_SECRET;

function requireCronSecret(req, res, next) {
  const key = req.header('x-cron-secret');

  if (!CRON_SECRET) {
    return res.status(500).json({ error: 'Cron is not configured (missing CRON_SECRET)' });
  }

  if (key !== CRON_SECRET) {
    return res.status(401).json({ error: 'Invalid or missing cron secret' });
  }

  next();
}

module.exports = { requireCronSecret };