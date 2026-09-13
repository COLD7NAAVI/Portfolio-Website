/**
 * ==========================================================================
 * ENGINEERING COMMAND CENTER - SCRIPT
 * Functionality: Real-time HUD, Video Safety, Interactive Terminal,
 * Filters, Dynamic Typewriter, Scrollspy & Contact Simulation
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundVideo();
  initHUDClock();
  initTypewriter();
  initScrollEffects();
  initMobileMenu();
  initFilterTabs();
  initInteractiveTerminal();
  initContactSystem();
});

/* ==========================================================================
   1. CINEMATIC VIDEO BACKGROUND SAFETY
   ========================================================================== */

function initBackgroundVideo() {
  const bgVideo = document.getElementById('bg-video');
  if (!bgVideo) return;

  bgVideo.muted = true;
  bgVideo.playsInline = true;

  const playPromise = bgVideo.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        bgVideo.style.opacity = '0.32';
      })
      .catch((err) => {
        console.warn('Autoplay prevented by browser environment:', err);
        const handleInteraction = () => {
          bgVideo.play().catch(() => {});
          window.removeEventListener('click', handleInteraction);
          window.removeEventListener('keydown', handleInteraction);
          window.removeEventListener('touchstart', handleInteraction);
        };
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('keydown', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
      });
  }
}

/* ==========================================================================
   2. REAL-TIME HUD CLOCK
   ========================================================================== */

function initHUDClock() {
  const clockEl = document.getElementById('hud-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds} LOC`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   3. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */

function initTypewriter() {
  const textEl = document.getElementById('typewriter-text');
  if (!textEl) return;

  const phrases = [
    'Robotics & Embedded Systems',
    'Full-Stack Real-Time Web',
    'Electronics & Communication Eng.',
    'Cybersecurity & Network Defense',
    'Applied AI & LLM Exploration'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      textEl.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 35;
    } else {
      charIndex++;
      textEl.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. SCROLL PROGRESS & SCROLLSPY
   ========================================================================== */

function initScrollEffects() {
  const header = document.getElementById('site-header');
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Scroll Progress Bar
    if (progressBar && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Header Background Elevation
    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active Section Scrollspy
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Back to Top Trigger
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   5. MOBILE MENU DRAWER
   ========================================================================== */

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a navigation anchor is tapped
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   6. FILTER TAB SYSTEMS (Skills & Projects)
   ========================================================================== */

function initFilterTabs() {
  // Skills Filtering
  const skillsFilterGroup = document.getElementById('skills-filter-group');
  const skillCards = document.querySelectorAll('.skill-card');

  if (skillsFilterGroup) {
    skillsFilterGroup.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.filter-tab');
      if (!targetBtn) return;

      skillsFilterGroup.querySelectorAll('.filter-tab').forEach((b) => b.classList.remove('active'));
      targetBtn.classList.add('active');

      const filter = targetBtn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  }

  // Projects Filtering
  const projectsFilterGroup = document.getElementById('projects-filter-group');
  const projectCards = document.querySelectorAll('.project-card');

  if (projectsFilterGroup) {
    projectsFilterGroup.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.filter-tab');
      if (!targetBtn) return;

      projectsFilterGroup.querySelectorAll('.filter-tab').forEach((b) => b.classList.remove('active'));
      targetBtn.classList.add('active');

      const filter = targetBtn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  }
}

/* ==========================================================================
   7. INTERACTIVE TACTICAL TERMINAL SIMULATOR
   ========================================================================== */

function initInteractiveTerminal() {
  const termForm = document.getElementById('terminal-form');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');
  const termScreen = document.getElementById('terminal-screen');
  const clearBtn = document.getElementById('terminal-clear-btn');
  const chips = document.querySelectorAll('.cmd-chip');

  if (!termForm || !termInput || !termOutput) return;

  const commandCatalog = {
    help: () => [
      '<span class="text-cyan">AVAILABLE COMMANDS:</span>',
      '  <span class="text-emerald">projects</span>   - List the 4 verified projects and development statuses',
      '  <span class="text-emerald">skills</span>     - Display verified technical subsystems and languages',
      '  <span class="text-emerald">about</span>      - View engineer dossier &amp; academic specialization',
      '  <span class="text-emerald">status</span>     - Print current node status and telemetry readings',
      '  <span class="text-emerald">contact</span>    - View direct communication coordinates',
      '  <span class="text-emerald">clear</span>      - Flush terminal buffer'
    ],
    projects: () => [
      '<span class="text-cyan">VERIFIED REAL PROJECTS:</span>',
      '  [1] <strong class="text-pure">SONU / Saras Robot</strong> <span class="text-amber">[IN ACTIVE DEVELOPMENT]</span>',
      '      Raspberry Pi, Python, Motors, Sensors, Camera, Voice Control, Planned Edge AI.',
      '  [2] <strong class="text-pure">ShadowDock</strong> <span class="text-cyan">[COMPLETED / POLISHING]</span>',
      '      Real-time chat: React, Vite, Node.js, Socket.io, Redis Pub/Sub, PostgreSQL, Docker.',
      '  [3] <strong class="text-pure">Shadow : Helix Nebula</strong> <span class="text-magenta">[RESEARCH &amp; PLANNED]</span>',
      '      Extensible ethical hacking platform for authorized penetration testing &amp; audit reporting.',
      '  [4] <strong class="text-pure">ShadowMoon AI</strong> <span class="text-magenta">[RESEARCH &amp; EXPERIMENTAL]</span>',
      '      Applied AI experimentation with LLM APIs, prompt engineering, and local inference models.'
    ],
    skills: () => [
      '<span class="text-cyan">VERIFIED TECHNICAL STACK:</span>',
      '  &gt; Languages:       C, C++, Python, SQL, JavaScript (ES6+), Bash',
      '  &gt; Hardware:        Raspberry Pi, GPIO, Sensors, Motors, Camera Modules',
      '  &gt; Databases:       PostgreSQL, Redis, MongoDB',
      '  &gt; Real-Time &amp; Web: Node.js, Express, Socket.io, React, Vite, HTML5, CSS3',
      '  &gt; Infrastructure:  Docker, Linux CLI, Git',
      '  &gt; Security:        TCP/IP, UDP, DNS, Ethical Hacking Learning, Linux Hardening'
    ],
    about: () => [
      '<span class="text-cyan">OPERATOR DOSSIER:</span>',
      '  &gt; Major:             Electronics and Communication Engineering (ECE)',
      '  &gt; Engineering Ethos: Bridging low-level physical signals with distributed software',
      '  &gt; Core Strengths:    Embedded systems, real-time networking, security curiosity',
      '  &gt; Integrity:         100% truthful data, zero fabricated metrics'
    ],
    status: () => [
      '<span class="text-emerald">TELEMETRY DIAGNOSTICS:</span>',
      '  &gt; NODE_STATUS:       ONLINE // NORMAL OPERATION',
      '  &gt; STUDENT_STATUS:    ACTIVE UNDERGRADUATE (ECE)',
      '  &gt; AVAILABILITY:      OPEN FOR INTERNSHIPS &amp; COLLABORATIVE RESEARCH',
      '  &gt; DATA_ACCURACY:     VERIFIED &amp; AUDITED'
    ],
    contact: () => [
      '<span class="text-cyan">DIRECT COMMUNICATION CHANNELS:</span>',
      '  &gt; Email:             navinheshi@gmail.com',
      '  &gt; GitHub:            https://github.com/COLD7NAAVI',
      '  &gt; LinkedIn:          https://www.linkedin.com/in/naveenheshi/'
    ]
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Append user input line
    const userLine = document.createElement('div');
    userLine.className = 'term-line';
    userLine.innerHTML = `<span class="text-cyan">guest@ece-sys</span>:<span class="text-emerald">~</span>$ ${escapeHtml(rawCmd)}`;
    termOutput.appendChild(userLine);

    if (cmd === 'clear') {
      termOutput.innerHTML = '';
      return;
    }

    if (commandCatalog[cmd]) {
      const outputLines = commandCatalog[cmd]();
      outputLines.forEach((line) => {
        const outDiv = document.createElement('div');
        outDiv.className = 'term-line';
        outDiv.innerHTML = line;
        termOutput.appendChild(outDiv);
      });
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'term-line text-magenta';
      errorDiv.innerHTML = `Command not recognized: '${escapeHtml(cmd)}'. Type <span class="text-emerald">help</span> for valid operations.`;
      termOutput.appendChild(errorDiv);
    }

    // Scroll to bottom
    if (termScreen) {
      termScreen.scrollTop = termScreen.scrollHeight;
    }
  }

  termForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = termInput.value;
    termInput.value = '';
    executeCommand(val);
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      termOutput.innerHTML = '';
    });
  }
}

/* ==========================================================================
   8. CONTACT FORM & CLIPBOARD COPY SYSTEM
   ========================================================================== */

function initContactSystem() {
  const form = document.getElementById('transmission-form');
  const statusEl = document.getElementById('transmission-status');
  const btnText = document.getElementById('btn-text');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  // One-Click Email Copy
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'navinheshi@gmail.com';
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast('COPIED TO CLIPBOARD: ' + email);
        })
        .catch(() => {
          showToast('SELECT & COPY: ' + email);
        });
    });
  }

  // Resume Link Verification & Fallback Check
  const resumeLink = document.getElementById('resume-link');
  if (resumeLink) {
    resumeLink.addEventListener('click', (e) => {
      if (resumeLink.getAttribute('href') === 'assets/resume.pdf') {
        fetch('assets/resume.pdf', { method: 'HEAD' })
          .then((res) => {
            if (!res.ok) {
              e.preventDefault();
              showToast('RESUME FILE PENDING: Place resume.pdf in assets/ directory');
            }
          })
          .catch(() => {
            // If running on file:// protocol or fetch blocked, notify clearly
            showToast('RESUME PENDING: Place resume.pdf in assets/ directory');
          });
      }
    });
  }

  // Authentic Direct Email Dispatch via System Mail Client
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim() || 'Collaborator';
      const senderEmail = document.getElementById('contact-email')?.value.trim() || '';
      const subject = document.getElementById('contact-subject')?.value.trim() || 'Engineering Inquiry';
      const message = document.getElementById('contact-message')?.value.trim() || '';

      const targetEmail = 'navinheshi@gmail.com';
      const emailBody = `Sender Name: ${name}\nSender Email: ${senderEmail}\n\nMessage Payload:\n${message}`;
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      if (btnText) btnText.textContent = 'Launching Email Client...';
      if (statusEl) {
        statusEl.className = 'transmission-status text-cyan';
        statusEl.textContent = 'DISPATCHING TO SYSTEM EMAIL CLIENT...';
      }

      showToast('OPENING EMAIL CLIENT WITH PREFILLED PAYLOAD');

      // Launch actual mail client
      window.location.href = mailtoUrl;

      setTimeout(() => {
        if (btnText) btnText.textContent = 'Transmit via Email Client';
        if (statusEl) {
          statusEl.className = 'transmission-status text-emerald';
          statusEl.textContent = 'CLIENT DISPATCH INITIALIZED // COMPLETE SEND IN EMAIL APP';
        }
      }, 1500);
    });
  }
}

/* ==========================================================================
   HELPER UTILITIES
   ========================================================================== */

function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="text-cyan">&gt;</span> <span>${escapeHtml(message)}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}
