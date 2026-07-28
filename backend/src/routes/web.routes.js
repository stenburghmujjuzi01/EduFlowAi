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
const flashcardsService = require('../services/flashcards.service');
const quizService = require('../services/quiz.service');
const lessonsService = require('../services/lessons.service');
const assignmentsService = require('../services/assignments.service');
const communityService = require('../services/community.service');
const liveClassesService = require('../services/liveclasses.service');
const customQuizService = require('../services/customquiz.service');
const { supabase } = require('../config/supabase');

const router = express.Router();

router.use(requireWebAuth);

async function getProfile(req) {
  return userService.getUserByAuthId(req.authUserId);
}

// --- Profile / linking ---

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

// --- AI Chat ---

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

// --- Learning Paths ---

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

// --- Notes ---

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

// --- Study Planner ---

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

// --- Leaderboard ---

router.get('/leaderboard', async (req, res) => {
  try {
    const top = await userService.getLeaderboard(10);
    res.json({ leaderboard: top });
  } catch (err) {
    console.error('[web] Failed to fetch leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// --- Certificates ---

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

// --- Feedback ---

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

// --- Flashcards ---

router.post('/flashcards/generate', async (req, res) => {
  const { topic, count } = req.body;
  if (!topic) return res.status(400).json({ error: 'topic is required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const cards = await aiService.generateFlashcards(topic, count);
    const set = await flashcardsService.createSet(user.id, topic, cards);
    res.json({ set });
  } catch (err) {
    console.error('[web] Failed to generate flashcards:', err.details || err);
    res.status(500).json({ error: 'Failed to generate flashcards right now.' });
  }
});

router.get('/flashcards/sets', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    res.json({ sets: await flashcardsService.listSets(user.id) });
  } catch (err) {
    console.error('[web] Failed to list flashcard sets:', err);
    res.status(500).json({ error: 'Failed to list flashcard sets' });
  }
});

router.get('/flashcards/sets/:id', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const set = await flashcardsService.getSetWithCards(user.id, req.params.id);
    if (!set) return res.status(404).json({ error: 'Set not found' });
    res.json({ set });
  } catch (err) {
    console.error('[web] Failed to fetch flashcard set:', err);
    res.status(500).json({ error: 'Failed to fetch flashcard set' });
  }
});

router.post('/flashcards/cards/:id/review', async (req, res) => {
  const { knewIt } = req.body;
  try {
    const card = await flashcardsService.reviewCard(req.params.id, !!knewIt);
    res.json({ card });
  } catch (err) {
    console.error('[web] Failed to review card:', err);
    res.status(500).json({ error: 'Failed to review card' });
  }
});

router.delete('/flashcards/sets/:id', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    await flashcardsService.deleteSet(user.id, req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    console.error('[web] Failed to delete flashcard set:', err);
    res.status(500).json({ error: 'Failed to delete flashcard set' });
  }
});

// --- Quizzes ---

router.post('/quiz/generate', async (req, res) => {
  const { topic, count } = req.body;
  if (!topic) return res.status(400).json({ error: 'topic is required' });
  try {
    const questions = await aiService.generateMCQQuiz(topic, count);
    res.json({ questions });
  } catch (err) {
    console.error('[web] Failed to generate quiz:', err.details || err);
    res.status(500).json({ error: 'Failed to generate a quiz right now.' });
  }
});

router.post('/quiz/submit', async (req, res) => {
  const { topic, questions, answers } = req.body;
  if (!topic || !questions || !answers) return res.status(400).json({ error: 'topic, questions, and answers are required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });

    let score = 0;
    const results = questions.map((q, i) => {
      const correct = answers[i] === q.correctIndex;
      if (correct) score++;
      return { correct, correctIndex: q.correctIndex, chosenIndex: answers[i] };
    });

    await quizService.saveAttempt(user.id, topic, questions, answers, score, questions.length);
    await gamificationService.awardXp(user, score * 2);

    res.json({ score, total: questions.length, results });
  } catch (err) {
    console.error('[web] Failed to submit quiz:', err);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

router.get('/quiz/history', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    res.json({ attempts: await quizService.listAttempts(user.id) });
  } catch (err) {
    console.error('[web] Failed to fetch quiz history:', err);
    res.status(500).json({ error: 'Failed to fetch quiz history' });
  }
});

// --- Library (aggregated view of lessons, notes, flashcards, quizzes) ---

router.get('/library', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });

    const [lessons, notes, flashcardSets, quizAttempts] = await Promise.all([
      lessonsService.getAllLessonsForUser(user.id),
      notesService.listNotes(user.id),
      flashcardsService.listSets(user.id),
      quizService.listAttempts(user.id),
    ]);

    res.json({ lessons, notes, flashcardSets, quizAttempts });
  } catch (err) {
    console.error('[web] Failed to fetch library:', err);
    res.status(500).json({ error: 'Failed to fetch library' });
  }
});

// --- AI Tools ---

router.post('/ai-tools/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  if (!text || !targetLang) return res.status(400).json({ error: 'text and targetLang are required' });
  try {
    res.json({ result: await aiService.translateText(text, targetLang) });
  } catch (err) {
    console.error('[web] Translate failed:', err.details || err);
    res.status(500).json({ error: 'Translation failed right now.' });
  }
});

router.post('/ai-tools/grammar', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });
  try {
    res.json({ result: await aiService.checkGrammar(text) });
  } catch (err) {
    console.error('[web] Grammar check failed:', err.details || err);
    res.status(500).json({ error: 'Grammar check failed right now.' });
  }
});

router.post('/ai-tools/essay', async (req, res) => {
  const { topic, words } = req.body;
  if (!topic) return res.status(400).json({ error: 'topic is required' });
  try {
    res.json({ result: await aiService.writeEssay(topic, words) });
  } catch (err) {
    console.error('[web] Essay generation failed:', err.details || err);
    res.status(500).json({ error: 'Essay generation failed right now.' });
  }
});

router.post('/ai-tools/math', async (req, res) => {
  const { problem } = req.body;
  if (!problem) return res.status(400).json({ error: 'problem is required' });
  try {
    res.json({ result: await aiService.solveMath(problem) });
  } catch (err) {
    console.error('[web] Math solve failed:', err.details || err);
    res.status(500).json({ error: 'Math solving failed right now.' });
  }
});

router.post('/ai-tools/citation', async (req, res) => {
  const { source, style } = req.body;
  if (!source) return res.status(400).json({ error: 'source is required' });
  try {
    res.json({ result: await aiService.generateCitation(source, style) });
  } catch (err) {
    console.error('[web] Citation generation failed:', err.details || err);
    res.status(500).json({ error: 'Citation generation failed right now.' });
  }
});

router.post('/ai-tools/summarize', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });
  try {
    res.json({ result: await aiService.summarizeText(text) });
  } catch (err) {
    console.error('[web] Summarize failed:', err.details || err);
    res.status(500).json({ error: 'Summarize failed right now.' });
  }
});

// --- Assignments ---

router.post('/assignments/generate', async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'topic is required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const prompt = await aiService.generateAssignmentPrompt(topic);
    const assignment = await assignmentsService.createAssignment(user.id, topic, prompt);
    res.json({ assignment });
  } catch (err) {
    console.error('[web] Failed to generate assignment:', err.details || err);
    res.status(500).json({ error: 'Failed to generate an assignment right now.' });
  }
});

router.get('/assignments', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    res.json({ assignments: await assignmentsService.listAssignments(user.id) });
  } catch (err) {
    console.error('[web] Failed to fetch assignments:', err);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

router.post('/assignments/:id/submit', async (req, res) => {
  const { submission } = req.body;
  if (!submission) return res.status(400).json({ error: 'submission is required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const assignment = await assignmentsService.getAssignment(user.id, req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    const { score, feedback } = await aiService.gradeAssignment(assignment.topic, assignment.prompt, submission);
    const updated = await assignmentsService.submitAssignment(assignment.id, submission, score, feedback);
    await gamificationService.awardXp(user, score * 2);
    res.json({ assignment: updated });
  } catch (err) {
    console.error('[web] Failed to submit assignment:', err.details || err);
    res.status(500).json({ error: 'Failed to grade your submission right now.' });
  }
});

// --- Community ---

router.get('/community/posts', async (req, res) => {
  try {
    res.json({ posts: await communityService.listPosts() });
  } catch (err) {
    console.error('[web] Failed to fetch community posts:', err);
    res.status(500).json({ error: 'Failed to fetch community posts' });
  }
});

router.post('/community/posts', async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'title and body are required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const post = await communityService.createPost(user.id, user.name || 'Anonymous', title, body);
    res.json({ post });
  } catch (err) {
    console.error('[web] Failed to create post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.get('/community/posts/:id', async (req, res) => {
  try {
    const post = await communityService.getPost(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ post });
  } catch (err) {
    console.error('[web] Failed to fetch post:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

router.post('/community/posts/:id/replies', async (req, res) => {
  const { body } = req.body;
  if (!body) return res.status(400).json({ error: 'body is required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const reply = await communityService.createReply(req.params.id, user.id, user.name || 'Anonymous', body);
    res.json({ reply });
  } catch (err) {
    console.error('[web] Failed to create reply:', err);
    res.status(500).json({ error: 'Failed to create reply' });
  }
});

// --- Live Classes (free Jitsi Meet rooms) ---

router.get('/live-classes', async (req, res) => {
  try {
    res.json({ classes: await liveClassesService.listClasses() });
  } catch (err) {
    console.error('[web] Failed to fetch live classes:', err);
    res.status(500).json({ error: 'Failed to fetch live classes' });
  }
});

router.post('/live-classes', async (req, res) => {
  const { title, scheduled_at } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const liveClass = await liveClassesService.createClass(user.id, title, scheduled_at);
    res.json({ liveClass });
  } catch (err) {
    console.error('[web] Failed to create live class:', err);
    res.status(500).json({ error: 'Failed to create live class' });
  }
});

// --- Career Center ---

router.post('/career/roadmap', async (req, res) => {
  const { interest } = req.body;
  if (!interest) return res.status(400).json({ error: 'interest is required' });
  try {
    res.json({ roadmap: await aiService.generateCareerRoadmap(interest) });
  } catch (err) {
    console.error('[web] Failed to generate career roadmap:', err.details || err);
    res.status(500).json({ error: 'Failed to generate a roadmap right now.' });
  }
});

router.post('/career/resume-review', async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ error: 'resumeText is required' });
  try {
    res.json({ feedback: await aiService.reviewResume(resumeText) });
  } catch (err) {
    console.error('[web] Failed to review resume:', err.details || err);
    res.status(500).json({ error: 'Failed to review resume right now.' });
  }
});

// --- Instructor Tools (custom quiz builder + sharing) ---

router.post('/custom-quizzes', async (req, res) => {
  const { title, questions } = req.body;
  if (!title || !Array.isArray(questions) || !questions.length) {
    return res.status(400).json({ error: 'title and a non-empty questions array are required' });
  }
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    const quiz = await customQuizService.createQuiz(user.id, title, questions);
    res.json({ quiz });
  } catch (err) {
    console.error('[web] Failed to create custom quiz:', err);
    res.status(500).json({ error: 'Failed to create custom quiz' });
  }
});

router.get('/custom-quizzes/mine', async (req, res) => {
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });
    res.json({ quizzes: await customQuizService.listMyQuizzes(user.id) });
  } catch (err) {
    console.error('[web] Failed to fetch your quizzes:', err);
    res.status(500).json({ error: 'Failed to fetch your quizzes' });
  }
});

router.get('/custom-quizzes/by-code/:code', async (req, res) => {
  try {
    const quiz = await customQuizService.getQuizByCode(req.params.code);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found for that code' });
    res.json({ quiz });
  } catch (err) {
    console.error('[web] Failed to fetch quiz by code:', err);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

router.post('/custom-quizzes/:id/submit', async (req, res) => {
  const { answers } = req.body;
  if (!Array.isArray(answers)) return res.status(400).json({ error: 'answers array is required' });
  try {
    const user = await getProfile(req);
    if (!user) return res.status(400).json({ error: 'Profile not linked yet' });

    const { data: quiz, error } = await supabase
      .from('custom_quizzes')
      .select('*')
      .eq('id', req.params.id)
      .maybeSingle();
    if (error) throw error;
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, i) => { if (answers[i] === q.correctIndex) score++; });

    await customQuizService.saveAttempt(quiz.id, user.id, score, quiz.questions.length);
    await gamificationService.awardXp(user, score * 2);

    res.json({ score, total: quiz.questions.length });
  } catch (err) {
    console.error('[web] Failed to submit custom quiz:', err);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

module.exports = router;