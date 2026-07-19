const express = require('express');
const { requireWebAuth } = require('../middleware/webAuth.middleware');
const userService = require('../services/user.service');
const gamificationService = require('../services/gamification.service');
const badgesService = require('../services/badges.service');

const router = express.Router();

router.use(requireWebAuth);

router.post('/link-phone', async (req, res) => {
  const { phone_number } = req.body;
  if (!phone_number || typeof phone_number !== 'string') {
    return res.status(400).json({ error: 'phone_number is required' });
  }

  const cleanPhone = phone_number.replace(/[^\d]/g, '');

  try {
    const user = await userService.linkAuthToPhone(req.authUserId, cleanPhone);
    res.json({ user });
  } catch (err) {
    if (err.code === 'ALREADY_LINKED') {
      return res.status(409).json({ error: err.message });
    }
    console.error('[web] Failed to link phone:', err);
    res.status(500).json({ error: 'Failed to link phone number' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const user = await userService.getUserByAuthId(req.authUserId);
    if (!user) {
      return res.json({ needsPhoneLink: true });
    }

    const level = gamificationService.getLevel(user.xp || 0);
    const badges = await badgesService.getUserBadges(user.id);

    res.json({
      needsPhoneLink: false,
      user: {
        ...user,
        level,
        badges: badges.map((b) => ({
          code: b.badge_code,
          ...badgesService.BADGE_DEFINITIONS[b.badge_code],
          awarded_at: b.awarded_at,
        })),
      },
    });
  } catch (err) {
    console.error('[web] Failed to fetch profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;