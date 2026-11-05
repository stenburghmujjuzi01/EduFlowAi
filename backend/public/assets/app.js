const SUPABASE_URL = 'https://ahizppshhekmawqyyoyx.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoaXpwcHNoaGVrbWF3cXl5b3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwOTQxMzMsImV4cCI6MjA5ODY3MDEzM30.2y52JNtKOUGxhwTAmTNsbNhe1Dw-awL_zl7ZRljS5s8';
  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ---------- Simple hand-authored line icons (no emoji) ----------
  function svg(inner, size) { return `<svg width="${size||18}" height="${size||18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`; }
  const ICONS = {
    dashboard: svg('<rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="5"/><rect x="13" y="11" width="8" height="10"/><rect x="3" y="14" width="8" height="7"/>'),
    chat: svg('<path d="M4 4h16v12H8l-4 4V4z"/>'),
    courses: svg('<path d="M4 5h11a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3V5z"/><path d="M4 5v11"/>'),
    path: svg('<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 7l8 10"/>'),
    library: svg('<path d="M4 4h4v16H4z"/><path d="M10 4h4v16h-4z"/><path d="M17 5l3 15-4 .7L13 5.7z"/>'),
    flashcards: svg('<rect x="4" y="6" width="13" height="9" rx="1.5"/><rect x="7" y="9" width="13" height="9" rx="1.5"/>'),
    quizzes: svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7"/><circle cx="12" cy="16.5" r="0.3"/>'),
    assignments: svg('<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h4"/>'),
    notes: svg('<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>'),
    planner: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>'),
    progress: svg('<path d="M4 20V10M11 20V4M18 20v-7"/>'),
    achievements: svg('<path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.8 7.1 18.2 8 12.7l-4-3.9 5.5-.8z"/>'),
    community: svg('<circle cx="8" cy="9" r="3"/><circle cx="17" cy="9" r="3"/><path d="M2 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M12 20c0-3.3 2.7-5.5 6-5.5"/>'),
    leaderboard: svg('<path d="M4 20V13M12 20V6M20 20v-9"/>'),
    liveclasses: svg('<rect x="3" y="6" width="13" height="12" rx="1.5"/><path d="M16 10l5-3v10l-5-3z"/>'),
    career: svg('<rect x="4" y="8" width="16" height="11" rx="1.5"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),
    aitools: svg('<path d="M14 3l1.5 3 3 1.5-3 1.5L14 12l-1.5-3-3-1.5 3-1.5z"/><path d="M6 13l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/>'),
    certificates: svg('<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 21l5-3 5 3-1.5-7"/>'),
    admin: svg('<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/>'),
    settings: svg('<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2L10 21h4l.6-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5A7 7 0 0 0 19 12z"/>'),
    whiteboard: svg('<rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21l4-4 4 4"/>'),
    code: svg('<path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/>'),
    math: svg('<path d="M5 4h14M7 20l10-16M14 14l4 6M18 14l-4 6"/>'),
    search: svg('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>', 16),
    calendar: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>'),
    bell: svg('<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 19a2 2 0 0 0 4 0"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 6l9 7 9-7"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>'),
    menu: svg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    attach: svg('<path d="M21 11l-9 9a5 5 0 0 1-7-7l9-9a3.3 3.3 0 0 1 5 5l-9 9a1.7 1.7 0 0 1-2.4-2.4l8-8"/>'),
    camera: svg('<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13.5" r="3.2"/>'),
    mic: svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
    speaker: svg('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9a4 4 0 0 1 0 6"/>'),
    image: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M4 17l5-5 4 4 3-3 4 4"/>'),
    send: svg('<path d="M4 12l16-8-6 16-3-6-7-2z"/>', 16),
    chevron: svg('<path d="M6 9l6 6 6-6"/>', 14),
    panel: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>', 14),
    timer: svg('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>'),
    calc: svg('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M7 12h1M11 12h1M15 12h1M7 16h1M11 16h1M15 16h1"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>', 16),
    lock: svg('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', 13),
    copy: svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>', 13),
    check: svg('<path d="M20 6L9 17l-5-5"/>', 13),
    privacy: svg('<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/>'),
    help: svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/>'),
  };
  function I(name, size) { return ICONS[name] ? ICONS[name].replace(/width="\d+" height="\d+"/, `width="${size||18}" height="${size||18}"`) : ''; }

  // ---------- Navigation config ----------
  // Sections that don't need saved data / an account - open to guests.
  const GUEST_FREE_SECTIONS = ['chat', 'tool-calc', 'tool-timer'];

  const NAV_SECTIONS = [
    { group: 'Home', items: [
      { id: 'chat', label: 'AI Chat', icon: 'chat', live: true },
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', live: true },
    ]},
    { group: 'Learn', items: [
      { id: 'courses', label: 'My Courses', icon: 'courses', live: true },
      { id: 'learning-paths', label: 'Learning Paths', icon: 'path', live: true },
      { id: 'library', label: 'Library', icon: 'library', live: true },
    ]},
    { group: 'Practice', items: [
      { id: 'quizzes', label: 'Quizzes', icon: 'quizzes', live: true },
      { id: 'flashcards', label: 'Flashcards', icon: 'flashcards', live: true },
      { id: 'assignments', label: 'Assignments', icon: 'assignments', live: true },
    ]},
    { group: 'Progress', items: [
      { id: 'progress', label: 'Progress', icon: 'progress', live: true },
      { id: 'achievements', label: 'Achievements', icon: 'achievements', live: true },
      { id: 'certificates', label: 'Certificates', icon: 'certificates', live: true },
      { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard', live: true },
    ]},
    { group: 'Community', items: [
      { id: 'community', label: 'Community', icon: 'community', live: true },
      { id: 'live-classes', label: 'Live Classes', icon: 'liveclasses', live: true },
    ]},
    { group: 'Career', items: [
      { id: 'career-center', label: 'Career Center', icon: 'career', live: true },
    ]},
    { group: 'Tools', items: [
      { id: 'notes', label: 'Notes', icon: 'notes', live: true },
      { id: 'planner', label: 'Study Planner', icon: 'planner', live: true },
      { id: 'whiteboard', label: 'Whiteboard', icon: 'whiteboard', live: true },
      { id: 'code-editor', label: 'Code Editor', icon: 'code', live: true },
      { id: 'math', label: 'Math Workspace', icon: 'math', live: true },
      { id: 'tool-calc', label: 'Calculator', icon: 'calc', live: true, noGuestLock: true },
      { id: 'tool-timer', label: 'Pomodoro Timer', icon: 'timer', live: true, noGuestLock: true },
      { id: 'ai-tools', label: 'AI Tools', icon: 'aitools', live: true },
    ]},
    { group: 'Instructor', items: [
      { id: 'admin', label: 'Instructor Tools', icon: 'admin', live: true },
    ]},
  ];

  function buildSidebar() {
    const navList = document.getElementById('nav-list');
    navList.innerHTML = NAV_SECTIONS.map((group, gi) => `
      <div class="nav-section-label ${gi === 0 ? '' : 'closed'}" role="button" tabindex="0" onclick="toggleNavGroup(this)">
        <span>${group.group}</span><span class="chevron">${I('chevron', 14)}</span>
      </div>
      <div class="nav-group-items ${gi === 0 ? '' : 'collapsed'}">
        ${group.items.map(item => `
          <div class="nav-item" data-section="${item.id}" role="button" tabindex="0" onclick="handleNavClick('${item.id}', ${item.live})">
            <span class="nav-icon">${I(item.icon)}</span>
            <span class="label">${item.label}</span>
            ${!item.live ? '<span class="soon-tag">Soon</span>' : ''}
          </div>
        `).join('')}
      </div>
    `).join('');

    // Create stub content sections for non-live items.
    const mainCenter = document.getElementById('center-col');
    NAV_SECTIONS.flatMap(g => g.items).filter(i => !i.live).forEach(item => {
      if (document.getElementById('section-' + item.id)) return;
      const div = document.createElement('div');
      div.className = 'content-section';
      div.id = 'section-' + item.id;
      div.innerHTML = `<h1>${item.label}</h1><div class="empty-state"><p>${item.label} isn't available yet - we're still building this one out.</p><button class="btn-outline" onclick="showSection('chat')">Ask your AI Tutor instead</button></div>`;
      mainCenter.appendChild(div);
    });
  }

  function showSection(name) {
    document.body.setAttribute('data-section', name);
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('section-' + name);
    if (target) target.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-section="${name}"]`);
    if (navItem) navItem.classList.add('active');
    document.getElementById('main-content').classList.toggle('chat-mode', name === 'chat');

    // The floating chat launcher only makes sense outside the chat window.
    document.getElementById('floating-chat-btn').classList.toggle('hidden-floating', name === 'chat');
    if (name === 'notes') loadNotes();
    if (name === 'planner') loadPlanner();
    if (name === 'leaderboard') loadLeaderboard();
    if (name === 'certificates') loadCertificates();
    if (name === 'progress') loadProgressSection();
    if (name === 'library') loadLibrary();
    if (name === 'flashcards') loadFlashcardSets();
    if (name === 'quizzes') loadQuizHistory();
    if (name === 'assignments') loadAssignments();
    if (name === 'community') loadCommunityPosts();
    if (name === 'live-classes') loadLiveClasses();
    if (name === 'admin') loadMyCustomQuizzes();
  }

  // ---------- Auth screens ----------
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('visible'));
    document.getElementById(id).classList.add('visible');
    if (id === 'signup-screen') showOnboardStep(1);
  }
  function toggleEye(inputId, btn) {
    const input = document.getElementById(inputId);
    const showing = input.type === 'password';
    input.type = showing ? 'text' : 'password';
    const label = showing ? 'Hide password' : 'Show password';
    btn.setAttribute('title', label);
    btn.setAttribute('aria-label', label);
  }

  // Wraps a promise with a hard timeout so a stalled network call surfaces
  // as an error the user can retry, instead of leaving the page looking
  // permanently frozen with no feedback at all.
  function withTimeout(promise, ms, label) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error((label || 'Request') + ' timed out. Check your connection and try again.')), ms)),
    ]);
  }

  function setBtnBusy(btnEl, busyText) {
    if (!btnEl) return () => {};
    const original = btnEl.textContent;
    btnEl.textContent = busyText;
    btnEl.disabled = true;
    return () => { btnEl.textContent = original; btnEl.disabled = false; };
  }

  async function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const msgEl = document.getElementById('login-msg');
    const btnEl = document.querySelector('#login-screen .submit-btn');
    msgEl.style.color = 'var(--red)';
    msgEl.textContent = '';
    if (!email || !password) { msgEl.textContent = 'Enter both email and password.'; return; }
    const restore = setBtnBusy(btnEl, 'Logging in…');
    try {
      const { error } = await withTimeout(sb.auth.signInWithPassword({ email, password }), 15000, 'Login');
      if (error) { msgEl.textContent = error.message; return; }
      await withTimeout(afterAuth(), 15000, 'Loading your account');
    } catch (e) {
      msgEl.textContent = e.message || 'Something went wrong - please try again.';
    } finally {
      restore();
    }
  }

  // ---------- Onboarding (Section 6): topic + goal before the account form,
  // so signup asks for the phone number only once the user already
  // understands what EduFlow will do for them. Backend contract (fields,
  // signUp/link-phone calls) below is completely unchanged. ----------
  let onboardTopic = '';
  let onboardGoal = '';
  function selectOnboardTopic(topic) {
    onboardTopic = topic;
    showOnboardStep(2);
  }
  function selectOnboardGoal(goal) {
    onboardGoal = goal;
    showOnboardStep(3);
  }
  function showOnboardStep(n) {
    document.querySelectorAll('.onboard-step').forEach((el, i) => el.classList.toggle('active', i === n - 1));
    document.getElementById('onboard-step-indicator').textContent = `Step ${n} of 3`;
  }
  function onboardGoBack(n) { showOnboardStep(n); }

  async function handleSignup() {
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('signup-phone').value.trim();
    const msgEl = document.getElementById('signup-msg');
    const btnEl = document.querySelector('#signup-screen .submit-btn');
    msgEl.style.color = 'var(--red)';
    msgEl.textContent = '';
    if (!email || !password || !phone) { msgEl.textContent = 'Fill in all fields.'; return; }

    const restore = setBtnBusy(btnEl, 'Creating account…');
    try {
      const { data, error } = await withTimeout(sb.auth.signUp({ email, password }), 15000, 'Signup');
      if (error) { msgEl.textContent = error.message; return; }
      if (!data.session) {
        msgEl.style.color = 'var(--green)';
        msgEl.textContent = 'Check your email to confirm your account, then log in.';
        return;
      }
      await withTimeout(apiPost('/api/web/link-phone', { phone_number: phone }), 15000, 'Saving your details');
      await withTimeout(afterAuth(), 15000, 'Loading your account');
      // Get the new user to value fast: use what they actually told us in
      // steps 1-2 to prefill (not auto-send) their first AI Chat message,
      // rather than dropping them on an empty dashboard.
      if (onboardTopic || onboardGoal) {
        const parts = [];
        if (onboardTopic) parts.push(`I'd like to learn about ${onboardTopic}.`);
        if (onboardGoal) parts.push(`My goal is to ${onboardGoal}.`);
        showSection('chat');
        const ta = document.getElementById('chat-textarea');
        ta.value = parts.join(' ') + ' Where should I start?';
        ta.focus();
        ta.select();
        onboardTopic = '';
        onboardGoal = '';
      }
    } catch (e) {
      msgEl.textContent = e.message || 'Something went wrong - please try again.';
    } finally {
      restore();
    }
  }

  async function handleLinkPhone() {
    const phone = document.getElementById('phone-input').value.trim();
    const msgEl = document.getElementById('phone-msg');
    const btnEl = document.querySelector('#phone-link-screen .submit-btn');
    msgEl.style.color = 'var(--red)';
    if (!phone) { msgEl.textContent = 'Enter a phone number.'; return; }
    const restore = setBtnBusy(btnEl, 'Continuing…');
    try {
      await withTimeout(apiPost('/api/web/link-phone', { phone_number: phone }), 15000, 'Saving your details');
      await withTimeout(afterAuth(), 15000, 'Loading your account');
    } catch (e) {
      msgEl.textContent = e.message || 'Something went wrong - please try again.';
    } finally {
      restore();
    }
  }

  async function handleLogout() {
    await sb.auth.signOut();
    currentUser = null;
    currentUserEmail = '';
    bootGuestMode();
  }

  // ---------- API helpers ----------
  async function apiGet(path) {
    const { data: { session } } = await sb.auth.getSession();
    const res = await fetch(path, { headers: { Authorization: `Bearer ${session.access_token}` } });
    if (!res.ok) throw new Error('Request failed: ' + res.status);
    return res.json();
  }
  async function apiPost(path, body, signal) {
    const { data: { session } } = await sb.auth.getSession();
    const res = await fetch(path, { method: 'POST', headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined, signal });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || ('Request failed: ' + res.status));
    return data;
  }

  // ---------- Generic stoppable-generation helper ----------
  // Wraps any "Generate"-style async action with a live AbortController and
  // flips the triggering button into a Stop button while the request is in flight.
  const activeGenerations = {};
  function beginGeneration(key, btnEl) {
    const controller = new AbortController();
    activeGenerations[key] = { controller, btnEl, originalLabel: btnEl ? btnEl.textContent : '' };
    if (btnEl) {
      btnEl.dataset.generating = '1';
      btnEl.textContent = 'Stop';
      btnEl.classList.add('btn-danger');
      btnEl.classList.remove('btn');
      btnEl.onclick = () => stopGeneration(key);
    }
    return controller.signal;
  }
  function endGeneration(key, restoreFn) {
    const g = activeGenerations[key];
    if (!g) return;
    if (g.btnEl) {
      g.btnEl.dataset.generating = '';
      g.btnEl.textContent = g.originalLabel;
      g.btnEl.classList.remove('btn-danger');
      g.btnEl.classList.add('btn');
      if (restoreFn) g.btnEl.onclick = restoreFn;
    }
    delete activeGenerations[key];
  }
  function stopGeneration(key) {
    const g = activeGenerations[key];
    if (g) g.controller.abort();
  }
  async function apiPatch(path, body) {
    const { data: { session } } = await sb.auth.getSession();
    const res = await fetch(path, { method: 'PATCH', headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || ('Request failed: ' + res.status));
    return data;
  }
  async function apiDelete(path) {
    const { data: { session } } = await sb.auth.getSession();
    const res = await fetch(path, { method: 'DELETE', headers: { Authorization: `Bearer ${session.access_token}` } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || ('Request failed: ' + res.status));
    return data;
  }

  function esc(str) { const div = document.createElement('div'); div.textContent = str ?? ''; return div.innerHTML; }

  // A failed fetch left these lists blank - identical to "you have none",
  // which is misleading (brief section 7/8: error states need their own
  // treatment, not silence). retryFn is optional - a couple of these loaders
  // aren't simple no-arg calls, so a plain message-only fallback is used.
  function showLoadError(elId, itemLabel, retryFn) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = `<div class="empty-state" style="padding:14px 0;">
      <p style="margin:0 0 10px;">Couldn't load your ${itemLabel} - check your connection and try again.</p>
      ${retryFn ? `<button class="btn-outline" onclick="${retryFn}">Try again</button>` : ''}
    </div>`;
  }

  function showToast(text, ms) {
    const stack = document.getElementById('toast-stack');
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = text;
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add('visible'));
    setTimeout(() => {
      el.classList.remove('visible');
      setTimeout(() => el.remove(), 220);
    }, ms || 3200);
  }

  let currentUser = null;
  let isGuestMode = false;
  let chromeInitialized = false;

  async function afterAuth() {
    const me = await apiGet('/api/web/me');
    if (me.needsPhoneLink) { showScreen('phone-link-screen'); return; }
    isGuestMode = false;
    document.body.classList.remove('is-guest');
    currentUser = me.user;
    const { data: { session } } = await sb.auth.getSession();
    currentUserEmail = session.user.email;
    // Guest mode may have already swapped out the sidebar footer / settings
    // account fields (which contain these ids) with guest-CTA markup, so
    // these elements might not exist yet at this point - guard against that
    // rather than crashing; renderSidebarFooter() below recreates the
    // sidebar one properly either way.
    const sidebarEmailEl = document.getElementById('sidebar-email');
    if (sidebarEmailEl) sidebarEmailEl.textContent = session.user.email;
    const settingsEmailEl = document.getElementById('settings-email');
    if (settingsEmailEl) settingsEmailEl.textContent = session.user.email;
    document.getElementById('guest-banner').classList.remove('visible');
    initChrome();
    applyGuestLocks();
    renderSidebarFooter();
    renderDashboard(currentUser);
    showScreen('app-screen');
    showSection('dashboard');
  }

  // ---------- Guest (unregistered visitor) mode ----------
  // The AI chat is the landing page for anyone without an account. They get a
  // real, working chat (rate-limited server-side) plus a handful of
  // read-only/no-account-needed tools; everything else is visibly locked and
  // funnels into sign up / log in rather than silently failing.
  function continueAsGuest() { bootGuestMode(); }

  function bootGuestMode() {
    isGuestMode = true;
    document.body.classList.add('is-guest');
    document.getElementById('guest-banner').classList.add('visible');
    if (!chromeInitialized) initChrome();
    renderSidebarFooter();
    applyGuestLocks();
    showScreen('app-screen');
    showSection('chat');
  }

  function renderSettingsGuestState() {
    const fields = document.getElementById('settings-account-fields');
    const logoutBox = document.getElementById('settings-logout-box');
    if (isGuestMode) {
      fields.innerHTML = `
        <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">You're browsing as a guest, so there's no account to manage yet - name, WhatsApp number and password all live on a free account.</p>
        <button class="btn" onclick="showScreen('signup-screen')">Sign up free</button>
        <button class="btn-outline" style="margin-left:8px;" onclick="showScreen('login-screen')">Log in</button>`;
      logoutBox.style.display = 'none';
    } else {
      logoutBox.style.display = '';
      if (!document.getElementById('settings-name-input')) {
        fields.innerHTML = `
          <div class="field-wrap"><label class="field-label">Display name</label><input type="text" id="settings-name-input" placeholder="Your name" /></div>
          <div class="field-wrap"><label class="field-label">WhatsApp number</label><input type="text" id="settings-phone-input" placeholder="e.g. 256700000000" /></div>
          <button class="btn" onclick="saveAccountDetails(this)">Save changes</button>
          <div id="settings-account-msg" style="font-size:12px;color:var(--muted);margin-top:8px;"></div>
          <hr style="border:none;border-top:1px solid var(--border);margin:16px 0;" />
          <p style="font-size:13px;" id="settings-email">${esc(currentUserEmail)}</p>
          <button class="btn-outline" onclick="handleChangePassword()">Change password</button>`;
        renderAccountInfo();
      }
    }
  }

  // ---------- Settings modal (Claude-style: internal sidebar + panes) ----------
  function openSettingsModal() {
    renderSettingsGuestState();
    document.getElementById('settings-nav-guest').classList.toggle('active', isGuestMode);
    document.getElementById('settings-nav-member').classList.toggle('active', !isGuestMode);
    switchSettingsPane('general');
    openModal('settings-modal');
  }
  function switchSettingsPane(pane) {
    if (isGuestMode && (pane === 'account' || pane === 'notifications' || pane === 'data')) {
      guestGate('Sign up to unlock this', 'This lives on a free account - it only takes a moment to set up.');
      return;
    }
    document.querySelectorAll('#settings-modal .settings-nav-item').forEach(el => el.classList.toggle('active', el.dataset.pane === pane));
    document.querySelectorAll('#settings-modal .settings-pane').forEach(el => el.classList.toggle('active', el.id === 'settings-pane-' + pane));
  }
  function setTextSize(size) {
    document.documentElement.dataset.textSize = size;
    localStorage.setItem('eduflow_text_size', size);
  }

  function switchHelpPane(pane) {
    document.querySelectorAll('#help-modal .settings-nav-item').forEach(el => el.classList.toggle('active', el.dataset.pane === pane));
    document.querySelectorAll('#help-modal .settings-pane').forEach(el => el.classList.toggle('active', el.id === 'help-pane-' + pane));
  }
  function switchPrivacyPane(pane) {
    document.querySelectorAll('#privacy-modal .settings-nav-item').forEach(el => el.classList.toggle('active', el.dataset.pane === pane));
    document.querySelectorAll('#privacy-modal .settings-pane').forEach(el => el.classList.toggle('active', el.id === 'privacy-pane-' + pane));
  }
  // Always reset to a known default pane on open - defends against any
  // future scoping mistake leaving these blank, the same way the Settings
  // modal already resets to "general" every time it opens.
  function openHelpModal() { switchHelpPane('h-start'); openModal('help-modal'); }
  function openPrivacyModal() { switchPrivacyPane('p-overview'); openModal('privacy-modal'); }

  function guestGate(title, body) {
    document.getElementById('guest-gate-title').textContent = title || 'Sign up to unlock this';
    document.getElementById('guest-gate-body').textContent = body || 'This feature is only available to registered users. Create a free account to unlock every AI tool and save your progress.';
    openModal('guest-gate-modal');
  }

  // Nav items other than Chat/Settings need an account - grey them out and
  // route clicks into the sign-up prompt instead of a broken/empty page.
  function applyGuestLocks() {
    document.querySelectorAll('#nav-list .nav-item').forEach(el => {
      const id = el.dataset.section;
      const locked = isGuestMode && !GUEST_FREE_SECTIONS.includes(id);
      el.classList.toggle('locked', locked);
      if (locked && !el.querySelector('.lock-icon')) {
        const span = document.createElement('span');
        span.className = 'lock-icon';
        span.innerHTML = I('lock', 13);
        el.appendChild(span);
      }
    });
    // Guests have no saved chat/notes history at all, so search (both the
    // main platform search and the per-mode history search) is hidden
    // outright rather than shown-but-gated - there's genuinely nothing for
    // it to search yet.
    const searchWrap = document.getElementById('search-wrap');
    if (searchWrap) searchWrap.style.display = isGuestMode ? 'none' : '';
    const modeHistoryWrap = document.getElementById('mode-history-search-wrap');
    if (modeHistoryWrap) modeHistoryWrap.classList.toggle('hidden-for-guest', isGuestMode);

    const profileBtn = document.getElementById('profile-btn');
    profileBtn.classList.toggle('pulsate-account', isGuestMode);
    profileBtn.onclick = isGuestMode ? () => showScreen('login-screen') : () => togglePopover('account-popover');
    if (isGuestMode) {
      // A visitor is treated as unrecognized until they actually log in -
      // show the plain account icon even if a saved avatar exists in this
      // browser from a previous logged-in session.
      profileBtn.innerHTML = I('user');
      const footerAvatar = document.getElementById('sidebar-footer-avatar');
      if (footerAvatar) footerAvatar.style.display = 'none';
    }
  }

  function renderSidebarFooter() {
    const footer = document.querySelector('.sidebar-footer');
    if (isGuestMode) {
      footer.innerHTML = `
        <div class="guest-footer-full">
          <div class="email" style="margin-bottom:8px;">Browsing as guest</div>
          <div style="display:flex;gap:6px;">
            <button class="logout-btn" style="flex:1;" onclick="showScreen('login-screen')">Log in</button>
            <button class="btn" style="flex:1;padding:7px 10px;font-size:12.5px;" onclick="showScreen('signup-screen')">Sign up</button>
          </div>
        </div>
        <button class="guest-footer-collapsed-btn" id="guest-footer-collapsed-btn" onclick="showScreen('login-screen')" title="Log in or sign up" aria-label="Log in or sign up"></button>`;
      const collapsedBtn = document.getElementById('guest-footer-collapsed-btn');
      if (collapsedBtn) collapsedBtn.innerHTML = I('user', 16);
    } else {
      footer.innerHTML = `
        <div class="email" id="sidebar-email">${esc(currentUserEmail)}</div>
        <button class="logout-btn" onclick="handleLogout()">
          <span class="logout-text">Log out</span>
          <span class="account-avatar" id="sidebar-footer-avatar" style="width:22px;height:22px;font-size:10.5px;display:none;"></span>
        </button>`;
      renderAccountInfo();
    }
  }

  function handleNavClick(id, live) {
    if (isGuestMode && !GUEST_FREE_SECTIONS.includes(id)) {
      guestGate('Sign up to unlock this', `${document.querySelector('.nav-item[data-section="' + id + '"] .label')?.textContent || 'This section'} is only available to registered users - it's quick and free to set up.`);
      return;
    }
    showSection(id);
  }

  let currentUserEmail = '';

  // Each stage below runs in its own try/catch. This function previously ran
  // top-to-bottom with no error isolation - if any single call threw, every
  // subsequent line silently never executed (including theme setup, which
  // is why colors could stay broken until something unrelated re-triggered
  // them). Now a failure in one area is logged and skipped rather than
  // taking out everything that comes after it.
  function initChrome() {
    chromeInitialized = true;

    try {
      buildSidebar();
      // On mobile the sidebar is an overlay drawer (see the 768px media
      // query) - start it closed so first load shows the actual content,
      // not a full-screen nav drawer.
      if (window.innerWidth <= 768) document.getElementById('sidebar').classList.add('collapsed');
      document.getElementById('search-icon').innerHTML = I('search', 16);
      document.getElementById('calendar-btn').innerHTML = I('calendar');
      document.getElementById('notif-btn').innerHTML = I('bell');
      document.getElementById('theme-btn').innerHTML = I('sun');
      document.getElementById('profile-btn').innerHTML = I('user');
      document.getElementById('collapse-icon-holder').innerHTML = I('menu');
      document.getElementById('attach-btn').innerHTML = I('attach');
      document.getElementById('camera-btn').innerHTML = I('camera');
      document.getElementById('mic-btn').innerHTML = I('mic');
      document.getElementById('voice-out-btn').innerHTML = I('speaker');
      document.getElementById('imagegen-btn').innerHTML = I('image');
      document.getElementById('floating-chat-btn').innerHTML = I('chat', 22);
      document.getElementById('mode-history-icon').innerHTML = I('search', 14);
      document.getElementById('icon-settings-nav').innerHTML = I('settings', 17);
      document.getElementById('icon-privacy-nav').innerHTML = I('privacy', 17);
      document.getElementById('icon-help-nav').innerHTML = I('help', 17);
      document.getElementById('settings-search-icon').innerHTML = I('search', 14);
      document.getElementById('icon-settings-general').innerHTML = I('settings', 15);
      document.getElementById('icon-settings-account').innerHTML = I('user', 15);
      document.getElementById('icon-settings-voice').innerHTML = I('speaker', 15);
      document.getElementById('icon-settings-notif').innerHTML = I('bell', 15);
      document.getElementById('icon-settings-data').innerHTML = I('panel', 15);
      document.getElementById('icon-settings-about').innerHTML = I('help', 15);
      document.getElementById('icon-settings-general-g').innerHTML = I('settings', 15);
      document.getElementById('icon-settings-voice-g').innerHTML = I('speaker', 15);
      document.getElementById('icon-settings-about-g').innerHTML = I('help', 15);
      document.getElementById('icon-settings-signup-g').innerHTML = I('user', 15);
      document.getElementById('mode-start-nav-icon').innerHTML = I('plus', 14);
      document.querySelectorAll('.widget-header .chevron').forEach(el => el.innerHTML = I('chevron', 14));
      document.querySelectorAll('.nav-section-label .chevron').forEach(el => el.innerHTML = I('chevron', 14));
    } catch (e) { console.error('[initChrome] sidebar/icons failed:', e); }

    try {
      const modeSel = document.getElementById('mode-switcher');
      modeSel.innerHTML = ['tutor','coding_assistant','study_partner','quiz_master','research_assistant','career_coach']
        .map(m => `<option value="${m}">${m.replace('_',' ').replace(/\b\w/g, c => c.toUpperCase())}</option>`).join('');
      modeSel.addEventListener('change', () => {
        const titleEl = document.getElementById('chat-mode-title');
        if (titleEl) titleEl.textContent = modeSel.options[modeSel.selectedIndex].text;
        refreshModeSlideout();
        document.getElementById('mode-history-results').classList.remove('visible');
        if (!isGuestMode) loadModeContinuation(modeSel.value);
      });
      refreshModeSlideout();
    } catch (e) { console.error('[initChrome] mode switcher failed:', e); }

    try { buildCalculator(); } catch (e) { console.error('[initChrome] calculator failed:', e); }
    try { initTheme(); } catch (e) { console.error('[initChrome] theme failed:', e); }
    try { if (!isGuestMode) loadCalendarAndNotifs(); } catch (e) { console.error('[initChrome] calendar/notifs failed:', e); }
    try { renderSuggestedPrompts(); } catch (e) { console.error('[initChrome] suggested prompts failed:', e); }
    try { initSettingsLanguageMirror(); } catch (e) { console.error('[initChrome] language mirror failed:', e); }
    try { initVoiceSelection(); } catch (e) { console.error('[initChrome] voice selection failed:', e); }

    try {
      document.getElementById('chat-textarea').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
      });
      if (!isGuestMode) loadChatHistory();
      initWhiteboard();
    } catch (e) { console.error('[initChrome] chat/whiteboard init failed:', e); }
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    // On mobile the sidebar is an overlay drawer - show/hide the backdrop
    // behind it in step; on desktop this class is simply unused (backdrop
    // stays display:none via its default, non-mobile CSS).
    document.getElementById('sidebar-backdrop').classList.toggle('visible', !sidebar.classList.contains('collapsed'));
  }

  function toggleNavGroup(headerEl) {
    const wasClosed = headerEl.classList.contains('closed');
    document.querySelectorAll('.nav-section-label').forEach(h => {
      h.classList.add('closed');
      if (h.nextElementSibling) h.nextElementSibling.classList.add('collapsed');
    });
    if (wasClosed) {
      headerEl.classList.remove('closed');
      headerEl.nextElementSibling.classList.remove('collapsed');
    }
  }

  function openCalendarPopover() {
    if (isGuestMode) {
      guestGate('Sign up to use the calendar', 'Tasks and reminders are saved to your account - create a free one to turn this on.');
      return;
    }
    togglePopover('calendar-popover');
  }
  function openNotifPopover() {
    if (isGuestMode) {
      guestGate('Sign up for notifications', 'Alerts and reminders are saved to your account - create a free one to turn this on.');
      return;
    }
    togglePopover('notif-popover');
  }

  function togglePopover(id) {
    document.querySelectorAll('.popover').forEach(p => { if (p.id !== id) p.classList.remove('visible'); });
    const willOpen = !document.getElementById(id).classList.contains('visible');
    document.getElementById(id).classList.toggle('visible');
    if (id === 'notif-popover' && willOpen) {
      lastSeenNotifCount = window.__lastNotifTotal || 0;
      localStorage.setItem('eduflow_notif_seen', lastSeenNotifCount);
      setNavBadge('notif-btn', 0);
      if (window.setTabAlert) setTabAlert(0);
    }
  }
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-icon-btn') && !e.target.closest('.popover')) {
      document.querySelectorAll('.popover').forEach(p => p.classList.remove('visible'));
    }
    if (!e.target.closest('#search-wrap')) document.getElementById('search-results').classList.remove('visible');
    if (!e.target.closest('#mode-history-search-wrap')) document.getElementById('mode-history-results').classList.remove('visible');
  });

  // ---------- Generic "Enter submits" for single-line inputs ----------
  // Walks up a few levels from the input to find the nearest primary action
  // button (Generate / Add / Save / Continue / Post / etc.) and clicks it.
  function findNearbySubmitButton(el) {
    let node = el.parentElement;
    for (let i = 0; i < 4 && node; i++) {
      const btn = node.querySelector('button.btn, button.submit-btn');
      if (btn) return btn;
      node = node.parentElement;
    }
    return null;
  }
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const el = e.target;
    if (el.tagName !== 'INPUT') return;
    if (!['text', 'email', 'password', 'date'].includes(el.type)) return;
    if (el.id === 'search-input') return; // search updates live, nothing to submit
    const btn = findNearbySubmitButton(el);
    if (btn) { e.preventDefault(); btn.click(); }
  });

  // ---------- Account panel / avatar ----------
  function initials(str) { return (str || '?').trim().charAt(0).toUpperCase(); }

  function renderAccountInfo() {
    const name = (currentUser && currentUser.name) || '';
    const phone = (currentUser && currentUser.phone_number) || '';
    const avatar = localStorage.getItem('eduflow_avatar');
    const label = name || currentUserEmail || 'Account';

    // These live inside containers that guest mode can wholesale replace
    // (the settings page's account fields, in particular) before a real
    // login ever runs - guard every lookup so a still-guest DOM state can
    // never crash this.
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };

    setText('account-pop-name', label);
    setText('account-pop-email', currentUserEmail);
    setVal('account-pop-name-input', name);
    setVal('account-pop-phone-input', phone);
    setVal('settings-name-input', name);
    setVal('settings-phone-input', phone);

    const avatarHtml = avatar ? `<img src="${avatar}" />` : esc(initials(name || currentUserEmail));
    const avatarLg = document.getElementById('account-avatar-lg');
    if (avatarLg) avatarLg.innerHTML = avatarHtml;
    const removeLink = document.getElementById('avatar-remove-link');
    if (removeLink) removeLink.style.display = avatar ? 'block' : 'none';

    // Replace the plain account icon in the navbar, and the sidebar-footer
    // logout icon when collapsed, with the chosen profile picture / initial.
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) profileBtn.innerHTML = avatar ? `<span class="account-avatar" style="width:24px;height:24px;font-size: 12px;">${avatarHtml}</span>` : I('user');

    const footerIcon = document.getElementById('sidebar-footer-avatar');
    if (footerIcon) footerIcon.innerHTML = avatarHtml;
  }

  function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast('Please choose an image under 2MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('eduflow_avatar', reader.result);
      renderAccountInfo();
      showToast('Profile picture updated.');
    };
    reader.readAsDataURL(file);
  }

  async function sha256Hex(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Pulls in the real photo tied to the user's email via Gravatar (a free,
  // no-signup-required service - if their email has a Gravatar photo set,
  // this is it; if not, falls back cleanly to their initials).
  async function useEmailAvatar() {
    if (!currentUserEmail) return;
    showToast('Looking up your email profile photo…');
    try {
      const hash = await sha256Hex(currentUserEmail.trim().toLowerCase());
      const url = `https://www.gravatar.com/avatar/${hash}?s=200&d=404`;
      const img = new Image();
      img.onload = () => {
        localStorage.setItem('eduflow_avatar', url);
        renderAccountInfo();
        showToast('Using your email profile photo.');
      };
      img.onerror = () => {
        showToast("No profile photo is set up for this email - showing your initial instead.");
        localStorage.removeItem('eduflow_avatar');
        renderAccountInfo();
      };
      img.src = url;
    } catch (e) {
      showToast('Could not look up your email profile photo right now.');
    }
  }
  function clearAvatar() {
    localStorage.removeItem('eduflow_avatar');
    renderAccountInfo();
  }

  async function saveAccountDetails(btnEl) {
    const inPopover = btnEl.closest('#account-popover');
    const name = document.getElementById(inPopover ? 'account-pop-name-input' : 'settings-name-input').value.trim();
    const phone = document.getElementById(inPopover ? 'account-pop-phone-input' : 'settings-phone-input').value.trim();
    const msgEl = document.getElementById(inPopover ? 'account-pop-msg' : 'settings-account-msg');
    msgEl.textContent = 'Saving...';
    try {
      const { user } = await apiPatch('/api/web/me', { name, phone_number: phone || undefined });
      currentUser = { ...currentUser, ...user };
      msgEl.textContent = 'Saved.';
      renderAccountInfo();
      showToast('Account details updated.');
    } catch (e) {
      msgEl.textContent = e.message || 'Failed to save changes.';
    }
  }

  // ---------- Password change: verify -> new password -> confirmation ----------
  function handleChangePassword() {
    document.getElementById('pw-current-input').value = '';
    document.getElementById('pw-new-input').value = '';
    document.getElementById('pw-confirm-input').value = '';
    document.getElementById('pw-stage1-msg').textContent = '';
    document.getElementById('pw-stage2-msg').textContent = '';
    document.getElementById('pw-strength-bar').style.width = '0%';
    showPwStage(1);
    openModal('password-modal');
  }
  function showPwStage(n) {
    document.querySelectorAll('.pw-stage').forEach((el, i) => el.classList.toggle('active', i === n - 1));
    document.getElementById('pw-step-indicator').textContent = `Step ${n} of 3`;
  }
  // Stage 1: re-authenticate with the current password before allowing any
  // change - a valid session alone isn't treated as sufficient proof of
  // intent to change the password.
  async function pwVerifyCurrent() {
    const pw = document.getElementById('pw-current-input').value;
    const msgEl = document.getElementById('pw-stage1-msg');
    if (!pw) { msgEl.textContent = 'Enter your current password.'; return; }
    msgEl.textContent = 'Verifying…';
    try {
      const { error } = await sb.auth.signInWithPassword({ email: currentUserEmail, password: pw });
      if (error) { msgEl.textContent = 'That password is incorrect.'; return; }
      msgEl.textContent = '';
      showPwStage(2);
    } catch (e) {
      msgEl.textContent = 'Something went wrong - try again.';
    }
  }
  function pwCheckStrength() {
    const val = document.getElementById('pw-new-input').value;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const bar = document.getElementById('pw-strength-bar');
    const colors = ['var(--red)', 'var(--red)', '#e0a030', '#e0a030', 'var(--green)'];
    bar.style.width = (score / 4 * 100) + '%';
    bar.style.background = colors[score];
  }
  // Stage 2: require a minimum-strength new password that matches its
  // confirmation before actually submitting the change.
  async function pwSubmitNew() {
    const newPw = document.getElementById('pw-new-input').value;
    const confirmPw = document.getElementById('pw-confirm-input').value;
    const msgEl = document.getElementById('pw-stage2-msg');
    if (newPw.length < 8) { msgEl.textContent = 'Password must be at least 8 characters.'; return; }
    if (!/[0-9]/.test(newPw)) { msgEl.textContent = 'Include at least one number.'; return; }
    if (newPw !== confirmPw) { msgEl.textContent = 'Passwords do not match.'; return; }
    msgEl.textContent = 'Updating…';
    try {
      const { error } = await sb.auth.updateUser({ password: newPw });
      if (error) { msgEl.textContent = error.message || 'Failed to update password.'; return; }
      document.getElementById('pw-current-input').value = '';
      document.getElementById('pw-new-input').value = '';
      document.getElementById('pw-confirm-input').value = '';
      showPwStage(3);
    } catch (e) {
      msgEl.textContent = 'Something went wrong - try again.';
    }
  }

  // ---------- Voice (TTS) selection ----------
  let availableVoices = [];
  function initVoiceSelection() {
    if (!window.speechSynthesis) return;
    const populate = () => {
      availableVoices = window.speechSynthesis.getVoices();
      if (!availableVoices.length) return;
      const select = document.getElementById('settings-voice-select');
      const saved = localStorage.getItem('eduflow_voice_uri');
      select.innerHTML = availableVoices.map(v => `<option value="${esc(v.voiceURI)}">${esc(v.name)} (${esc(v.lang)})</option>`).join('');
      if (saved && availableVoices.some(v => v.voiceURI === saved)) select.value = saved;
    };
    populate();
    window.speechSynthesis.onvoiceschanged = populate;
    const savedInputLang = localStorage.getItem('eduflow_voice_input_lang');
    if (savedInputLang) document.getElementById('settings-voice-input-lang').value = savedInputLang;
  }
  function setPreferredVoice(voiceURI) {
    localStorage.setItem('eduflow_voice_uri', voiceURI);
    localStorage.setItem('eduflow_voice_chosen', '1');
  }

  function initSettingsLanguageMirror() {
    const navSel = document.getElementById('language-select');
    const settingsSel = document.getElementById('settings-language-select');
    settingsSel.innerHTML = navSel.innerHTML;
    const savedLang = localStorage.getItem('eduflow_lang');
    if (savedLang) { navSel.value = savedLang; settingsSel.value = savedLang; }
  }

  // ---------- Theme ----------
  function initTheme() {
    const saved = localStorage.getItem('eduflow_theme') || 'system';
    applyTheme(saved);
  }
  function applyTheme(mode) {
    let actual = mode;
    if (mode === 'system') actual = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', actual);
    localStorage.setItem('eduflow_theme', mode);
  }
  function setTheme(mode) { applyTheme(mode); }
  // Cycles the theme that's actually being DISPLAYED right now, not the
  // stored preference string - if that string was "system" and the OS
  // happens to be in dark mode, the old version's first click silently set
  // an explicit "dark" (no visible change, since it already looked dark),
  // and only the second click reached "light". Explicit "Device theme" is
  // still available as its own choice in Settings - this icon is just a
  // simple, always-one-click light/dark flip.
  function cycleTheme() {
    const resolved = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(resolved === 'dark' ? 'light' : 'dark');
  }

  // ---------- Language (partial i18n demo) ----------
  const I18N = {
    en: { dashboard: 'Dashboard', chat: 'AI Chat' },
    fr: { dashboard: 'Tableau de bord', chat: 'Discussion IA' },
    es: { dashboard: 'Panel', chat: 'Chat IA' },
    pt: { dashboard: 'Painel', chat: 'Chat IA' },
    ar: { dashboard: 'لوحة التحكم', chat: 'محادثة الذكاء الاصطناعي' },
    zh: { dashboard: '仪表板', chat: 'AI 聊天' },
    hi: { dashboard: 'डैशबोर्ड', chat: 'एआई चैट' },
    de: { dashboard: 'Übersicht', chat: 'KI-Chat' },
    ru: { dashboard: 'Панель', chat: 'ИИ чат' },
    ja: { dashboard: 'ダッシュボード', chat: 'AIチャット' },
    sw: { dashboard: 'Dashibodi', chat: 'Gumzo la AI' },
    lg: { dashboard: 'Ekiwuliziro', chat: 'Emboozi ya AI' },
  };
  // NOTE: full whole-site translation (every label, all AI responses) is a larger
  // follow-up item - this preview currently retranslates the sidebar nav labels
  // live and stores the preference so it's ready to wire the rest into.
  function handleLanguageChange() {
    const lang = document.getElementById('language-select').value;
    localStorage.setItem('eduflow_lang', lang);
    const dict = I18N[lang] || I18N.en;
    const dashItem = document.querySelector('.nav-item[data-section="dashboard"] .label');
    const chatItem = document.querySelector('.nav-item[data-section="chat"] .label');
    if (dashItem) dashItem.textContent = dict.dashboard;
    if (chatItem) chatItem.textContent = dict.chat;
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (lang !== 'en') showToast('Full site + AI-response translation is on the roadmap - a preview of key labels has been applied for now.');
  }

  // ---------- Dashboard ----------
  function dashboardGreeting() {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const name = (currentUser && currentUser.name) ? ', ' + currentUser.name.split(' ')[0] : '';
    return `${timeGreeting}${name}`;
  }

  function renderDashboard(user) {
    document.getElementById('dash-greeting-text').textContent = dashboardGreeting();
    document.getElementById('dash-subgreeting').textContent = user.current_topic
      ? 'Ready to continue learning?' : 'What do you want to learn today?';

    // A. Continue Learning - the most prominent card on the page, with a
    // real progress bar driven by actual lesson data (never fabricated).
    const cont = document.getElementById('continue-learning-card');
    if (user.current_topic && user.current_lesson_number < 5) {
      const pct = Math.round((user.current_lesson_number / 5) * 100);
      cont.innerHTML = `
                <div class="dash-hero-title">${esc(user.current_topic)}</div>
        <p class="dash-hero-sub">Lesson ${user.current_lesson_number} of 5</p>
        <div class="dash-progress-track"><div class="dash-progress-fill" style="width:${pct}%;"></div></div>
        <p class="dash-progress-caption">${pct}% complete</p>
        <div class="dash-hero-actions">
          <button class="btn" onclick="showSection('chat')">Continue</button>
        </div>`;
    } else if (user.current_topic) {
      cont.innerHTML = `
                <div class="dash-hero-title">${esc(user.current_topic)}</div>
        <div class="dash-progress-track"><div class="dash-progress-fill" style="width:100%;"></div></div>
        <p class="dash-progress-caption">All 5 lessons complete - take your final assessment on WhatsApp to get certified.</p>
        <div class="dash-hero-actions">
          <button class="btn" onclick="showSection('chat')">Review with AI Chat</button>
        </div>`;
    } else {
      cont.innerHTML = `
        <div class="dash-hero-title">Start learning</div>
        <p class="dash-hero-sub">Pick a course, or ask the tutor to build a path for you.</p>
        <div class="dash-hero-actions">
          <button class="btn" onclick="showSection('courses')">Explore courses</button>
        </div>`;
    }

    // D. Progress Snapshot - real fields only (no streak/quiz-average field
    // exists in the data model, so those are intentionally omitted rather
    // than fabricated).
    document.getElementById('stats-row').innerHTML = `
      <div class="stat-card"><div class="label">XP</div><div class="value">${user.xp || 0}</div></div>
      <div class="stat-card accent"><div class="label">Level</div><div class="value" style="font-size:15px">${esc(user.level)}</div></div>
      <div class="stat-card"><div class="label">Lesson</div><div class="value">${user.current_lesson_number || 0}/5</div></div>
      <div class="stat-card"><div class="label">Certified</div><div class="value" style="font-size:15px">${user.certificate_issued ? 'Yes' : 'No'}</div></div>
    `;
    const lessonPct = Math.round(((user.current_lesson_number || 0) / 5) * 100);
    document.getElementById('dash-lesson-progress-wrap').innerHTML = `
      <div class="dash-lesson-bar-row">
        <div class="dash-progress-track"><div class="dash-progress-fill" style="width:${lessonPct}%;"></div></div>
        <span class="dash-progress-pct">${lessonPct}%</span>
      </div>`;

    // F. Achievements
    const hasBadges = user.badges.length > 0;
    const badgeHtml = hasBadges ? user.badges.map(b => `<span class="badge-pill">${esc(b.name)}</span>`).join('') : '<span class="empty">No badges yet - keep learning to earn your first one.</span>';
    document.getElementById('badges-row-dash').innerHTML = badgeHtml;
    document.getElementById('badges-row-ach').innerHTML = hasBadges ? badgeHtml : '';
    const achEmpty = document.getElementById('achievements-empty');
    if (achEmpty) achEmpty.style.display = hasBadges ? 'none' : 'block';
    celebrateNewBadges(user.badges);

    // C. Today's Plan - built from real state: the existing "daily
    // recommendation" logic, plus real due tasks fetched separately (see
    // loadDashboardPlan), plus a standing suggestion to practice.
    let recText;
    if (!user.current_topic) recText = { icon: 'chat', text: 'Start a course', sub: 'Tell your tutor what you want to learn.', action: "showSection('chat')" };
    else if (user.current_lesson_number < 5) recText = { icon: 'courses', text: `Continue ${user.current_topic}`, sub: `Lesson ${user.current_lesson_number} of 5`, action: "showSection('chat')" };
    else recText = { icon: 'certificates', text: `Take your final assessment`, sub: `Finish ${user.current_topic} on WhatsApp to earn your certificate`, action: null };
    window.__dashPrimaryPlanItem = recText;
    renderDashboardPlan([]);
    loadDashboardPlan();

    document.getElementById('courses-info').innerHTML = user.current_topic
      ? `<p style="margin:0 0 6px 0;font-size:14px;">Topic: <strong>${esc(user.current_topic)}</strong></p><p style="margin:0 0 6px 0;font-size:14px;">Skill level: <strong>${esc(user.skill_level) || 'Not yet assessed'}</strong></p><p style="margin:0;font-size:14px;">Progress: <strong>${user.current_lesson_number || 0}/5 lessons</strong></p>`
      : '<span class="empty">No course started yet.</span>';
  }

  // Today's Plan items: the primary recommendation (always shown) plus any
  // real tasks due today from the Study Planner (never fabricated - if
  // there are none, that item is simply omitted).
  function renderDashboardPlan(dueTasks) {
    const primary = window.__dashPrimaryPlanItem;
    const items = [];
    if (primary) items.push(`
      <div class="dash-plan-item">
        <span class="dash-plan-icon">${I(primary.icon, 16)}</span>
        <div class="dash-plan-text">${esc(primary.text)}<span class="muted-sub">${esc(primary.sub)}</span></div>
        ${primary.action ? `<button class="btn-outline" style="flex-shrink:0;" onclick="${primary.action}">Go</button>` : ''}
      </div>`);
    dueTasks.forEach(t => items.push(`
      <div class="dash-plan-item">
        <span class="dash-plan-icon">${I('planner', 16)}</span>
        <div class="dash-plan-text">${esc(t.title)}<span class="muted-sub">Due today</span></div>
        <button class="btn-outline" style="flex-shrink:0;" onclick="showSection('planner')">Go</button>
      </div>`));
    items.push(`
      <div class="dash-plan-item">
        <span class="dash-plan-icon">${I('quizzes', 16)}</span>
        <div class="dash-plan-text">Take a short quiz<span class="muted-sub">Test what you've learned so far</span></div>
        <button class="btn-outline" style="flex-shrink:0;" onclick="showSection('quizzes')">Go</button>
      </div>`);
    document.getElementById('dash-today-plan').innerHTML = items.join('');
  }
  async function loadDashboardPlan() {
    try {
      const { tasks } = await apiGet('/api/web/planner');
      const today = new Date().toDateString();
      const dueToday = (tasks || []).filter(t => !t.done && t.due_at && new Date(t.due_at).toDateString() === today);
      renderDashboardPlan(dueToday);
    } catch (e) { /* keep the primary + quiz items already shown */ }
  }

  // Gamification "moment" (brief section 10): celebrate a badge the FIRST
  // time it's seen, rather than presenting achievements as a flat database
  // list. Compares against what's already been shown before, so existing
  // users don't get spammed with toasts for badges they've had for weeks -
  // only genuinely new ones on this or a later visit trigger a celebration.
  function celebrateNewBadges(badges) {
    const seenKey = 'eduflow_seen_badges';
    let seen;
    try { seen = JSON.parse(localStorage.getItem(seenKey) || 'null'); } catch (e) { seen = null; }
    const currentCodes = badges.map(b => b.code || b.name);
    if (seen === null) {
      // First time we've ever tracked this - just record the baseline,
      // don't retroactively celebrate badges the user may have earned
      // long ago before this feature existed.
      localStorage.setItem(seenKey, JSON.stringify(currentCodes));
      return;
    }
    const newlyEarned = badges.filter(b => !seen.includes(b.code || b.name));
    newlyEarned.forEach((b, i) => {
      setTimeout(() => {
        showToast(`🎉 New achievement unlocked! ${b.name}${b.description ? ' — ' + b.description : ''}`, 5000);
      }, i * 600);
    });
    localStorage.setItem(seenKey, JSON.stringify(currentCodes));
  }

  // E. AI Tutor quick actions - prefill + focus + let the user confirm
  // before sending, matching the existing "Start new course" pattern
  // elsewhere in the app rather than firing a blind AI query.
  function dashAskTutor() {
    const val = document.getElementById('dash-ai-quick-input').value.trim();
    showSection('chat');
    if (val) { usePrompt(val); document.getElementById('dash-ai-quick-input').value = ''; }
  }
  function dashQuickAction(kind) {
    const prompts = {
      explain: 'Can you explain a topic to me? Ask me what I want explained.',
      quiz: "I'd like a quick quiz to test what I know. What topic should we cover?",
      study: "I'd like help studying. Where should I focus first?",
      plan: "Can you help me create a study plan? Ask me about my goal and timeline.",
    };
    showSection('chat');
    const ta = document.getElementById('chat-textarea');
    ta.value = prompts[kind] || '';
    ta.focus();
    ta.select();
  }

  function loadProgressSection() {
    if (!currentUser) return;
    document.getElementById('progress-stats-row').innerHTML = `
      <div class="stat-card"><div class="label">XP</div><div class="value">${currentUser.xp || 0}</div></div>
      <div class="stat-card accent"><div class="label">Level</div><div class="value" style="font-size:15px">${esc(currentUser.level)}</div></div>
      <div class="stat-card"><div class="label">Lessons Done</div><div class="value">${currentUser.current_lesson_number || 0}/5</div></div>
      <div class="stat-card"><div class="label">Final Score</div><div class="value">${currentUser.final_assessment_score != null ? currentUser.final_assessment_score + '/10' : '-'}</div></div>
    `;
  }

  // ---------- Search (client-side over loaded data) ----------
  let notesCache = [];
  let chatHistoryCache = [];
  // ---------- Platform-wide search ----------
  // Hits a real backend endpoint that queries chat history, notes, tasks,
  // flashcard sets, assignments and certificates directly - not just
  // whatever happens to be cached in the browser - so it can find something
  // said in a chat weeks ago, not just what's currently on screen.
  let searchDebounceTimer = null;
  function handleSearch() {
    const q = document.getElementById('search-input').value.trim();
    const resultsEl = document.getElementById('search-results');
    clearTimeout(searchDebounceTimer);

    if (isGuestMode) {
      resultsEl.innerHTML = '<div class="search-result-item" role="button" tabindex="0" onclick="closeSearchAndGate()">Sign up to search your chats, notes and tasks</div>';
      resultsEl.classList.add('visible');
      return;
    }
    if (!q) { resultsEl.classList.remove('visible'); return; }

    resultsEl.innerHTML = '<div class="search-result-item empty">Searching…</div>';
    resultsEl.classList.add('visible');

    searchDebounceTimer = setTimeout(async () => {
      try {
        const { results } = await apiGet('/api/web/search?q=' + encodeURIComponent(q));
        window.__searchResults = results;
        resultsEl.innerHTML = results.length
          ? results.slice(0, 12).map((r, i) => `<div class="search-result-item" role="button" tabindex="0" onclick="searchResultClick(${i})"><div>${esc(r.label)}</div><div class="meta">${esc(r.meta)}</div></div>`).join('')
          : '<div class="search-result-item empty">No results</div>';
      } catch (e) {
        resultsEl.innerHTML = '<div class="search-result-item empty">Search failed - try again</div>';
      }
    }, 300);
  }
  function closeSearchAndGate() {
    document.getElementById('search-results').classList.remove('visible');
    guestGate('Sign up to search', 'Searching your chats, notes and tasks needs an account so there\'s something to search.');
  }
  function searchResultClick(i) {
    const r = (window.__searchResults || [])[i];
    if (r) showSection(r.section);
    document.getElementById('search-results').classList.remove('visible');
    document.getElementById('search-input').value = '';
  }

  // ---------- Calendar / Notifications ----------
  let lastSeenNotifCount = Number(localStorage.getItem('eduflow_notif_seen') || 0);

  function setNavBadge(btnId, count) {
    const btn = document.getElementById(btnId);
    let badge = btn.querySelector('.notif-count');
    if (count > 0) {
      if (!badge) { badge = document.createElement('span'); badge.className = 'notif-count'; btn.appendChild(badge); }
      badge.textContent = count > 99 ? '99+' : String(count);
    } else if (badge) {
      badge.remove();
    }
  }

  async function loadCalendarAndNotifs() {
    try {
      const { tasks } = await apiGet('/api/web/planner');
      const today = new Date().toDateString();
      const todayTasks = tasks.filter(t => t.due_at && new Date(t.due_at).toDateString() === today);
      const upcoming = tasks.filter(t => !t.done && t.due_at && new Date(t.due_at) >= new Date());
      const overdue = tasks.filter(t => !t.done && t.due_at && new Date(t.due_at) < new Date());

      document.getElementById('calendar-content').innerHTML = todayTasks.length
        ? todayTasks.map(t => `<div class="popover-item">${esc(t.title)}</div>`).join('')
        : '<div class="popover-item empty">Nothing scheduled today.</div>';
      setNavBadge('calendar-btn', todayTasks.length);

      const notifItems = [
        ...overdue.map(t => ({ text: `Overdue: ${t.title}`, ts: new Date(t.due_at).getTime() })),
        ...upcoming.map(t => ({ text: `${t.title} - due ${new Date(t.due_at).toLocaleDateString()}`, ts: new Date(t.due_at).getTime() })),
      ].sort((a, b) => a.ts - b.ts);

      document.getElementById('notif-content').innerHTML = notifItems.length
        ? notifItems.slice(0, 8).map(n => `<div class="popover-item">${esc(n.text)}</div>`).join('')
        : '<div class="popover-item empty">No new notifications.</div>';

      const unseenCount = Math.max(0, notifItems.length - lastSeenNotifCount);
      setNavBadge('notif-btn', unseenCount);
      if (window.setTabAlert) setTabAlert(unseenCount);
      window.__lastNotifTotal = notifItems.length;
    } catch (e) { /* silent */ }
  }

  // Poll periodically so counters stay "live" without a full page reload.
  setInterval(() => { if (currentUser) loadCalendarAndNotifs(); }, 60000);

  // ---------- AI Chat ----------
  const SUGGESTED_PROMPTS = ['Explain photosynthesis.', 'Generate a quiz for me.', 'Summarize this topic.', 'Teach me the basics of Python.'];
  function renderSuggestedPrompts() {
    document.getElementById('suggested-prompts').innerHTML = SUGGESTED_PROMPTS.map(p => `<div class="suggested-prompt" role="button" tabindex="0" onclick="usePrompt('${p.replace(/'/g, "\\'")}')">${p}</div>`).join('');
  }
  function usePrompt(text) { document.getElementById('chat-textarea').value = text; sendChatMessage(); }

  // ---------- Per-mode wording, sessions ----------
  const MODE_UX = {
    tutor: { cont: 'Continue course', fresh: 'New course', start: 'Start new course', prompt: "I'd like to start a new course. What can you teach me?" },
    coding_assistant: { cont: 'Continue coding', fresh: 'New code', start: 'Start new code', prompt: "I'd like to start a new coding project. What can you help me build or learn?" },
    study_partner: { cont: 'Continue topic', fresh: 'New topic', start: 'Start new topic', prompt: "I'd like to study a new topic. What should we dive into?" },
    quiz_master: { cont: 'Continue quiz', fresh: 'New quiz', start: 'Start new quiz', prompt: "I'd like to take a new quiz. What topic should we test?" },
    research_assistant: { cont: 'Continue research', fresh: 'New theme', start: 'Research a new theme', prompt: "I'd like to research a new theme. What should we explore?" },
    career_coach: { cont: 'Continue career', fresh: 'New career', start: 'Start new career coach', prompt: "I'd like to start a new career coaching session. What should we focus on?" },
  };
  // A "new" session's heading is only actually recorded once the user sends
  // their first message in it - avoids littering history with empty,
  // abandoned sessions if they clicked Start new X and changed their mind.
  const pendingNewSession = {};

  function refreshModeSlideout() {
    const mode = document.getElementById('mode-switcher').value;
    const ux = MODE_UX[mode] || MODE_UX.tutor;
    const startLabel = document.getElementById('mode-start-nav-label');
    if (startLabel) startLabel.textContent = ux.start;
    const startBtn = document.getElementById('mode-start-nav-btn');
    if (startBtn) startBtn.title = ux.start;
    const modeLabel = document.getElementById('mode-switcher').selectedOptions[0].text;
    const historySearch = document.getElementById('mode-history-inline-search');
    if (historySearch) historySearch.placeholder = 'Search ' + modeLabel + ' history...';
  }

  // The only way to deliberately start fresh - prefills a mode-appropriate
  // starter prompt. Mode switching itself always auto-continues that mode's
  // last session (see loadModeContinuation), so there's no separate manual
  // continue/new toggle to manage.
  function triggerModeStart() {
    const mode = document.getElementById('mode-switcher').value;
    const ux = MODE_UX[mode] || MODE_UX.tutor;
    pendingNewSession[mode] = true;
    document.getElementById('chat-messages').innerHTML = '';
    showSection('chat');
    showToast(ux.start + ' - tell EduFlow what you have in mind, then hit send.');
    const ta = document.getElementById('chat-textarea');
    ta.value = ux.prompt;
    ta.focus();
    ta.select();
  }

  // Records a lightweight heading marking the start of a new session for a
  // mode, right before the first real message of that session goes out -
  // this is what lets the history panel show clean session titles (like
  // ChatGPT's sidebar) instead of a raw dump of every message ever sent.
  // The heading is drawn from the actual first message so sessions get
  // unique, topic-relevant names instead of a repeated generic label; the
  // date/time is tracked separately via created_at and shown alongside it.
  async function ensureSessionMarker(mode, firstMessageText) {
    if (!pendingNewSession[mode] || isGuestMode) return;
    pendingNewSession[mode] = false;
    let heading = (firstMessageText || '').trim().replace(/\s+/g, ' ');
    heading = heading.length > 60 ? heading.slice(0, 60).trim() + '…' : heading;
    if (!heading) {
      const modeLabel = (document.querySelector(`#mode-switcher option[value="${mode}"]`) || {}).textContent || mode;
      heading = `${modeLabel} session`;
    }
    try { await apiPost('/api/web/chat/session', { mode, heading }); } catch (e) { /* non-critical */ }
  }

  // Switching modes always shows that mode's own last session and scrolls
  // to the bottom of it - no manual "continue" step needed.
  async function loadModeContinuation(mode) {
    if (isGuestMode) return;
    try {
      const { messages } = await apiGet('/api/web/chat/mode-continue?mode=' + encodeURIComponent(mode));
      const box = document.getElementById('chat-messages');
      box.innerHTML = '';
      messages.forEach(m => appendMessage(m.role, m.content, false));
      scrollChatToBottom(false);
    } catch (e) { /* silent */ }
  }

  // ---------- Per-mode history search (inline box + dropdown) ----------
  // Shows session HEADINGS only - never raw message text - matching how
  // ChatGPT's own history search surfaces titles rather than message
  // excerpts. Clicking a heading resumes that whole session. Hidden
  // entirely for guests (see applyGuestLocks) since nothing is recorded
  // for them to search.
  let modeHistoryDebounce = null;
  function handleModeHistoryFocus() {
    const mode = document.getElementById('mode-switcher').value;
    fetchModeHistory(mode, document.getElementById('mode-history-inline-search').value.trim());
  }
  function searchModeHistory() {
    clearTimeout(modeHistoryDebounce);
    const mode = document.getElementById('mode-switcher').value;
    const q = document.getElementById('mode-history-inline-search').value.trim();
    modeHistoryDebounce = setTimeout(() => fetchModeHistory(mode, q), 250);
  }
  function formatSessionTimestamp(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' · ' +
      d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }

  async function fetchModeHistory(mode, q) {
    if (isGuestMode) return;
    const resultsEl = document.getElementById('mode-history-results');
    resultsEl.classList.add('visible');
    resultsEl.innerHTML = '<div class="mode-history-item">Loading…</div>';
    try {
      const url = '/api/web/chat/mode-sessions?mode=' + encodeURIComponent(mode) + (q ? '&q=' + encodeURIComponent(q) : '');
      const { sessions } = await apiGet(url);
      window.__modeSessions = sessions;
      resultsEl.innerHTML = sessions.length
        ? sessions.map((s, i) => `<div class="mode-history-item" role="button" tabindex="0" onclick="useModeSessionItem(${i})">
            <span class="hist-icon">${I('chat', 15)}</span>
            <div style="min-width:0;">
              <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(s.heading)}</div>
              <div style="font-size: 12px;color:var(--muted);">${esc(formatSessionTimestamp(s.created_at))}</div>
            </div>
          </div>`).join('')
        : '<div class="mode-history-item" style="color:var(--muted);cursor:default;">Nothing here yet.</div>';
    } catch (e) {
      resultsEl.innerHTML = '<div class="mode-history-item" style="color:var(--muted);cursor:default;">Couldn\'t load history.</div>';
    }
  }
  async function useModeSessionItem(i) {
    const s = (window.__modeSessions || [])[i];
    if (!s) return;
    const mode = document.getElementById('mode-switcher').value;
    document.getElementById('mode-history-results').classList.remove('visible');
    document.getElementById('mode-history-inline-search').value = '';
    showSection('chat');
    try {
      const { messages } = await apiGet('/api/web/chat/mode-session-messages?sessionId=' + encodeURIComponent(s.id) + '&mode=' + encodeURIComponent(mode));
      const box = document.getElementById('chat-messages');
      box.innerHTML = '';
      messages.forEach(m => appendMessage(m.role, m.content, false));
      scrollChatToBottom(false);
    } catch (e) { showToast('Could not load that session.'); }
  }

  async function loadChatHistory() {
    try {
      const { history } = await apiGet('/api/web/chat/history');
      chatHistoryCache = history;
      const box = document.getElementById('chat-messages');
      box.innerHTML = '';
      history.forEach(m => appendMessage(m.role, m.content, false));
      scrollChatToBottom(false);
      // Suggestions are a cold-start aid only - once there's already a
      // conversation, they'd just be clutter, so skip rendering them.
      const suggestBox = document.getElementById('suggested-prompts');
      if (suggestBox) suggestBox.innerHTML = history.length ? '' : suggestBox.innerHTML;
    } catch (e) { showToast("Couldn't load your chat history - check your connection and try again."); }
  }

  function appendMessage(role, content, animate, noScroll) {
    const box = document.getElementById('chat-messages');
    const row = document.createElement('div');
    row.className = 'msg-row ' + role;
    // data-raw carries the original, unmodified text (URI-encoded so it's
    // always safe as an attribute value) - Copy/Export/etc. read from this
    // rather than the rendered HTML, so inline code-block chrome (labels,
    // copy buttons) never leaks into what actually gets copied.
    row.innerHTML = `
      <div>
        <div class="msg-bubble" data-raw="${encodeURIComponent(content)}">${renderMessageContent(content, role)}</div>
        ${role === 'assistant' ? `<div class="msg-actions">
          <button onclick="copyMessage(this)" title="Copy">Copy</button>
          <button onclick="regenerateLast(this)" title="Regenerate">Regenerate</button>
          <button onclick="likeMessage(this)" title="Like">Like</button>
          <button onclick="dislikeMessage(this)" title="Dislike">Dislike</button>
          <button onclick="exportMessage(this)" title="Export">Export</button>
        </div>` : ''}
        ${role === 'assistant' && content.length >= 300 ? `<div class="msg-study">
          <span class="msg-study-label">Practice this:</span>
          <button type="button" onclick="studyAction(this, 'quiz')">Quiz me</button>
          <button type="button" onclick="studyAction(this, 'flashcards')">Make flashcards</button>
          <button type="button" onclick="studyAction(this, 'note')">Save to notes</button>
        </div>` : ''}
      </div>`;
    box.appendChild(row);
    if (!noScroll) scrollChatToBottom();
    updateScrollDownBtn();
    return row;
  }

  // ---- Minimal, safe Markdown renderer for AI replies (all text is HTML-escaped first) ----
  function mdInline(escaped) {
    const codes = [];
    let s = escaped.replace(/`([^`\n]+)`/g, (_, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = s.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>')
         .replace(/(^|[^*\w])\*([^*\s][^*\n]*?)\*(?![*\w])/g, '$1<em>$2</em>')
         .replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)"']+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return s.replace(/\u0000(\d+)\u0000/g, (_, n) => '<code class="md-code">' + codes[n] + '</code>');
  }
  function mdSplitRow(r) {
    let t = r.trim();
    if (t.startsWith('|')) t = t.slice(1);
    if (t.endsWith('|')) t = t.slice(0, -1);
    return t.split('|').map(c => c.trim());
  }
  function mdToHtml(text) {
    const lines = String(text == null ? '' : text).replace(/\r\n/g, '\n').split('\n');
    const isRule = l => /^\s*([-*_])(\s*\1){2,}\s*$/.test(l);
    const isSep = l => l.includes('-') && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l);
    const itemRe = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
    let out = '', para = [], i = 0;
    const flush = () => {
      if (para.length) { out += '<p>' + mdInline(esc(para.join('\n'))).replace(/\n/g, '<br>') + '</p>'; para = []; }
    };
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { flush(); i++; continue; }
      let m;
      if ((m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/))) {
        flush(); out += '<h' + m[1].length + '>' + mdInline(esc(m[2])) + '</h' + m[1].length + '>'; i++; continue;
      }
      if (isRule(line)) { flush(); out += '<hr>'; i++; continue; }
      if (line.includes('|') && i + 1 < lines.length && isSep(lines[i + 1])) {
        flush();
        const head = mdSplitRow(line); i += 2; const rows = [];
        while (i < lines.length && lines[i].trim() && lines[i].includes('|')) { rows.push(mdSplitRow(lines[i])); i++; }
        out += '<table><thead><tr>' + head.map(c => '<th>' + mdInline(esc(c)) + '</th>').join('') + '</tr></thead><tbody>'
          + rows.map(r => '<tr>' + r.map(c => '<td>' + mdInline(esc(c)) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
        continue;
      }
      if (/^>\s?/.test(line)) {
        flush(); const q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, '')); i++; }
        out += '<blockquote>' + mdInline(esc(q.join('\n'))).replace(/\n/g, '<br>') + '</blockquote>'; continue;
      }
      if ((m = line.match(itemRe))) {
        flush();
        const ordered = /\d/.test(m[2]); const start = parseInt(m[2], 10); const items = [];
        while (i < lines.length) {
          const mm = lines[i].match(itemRe);
          if (mm && /\d/.test(mm[2]) !== ordered) break;
          if (mm) { items.push({ indent: mm[1].replace(/\t/g, '    ').length, text: mm[3] }); i++; continue; }
          if (!lines[i].trim()) { let j = i; while (j < lines.length && !lines[j].trim()) j++; const nx = j < lines.length ? lines[j].match(itemRe) : null; if (nx && /\d/.test(nx[2]) === ordered) { i = j; continue; } }
          break;
        }
        const tag = ordered ? 'ol' : 'ul';
        out += '<' + tag + (ordered && start > 1 ? ' start="' + start + '"' : '') + '>'
          + items.map(it => '<li' + (it.indent >= 2 ? ' style="margin-left:' + Math.min(it.indent, 8) * 8 + 'px"' : '') + '>' + mdInline(esc(it.text)) + '</li>').join('')
          + '</' + tag + '>';
        continue;
      }
      para.push(line); i++;
    }
    flush();
    return out;
  }

  // Splits message content on fenced ```code``` blocks so each one renders
  // with its own copy button at the edge of that section - but everything
  // still lives inside the ONE message bubble, not as separate messages.
  function renderMessageContent(content, role) {
    const regex = /```(\w*)\n?([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0, match;
    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) parts.push({ type: 'text', value: content.slice(lastIndex, match.index) });
      parts.push({ type: 'code', lang: match[1], value: match[2].replace(/\n$/, '') });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < content.length) parts.push({ type: 'text', value: content.slice(lastIndex) });
    if (!parts.length) parts.push({ type: 'text', value: content });

    return parts.map(p => {
      if (p.type === 'code') {
        return `<div class="code-block">
          <div class="code-block-header">
            <span>${esc(p.lang || 'code')}</span>
            <button class="code-copy-btn" onclick="copyCodeBlock(this)" title="Copy code" aria-label="Copy code">${I('copy', 13)}</button>
          </div>
          <pre><code>${esc(p.value)}</code></pre>
        </div>`;
      }
      if (!p.value) return '';
      if (role === 'assistant') return `<div class="msg-text-segment md">${mdToHtml(p.value)}</div>`;
      return `<span class="msg-text-segment">${esc(p.value)}</span>`;
    }).join('');
  }

  function copyCodeBlock(btn) {
    const code = btn.closest('.code-block').querySelector('code');
    navigator.clipboard.writeText(code.textContent);
    const original = btn.innerHTML;
    btn.innerHTML = I('check', 13);
    btn.classList.add('action-confirmed');
    setTimeout(() => { btn.innerHTML = original; btn.classList.remove('action-confirmed'); }, 1200);
  }

  // The scrollable element is #chat-scroll (the parent), not #chat-messages
  // itself - #chat-messages has no overflow set, so scrolling it directly was
  // a no-op. requestAnimationFrame lets the browser finish layout for the
  // just-added bubble before we measure scrollHeight, so it lands correctly
  // even right after a long reply streams in.
  function scrollChatToBottom(smooth) {
    const scroller = document.getElementById('chat-scroll');
    if (!scroller) return;
    requestAnimationFrame(() => {
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: smooth === false ? 'auto' : 'smooth' });
    });
  }

  // Small shared "success" pulse so any remark action gives the user
  // immediate, unmistakable confirmation that the click registered.
  function confirmAction(btn, label, revertLabel, revertMs) {
    btn.textContent = label;
    btn.classList.add('action-confirmed');
    setTimeout(() => btn.classList.remove('action-confirmed'), 300);
    if (revertLabel) setTimeout(() => { btn.textContent = revertLabel; }, revertMs || 1500);
  }

  function bubbleTextFor(btn) {
    const bubble = btn.closest('div').parentElement.querySelector('.msg-bubble');
    return bubble.dataset.raw ? decodeURIComponent(bubble.dataset.raw) : bubble.textContent;
  }

  function copyMessage(btn) {
    navigator.clipboard.writeText(bubbleTextFor(btn));
    confirmAction(btn, 'Copied', 'Copy', 1500);
  }

  function likeMessage(btn) {
    const row = btn.closest('.msg-actions');
    const dislikeBtn = row.querySelector('button[title="Dislike"]');
    confirmAction(btn, 'Liked');
    if (dislikeBtn) dislikeBtn.textContent = 'Dislike';
  }

  let reviewTargetBtn = null;
  let reviewStars = 0;
  function dislikeMessage(btn) {
    confirmAction(btn, 'Disliked');
    const likeBtn = btn.closest('.msg-actions').querySelector('button[title="Like"]');
    if (likeBtn) likeBtn.textContent = 'Like';
    reviewTargetBtn = btn;
    reviewStars = 0;
    document.getElementById('review-text').value = '';
    document.getElementById('review-msg').textContent = '';
    renderReviewStars();
    openModal('review-modal');
  }
  function renderReviewStars() {
    const row = document.getElementById('review-star-row');
    row.innerHTML = [1, 2, 3, 4, 5].map(n => `<button type="button" class="${n <= reviewStars ? 'active' : ''}" onclick="setReviewStars(${n})">★</button>`).join('');
  }
  function setReviewStars(n) { reviewStars = n; renderReviewStars(); }
  async function submitReview() {
    const text = document.getElementById('review-text').value.trim();
    const msgEl = document.getElementById('review-msg');
    try {
      await apiPost('/api/web/feedback', { message: `[Response review - ${reviewStars || 'no'} star(s)] ${text || '(no comment)'}` });
      msgEl.textContent = 'Thanks - your review was submitted.';
      showToast('Thanks for the feedback!');
      setTimeout(() => closeModal('review-modal'), 900);
    } catch (e) {
      msgEl.textContent = e.message || 'Failed to submit review.';
    }
  }

  let exportTargetBtn = null;
  function exportMessage(btn) {
    exportTargetBtn = btn;
    openModal('export-modal');
  }
  function doExportDownload() {
    const text = bubbleTextFor(exportTargetBtn);
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'eduflow-response.txt';
    a.click();
    closeModal('export-modal');
    confirmAction(exportTargetBtn, 'Exported', 'Export', 1500);
  }
  async function doExportShare() {
    const text = bubbleTextFor(exportTargetBtn);
    closeModal('export-modal');
    if (navigator.share) {
      try { await navigator.share({ text, title: 'EduFlow response' }); } catch (e) { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      showToast('Sharing isn\'t supported on this device - copied to clipboard instead.');
    }
    confirmAction(exportTargetBtn, 'Exported', 'Export', 1500);
  }

  function openModal(id) { document.getElementById(id).classList.add('visible'); }

  function clearAllLocalData() {
    ['eduflow_avatar', 'eduflow_chat_draft', 'eduflow_lang', 'eduflow_theme', 'eduflow_voice_uri',
      'eduflow_voice_chosen', 'eduflow_voice_input_lang', 'eduflow_notifs_enabled', 'eduflow_notif_sound',
      'eduflow_notif_seen'].forEach(k => localStorage.removeItem(k));
    showToast('Local data cleared on this device.');
  }

  let lastUserMessage = '';
  function regenerateLast(btn) {
    if (btn) confirmAction(btn, 'Regenerating...', 'Regenerate', 2000);
    if (lastUserMessage) sendChatMessage(lastUserMessage, true);
  }

  // ---- Chat: "thinking" spinner + fast typing effect for AI replies ----
  // ---- Accessible in-app dialog (replaces browser alert/confirm/prompt) ----
  function uiDialog(opts) {
    return new Promise((resolve) => {
      const opener = document.activeElement;
      const overlay = document.createElement('div');
      overlay.className = 'ui-dialog-overlay';
      const select = opts.options
        ? '<select aria-label="' + esc(opts.title) + '">' + opts.options.map(o => '<option value="' + esc(o.value) + '">' + esc(o.label) + '</option>').join('') + '</select>' : '';
      overlay.innerHTML = '<div class="ui-dialog" role="dialog" aria-modal="true" aria-labelledby="ui-dialog-title">'
        + '<h2 id="ui-dialog-title">' + esc(opts.title) + '</h2>'
        + (opts.message ? '<p>' + esc(opts.message) + '</p>' : '') + select
        + '<div class="ui-dialog-actions"><button type="button" class="btn-outline" data-act="cancel">' + esc(opts.cancelLabel || 'Cancel') + '</button>'
        + '<button type="button" class="' + (opts.danger ? 'btn-danger' : 'btn') + '" data-act="ok">' + esc(opts.confirmLabel || 'OK') + '</button></div></div>';
      document.body.appendChild(overlay);
      const done = (ok) => {
        const value = overlay.querySelector('select') ? overlay.querySelector('select').value : '';
        overlay.remove(); document.removeEventListener('keydown', onKey, true);
        if (opener && opener.focus) opener.focus();
        resolve({ ok, value });
      };
      const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); done(false); } };
      document.addEventListener('keydown', onKey, true);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) done(false); });
      overlay.querySelector('[data-act="cancel"]').onclick = () => done(false);
      overlay.querySelector('[data-act="ok"]').onclick = () => done(true);
      overlay.querySelector('[data-act="ok"]').focus();
    });
  }

  // ---- Accessibility helpers ----
  // Give every unlabeled control and icon-only button an accessible name.
  function labelFormControls() {
    document.querySelectorAll('input:not([type=hidden]):not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby]), select:not([aria-label]):not([aria-labelledby])').forEach((el) => {
      if (el.id && document.querySelector('label[for="' + el.id + '"]')) return;
      if (el.closest('label')) return;
      const name = el.getAttribute('placeholder') || el.getAttribute('title') || (el.id || el.name || '').replace(/[-_]+/g, ' ').trim();
      if (name) el.setAttribute('aria-label', name.charAt(0).toUpperCase() + name.slice(1));
    });
    document.querySelectorAll('button:not([aria-label])').forEach((b) => {
      if (!b.textContent.trim() && b.title) b.setAttribute('aria-label', b.title);
    });
  }
  // Elements with role="button" respond to Enter and Space like real buttons.
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role="button"][tabindex]') && !/^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(e.target.tagName)) {
      e.preventDefault(); e.target.click();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    labelFormControls();
    let t; new MutationObserver(() => { clearTimeout(t); t = setTimeout(labelFormControls, 300); }).observe(document.body, { childList: true, subtree: true });
  });

  // ---- "Practice this": every lesson in the chat links into quizzes, flashcards and notes ----
  function studyTopicFor(row) {
    const bubble = row.querySelector('.msg-bubble');
    const heading = bubble && bubble.querySelector('h1, h2, h3');
    let t = heading ? heading.textContent : '';
    if (!t) {
      let prev = row.previousElementSibling;
      while (prev && !prev.classList.contains('user')) prev = prev.previousElementSibling;
      if (prev) t = (prev.querySelector('.msg-bubble') || prev).textContent;
    }
    t = (t || 'This lesson').replace(/^(lesson|unit|chapter)\s*\d+\s*[:\-\u2013]\s*/i, '').replace(/^\d+[.)]\s*/, '').trim();
    return t.length > 80 ? t.slice(0, 77) + '...' : t;
  }
  async function studyAction(btn, kind) {
    if (isGuestMode) { showToast('Sign up free to turn lessons into quizzes, flashcards and notes.'); return; }
    const row = btn.closest('.msg-row');
    const topic = studyTopicFor(row);
    if (kind === 'quiz') {
      showSection('quizzes');
      document.getElementById('quiz-topic-input').value = topic;
      generateQuiz(document.querySelector('#quiz-topic-input + button'));
      return;
    }
    const raw = decodeURIComponent(row.querySelector('.msg-bubble').getAttribute('data-raw') || '');
    const label = btn.textContent;
    btn.disabled = true;
    try {
      if (kind === 'flashcards') {
        btn.textContent = 'Creating...';
        await apiPost('/api/web/flashcards/generate', { topic, count: 8 });
        btn.textContent = 'Flashcards ready';
        showToast('Flashcards created. Find them under Practice > Flashcards.');
      } else {
        btn.textContent = 'Saving...';
        await apiPost('/api/web/notes', { title: topic, content: raw });
        btn.textContent = 'Saved to notes';
        showToast('Saved to your notes.');
      }
    } catch (e) {
      btn.textContent = label;
      btn.disabled = false;
      showToast('Could not do that right now. Please try again.');
    }
  }

  function showThinkingRow() {
    const box = document.getElementById('chat-messages');
    const row = document.createElement('div');
    row.className = 'msg-row assistant thinking';
    row.innerHTML = '<div><div class="msg-bubble"><span class="spinner-ring" role="status" aria-label="Thinking"></span></div></div>';
    box.appendChild(row);
    return row;
  }
  // When a reply starts, park the user's question at the top of the view so the start of the
  // answer is what they see. The page never auto-scrolls while the answer is being written.
  function startGenerationScroll() {
    const scroller = document.getElementById('chat-scroll');
    if (!scroller) return;
    scroller.classList.add('reserve-space');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const rows = document.querySelectorAll('#chat-messages .msg-row.user');
      const last = rows[rows.length - 1];
      if (!last) return;
      const delta = last.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 12;
      scroller.scrollTo({ top: scroller.scrollTop + delta, behavior: 'smooth' });
    }));
  }
  function updateScrollDownBtn() {
    const scroller = document.getElementById('chat-scroll');
    const box = document.getElementById('chat-messages');
    const btn = document.getElementById('scroll-down-btn');
    if (!scroller || !box || !btn) return;
    const below = box.getBoundingClientRect().bottom - scroller.getBoundingClientRect().bottom;
    btn.classList.toggle('show', below > 80);
  }
  let followBottom = false; // true after the user clicks the arrow, until they scroll by hand
  function jumpToBottom() {
    const scroller = document.getElementById('chat-scroll');
    const box = document.getElementById('chat-messages');
    if (!scroller || !box) return;
    const below = box.getBoundingClientRect().bottom - scroller.getBoundingClientRect().bottom;
    scroller.scrollTop += below + 24; // instant, no animation
  }
  function scrollChatDown() {
    jumpToBottom();
    followBottom = !!activeGenerations['chat']; // keep following only while a reply is still being written
    updateScrollDownBtn();
  }
  document.addEventListener('DOMContentLoaded', () => {
    const scroller = document.getElementById('chat-scroll');
    if (scroller) {
      scroller.addEventListener('scroll', updateScrollDownBtn, { passive: true });
      ['wheel', 'touchmove'].forEach(ev => scroller.addEventListener(ev, () => { followBottom = false; }, { passive: true }));
    }
    window.addEventListener('resize', updateScrollDownBtn);
  });
  async function typeReply(content, signal, thinkingRow) {
    if (thinkingRow) thinkingRow.remove();
    followBottom = false;
    const logBox = document.getElementById('chat-messages');
    logBox.setAttribute('aria-busy', 'true');
    const row = appendMessage('assistant', content, undefined, true); // no auto-scroll
    const bubble = row.querySelector('.msg-bubble');
    const actions = row.querySelector('.msg-actions');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !content) { logBox.removeAttribute('aria-busy'); return row; }
    const partial = (txt) => ((txt.match(/```/g) || []).length % 2 ? txt + '\n```' : txt); // close an open code fence while typing
    const perFrame = Math.max(3, Math.ceil(content.length / 220)); // always finishes in about 3-4 seconds
    const study = row.querySelector('.msg-study');
    if (actions) actions.style.visibility = 'hidden';
    if (study) study.style.visibility = 'hidden';
    bubble.innerHTML = '';
    let shown = 0;
    while (shown < content.length) {
      if (signal && signal.aborted) break;
      shown = Math.min(content.length, shown + perFrame);
      bubble.innerHTML = renderMessageContent(partial(content.slice(0, shown)), 'assistant');
      if (followBottom) jumpToBottom();
      updateScrollDownBtn();
      await new Promise(r => requestAnimationFrame(r));
    }
    if (shown < content.length) {           // stopped by the user: keep what was typed
      bubble.setAttribute('data-raw', encodeURIComponent(content.slice(0, shown)));
    } else {
      bubble.innerHTML = renderMessageContent(content, 'assistant');
    }
    if (actions) actions.style.visibility = '';
    if (study) study.style.visibility = '';
    logBox.removeAttribute('aria-busy');
    followBottom = false;
    updateScrollDownBtn();
    return row;
  }

  async function sendChatMessage(forcedText, isRegenerate) {
    const textarea = document.getElementById('chat-textarea');
    const text = forcedText || textarea.value.trim();
    if (!text) return;
    if (!isRegenerate) {
      appendMessage('user', text);
      lastUserMessage = text;
      textarea.value = '';
      localStorage.removeItem('eduflow_chat_draft');
      // Suggestions are only useful before the first prompt - once the user
      // has sent one (typed or picked), they've served their purpose.
      const suggestBox = document.getElementById('suggested-prompts');
      if (suggestBox) suggestBox.innerHTML = '';
    }
    const mode = document.getElementById('mode-switcher').value;
    if (!isRegenerate && !isGuestMode) await ensureSessionMarker(mode, text);
    const sendBtn = document.getElementById('chat-send-btn');
    const signal = beginGeneration('chat', sendBtn);
    const thinking = showThinkingRow();
    startGenerationScroll();
    try {
      if (isGuestMode) {
        const res = await fetch('/api/web/guest/chat', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }), signal,
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 429) {
          appendMessage('assistant', data.message || "You've used today's free guest messages.");
          guestGate("You've reached today's guest limit", data.message || 'Sign up free to keep chatting and unlock every AI tool.');
          return;
        }
        if (!res.ok) throw new Error(data.error || 'Request failed');
        await typeReply(data.reply, signal, thinking);
        if (voiceOutputEnabled) speak(data.reply);
      } else {
        const { reply } = await apiPost('/api/web/chat', { message: text, mode }, signal);
        await typeReply(reply, signal, thinking);
        if (voiceOutputEnabled) speak(reply);
      }
    } catch (e) {
      if (e.name === 'AbortError') { appendMessage('assistant', 'Stopped.'); }
      else { appendMessage('assistant', 'Sorry, something went wrong. Try again.'); }
    } finally {
      thinking.remove();
      const cs = document.getElementById('chat-scroll');
      if (cs) cs.classList.remove('reserve-space');
      updateScrollDownBtn();
      endGeneration('chat', () => sendChatMessage());
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const ta = document.getElementById('chat-textarea');
    if (ta) {
      ta.value = localStorage.getItem('eduflow_chat_draft') || '';
      const autoSize = () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; };
      ta.addEventListener('input', () => { localStorage.setItem('eduflow_chat_draft', ta.value); autoSize(); });
      autoSize();
    }
  });

  function handleFileAttach(e) {
    const file = e.target.files[0];
    if (!file) return;
    document.getElementById('chat-file-name').textContent = 'Attached: ' + file.name + ' (content analysis coming soon)';
  }
  document.addEventListener('click', (e) => {
    if (e.target.id === 'attach-btn' || e.target.closest('#attach-btn')) document.getElementById('file-input').click();
    if (e.target.id === 'camera-btn' || e.target.closest('#camera-btn')) document.getElementById('camera-input').click();
  });

  // Voice input/output (browser-native, free)
  let recognizing = false;
  let recognition = null;
  function toggleVoiceInput() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { showToast('Voice input is not supported in this browser.'); return; }
    if (recognizing) { recognition.stop(); return; }
    recognition = new SR();
    recognition.lang = localStorage.getItem('eduflow_voice_input_lang') || 'en-US';
    recognition.onresult = (e) => { document.getElementById('chat-textarea').value += e.results[0][0].transcript; };
    recognition.onend = () => { recognizing = false; };
    recognition.start();
    recognizing = true;
  }
  let voiceOutputEnabled = false;
  function toggleVoiceOutput() {
    voiceOutputEnabled = !voiceOutputEnabled;
    document.getElementById('voice-out-btn').style.color = voiceOutputEnabled ? 'var(--accent)' : '';
    // First time voice output is turned on, if the user hasn't picked a
    // read-back voice yet, ask once - otherwise they're stuck with whatever
    // the browser defaults to until they dig into Settings themselves.
    if (voiceOutputEnabled && !localStorage.getItem('eduflow_voice_chosen')) {
      promptFirstTimeVoiceChoice();
    }
  }
  async function promptFirstTimeVoiceChoice() {
    if (!window.speechSynthesis) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return; // voice list not loaded yet - settings page will still let them pick later
    const picked = await uiDialog({
      title: 'Choose a voice',
      message: 'Pick the voice used to read replies aloud. You can change it any time in Settings.',
      options: voices.slice(0, 6).map((v, i) => ({ value: String(i), label: `${v.name} (${v.lang})` })),
      confirmLabel: 'Use this voice', cancelLabel: 'Decide later',
    });
    const idx = picked.ok ? parseInt(picked.value, 10) : -1;
    if (picked.ok && voices[idx]) {
      setPreferredVoice(voices[idx].voiceURI);
      const select = document.getElementById('settings-voice-select');
      if (select) select.value = voices[idx].voiceURI;
    } else {
      // They ignored it - mark as "asked" so we don't nag again; they can
      // still change it any time from Settings, per the original request.
      localStorage.setItem('eduflow_voice_chosen', '1');
    }
  }
  function speak(text) {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    const savedVoiceURI = localStorage.getItem('eduflow_voice_uri');
    if (savedVoiceURI) {
      const match = window.speechSynthesis.getVoices().find(v => v.voiceURI === savedVoiceURI);
      if (match) u.voice = match;
    }
    window.speechSynthesis.speak(u);
  }

  // ---------- Learning Paths ----------
  async function generateLearningPath(btnEl) {
    const goal = document.getElementById('learning-goal-input').value.trim();
    if (!goal) return;
    const resultEl = document.getElementById('learning-path-result');
    resultEl.classList.remove('empty');
    resultEl.textContent = 'Generating...';
    const signal = beginGeneration('learning-path', btnEl);
    try {
      const { path } = await apiPost('/api/web/learning-path', { goal }, signal);
      resultEl.textContent = path;
    } catch (e) {
      resultEl.textContent = e.name === 'AbortError' ? 'Stopped.' : 'Failed to generate a path right now.';
    } finally {
      endGeneration('learning-path', () => generateLearningPath(btnEl));
    }
  }

  // ---------- Notes ----------
  async function loadNotes() {
    try {
      const { notes } = await apiGet('/api/web/notes');
      notesCache = notes;
      document.getElementById('notes-list').innerHTML = notes.length
        ? notes.map(n => `<div class="list-item"><span>${esc(n.title)}</span><button class="btn-danger" onclick="deleteNote('${n.id}')">Delete</button></div>`).join('')
        : '<span class="empty">No notes yet - jot down key points while you learn.</span>';
    } catch (e) { showLoadError('notes-list', 'notes', 'loadNotes()'); }
  }
  async function createNote() {
    const title = document.getElementById('note-title-input').value.trim();
    if (!title) return;
    await apiPost('/api/web/notes', { title, content: '' });
    document.getElementById('note-title-input').value = '';
    loadNotes();
  }
  async function deleteNote(id) { await apiDelete('/api/web/notes/' + id); loadNotes(); }

  // ---------- Study Planner ----------
  // ---------- Calendar & Tasks (full page) ----------
  let calendarMonthCursor = new Date();
  calendarMonthCursor.setDate(1);
  let calendarFilterDate = null; // 'YYYY-MM-DD' or null for "show all"
  let plannerTasksCache = [];

  function shiftCalendarMonth(delta) {
    calendarMonthCursor.setMonth(calendarMonthCursor.getMonth() + delta);
    renderCalendarGrid();
  }
  function clearCalendarFilter() {
    calendarFilterDate = null;
    document.getElementById('planner-clear-filter-btn').style.display = 'none';
    document.getElementById('planner-list-heading').textContent = 'All tasks';
    renderCalendarGrid();
    renderPlannerList();
  }
  function pickCalendarDate(dateStr) {
    calendarFilterDate = dateStr;
    document.getElementById('task-due-input').value = dateStr;
    document.getElementById('planner-clear-filter-btn').style.display = '';
    document.getElementById('planner-list-heading').textContent = 'Tasks on ' + new Date(dateStr + 'T00:00:00').toLocaleDateString();
    renderCalendarGrid();
    renderPlannerList();
  }

  // IMPORTANT: use LOCAL date parts here, not toISOString() (which converts to
  // UTC first). For timezones ahead of UTC, that conversion rolled dates back
  // by a day and put task dots on the wrong calendar cell.
  function toDateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function renderCalendarGrid() {
    const label = document.getElementById('calendar-month-label');
    const grid = document.getElementById('calendar-grid');
    if (!label || !grid) return;
    const year = calendarMonthCursor.getFullYear();
    const month = calendarMonthCursor.getMonth();
    label.textContent = calendarMonthCursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    const tasksByDate = {};
    plannerTasksCache.forEach(t => {
      if (!t.due_at) return;
      const key = toDateKey(new Date(t.due_at));
      (tasksByDate[key] = tasksByDate[key] || []).push(t);
    });

    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = toDateKey(new Date());

    const dowRow = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<div class="calendar-dow">${d}</div>`).join('');
    let cells = '';
    for (let i = 0; i < startOffset; i++) cells += '<div class="calendar-cell empty"></div>';
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const key = toDateKey(dateObj);
      const dayTasks = tasksByDate[key] || [];
      const classes = ['calendar-cell'];
      if (key === todayKey) classes.push('today');
      if (key === calendarFilterDate) classes.push('selected');
      cells += `<div class="${classes.join(' ')}" role="button" tabindex="0" onclick="pickCalendarDate('${key}')">
        <span class="cal-day-num">${day}</span>
        ${dayTasks.length ? `<span class="cal-task-count">${dayTasks.length} task${dayTasks.length > 1 ? 's' : ''}</span><span class="cal-task-dot"></span>` : ''}
      </div>`;
    }
    grid.innerHTML = dowRow + cells;
  }

  function renderPlannerList() {
    const listEl = document.getElementById('planner-list');
    if (!listEl) return;
    let tasks = plannerTasksCache;
    if (calendarFilterDate) tasks = tasks.filter(t => t.due_at && toDateKey(new Date(t.due_at)) === calendarFilterDate);
    tasks = [...tasks].sort((a, b) => {
      if (!!a.done !== !!b.done) return a.done ? 1 : -1;
      return (a.due_at ? new Date(a.due_at).getTime() : Infinity) - (b.due_at ? new Date(b.due_at).getTime() : Infinity);
    });
    listEl.innerHTML = tasks.length
      ? tasks.map(t => `<div class="list-item"><span style="${t.done ? 'text-decoration:line-through;color:var(--muted)' : ''}"><input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask('${t.id}', this.checked)"/> ${esc(t.title)} ${t.due_at ? '- ' + new Date(t.due_at).toLocaleDateString() : ''}</span><button class="btn-danger" onclick="deleteTask('${t.id}')">Delete</button></div>`).join('')
      : `<span class="empty">${calendarFilterDate ? 'Nothing scheduled on this day.' : 'No tasks yet.'}</span>`;
  }

  async function loadPlanner() {
    try {
      const { tasks } = await apiGet('/api/web/planner');
      plannerTasksCache = tasks;
      renderCalendarGrid();
      renderPlannerList();
    } catch (e) { showToast("Couldn't load your calendar - check your connection and try again."); }
  }
  async function createTask() {
    const title = document.getElementById('task-title-input').value.trim();
    const due = document.getElementById('task-due-input').value; // "YYYY-MM-DD" or ''
    if (!title) return;
    // A bare "YYYY-MM-DD" string is parsed by JS as UTC midnight, not local
    // midnight - for timezones west of UTC that silently shifts the task to
    // the previous day. Build the date from local parts instead.
    let due_at = null;
    if (due) {
      const [y, m, d] = due.split('-').map(Number);
      due_at = new Date(y, m - 1, d, 9, 0, 0).toISOString();
    }
    await apiPost('/api/web/planner', { title, due_at });
    document.getElementById('task-title-input').value = '';
    showToast('Task scheduled.');
    loadPlanner();
    loadCalendarAndNotifs();
  }
  async function toggleTask(id, done) { await apiPatch('/api/web/planner/' + id, { done }); loadPlanner(); }
  async function deleteTask(id) { await apiDelete('/api/web/planner/' + id); loadPlanner(); }

  // ---------- Leaderboard ----------
  const LEADERBOARD_EMPTY_HTML = `<p>The leaderboard fills up as learners earn XP. Complete lessons and quizzes to climb the ranks.</p><button class="btn-outline" onclick="showSection('chat')">Start earning XP</button>`;
  async function loadLeaderboard() {
    try {
      const { leaderboard } = await apiGet('/api/web/leaderboard');
      const table = document.getElementById('leaderboard-table');
      const emptyEl = document.getElementById('leaderboard-empty');
      if (!leaderboard.length) {
        emptyEl.innerHTML = LEADERBOARD_EMPTY_HTML;
        emptyEl.style.display = 'block';
        table.innerHTML = '';
        return;
      }
      emptyEl.style.display = 'none';
      table.innerHTML = `<tr><th>Rank</th><th>Name</th><th>XP</th></tr>` +
        leaderboard.map((u, i) => `<tr><td>${i+1}</td><td>${esc(u.name) || 'Anonymous'}</td><td>${u.xp}</td></tr>`).join('');
    } catch (e) {
      document.getElementById('leaderboard-table').innerHTML = '';
      const emptyEl = document.getElementById('leaderboard-empty');
      emptyEl.style.display = 'block';
      emptyEl.innerHTML = `<p>Couldn't load the leaderboard - check your connection and try again.</p><button class="btn-outline" onclick="loadLeaderboard()">Try again</button>`;
    }
  }

  // ---------- Certificates ----------
  async function loadCertificates() {
    try {
      const { certificates } = await apiGet('/api/web/certificates');
      const el = document.getElementById('certificates-list');
      el.innerHTML = certificates.length
        ? certificates.map(c => `<div class="list-item"><span>${esc(c.topic)} - ${c.score}/10 (${esc(c.certificate_code)})</span><button class="btn" onclick="downloadCert('${c.certificate_code}')">Download</button></div>`).join('')
        : `<div class="empty-state">
            <p>Certificates prove you've completed a course - pass your final assessment (6/10 or higher) to earn one.</p>
            <button class="btn-outline" onclick="showSection('chat')">Continue your course</button>
          </div>`;
    } catch (e) { showLoadError('certificates-list', 'certificates', 'loadCertificates()'); }
  }
  async function downloadCert(code) {
    const { data: { session } } = await sb.auth.getSession();
    const res = await fetch('/api/web/certificates/' + code + '/pdf', { headers: { Authorization: `Bearer ${session.access_token}` } });
    if (!res.ok) { showToast('Failed to download certificate.'); return; }
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `EduFlow-Ai-Certificate-${code}.pdf`;
    a.click();
  }

  // ---------- Whiteboard ----------
  let wbCtx, wbDrawing = false;
  function initWhiteboard() {
    const canvas = document.getElementById('whiteboard-canvas');
    wbCtx = canvas.getContext('2d');
    wbCtx.lineWidth = 2.5; wbCtx.lineCap = 'round';
    canvas.addEventListener('mousedown', (e) => { wbDrawing = true; wbCtx.beginPath(); wbCtx.moveTo(e.offsetX, e.offsetY); });
    canvas.addEventListener('mousemove', (e) => { if (wbDrawing) { wbCtx.strokeStyle = document.getElementById('wb-color').value; wbCtx.lineTo(e.offsetX, e.offsetY); wbCtx.stroke(); } });
    canvas.addEventListener('mouseup', () => wbDrawing = false);
    canvas.addEventListener('mouseleave', () => wbDrawing = false);
  }
  function clearWhiteboard() { const c = document.getElementById('whiteboard-canvas'); wbCtx.clearRect(0, 0, c.width, c.height); }

  // ---------- Code editor (execution stubbed - needs API key) ----------
  function runCode() {
    document.getElementById('code-output').textContent = 'Code execution requires a Judge0 API key to be configured. This feature is coming soon.';
  }

  // ---------- Math workspace ----------
  function renderMath() {
    const input = document.getElementById('math-input').value;
    document.getElementById('math-render').innerHTML = `\\[${input}\\]`;
    if (window.MathJax) MathJax.typesetPromise([document.getElementById('math-render')]);
  }

  // ---------- Pomodoro ----------
  let pomodoroSeconds = 25 * 60, pomodoroInterval = null;
  function updatePomodoroDisplay() {
    const m = Math.floor(pomodoroSeconds / 60).toString().padStart(2, '0');
    const s = (pomodoroSeconds % 60).toString().padStart(2, '0');
    document.getElementById('pomodoro-display').textContent = `${m}:${s}`;
  }
  function pomodoroStart() {
    if (pomodoroInterval) return;
    pomodoroInterval = setInterval(() => {
      if (pomodoroSeconds <= 0) { clearInterval(pomodoroInterval); pomodoroInterval = null; return; }
      pomodoroSeconds--; updatePomodoroDisplay();
    }, 1000);
  }
  function pomodoroPause() { clearInterval(pomodoroInterval); pomodoroInterval = null; }
  function pomodoroReset() { clearInterval(pomodoroInterval); pomodoroInterval = null; pomodoroSeconds = 25 * 60; updatePomodoroDisplay(); }

  // ---------- Calculator ----------
  let calcExpr = '';
  function buildCalculator() {
    const keys = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'];
    const grid = document.getElementById('calc-grid');
    grid.innerHTML = keys.map(k => `<button onclick="calcPress('${k}')">${k}</button>`).join('');
  }
  function calcPress(k) {
    const display = document.getElementById('calc-display');
    if (k === 'C') { calcExpr = ''; display.textContent = '0'; return; }
    if (k === '=') {
      try { calcExpr = String(Function('"use strict";return (' + calcExpr + ')')()); }
      catch (e) { calcExpr = 'Error'; }
      display.textContent = calcExpr;
      return;
    }
    calcExpr += k;
    display.textContent = calcExpr;
  }

  // ---------- Floating modals ----------
  function closeModal(id) { document.getElementById(id).classList.remove('visible'); }
  async function submitFeedback() {
    const text = document.getElementById('feedback-text').value.trim();
    if (!text) return;
    try {
      await apiPost('/api/web/feedback', { message: text });
      document.getElementById('feedback-msg').textContent = 'Thanks for your feedback!';
      document.getElementById('feedback-text').value = '';
    } catch (e) { document.getElementById('feedback-msg').textContent = 'Failed to submit.'; }
  }

  document.getElementById('login-password')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLogin(); });
  document.getElementById('signup-phone')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSignup(); });
  document.getElementById('phone-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLinkPhone(); });

  // ---------- Library ----------
  async function loadLibrary() {
    try {
      const { lessons, notes, flashcardSets, quizAttempts } = await apiGet('/api/web/library');
      document.getElementById('library-lessons').innerHTML = lessons.length
        ? lessons.map(l => `<div class="list-item"><span>${esc(l.topic)} - Lesson ${l.lesson_number}</span><span class="empty">${new Date(l.created_at).toLocaleDateString()}</span></div>`).join('')
        : '<span class="empty">No completed lessons yet - they will show up here as you progress.</span>';
      document.getElementById('library-notes').innerHTML = notes.length
        ? notes.map(n => `<div class="list-item"><span>${esc(n.title)}</span></div>`).join('')
        : '<span class="empty">No notes yet - jot down key points while you learn.</span>';
      document.getElementById('library-flashcards').innerHTML = flashcardSets.length
        ? flashcardSets.map(s => `<div class="list-item"><span>${esc(s.topic)} (${s.cardCount} cards)</span></div>`).join('')
        : '<span class="empty">No flashcard sets yet - generate one from the Flashcards page.</span>';
      document.getElementById('library-quizzes').innerHTML = quizAttempts.length
        ? quizAttempts.map(a => `<div class="list-item"><span>${esc(a.topic)}</span><span>${a.score}/${a.total}</span></div>`).join('')
        : '<span class="empty">No quiz attempts yet - take a quiz to see your score here.</span>';
    } catch (e) { showToast("Couldn't load your library - check your connection and try again."); }
  }

  // ---------- Flashcards ----------
  let currentFlashcardSet = null, currentCardIndex = 0, cardRevealed = false;

  async function loadFlashcardSets() {
    try {
      const { sets } = await apiGet('/api/web/flashcards/sets');
      document.getElementById('flashcard-sets-list').innerHTML = sets.length
        ? sets.map(s => `<div class="list-item"><span>${esc(s.topic)} (${s.cardCount} cards)</span><span class="row-flex"><button class="btn-outline" onclick="openFlashcardSet('${s.id}')">Review</button><button class="btn-danger" onclick="deleteFlashcardSet('${s.id}')">Delete</button></span></div>`).join('')
        : '<span class="empty">No flashcard sets yet - generate one above.</span>';
    } catch (e) { showLoadError('flashcard-sets-list', 'flashcard sets', 'loadFlashcardSets()'); }
  }

  async function generateFlashcardSet(btnEl) {
    const topic = document.getElementById('flashcard-topic-input').value.trim();
    const msgEl = document.getElementById('flashcard-gen-msg');
    if (!topic) return;
    msgEl.textContent = 'Generating flashcards...';
    const signal = beginGeneration('flashcards', btnEl);
    try {
      await apiPost('/api/web/flashcards/generate', { topic, count: 8 }, signal);
      msgEl.textContent = 'Done!';
      document.getElementById('flashcard-topic-input').value = '';
      loadFlashcardSets();
    } catch (e) {
      msgEl.textContent = e.name === 'AbortError' ? 'Stopped.' : e.message;
    } finally {
      endGeneration('flashcards', () => generateFlashcardSet(btnEl));
    }
  }

  async function deleteFlashcardSet(id) {
    if (!(await uiDialog({ title: 'Delete flashcard set?', message: 'This cannot be undone.', confirmLabel: 'Delete', danger: true })).ok) return;
    await apiDelete('/api/web/flashcards/sets/' + id);
    loadFlashcardSets();
  }

  async function openFlashcardSet(id) {
    const { set } = await apiGet('/api/web/flashcards/sets/' + id);
    currentFlashcardSet = set;
    currentCardIndex = 0;
    cardRevealed = false;
    document.getElementById('flashcards-list-view').style.display = 'none';
    document.getElementById('flashcards-review-view').style.display = 'block';
    renderCurrentCard();
  }

  function exitFlashcardReview() {
    document.getElementById('flashcards-list-view').style.display = 'block';
    document.getElementById('flashcards-review-view').style.display = 'none';
    loadFlashcardSets();
  }

  function renderCurrentCard() {
    const cards = currentFlashcardSet.cards;
    if (currentCardIndex >= cards.length) {
      document.getElementById('flashcard-card').textContent = 'Review complete!';
      document.getElementById('flashcard-controls').style.display = 'none';
      document.getElementById('flashcard-flip-hint').style.display = 'none';
      document.getElementById('flashcard-progress').textContent = `${cards.length}/${cards.length}`;
      return;
    }
    const card = cards[currentCardIndex];
    cardRevealed = false;
    document.getElementById('flashcard-progress').textContent = `${currentCardIndex + 1}/${cards.length}`;
    document.getElementById('flashcard-card').textContent = card.front;
    document.getElementById('flashcard-card').onclick = flipCard;
    document.getElementById('flashcard-controls').style.display = 'none';
    document.getElementById('flashcard-flip-hint').style.display = 'block';
  }

  function flipCard() {
    if (cardRevealed) return;
    cardRevealed = true;
    const card = currentFlashcardSet.cards[currentCardIndex];
    document.getElementById('flashcard-card').textContent = card.back;
    document.getElementById('flashcard-controls').style.display = 'block';
    document.getElementById('flashcard-flip-hint').style.display = 'none';
  }

  async function answerCard(knewIt) {
    const card = currentFlashcardSet.cards[currentCardIndex];
    try { await apiPost('/api/web/flashcards/cards/' + card.id + '/review', { knewIt }); } catch (e) { /* silent */ }
    currentCardIndex++;
    renderCurrentCard();
  }

  // ---------- Quizzes ----------
  let currentQuiz = null, currentQuizTopic = '';

  async function loadQuizHistory() {
    try {
      const { attempts } = await apiGet('/api/web/quiz/history');
      document.getElementById('quiz-history-list').innerHTML = attempts.length
        ? attempts.map(a => `<div class="list-item"><span>${esc(a.topic)}</span><span>${a.score}/${a.total} - ${new Date(a.created_at).toLocaleDateString()}</span></div>`).join('')
        : '<span class="empty">No quiz attempts yet - take a quiz to see your score here.</span>';
    } catch (e) { showLoadError('quiz-history-list', 'quiz history', 'loadQuizHistory()'); }
  }

  async function generateQuiz(btnEl) {
    const topic = document.getElementById('quiz-topic-input').value.trim();
    const msgEl = document.getElementById('quiz-gen-msg');
    if (!topic) return;
    msgEl.textContent = 'Generating quiz...';
    const signal = beginGeneration('quiz', btnEl);
    try {
      const { questions } = await apiPost('/api/web/quiz/generate', { topic, count: 5 }, signal);
      currentQuiz = questions;
      currentQuizTopic = topic;
      msgEl.textContent = '';
      renderQuiz();
      document.getElementById('quiz-setup-view').style.display = 'none';
      document.getElementById('quiz-active-view').style.display = 'block';
    } catch (e) {
      msgEl.textContent = e.name === 'AbortError' ? 'Stopped.' : e.message;
    } finally {
      endGeneration('quiz', () => generateQuiz(btnEl));
    }
  }

  function renderQuiz() {
    const container = document.getElementById('quiz-questions');
    container.innerHTML = currentQuiz.map((q, qi) => `
      <div style="margin-bottom:20px;">
        <p style="font-weight:600;font-size:14px;">${qi + 1}. ${esc(q.question)}</p>
        ${q.options.map((opt, oi) => `
          <label style="display:block;font-size:13.5px;padding:6px 0;cursor:pointer;">
            <input type="radio" name="q${qi}" value="${oi}" /> ${esc(opt)}
          </label>
        `).join('')}
      </div>
    `).join('');
  }

  async function submitQuiz() {
    const answers = currentQuiz.map((q, qi) => {
      const checked = document.querySelector(`input[name="q${qi}"]:checked`);
      return checked ? Number(checked.value) : -1;
    });
    try {
      const result = await apiPost('/api/web/quiz/submit', { topic: currentQuizTopic, questions: currentQuiz, answers });
      document.getElementById('quiz-active-view').style.display = 'none';
      document.getElementById('quiz-results-view').style.display = 'block';
      document.getElementById('quiz-results-content').innerHTML = `
        <p style="font-size:16px;font-weight:700;">Score: ${result.score}/${result.total}</p>
        ${currentQuiz.map((q, i) => `
          <div style="margin-bottom:12px;font-size:13.5px;">
            <p>${i + 1}. ${esc(q.question)} - ${result.results[i].correct ? 'Correct' : 'Incorrect'}</p>
            ${!result.results[i].correct ? `<p class="empty">Correct answer: ${esc(q.options[q.correctIndex])}</p>` : ''}
          </div>
        `).join('')}
      `;
    } catch (e) { showToast(e.message || 'Something went wrong.'); }
  }

  function exitQuizResults() {
    document.getElementById('quiz-results-view').style.display = 'none';
    document.getElementById('quiz-setup-view').style.display = 'block';
    loadQuizHistory();
  }

  // ---------- AI Tools ----------
  async function runTool(tool) {
    const configs = {
      translate: { endpoint: '/api/web/ai-tools/translate', body: () => ({ text: document.getElementById('tool-translate-text').value, targetLang: document.getElementById('tool-translate-lang').value }), resultEl: 'tool-translate-result' },
      grammar: { endpoint: '/api/web/ai-tools/grammar', body: () => ({ text: document.getElementById('tool-grammar-text').value }), resultEl: 'tool-grammar-result' },
      essay: { endpoint: '/api/web/ai-tools/essay', body: () => ({ topic: document.getElementById('tool-essay-topic').value, words: Number(document.getElementById('tool-essay-words').value) || 300 }), resultEl: 'tool-essay-result' },
      math: { endpoint: '/api/web/ai-tools/math', body: () => ({ problem: document.getElementById('tool-math-problem').value }), resultEl: 'tool-math-result' },
      citation: { endpoint: '/api/web/ai-tools/citation', body: () => ({ source: document.getElementById('tool-citation-source').value, style: document.getElementById('tool-citation-style').value }), resultEl: 'tool-citation-result' },
      summarize: { endpoint: '/api/web/ai-tools/summarize', body: () => ({ text: document.getElementById('tool-summarize-text').value }), resultEl: 'tool-summarize-result' },
    };
    const cfg = configs[tool];
    const resultEl = document.getElementById(cfg.resultEl);
    resultEl.classList.remove('empty');
    resultEl.textContent = 'Working...';
    try {
      const { result } = await apiPost(cfg.endpoint, cfg.body());
      resultEl.textContent = result;
    } catch (e) {
      resultEl.textContent = e.message;
    }
  }

  // ---------- Assignments ----------
  let currentAssignment = null;

  async function loadAssignments() {
    try {
      const { assignments } = await apiGet('/api/web/assignments');
      document.getElementById('assignments-list').innerHTML = assignments.length
        ? assignments.map(a => `<div class="list-item"><span>${esc(a.topic)}${a.score != null ? ' - ' + a.score + '/10' : ' - not submitted'}</span><button class="btn-outline" onclick="openAssignment('${a.id}')">Open</button></div>`).join('')
        : '<span class="empty">No assignments yet - generate one above.</span>';
      window.__assignments = assignments;
    } catch (e) { showLoadError('assignments-list', 'assignments', 'loadAssignments()'); }
  }

  async function generateAssignment(btnEl) {
    const topic = document.getElementById('assignment-topic-input').value.trim();
    const msgEl = document.getElementById('assignment-gen-msg');
    if (!topic) return;
    msgEl.textContent = 'Generating assignment...';
    const signal = beginGeneration('assignment', btnEl);
    try {
      await apiPost('/api/web/assignments/generate', { topic }, signal);
      msgEl.textContent = 'Done!';
      document.getElementById('assignment-topic-input').value = '';
      loadAssignments();
    } catch (e) {
      msgEl.textContent = e.name === 'AbortError' ? 'Stopped.' : e.message;
    } finally {
      endGeneration('assignment', () => generateAssignment(btnEl));
    }
  }

  function openAssignment(id) {
    const a = window.__assignments.find(x => x.id === id);
    currentAssignment = a;
    document.getElementById('assignments-list-view').style.display = 'none';
    document.getElementById('assignment-detail-view').style.display = 'block';
    document.getElementById('assignment-detail-topic').textContent = a.topic;
    document.getElementById('assignment-detail-prompt').textContent = a.prompt;
    if (a.score != null) {
      document.getElementById('assignment-submit-area').style.display = 'none';
      document.getElementById('assignment-result-area').style.display = 'block';
      document.getElementById('assignment-score').textContent = `Score: ${a.score}/10`;
      document.getElementById('assignment-feedback').textContent = a.feedback;
    } else {
      document.getElementById('assignment-submit-area').style.display = 'block';
      document.getElementById('assignment-result-area').style.display = 'none';
      document.getElementById('assignment-submission-input').value = '';
    }
  }

  function exitAssignmentDetail() {
    document.getElementById('assignments-list-view').style.display = 'block';
    document.getElementById('assignment-detail-view').style.display = 'none';
    loadAssignments();
  }

  async function submitAssignment() {
    const submission = document.getElementById('assignment-submission-input').value.trim();
    if (!submission) return;
    try {
      const { assignment } = await apiPost('/api/web/assignments/' + currentAssignment.id + '/submit', { submission });
      document.getElementById('assignment-submit-area').style.display = 'none';
      document.getElementById('assignment-result-area').style.display = 'block';
      document.getElementById('assignment-score').textContent = `Score: ${assignment.score}/10`;
      document.getElementById('assignment-feedback').textContent = assignment.feedback;
    } catch (e) { showToast(e.message || 'Something went wrong.'); }
  }

  // ---------- Community ----------
  let currentCommunityPostId = null;

  async function loadCommunityPosts() {
    try {
      const { posts } = await apiGet('/api/web/community/posts');
      document.getElementById('community-posts-list').innerHTML = posts.length
        ? posts.map(p => `<div class="list-item"><span>${esc(p.title)} <span class="empty">by ${esc(p.author_name)}</span></span><button class="btn-outline" onclick="openCommunityPost('${p.id}')">${p.replyCount} replies</button></div>`).join('')
        : '<span class="empty">No discussions yet - start one above.</span>';
    } catch (e) { showLoadError('community-posts-list', 'discussions', 'loadCommunityPosts()'); }
  }

  async function createCommunityPost() {
    const title = document.getElementById('community-title-input').value.trim();
    const body = document.getElementById('community-body-input').value.trim();
    if (!title || !body) return;
    try {
      await apiPost('/api/web/community/posts', { title, body });
      document.getElementById('community-title-input').value = '';
      document.getElementById('community-body-input').value = '';
      loadCommunityPosts();
    } catch (e) { showToast(e.message || 'Something went wrong.'); }
  }

  async function openCommunityPost(id) {
    currentCommunityPostId = id;
    const { post } = await apiGet('/api/web/community/posts/' + id);
    document.getElementById('community-list-view').style.display = 'none';
    document.getElementById('community-detail-view').style.display = 'block';
    document.getElementById('community-detail-title').textContent = post.title;
    document.getElementById('community-detail-meta').textContent = `by ${post.author_name} - ${new Date(post.created_at).toLocaleString()}`;
    document.getElementById('community-detail-body').textContent = post.body;
    document.getElementById('community-replies-list').innerHTML = post.replies.length
      ? post.replies.map(r => `<div class="list-item"><span><strong>${esc(r.author_name)}:</strong> ${esc(r.body)}</span></div>`).join('')
      : '<span class="empty">No replies yet.</span>';
  }

  function exitCommunityDetail() {
    document.getElementById('community-list-view').style.display = 'block';
    document.getElementById('community-detail-view').style.display = 'none';
    loadCommunityPosts();
  }

  async function submitCommunityReply() {
    const body = document.getElementById('community-reply-input').value.trim();
    if (!body) return;
    try {
      await apiPost('/api/web/community/posts/' + currentCommunityPostId + '/replies', { body });
      document.getElementById('community-reply-input').value = '';
      openCommunityPost(currentCommunityPostId);
    } catch (e) { showToast(e.message || 'Something went wrong.'); }
  }

  // ---------- Live Classes ----------
  async function loadLiveClasses() {
    try {
      const { classes } = await apiGet('/api/web/live-classes');
      document.getElementById('live-classes-list').innerHTML = classes.length
        ? classes.map(c => `<div class="list-item"><span>${esc(c.title)}</span><button class="btn-outline" onclick="joinJitsi('${c.room_name}')">Join</button></div>`).join('')
        : '<span class="empty">No rooms yet - create one above.</span>';
    } catch (e) { showLoadError('live-classes-list', 'live classes', 'loadLiveClasses()'); }
  }

  async function createLiveClass() {
    const title = document.getElementById('liveclass-title-input').value.trim();
    if (!title) return;
    try {
      await apiPost('/api/web/live-classes', { title });
      document.getElementById('liveclass-title-input').value = '';
      loadLiveClasses();
    } catch (e) { showToast(e.message || 'Something went wrong.'); }
  }

  function joinJitsi(roomName) {
    document.getElementById('jitsi-frame').src = `https://meet.jit.si/${roomName}`;
    document.getElementById('jitsi-frame-box').style.display = 'block';
  }
  function closeJitsi() {
    document.getElementById('jitsi-frame').src = '';
    document.getElementById('jitsi-frame-box').style.display = 'none';
  }

  // ---------- Career Center ----------
  async function generateCareerRoadmap(btnEl) {
    const interest = document.getElementById('career-interest-input').value.trim();
    if (!interest) return;
    const resultEl = document.getElementById('career-roadmap-result');
    resultEl.classList.remove('empty');
    resultEl.textContent = 'Generating...';
    const signal = beginGeneration('career-roadmap', btnEl);
    try {
      const { roadmap } = await apiPost('/api/web/career/roadmap', { interest }, signal);
      resultEl.textContent = roadmap;
    } catch (e) {
      resultEl.textContent = e.name === 'AbortError' ? 'Stopped.' : e.message;
    } finally {
      endGeneration('career-roadmap', () => generateCareerRoadmap(btnEl));
    }
  }

  async function reviewResume(btnEl) {
    const resumeText = document.getElementById('career-resume-input').value.trim();
    if (!resumeText) return;
    const resultEl = document.getElementById('career-resume-result');
    resultEl.classList.remove('empty');
    resultEl.textContent = 'Reviewing...';
    const signal = beginGeneration('resume-review', btnEl);
    try {
      const { feedback } = await apiPost('/api/web/career/resume-review', { resumeText }, signal);
      resultEl.textContent = feedback;
    } catch (e) {
      resultEl.textContent = e.name === 'AbortError' ? 'Stopped.' : e.message;
    } finally {
      endGeneration('resume-review', () => reviewResume(btnEl));
    }
  }

  // ---------- Instructor Tools (custom quiz builder) ----------
  let customQuizQuestions = [];

  function addCustomQuizQuestion() {
    customQuizQuestions.push({ question: '', options: ['', '', '', ''], correctIndex: 0 });
    renderCustomQuizBuilder();
  }

  function renderCustomQuizBuilder() {
    const container = document.getElementById('custom-quiz-questions-builder');
    container.innerHTML = customQuizQuestions.map((q, qi) => `
      <div class="box" style="margin-bottom:10px;">
        <input type="text" placeholder="Question ${qi + 1}" value="${esc(q.question)}" oninput="updateCustomQuestion(${qi}, 'question', this.value)" style="margin-bottom:8px;" />
        ${q.options.map((opt, oi) => `
          <div class="row-flex" style="margin-bottom:6px;">
            <input type="radio" name="correct${qi}" ${q.correctIndex === oi ? 'checked' : ''} onchange="updateCustomQuestion(${qi}, 'correctIndex', ${oi})" />
            <input type="text" placeholder="Option ${oi + 1}" value="${esc(opt)}" oninput="updateCustomOption(${qi}, ${oi}, this.value)" />
          </div>
        `).join('')}
        <button class="btn-danger" onclick="removeCustomQuestion(${qi})">Remove Question</button>
      </div>
    `).join('');
  }

  function updateCustomQuestion(qi, field, value) { customQuizQuestions[qi][field] = value; }
  function updateCustomOption(qi, oi, value) { customQuizQuestions[qi].options[oi] = value; }
  function removeCustomQuestion(qi) { customQuizQuestions.splice(qi, 1); renderCustomQuizBuilder(); }

  async function saveCustomQuiz() {
    const title = document.getElementById('custom-quiz-title-input').value.trim();
    const msgEl = document.getElementById('custom-quiz-save-msg');
    if (!title || !customQuizQuestions.length) { msgEl.textContent = 'Add a title and at least one question.'; return; }
    try {
      const { quiz } = await apiPost('/api/web/custom-quizzes', { title, questions: customQuizQuestions });
      msgEl.textContent = `Saved! Share code: ${quiz.share_code}`;
      customQuizQuestions = [];
      document.getElementById('custom-quiz-title-input').value = '';
      renderCustomQuizBuilder();
      loadMyCustomQuizzes();
    } catch (e) { msgEl.textContent = e.message; }
  }

  async function loadMyCustomQuizzes() {
    try {
      const { quizzes } = await apiGet('/api/web/custom-quizzes/mine');
      document.getElementById('my-custom-quizzes-list').innerHTML = quizzes.length
        ? quizzes.map(q => `<div class="list-item"><span>${esc(q.title)}</span><span>Code: <strong>${esc(q.share_code)}</strong></span></div>`).join('')
        : '<span class="empty">You haven\'t created any quizzes yet.</span>';
    } catch (e) { showLoadError('my-custom-quizzes-list', 'quizzes', 'loadMyCustomQuizzes()'); }
  }

  let sharedQuiz = null;
  async function loadSharedQuiz() {
    const code = document.getElementById('join-quiz-code-input').value.trim();
    if (!code) return;
    try {
      const { quiz } = await apiGet('/api/web/custom-quizzes/by-code/' + code);
      sharedQuiz = quiz;
      document.getElementById('instructor-builder-view').style.display = 'none';
      document.getElementById('shared-quiz-take-view').style.display = 'block';
      document.getElementById('shared-quiz-title').textContent = quiz.title;
      document.getElementById('shared-quiz-result').textContent = '';
      document.getElementById('shared-quiz-questions').innerHTML = quiz.questions.map((q, qi) => `
        <div style="margin-bottom:16px;">
          <p style="font-weight:600;font-size:14px;">${qi + 1}. ${esc(q.question)}</p>
          ${q.options.map((opt, oi) => `<label style="display:block;font-size:13.5px;padding:5px 0;"><input type="radio" name="sq${qi}" value="${oi}"/> ${esc(opt)}</label>`).join('')}
        </div>
      `).join('');
    } catch (e) { showToast(e.message || 'Something went wrong.'); }
  }

  function exitSharedQuiz() {
    document.getElementById('instructor-builder-view').style.display = 'block';
    document.getElementById('shared-quiz-take-view').style.display = 'none';
  }

  async function submitSharedQuiz() {
    const answers = sharedQuiz.questions.map((q, qi) => {
      const checked = document.querySelector(`input[name="sq${qi}"]:checked`);
      return checked ? Number(checked.value) : -1;
    });
    try {
      const result = await apiPost('/api/web/custom-quizzes/' + sharedQuiz.id + '/submit', { answers });
      document.getElementById('shared-quiz-result').textContent = `Score: ${result.score}/${result.total}`;
    } catch (e) { showToast(e.message || 'Something went wrong.'); }
  }

  updatePomodoroDisplay();

  (async () => {
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session) {
        try { await afterAuth(); } catch (e) { bootGuestMode(); }
      } else {
        bootGuestMode();
      }
    } finally {
      // Real layout is fully built (or a screen has been chosen) - reveal it.
      // Runs on every path so the skeleton can never get stuck.
      if (window.hideBootSkeleton) window.hideBootSkeleton();
    }
  })();