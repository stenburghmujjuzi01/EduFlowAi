const { supabase } = require('../config/supabase');

async function requireWebAuth(req, res, next) {
  const header = req.header('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  if (!supabase || !supabase.auth) {
    console.error('[webAuth] Auth service not configured. Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.');
    return res.status(503).json({
      error: 'Authentication service is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
    });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }
    req.authUserId = data.user.id;
    req.authEmail = data.user.email;
    return next();
  } catch (err) {
    console.error('[webAuth] Failed to verify token:', err);
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}

module.exports = { requireWebAuth };