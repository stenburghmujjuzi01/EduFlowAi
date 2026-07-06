const userService = require('./user.service');
const whatsappService = require('./whatsapp.service');
const aiService = require('./ai.service');
const lessonsService = require('./lessons.service');
const gamificationService = require('./gamification.service');
const certificatesService = require('./certificates.service');
const certificatePdfService = require('./certificate-pdf.service');

const TOTAL_LESSONS = 5;
const PASS_THRESHOLD = 6;

async function deliverLesson(user, lessonNumber) {
  const previous = lessonNumber > 1
    ? await lessonsService.getLesson(user.id, user.current_topic, lessonNumber - 1)
    : null;

  const content = await aiService.generateLesson(
    user.current_topic,
    user.name,
    lessonNumber,
    TOTAL_LESSONS,
    previous?.content || null
  );

  await lessonsService.saveLesson({
    user_id: user.id,
    topic: user.current_topic,
    lesson_number: lessonNumber,
    content,
  });

  await userService.updateUser(user.phone_number, { current_lesson_number: lessonNumber });

  const xpResult = await gamificationService.awardXp(user, 10);

  const isLast = lessonNumber === TOTAL_LESSONS;
  let footer = isLast
    ? "\n\n🎉 That's the final lesson! Send any message next to start your final assessment."
    : `\n\n📘 Lesson ${lessonNumber} of ${TOTAL_LESSONS} complete.`;

  footer += `\n+10 XP (${xpResult.newXp} total)`;
  if (xpResult.leveledUp) {
    footer += `\n🌟 Level up! You're now a ${xpResult.newLevel}!`;
  }

  await whatsappService.sendTextMessage(user.phone_number, content + footer);

  if (!isLast) {
    await sendMenu(user.phone_number, { includeNext: true });
  }
}

async function sendMenu(phoneNumber, { includeNext = false } = {}) {
  const rows = [];
  if (includeNext) rows.push({ id: 'next', title: '▶️ Next Lesson', description: 'Continue to the next lesson' });
  rows.push({ id: 'practice', title: '🏆 Practice Challenge', description: 'Get a bonus challenge' });
  rows.push({ id: 'progress', title: '📊 My Progress', description: 'See your stats and level' });
  rows.push({ id: 'leaderboard', title: '🏅 Leaderboard', description: 'See top learners by XP' });

  try {
    await whatsappService.sendListMessage(
      phoneNumber,
      'What would you like to do?',
      'Menu',
      rows
    );
  } catch (err) {
    console.error('[conversation] Failed to send menu:', err.details || err);
    await whatsappService.sendTextMessage(
      phoneNumber,
      'Type "next", "practice", "progress", or "leaderboard" to continue.'
    );
  }
}

async function sendPracticeChallenge(user) {
  try {
    const challenge = await aiService.generatePracticeChallenge(user.current_topic, user.name);
    const xpResult = await gamificationService.awardXp(user, 5);
    let message = `🏆 Bonus Challenge!\n\n${challenge}\n\n+5 XP (${xpResult.newXp} total)`;
    if (xpResult.leveledUp) {
      message += `\n🌟 Level up! You're now a ${xpResult.newLevel}!`;
    }
    await whatsappService.sendTextMessage(user.phone_number, message);
    await sendMenu(user.phone_number, { includeNext: user.current_lesson_number < TOTAL_LESSONS });
  } catch (err) {
    console.error('[conversation] Failed to generate practice challenge:', err.details || err);
    await whatsappService.sendTextMessage(
      user.phone_number,
      "Sorry, I couldn't generate a challenge right now. Try again in a moment."
    );
  }
}

async function sendLeaderboard(phoneNumber) {
  try {
    const top = await userService.getLeaderboard(5);
    const lines = top.map((u, i) => `${i + 1}. ${u.name || 'Anonymous'} - ${u.xp} XP`);
    await whatsappService.sendTextMessage(
      phoneNumber,
      `🏆 Leaderboard\n\n${lines.join('\n')}`
    );
  } catch (err) {
    console.error('[conversation] Failed to fetch leaderboard:', err.details || err);
    await whatsappService.sendTextMessage(
      phoneNumber,
      "Sorry, I couldn't load the leaderboard right now. Try again in a moment."
    );
  }
}

async function issueCertificate(user, score) {
  const cert = await certificatesService.createCertificate({
    user_id: user.id,
    name: user.name,
    topic: user.current_topic,
    score,
  });

  const dateStr = new Date(cert.issued_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const pdfBuffer = await certificatePdfService.generateCertificatePdf({
    name: user.name,
    topic: user.current_topic,
    score,
    code: cert.certificate_code,
    date: dateStr,
  });

  const filename = `EduFlow-Ai-Certificate-${cert.certificate_code}.pdf`;
  const mediaId = await whatsappService.uploadMedia(pdfBuffer, filename, 'application/pdf');
  await whatsappService.sendDocumentMessage(
    user.phone_number,
    mediaId,
    filename,
    `🎓 Congratulations, ${user.name}! Here's your certificate for ${user.current_topic}.`
  );

  await userService.updateUser(user.phone_number, { certificate_issued: true });
}

async function handleIncomingMessage(from, text) {
  const trimmed = (text || '').trim();

  const verifyMatch = trimmed.match(/^verify\s+(\S+)/i);
  if (verifyMatch) {
    const code = verifyMatch[1];
    try {
      const cert = await certificatesService.getCertificateByCode(code);
      if (!cert) {
        await whatsappService.sendTextMessage(from, `❌ No certificate found with code ${code.toUpperCase()}.`);
      } else {
        const dateStr = new Date(cert.issued_at).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        });
        await whatsappService.sendTextMessage(
          from,
          `✅ Valid Certificate\n\nName: ${cert.name}\nTopic: ${cert.topic}\nScore: ${cert.score}/10\nIssued: ${dateStr}\nCode: ${cert.certificate_code}`
        );
      }
    } catch (err) {
      console.error('[conversation] Failed to verify certificate:', err.details || err);
      await whatsappService.sendTextMessage(from, "Sorry, I couldn't verify that certificate right now.");
    }
    return;
  }

  let user = await userService.getUserByPhone(from);

  if (user && trimmed.toLowerCase() === 'restart') {
    await userService.updateUser(from, {
      name: null,
      current_topic: null,
      current_lesson_number: 0,
      final_assessment_question: null,
      final_assessment_score: null,
      certificate_issued: false,
    });
    await whatsappService.sendTextMessage(from, "Let's start fresh! 🎓 What's your name?");
    return;
  }

  if (!user) {
    user = await userService.createUser({ phone_number: from });
    await whatsappService.sendTextMessage(
      from,
      "Welcome to EduFlow Ai! 🎓 I'm your AI learning coach.\n\nWhat's your name?"
    );
    return;
  }

  if (!user.name) {
    await userService.updateUser(from, { name: trimmed });
    await whatsappService.sendTextMessage(
      from,
      `Nice to meet you, ${trimmed}! 👋\n\nWhat topic would you like to learn? (e.g. "AI", "Marketing", "Public Speaking")`
    );
    return;
  }

  if (!user.current_topic) {
    await userService.updateUser(from, { current_topic: trimmed, current_lesson_number: 0 });
    await whatsappService.sendTextMessage(
      from,
      `Great choice! Give me a moment while I prepare your first ${trimmed} lesson... 🧠`
    );
    try {
      user.current_topic = trimmed;
      await deliverLesson(user, 1);
    } catch (err) {
      console.error('[conversation] Failed to generate lesson 1:', err.details || err);
      await whatsappService.sendTextMessage(
        from,
        "Sorry, I couldn't generate your lesson right now. Try again in a moment by sending any message."
      );
    }
    return;
  }

  if (user.current_lesson_number < TOTAL_LESSONS) {
    const lower = trimmed.toLowerCase();

    if (lower === 'practice' || lower === 'challenge') {
      await sendPracticeChallenge(user);
      return;
    }

    if (lower === 'progress') {
      const level = gamificationService.getLevel(user.xp || 0);
      await whatsappService.sendTextMessage(
        user.phone_number,
        `📊 Progress Report\n\nName: ${user.name}\nTopic: ${user.current_topic}\nLesson: ${user.current_lesson_number} of ${TOTAL_LESSONS}\nXP: ${user.xp || 0} (${level})`
      );
      await sendMenu(user.phone_number, { includeNext: true });
      return;
    }

    if (lower === 'leaderboard') {
      await sendLeaderboard(user.phone_number);
      await sendMenu(user.phone_number, { includeNext: true });
      return;
    }

    if (lower === 'next') {
      try {
        await deliverLesson(user, user.current_lesson_number + 1);
      } catch (err) {
        console.error('[conversation] Failed to generate next lesson:', err.details || err);
        await whatsappService.sendTextMessage(
          from,
          "Sorry, I couldn't generate your next lesson right now. Try sending \"next\" again in a moment."
        );
      }
    } else {
      try {
        const currentLesson = await lessonsService.getLesson(
          user.id,
          user.current_topic,
          user.current_lesson_number
        );
        const feedback = await aiService.gradeAnswer(
          user.current_topic,
          currentLesson.content,
          trimmed,
          user.name
        );
        const xpResult = await gamificationService.awardXp(user, 5);
        let message = `${feedback}\n\n+5 XP (${xpResult.newXp} total)`;
        if (xpResult.leveledUp) {
          message += `\n🌟 Level up! You're now a ${xpResult.newLevel}!`;
        }
        await whatsappService.sendTextMessage(from, message);
        await sendMenu(from, { includeNext: true });
      } catch (err) {
        console.error('[conversation] Failed to grade answer:', err.details || err);
        await whatsappService.sendTextMessage(
          from,
          `You're on lesson ${user.current_lesson_number} of ${TOTAL_LESSONS} for ${user.current_topic}. Type "next" whenever you're ready to continue!`
        );
      }
    }
    return;
  }

  const lowerComplete = trimmed.toLowerCase();

  if (lowerComplete === 'practice' || lowerComplete === 'challenge') {
    await sendPracticeChallenge(user);
    return;
  }
  if (lowerComplete === 'leaderboard') {
    await sendLeaderboard(from);
    return;
  }
  if (lowerComplete === 'progress') {
    const level = gamificationService.getLevel(user.xp || 0);
    const statusLine = user.certificate_issued
      ? 'Status: Certified! 🎓'
      : user.final_assessment_score !== null
        ? `Status: Final assessment scored ${user.final_assessment_score}/10`
        : 'Status: Lessons complete, final assessment pending';
    await whatsappService.sendTextMessage(
      from,
      `📊 Progress Report\n\nName: ${user.name}\nTopic: ${user.current_topic}\n${statusLine}\nXP: ${user.xp || 0} (${level})\n\nType "practice" anytime for a bonus challenge.`
    );
    return;
  }

  if (user.certificate_issued) {
    await whatsappService.sendTextMessage(
      from,
      `You're already certified in ${user.current_topic}, ${user.name}! 🎓 Type "practice" anytime for a bonus challenge.`
    );
    return;
  }

  if (user.final_assessment_score !== null) {
    if (user.final_assessment_score >= PASS_THRESHOLD) {
      await whatsappService.sendTextMessage(
        from,
        `You already passed your final assessment with ${user.final_assessment_score}/10! 🎓 Sending your certificate now...`
      );
      try {
        await issueCertificate(user, user.final_assessment_score);
      } catch (certErr) {
        console.error('[conversation] Failed to issue certificate:', certErr.details || certErr);
        await whatsappService.sendTextMessage(
          from,
          "Sorry, I couldn't generate your certificate right now. Send any message to try again."
        );
      }
    } else if (lowerComplete === 'retake') {
      await userService.updateUser(from, { final_assessment_question: null, final_assessment_score: null });
      await whatsappService.sendTextMessage(from, "Alright, let's try again! Give me a moment...");
      try {
        const question = await aiService.generateFinalAssessmentQuestion(user.current_topic, user.name);
        await userService.updateUser(from, { final_assessment_question: question });
        await whatsappService.sendTextMessage(from, `📝 Final Assessment\n\n${question}`);
      } catch (err) {
        console.error('[conversation] Failed to generate retake question:', err.details || err);
        await whatsappService.sendTextMessage(from, "Sorry, couldn't set up your retake right now. Try typing \"retake\" again in a moment.");
      }
    } else {
      await whatsappService.sendTextMessage(
        from,
        `Your last final assessment score was ${user.final_assessment_score}/10. Type "retake" whenever you're ready to try again!`
      );
    }
    return;
  }

  if (!user.final_assessment_question) {
    await whatsappService.sendTextMessage(
      from,
      `You've completed all ${TOTAL_LESSONS} lessons on ${user.current_topic}, ${user.name}! 🎉 Time for your final assessment. Give me a moment...`
    );
    try {
      const question = await aiService.generateFinalAssessmentQuestion(user.current_topic, user.name);
      await userService.updateUser(from, { final_assessment_question: question });
      await whatsappService.sendTextMessage(from, `📝 Final Assessment\n\n${question}`);
    } catch (err) {
      console.error('[conversation] Failed to generate final assessment question:', err.details || err);
      await whatsappService.sendTextMessage(from, "Sorry, couldn't set up your final assessment right now. Send any message to try again.");
    }
    return;
  }

  try {
    const result = await aiService.gradeFinalAssessment(
      user.current_topic,
      user.final_assessment_question,
      trimmed,
      user.name
    );
    await userService.updateUser(from, { final_assessment_score: result.score });

    if (result.score >= PASS_THRESHOLD) {
      const xpResult = await gamificationService.awardXp(user, 30);
      let message = `${result.feedback}\n\nFinal Score: ${result.score}/10 ✅ You passed!\n+30 XP (${xpResult.newXp} total)`;
      if (xpResult.leveledUp) {
        message += `\n🌟 Level up! You're now a ${xpResult.newLevel}!`;
      }
      message += `\n\n🎓 Generating your certificate now...`;
      await whatsappService.sendTextMessage(from, message);

      try {
        await issueCertificate(user, result.score);
      } catch (certErr) {
        console.error('[conversation] Failed to issue certificate:', certErr.details || certErr);
        await whatsappService.sendTextMessage(
          from,
          "You passed, but I couldn't generate your certificate file just now. Send any message to try again."
        );
      }
    } else {
      await whatsappService.sendTextMessage(
        from,
        `${result.feedback}\n\nFinal Score: ${result.score}/10. You need ${PASS_THRESHOLD}/10 to pass. Type "retake" whenever you're ready to try again!`
      );
    }
  } catch (err) {
    console.error('[conversation] Failed to grade final assessment:', err.details || err);
    await whatsappService.sendTextMessage(
      from,
      "Sorry, I couldn't grade your final assessment right now. Try sending your answer again in a moment."
    );
  }
}

module.exports = { handleIncomingMessage };