const express = require('express');
const { requireWebAuth } = require('../middleware/webAuth.middleware');
const userService = require('../services/user.service');
const gamificationService = require('../services/gamification.service');
const badgesService = require('../services/badges.service');
const aiService = require('../services/ai.service');
const chatService = require('../services/chat.service');
const notesService = require('../services/notes.service');
const plannerService = require('../services/planner.service');
const certificatesService = require('../services/certificates.service');
const certificatePdfService = require('../services/certificate-pdf.service');
const { supabase } = require('../config/supabase');

const router = express.Router();

router.use(requireWebAuth);

async function getProfile(req) {
  return userService.getUserByAuthId(req.authUserId);
}

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
    if (err.code === 'ALREADY_LINKED') return res.status(409).json({ error: err.message });
    console.error('[web] Failed to link phone:', err);
    res.status(500).json({ error: 'Failed to link phone number' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.json({ needsPhoneLink: true });

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

router.get('/chat/history', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const history = await chatService.getRecentMessages(user.id);
    res.json({ history });
  } catch (err) {
    console.error('[web] Failed to fetch chat history:', err);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

router.post('/chat', async (req, res) => {
  const { message, mode } = req.body;
  if (!message) return res.status(400).json({ error: 'message is required' });

  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });

    const history = await chatService.getRecentMessages(user.id);
    const reply = await aiService.generateChatReply(mode, history, message);

    await chatService.saveMessage(user.id, 'user', message, mode);
    await chatService.saveMessage(user.id, 'assistant', reply, mode);

    res.json({ reply });
  } catch (err) {
    console.error('[web] Chat failed:', err.details || err);
    res.status(500).json({ error: 'Failed to get a response right now. Try again in a moment.' });
  }
});

router.post('/learning-path', async (req, res) => {
  const { goal } = req.body;
  if (!goal) return res.status(400).json({ error: 'goal is required' });
  try {
    const path = await aiService.generateLearningPath(goal);
    res.json({ path });
  } catch (err) {
    console.error('[web] Failed to generate learning path:', err.details || err);
    res.status(500).json({ error: 'Failed to generate a learning path right now.' });
  }
});

router.get('/notes', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    res.json({ notes: await notesService.listNotes(user.id) });
  } catch (err) {
    console.error('[web] Failed to fetch notes:', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

router.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const note = await notesService.createNote(user.id, title, content);
    res.json({ note });
  } catch (err) {
    console.error('[web] Failed to create note:', err);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

router.patch('/notes/:id', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const note = await notesService.updateNote(user.id, req.params.id, req.body);
    res.json({ note });
  } catch (err) {
    console.error('[web] Failed to update note:', err);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    await notesService.deleteNote(user.id, req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    console.error('[web] Failed to delete note:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

router.get('/planner', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    res.json({ tasks: await plannerService.listTasks(user.id) });
  } catch (err) {
    console.error('[web] Failed to fetch planner tasks:', err);
    res.status(500).json({ error: 'Failed to fetch planner tasks' });
  }
});

router.post('/planner', async (req, res) => {
  const { title, due_at } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const task = await plannerService.createTask(user.id, title, due_at);
    res.json({ task });
  } catch (err) {
    console.error('[web] Failed to create task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.patch('/planner/:id', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const task = await plannerService.toggleTask(user.id, req.params.id, req.body.done);
    res.json({ task });
  } catch (err) {
    console.error('[web] Failed to update task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/planner/:id', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    await plannerService.deleteTask(user.id, req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    console.error('[web] Failed to delete task:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const top = await userService.getLeaderboard(10);
    res.json({ leaderboard: top });
  } catch (err) {
    console.error('[web] Failed to fetch leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

router.get('/certificates', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.id)
      .order('issued_at', { ascending: false });
    if (error) throw error;
    res.json({ certificates: data });
  } catch (err) {
    console.error('[web] Failed to fetch certificates:', err);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

router.get('/certificates/:code/pdf', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });

    const cert = await certificatesService.getCertificateByCode(req.params.code);
    if (!cert || cert.user_id !== user.id) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    const dateStr = new Date(cert.issued_at).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    const pdfBuffer = await certificatePdfService.generateCertificatePdf({
      name: cert.name,
      topic: cert.topic,
      score: cert.score,
      code: cert.certificate_code,
      date: dateStr,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="EduFlow-Ai-Certificate-${cert.certificate_code}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error('[web] Failed to generate certificate PDF:', err);
    res.status(500).json({ error: 'Failed to generate certificate PDF' });
  }
});

router.post('/feedback', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message is required' });
  try {
    const user = await getProfile(req);
    const { error } = await supabase
      .from('feedback')
      .insert([{ user_id: user?.id || null, message }]);
    if (error) throw error;
    res.json({ submitted: true });
  } catch (err) {
    console.error('[web] Failed to submit feedback:', err);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;