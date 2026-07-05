const express = require('express');
const { requireAdminKey } = require('../middleware/adminAuth.middleware');
const userService = require('../services/user.service');
const certificatesService = require('../services/certificates.service');
const gamificationService = require('../services/gamification.service');

const router = express.Router();

router.use(requireAdminKey);

router.get('/stats', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const certificates = await certificatesService.getAllCertificates();

    const totalUsers = users.length;
    const totalCertificates = certificates.length;
    const totalXp = users.reduce((sum, u) => sum + (u.xp || 0), 0);
    const averageXp = totalUsers ? Math.round(totalXp / totalUsers) : 0;

    const topicCounts = {};
    for (const u of users) {
      if (u.current_topic) {
        topicCounts[u.current_topic] = (topicCounts[u.current_topic] || 0) + 1;
      }
    }
    const topTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic, count]) => ({ topic, count }));

    res.json({ totalUsers, totalCertificates, averageXp, topTopics });
  } catch (err) {
    console.error('[admin] Failed to compute stats:', err);
    res.status(500).json({ error: 'Failed to compute stats' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const enriched = users.map((u) => ({
      ...u,
      level: gamificationService.getLevel(u.xp || 0),
    }));
    res.json({ users: enriched });
  } catch (err) {
    console.error('[admin] Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/certificates', async (req, res) => {
  try {
    const certificates = await certificatesService.getAllCertificates();
    res.json({ certificates });
  } catch (err) {
    console.error('[admin] Failed to fetch certificates:', err);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

module.exports = router;