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
  document.getElementById('user-name').textContent = name;
  document.getElementById('user-avatar').textContent = name.charAt(0).toUpperCase();
  showPage('dashboard');
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
  if (overlay) {
    overlay.classList.toggle('show');
  }
}

/* ===== Sidebar Nav Links ===== */
document.addEventListener('DOMContentLoaded', function () {
  // Set current date in header
  var now = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var dateEl = document.getElementById('header-date');
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString('en-US', options);
  }

  // Sidebar nav active state
  var navLinks = document.querySelectorAll('.sidebar nav .nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');

      var section = link.getAttribute('data-section');
      var titles = {
        overview: 'Dashboard Overview',
        content: 'Content Planner',
        calendar: 'Calendar',
        team: 'Team Management',
        analytics: 'Analytics',
        brand: 'Brand Guidelines'
      };
      var titleEl = document.querySelector('.page-title');
      if (titleEl && titles[section]) {
        titleEl.textContent = titles[section];
      }

      document.querySelectorAll('.dashboard-section').forEach(function(s){ s.classList.add('hidden'); });
      var sectionMap = { overview:'section-overview', content:'section-content', calendar:'section-calendar', team:'section-team', analytics:'section-analytics', brand:'section-brand' };
      var target = document.getElementById(sectionMap[section]);
      if (target) target.classList.remove('hidden');

      // Close mobile sidebar
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
});
