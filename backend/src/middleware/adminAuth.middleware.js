const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

function requireAdminKey(req, res, next) {
  const key = req.header('x-admin-key');

  if (!ADMIN_API_KEY) {
    return res.status(500).json({ error: 'Admin panel is not configured (missing ADMIN_API_KEY)' });
  }

  if (key !== ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing admin key' });
  }

  next();
}

module.exports = { requireAdminKey };