const userService = require('../services/user.service');

// Supabase's unique_violation error code
const UNIQUE_VIOLATION = '23505';

async function register(req, res) {
  const { phone_number, name } = req.body;

  if (!phone_number || typeof phone_number !== 'string') {
    return res.status(400).json({ error: 'phone_number is required' });
  }

  try {
    const user = await userService.createUser({ phone_number, name });
    return res.status(201).json({ user });
  } catch (err) {
    if (err.code === UNIQUE_VIOLATION) {
      return res.status(409).json({ error: 'A user with this phone_number already exists' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Failed to create user' });
  }
}

async function getByPhone(req, res) {
  const { phone } = req.params;

  try {
    const user = await userService.getUserByPhone(phone);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
}

module.exports = { register, getByPhone };