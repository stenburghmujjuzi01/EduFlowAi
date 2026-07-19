const express = require('express');
const { requireAdminKey } = require('../middleware/adminAuth.middleware');
const userService = require('../services/user.service');
const certificatesService = require('../services/certificates.service');
const gamificationService = require('../services/gamification.service');
const contestsService = require('../services/contests.service');
const whatsappService = require('../services/whatsapp.service');
const teamsService = require('../services/teams.service');
const remindersService = require('../services/reminders.service');

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

router.post('/users/:phone/reset', async (req, res) => {
  try {
    const user = await userService.resetUserProgress(req.params.phone);
    res.json({ user });
  } catch (err) {
    console.error('[admin] Failed to reset user:', err);
    res.status(500).json({ error: 'Failed to reset user progress' });
  }
});

router.post('/users/:phone/xp', async (req, res) => {
  const { xp } = req.body;
  if (typeof xp !== 'number' || xp < 0) {
    return res.status(400).json({ error: 'xp must be a non-negative number' });
  }
  try {
    const user = await userService.setUserXp(req.params.phone, xp);
    res.json({ user });
  } catch (err) {
    console.error('[admin] Failed to set XP:', err);
    res.status(500).json({ error: 'Failed to set XP' });
  }
});

router.delete('/users/:phone', async (req, res) => {
  try {
    await userService.deleteUser(req.params.phone);
    res.json({ deleted: true });
  } catch (err) {
    if (err.code === 'IS_TEAM_LEADER') {
      return res.status(409).json({ error: err.message });
    }
    console.error('[admin] Failed to delete user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
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

router.post('/certificates/:code/revoke', async (req, res) => {
  try {
    const cert = await certificatesService.revokeCertificate(req.params.code);
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    res.json({ certificate: cert });
  } catch (err) {
    console.error('[admin] Failed to revoke certificate:', err);
    res.status(500).json({ error: 'Failed to revoke certificate' });
  }
});

router.get('/teams', async (req, res) => {
  try {
    const teams = await teamsService.getAllTeamsWithMembers();
    res.json({ teams });
  } catch (err) {
    console.error('[admin] Failed to fetch teams:', err);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

router.delete('/teams/:teamId', async (req, res) => {
  try {
    await teamsService.deleteTeam(req.params.teamId);
    res.json({ deleted: true });
  } catch (err) {
    console.error('[admin] Failed to delete team:', err);
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

router.delete('/teams/:teamId/members/:phone', async (req, res) => {
  try {
    await teamsService.removeMember(req.params.teamId, req.params.phone);
    res.json({ removed: true });
  } catch (err) {
    if (err.code === 'IS_TEAM_LEADER') {
      return res.status(409).json({ error: err.message });
    }
    console.error('[admin] Failed to remove member:', err);
    res.status(500).json({ error: 'Failed to remove member' });
  }
});

router.post('/contests/start', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  try {
    const existing = await contestsService.getActiveContest();
    if (existing) {
      return res.status(409).json({ error: `Contest "${existing.name}" is already active. End it first.` });
    }
    const contest = await contestsService.startContest(name);
    res.json({ contest });
  } catch (err) {
    console.error('[admin] Failed to start contest:', err);
    res.status(500).json({ error: 'Failed to start contest' });
  }
});

router.get('/contests/active', async (req, res) => {
  try {
    const contest = await contestsService.getActiveContest();
    if (!contest) return res.json({ contest: null, standings: [] });
    const standings = await contestsService.getContestStandings(contest.id);
    res.json({ contest, standings });
  } catch (err) {
    console.error('[admin] Failed to fetch active contest:', err);
    res.status(500).json({ error: 'Failed to fetch active contest' });
  }
});

router.get('/contests/history', async (req, res) => {
  try {
    const contests = await contestsService.getContestHistory();
    res.json({ contests });
  } catch (err) {
    console.error('[admin] Failed to fetch contest history:', err);
    res.status(500).json({ error: 'Failed to fetch contest history' });
  }
});

router.post('/contests/end', async (req, res) => {
  try {
    const contest = await contestsService.getActiveContest();
    if (!contest) return res.status(404).json({ error: 'No active contest to end' });

    const { standings, winner } = await contestsService.endContest(contest.id);

    if (winner) {
      try {
        const members = await teamsService.getTeamMembers(winner.team_id);
        for (const m of members) {
          await whatsappService.sendTextMessage(
            m.phone_number,
            `🏆 Contest Over: "${contest.name}"\n\nYour team "${winner.name}" WON with ${winner.xpEarned} XP earned! 🎉\n\nYou've been awarded the Team Champion badge!`
          ).catch((e) => console.error('[admin] Failed to notify winner:', e.details || e));
        }
      } catch (notifyErr) {
        console.error('[admin] Failed to notify winning team:', notifyErr);
      }
    }

    res.json({ contest, standings, winner });
  } catch (err) {
    console.error('[admin] Failed to end contest:', err);
    res.status(500).json({ error: 'Failed to end contest' });
  }
});

router.post('/reminders/run', async (req, res) => {
  try {
    const users = await remindersService.getUsersDueForReminder();

    let sent = 0;
    let failed = 0;

    for (const user of users) {
      try {
        await whatsappService.sendTemplateMessage(
          user.phone_number,
          'learning_reminder',
          'en_US',
          [user.name || 'there', user.current_topic]
        );
        await remindersService.markReminderSent(user.phone_number);
        sent++;
      } catch (err) {
        console.error(`[admin] Failed to remind ${user.phone_number}:`, err.details || err);
        failed++;
      }
    }

    res.json({ eligible: users.length, sent, failed });
  } catch (err) {
    console.error('[admin] Failed to run reminders:', err);
    res.status(500).json({ error: 'Failed to run reminders' });
  }
});

module.exports = router;