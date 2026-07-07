// Gemini API integration (Module 4.2 AI Tutor).
// Docs: https://ai.google.dev/gemini-api/docs

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash'; // free-tier model

function isConfigured() {
  return Boolean(GEMINI_API_KEY);
}

async function generateLesson(topic, learnerName, lessonNumber, totalLessons, previousLessonContent) {
  if (!isConfigured()) {
    throw new Error('Gemini is not configured (missing GEMINI_API_KEY)');
  }

  const isFirst = lessonNumber === 1;
  const isLast = lessonNumber === totalLessons;

  const continuityBlock = previousLessonContent
    ? `Here is the previous lesson you already taught them, so you don't repeat it and instead build on it:\n"""\n${previousLessonContent}\n"""\n`
    : '';

  const prompt = `You are an encouraging, expert tutor teaching over WhatsApp.
You're teaching a structured course on "${topic}" to a learner named ${learnerName}.
This is lesson ${lessonNumber} of ${totalLessons}.
${continuityBlock}
Write this lesson (120-180 words) following these rules:
- Plain text only, no markdown headers or bullet symbols like * or #
- Friendly, simple, beginner-level
- ${isFirst ? 'This is their very first lesson - introduce the topic.' : 'Build logically on the previous lesson - do not reintroduce the topic from scratch.'}
- ${isLast ? 'This is the FINAL lesson in the course - wrap up with a summary of the whole topic.' : 'End with one short question to check understanding.'}
- Keep it around 10-minutes-of-reading short, since this is delivered as a WhatsApp message`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'Gemini API request failed');
    err.details = data;
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    const err = new Error('Gemini returned no lesson text');
    err.details = data;
    throw err;
  }

  return text.trim();
}

async function gradeAnswer(topic, lessonContent, learnerAnswer, learnerName) {
  if (!isConfigured()) {
    throw new Error('Gemini is not configured (missing GEMINI_API_KEY)');
  }

  const prompt = `You are a warm, encouraging tutor on WhatsApp, teaching a course on "${topic}".
Here is the lesson you just taught ${learnerName}:
"""
${lessonContent}
"""
${learnerName} just replied with this answer to your check-in question:
"""
${learnerAnswer}
"""
Give short feedback (2-3 sentences, plain text, no markdown):
- Tell them clearly whether they're on the right track
- Gently correct any misunderstanding if there is one
- Be encouraging, not harsh
- Do not ask a new question, this is feedback only`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'Gemini API request failed');
    err.details = data;
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    const err = new Error('Gemini returned no feedback text');
    err.details = data;
    throw err;
  }

  return text.trim();
}

async function generatePracticeChallenge(topic, learnerName) {
  if (!isConfigured()) {
    throw new Error('Gemini is not configured (missing GEMINI_API_KEY)');
  }

  const prompt = `You are a fun, encouraging tutor on WhatsApp teaching a course on "${topic}" to ${learnerName}.
They just asked for a bonus practice challenge to test themselves.
Write one short, engaging practice task or question (50-100 words, plain text, no markdown) that applies what they've likely learned so far about ${topic}.
Make it feel like a fun mini-challenge, not a formal exam question.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'Gemini API request failed');
    err.details = data;
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    const err = new Error('Gemini returned no challenge text');
    err.details = data;
    throw err;
  }

  return text.trim();
}

async function generateFinalAssessmentQuestion(topic, learnerName) {
  if (!isConfigured()) {
    throw new Error('Gemini is not configured (missing GEMINI_API_KEY)');
  }

  const prompt = `You are a tutor on WhatsApp who just finished teaching ${learnerName} a full course on "${topic}".
Write one comprehensive final assessment question (40-80 words, plain text, no markdown) that requires them to
demonstrate overall understanding of the topic, not just recall one fact. This is their final exam question.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'Gemini API request failed');
    err.details = data;
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    const err = new Error('Gemini returned no question text');
    err.details = data;
    throw err;
  }

  return text.trim();
}

async function gradeFinalAssessment(topic, question, learnerAnswer, learnerName) {
  if (!isConfigured()) {
    throw new Error('Gemini is not configured (missing GEMINI_API_KEY)');
  }

  const prompt = `You are grading ${learnerName}'s final exam answer for a course on "${topic}".
Question asked: "${question}"
Their answer: "${learnerAnswer}"

Respond with ONLY valid JSON, no markdown, no code fences, in exactly this shape:
{"score": <integer 0-10>, "feedback": "<2-3 sentences of encouraging, honest feedback>"}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'Gemini API request failed');
    err.details = data;
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    const err = new Error('Gemini returned no grading text');
    err.details = data;
    throw err;
  }

  const cleaned = text.trim().replace(/^```(json)?/i, '').replace(/```$/, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    const err = new Error('Failed to parse grading JSON from Gemini');
    err.details = { raw: text };
    throw err;
  }

  return {
    score: Math.max(0, Math.min(10, Number(parsed.score) || 0)),
    feedback: parsed.feedback || '',
  };
}

async function answerQuestion(question, topic, learnerName) {
  if (!isConfigured()) {
    throw new Error('Gemini is not configured (missing GEMINI_API_KEY)');
  }

  const context = topic
    ? `They're currently learning about "${topic}" with you, so relate your answer to that if it makes sense.`
    : "They haven't picked a course topic yet, so just answer generally.";

  const prompt = `You are a friendly, knowledgeable tutor chatting with ${learnerName || 'a learner'} on WhatsApp.
${context}
They just asked: "${question}"
Give a clear, conversational answer (under 150 words, plain text, no markdown).`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'Gemini API request failed');
    err.details = data;
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    const err = new Error('Gemini returned no answer text');
    err.details = data;
    throw err;
  }

  return text.trim();
}

async function classifyMessageIntent(message) {
  if (!isConfigured()) {
    throw new Error('Gemini is not configured (missing GEMINI_API_KEY)');
  }

  const prompt = `A tutoring bot just asked a learner a question. The learner replied with this message:
"""
${message}
"""
Is this message actually attempting to answer the question, or is it instead a separate question/request the learner is asking (e.g. asking for clarification on something else, a totally unrelated question, or asking to skip/change topic)?
Respond with EXACTLY one word, nothing else: ANSWER or QUESTION`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'Gemini API request failed');
    err.details = data;
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toUpperCase();
  return text === 'QUESTION' ? 'QUESTION' : 'ANSWER';
}

module.exports = {
  generateLesson,
  gradeAnswer,
  generatePracticeChallenge,
  generateFinalAssessmentQuestion,
  gradeFinalAssessment,
  answerQuestion,
  classifyMessageIntent,
  isConfigured,
};