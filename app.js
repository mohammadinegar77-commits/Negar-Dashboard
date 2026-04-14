/* ===== Page Navigation ===== */
function showPage(page) {
  document.getElementById('page-login').classList.add('hidden');
  document.getElementById('page-signup').classList.add('hidden');
  document.getElementById('page-dashboard').classList.add('hidden');

  if (page === 'login') {
    document.getElementById('page-login').classList.remove('hidden');
  } else if (page === 'signup') {
    document.getElementById('page-signup').classList.remove('hidden');
  } else if (page === 'dashboard') {
    document.getElementById('page-dashboard').classList.remove('hidden');
  }
}

/* ===== Login ===== */
function handleLogin(e) {
  e.preventDefault();
  var email = document.getElementById('login-email').value;
  var name = email.split('@')[0];
  name = name.charAt(0).toUpperCase() + name.slice(1);
  sessionStorage.setItem('userName', name);
  enterDashboard(name);
  return false;
}

/* ===== Sign Up ===== */
function handleSignup(e) {
  e.preventDefault();
  var name = document.getElementById('signup-name').value;
  sessionStorage.setItem('userName', name);
  enterDashboard(name);
  return false;
}

/* ===== Enter Dashboard ===== */
function enterDashboard(name) {
  document.getElementById('user-name').textContent = "Negar's Dashboard";
  document.getElementById('user-avatar').textContent = name.charAt(0).toUpperCase();
  showPage('dashboard');
}

/* ===== Navigate To Section ===== */
function navigateTo(section) {
  var navLinks = document.querySelectorAll('.sidebar nav .nav-link');
  navLinks.forEach(function(l) { l.classList.remove('active'); });
  var target = document.querySelector('.sidebar nav .nav-link[data-section="' + section + '"]');
  if (target) target.classList.add('active');

  var titles = {
    overview: 'Dashboard Overview', content: 'Content Planner',
    calendar: 'Calendar', team: 'Team Management',
    analytics: 'Analytics', brand: 'Brand Guidelines',
    approvals: 'Approval Inbox', campaigns: 'Campaigns',
    kpi: 'KPI Scorecard', studio: 'Studio'
  };
  var titleEl = document.querySelector('.page-title');
  if (titleEl && titles[section]) titleEl.textContent = titles[section];

  document.querySelectorAll('.dashboard-section').forEach(function(s) { s.classList.add('hidden'); });
  var sectionMap = {
    overview: 'section-overview', content: 'section-content',
    calendar: 'section-calendar', team: 'section-team',
    analytics: 'section-analytics', brand: 'section-brand',
    approvals: 'section-approvals', campaigns: 'section-campaigns',
    kpi: 'section-kpi', studio: 'section-studio'
  };
  var el = document.getElementById(sectionMap[section]);
  if (el) el.classList.remove('hidden');
}

/* ===== Logout ===== */
function handleLogout() {
  sessionStorage.removeItem('userName');
  document.getElementById('login-form').reset();
  showPage('login');
}

/* ===== Sidebar Toggle (mobile) ===== */
function toggleSidebar() {
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.querySelector('.sidebar-overlay');
  sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}

/* ===== Sidebar Nav Links ===== */
document.addEventListener('DOMContentLoaded', function () {
  // Set current date in header
  var now = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var dateEl = document.getElementById('header-date');
  if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', options);

  // Sidebar nav active state
  var navLinks = document.querySelectorAll('.sidebar nav .nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var section = link.getAttribute('data-section');
      if (section) navigateTo(section);

      var sidebar = document.querySelector('.sidebar');
      var overlay = document.querySelector('.sidebar-overlay');
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
    });
  });

  // Create mobile overlay
  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.addEventListener('click', toggleSidebar);
  document.body.appendChild(overlay);

  // Kanban drag and drop
  initKanban('kanban-main');
});

/* ===== Content Planner Filters ===== */
function filterContent(btn, type, val) {
  var parent = btn.parentElement;
  parent.querySelectorAll('.filter-pill').forEach(function(p){ p.classList.remove('active'); });
  btn.classList.add('active');
}

function toggleBriefForm() {
  var form = document.getElementById('brief-form');
  if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

/* ===== Analytics Filter ===== */
var analyticsData = {
  all:   { reach:'1.2M', eng:'4.8%', growth:'+3.2K', posts:'47' },
  igfa:  { reach:'420K', eng:'5.2%', growth:'+1.1K', posts:'18' },
  igen:  { reach:'310K', eng:'4.6%', growth:'+820',  posts:'14' },
  igar:  { reach:'180K', eng:'3.9%', growth:'+540',  posts:'10' },
  li:    { reach:'95K',  eng:'3.1%', growth:'+290',  posts:'8'  },
  tg:    { reach:'140K', eng:'6.8%', growth:'+980',  posts:'22' },
  yt:    { reach:'55K',  eng:'4.2%', growth:'+370',  posts:'5'  }
};

function filterAnalytics(btn, key) {
  var parent = btn.parentElement;
  parent.querySelectorAll('.filter-pill').forEach(function(p){ p.classList.remove('active'); });
  btn.classList.add('active');
  var d = analyticsData[key] || analyticsData['all'];
  var reach = document.getElementById('an-reach');
  var eng   = document.getElementById('an-eng');
  var growth= document.getElementById('an-growth');
  var posts = document.getElementById('an-posts');
  if (reach)  reach.textContent  = d.reach;
  if (eng)    eng.textContent    = d.eng;
  if (growth) growth.textContent = d.growth;
  if (posts)  posts.textContent  = d.posts;
}

/* ===== Approval Inbox ===== */
function switchApprovalTab(tab) {
  document.getElementById('approvals-pending').style.display  = tab === 'pending'  ? 'block' : 'none';
  document.getElementById('approvals-reviewed').style.display = tab === 'reviewed' ? 'block' : 'none';
  document.getElementById('tab-pending').classList.toggle('active',  tab === 'pending');
  document.getElementById('tab-reviewed').classList.toggle('active', tab === 'reviewed');
}

function approveItem(btn) {
  var card = btn.closest('.approval-card');
  if (card) {
    card.style.opacity = '0.5';
    card.style.pointerEvents = 'none';
    btn.textContent = '✓ Approved';
    btn.style.background = 'rgba(29,253,61,0.15)';
  }
}

function toggleNotes(btn) {
  var card = btn.closest('.approval-card');
  var notes = card ? card.querySelector('.notes-area') : null;
  if (notes) notes.style.display = notes.style.display === 'none' ? 'block' : 'none';
}

/* ===== Kanban Drag & Drop ===== */
function initKanban(boardId) {
  var board = document.getElementById(boardId);
  if (!board) return;
  var dragging = null;

  board.querySelectorAll('.kanban-card').forEach(function(card) {
    card.addEventListener('dragstart', function() {
      dragging = card;
      setTimeout(function(){ card.classList.add('dragging'); }, 0);
    });
    card.addEventListener('dragend', function() {
      card.classList.remove('dragging');
      dragging = null;
    });
  });

  board.querySelectorAll('.kanban-col').forEach(function(col) {
    col.addEventListener('dragover', function(e) {
      e.preventDefault();
      if (dragging) col.appendChild(dragging);
    });
  });
}

/* ===== Brand Guidelines — Copy Color ===== */
function copyColor(hex, el) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(hex).then(function() {
      var label = el.querySelector('.swatch-label');
      if (label) { var old = label.textContent; label.textContent = 'Copied!'; setTimeout(function(){ label.textContent = old; }, 1200); }
    });
  }
}

/* ===== Studio ===== */
function switchStudio(btn, panel) {
  document.querySelectorAll('.studio-tab').forEach(function(t){ t.classList.remove('active'); });
  document.querySelectorAll('.studio-panel').forEach(function(p){ p.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  var target = document.getElementById('studio-' + panel);
  if (target) target.classList.add('active');
}

function addIdeaCard() {
  var board = document.getElementById('idea-board');
  if (!board) return;
  var card = document.createElement('div');
  card.className = 'card';
  card.style.padding = '16px';
  card.innerHTML = '<div><input type="text" placeholder="Idea title..." style="background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.1);color:#fff;font-size:.88rem;font-weight:700;width:100%;margin-bottom:8px;padding-bottom:4px;outline:none;"></div><div style="font-size:.76rem;color:rgba(255,255,255,0.45);margin-bottom:8px;"><input type="text" placeholder="Content hook..." style="background:transparent;border:none;color:rgba(255,255,255,0.5);font-size:.76rem;width:100%;outline:none;"></div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><span class="type-pill">Reel</span><span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:.68rem;font-weight:700;padding:2px 8px;border-radius:20px;">New</span></div><div style="display:flex;gap:6px;flex-wrap:wrap;"><button class="action-btn" style="border:1px solid #004dfa;color:#1d79fd;font-size:.72rem;padding:5px 10px;">Develop</button><button class="action-btn" style="border:1px solid #1dfd3d;color:#1dfd3d;font-size:.72rem;padding:5px 10px;">Select for Production</button></div>';
  board.appendChild(card);
}

function addCharCard() {
  var board = document.getElementById('char-board');
  if (!board) return;
  var card = document.createElement('div');
  card.className = 'card';
  card.style.padding = '16px';
  card.innerHTML = '<div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem;margin-bottom:12px;">?</div><div class="input-group" style="margin-bottom:8px;"><label style="font-size:.7rem;">Name</label><input type="text" placeholder="Character name..." style="padding:8px 10px;font-size:.84rem;"></div><div class="input-group" style="margin-bottom:8px;"><label style="font-size:.7rem;">Role</label><select class="card-select" style="width:100%;padding:8px 10px;font-size:.84rem;"><option>Host</option><option>Expert</option><option>Narrator</option><option>On-screen talent</option></select></div><div class="input-group" style="margin-bottom:8px;"><label style="font-size:.7rem;">Language</label><select class="card-select" style="width:100%;padding:8px 10px;font-size:.84rem;"><option>EN / FA</option><option>AR</option></select></div>';
  board.appendChild(card);
}

function addShotRow() {
  var tbody = document.querySelector('#shot-list tbody');
  if (!tbody) return;
  var row = tbody.rows.length + 1;
  var tr = document.createElement('tr');
  tr.innerHTML = '<td>' + row + '</td><td><select class="card-select" style="padding:4px 8px;font-size:.78rem;"><option>Wide</option><option selected>Medium</option><option>Close-up</option><option>Detail</option><option>B-roll</option></select></td><td><input type="text" placeholder="Subject..." style="background:transparent;border:none;color:#fff;font-size:.78rem;width:100px;outline:none;"></td><td><input type="number" value="5" style="background:transparent;border:none;color:#fff;font-size:.78rem;width:40px;outline:none;"> sec</td><td><input type="text" placeholder="Notes..." style="background:transparent;border:none;color:rgba(255,255,255,0.5);font-size:.78rem;width:100%;outline:none;"></td>';
  tbody.appendChild(tr);
}

function updateWordCount() {
  var total = 0;
  document.querySelectorAll('#studio-script textarea').forEach(function(ta){
    total += ta.value.trim().split(/\s+/).filter(Boolean).length;
  });
  var el = document.getElementById('script-wordcount');
  var dur = Math.round(total / 130 * 60);
  var mins = Math.floor(dur/60), secs = dur % 60;
  if (el) el.textContent = total + ' words · ~' + (mins > 0 ? mins + 'm ' : '') + secs + 's';
  var hook = document.getElementById('script-hook');
  var hc = document.getElementById('hook-count');
  if (hook && hc) hc.textContent = hook.value.length + ' / 30 chars recommended';
}

function cycleScriptStatus(el) {
  var states = ['Draft','In Review','Approved'];
  var styles = [
    'background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);',
    'background:rgba(255,204,0,0.15);color:#ffcc00;',
    'background:rgba(29,253,61,0.12);color:#1dfd3d;'
  ];
  var cur = states.indexOf(el.textContent);
  var next = (cur + 1) % states.length;
  el.textContent = states[next];
  el.style.cssText = styles[next] + 'font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:20px;cursor:pointer;';
}

function cycleEditStatus(el) {
  var states = ['Not Started','In Progress','First Cut Ready','Final Cut Ready'];
  var styles = [
    'background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);',
    'background:rgba(29,121,253,0.15);color:#1d79fd;',
    'background:rgba(255,204,0,0.15);color:#ffcc00;',
    'background:rgba(29,253,61,0.12);color:#1dfd3d;'
  ];
  var cur = states.indexOf(el.textContent);
  var next = (cur + 1) % states.length;
  el.textContent = states[next];
  el.style.cssText = styles[next] + 'font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:20px;cursor:pointer;';
}

function insertCTA(btn) {
  var cta = btn.closest('.card').querySelector('textarea');
  if (cta) { cta.value = btn.textContent; updateWordCount(); }
}

function copyPrompt(el) {
  if (navigator.clipboard) navigator.clipboard.writeText(el.textContent);
  var old = el.style.background;
  el.style.background = 'rgba(155,89,182,0.25)';
  setTimeout(function(){ el.style.background = old; }, 600);
}

function markVideoComplete() {
  document.getElementById('export-working').style.display = 'none';
  document.getElementById('export-complete').style.display = 'block';
}
