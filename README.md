# Opofinance Social Media Dashboard

Internal workspace dashboard for the Opofinance Social Media team — built for the Social Media Strategy Lead role. Covers content planning, production workflows, approvals, analytics, team management, brand governance, and AI video production.

**Live file:** open `index.html` directly in any browser. No server, no build step, no install.

---

## Overview

| | |
|---|---|
| **Stack** | Vanilla HTML + CSS + JavaScript |
| **Files** | `index.html` · `styles.css` · `app.js` |
| **Total lines** | ~2,100 |
| **Theme** | Dark navy — streaming platform aesthetic |
| **Fonts** | Barlow Condensed (headings) · DM Sans (body) via Google Fonts |
| **Auth** | Cosmetic login/signup — no backend |

---

## Running locally

```bash
git clone https://github.com/mohammadinegar77-commits/Negar-Dashboard.git
cd Negar-Dashboard
open index.html        # macOS
start index.html       # Windows
# or drag index.html into any browser
```

No npm, no node_modules, no bundler. It just opens.

---

## Pages

### Core workspace

| Page | Section ID | Status | Description |
|---|---|---|---|
| Overview | `#section-overview` | ✅ Live | Hero banner, stat cards, content shelves (upcoming, approvals queue, studio), team activity, brand score |
| Content Planner | `#section-content` | ✅ Live | Post queue with platform + type filters, status pipeline, brief generator form |
| Calendar | `#section-calendar` | ✅ Live | April 2026 calendar grid, color-coded by platform, delivery rate tracker |
| Team | `#section-team` | ✅ Live | Production kanban (Script → Design → Filming → Editing → Review → Published), workload per member, drag-and-drop |
| Analytics | `#section-analytics` | ✅ Live | Platform selector, stat cards, platform breakdown table, best-performing content |

### Management & brand

| Page | Section ID | Status | Description |
|---|---|---|---|
| Approval Inbox | `#section-approvals` | ✅ Live | Pending/Reviewed tabs, approve or send-back with notes, turnaround tracking |
| Campaigns | `#section-campaigns` | ✅ Live | Active campaign cards, cross-platform progress, campaign table |
| KPI Scorecard | `#section-kpi` | ✅ Live | Live scores mapped to Appendix B: Delivery 40%, Quality 20%, Ownership 20%, Collaboration 20% |
| Brand Guidelines | `#section-brand` | ✅ Live | Color swatches with copy-to-clipboard, typography, logo rules, tone of voice per language (FA/EN/AR) |

### Production

| Page | Section ID | Status | Description |
|---|---|---|---|
| Studio | `#section-studio` | ✅ Live | 7-stage AI video production workspace — Idea · Content Brief · Script · Characters · Angles & Shots · Editing · Export |

---

## How routing works

Single-page app. No URL changes. Navigation shows/hides section divs by toggling the `.hidden` class.

**The routing map in `app.js`:**

```js
var sectionMap = {
  overview:  'section-overview',
  content:   'section-content',
  calendar:  'section-calendar',
  team:      'section-team',
  analytics: 'section-analytics',
  brand:     'section-brand',
  approvals: 'section-approvals',
  campaigns: 'section-campaigns',
  kpi:       'section-kpi',
  studio:    'section-studio'
};
```

**To add a new page:**
1. Add a `<div id="section-X" class="dashboard-section hidden">` in `index.html`
2. Add a nav link with `data-section="X"` in the sidebar
3. Add `X: 'section-X'` to `sectionMap` and `X: 'Page Title'` to `titleMap` in `app.js`

**Shelf "See all" links** use `navigateTo('sectionname')` — a helper function in `app.js` that handles routing + active state + title update in one call.

---

## Studio — 7-stage workflow

The Studio section is a self-contained AI video production workspace. Each tab is an independent panel.

| Tab | Purpose | Key features |
|---|---|---|
| **Idea** | Concept board | Idea cards with status (New / Developing / Selected), brainstorm prompt sidebar |
| **Content Brief** | Structured brief form | Platform, objective, audience, key message, CTA, deadline, assigned presenter |
| **Script** | 3-panel script editor | Hook / Body / CTA with character count, estimated video duration (130 wpm), send-to-presenter button |
| **Characters** | Presenter & character cards | Name, role, language (FA/EN/AR), voice style, AI avatar settings |
| **Angles & Shots** | Shot list builder | Editable table with shot type, subject, duration, notes; scene setup card |
| **Editing** | Checklist | Pre-edit, visual, audio, platform optimization — per checkbox. Revision notes field |
| **Export** | Export settings | Format, resolution, frame rate, per-platform specs, ready-for-export checklist |

Tab switching is handled by `switchStudio(btn, panel)` in `app.js`.

---

## Key JavaScript functions

| Function | File | What it does |
|---|---|---|
| `showPage(page)` | `app.js` | Switches between login, signup, dashboard pages |
| `handleLogin(e)` | `app.js` | Handles login form submit, calls `enterDashboard()` |
| `enterDashboard(name)` | `app.js` | Sets username to "Negar's Dashboard", shows dashboard |
| `handleLogout()` | `app.js` | Clears session, returns to login |
| `navigateTo(section)` | `app.js` | Programmatic navigation — used by shelf "See all" links |
| `toggleSidebar()` | `app.js` | Mobile sidebar open/close |
| `filterContent(btn, type, val)` | `app.js` | Platform/type filter pills in Content Planner |
| `toggleBriefForm()` | `app.js` | Show/hide New Brief form |
| `filterAnalytics(btn, key)` | `app.js` | Platform selector in Analytics |
| `switchApprovalTab(tab)` | `app.js` | Pending/Reviewed tab in Approval Inbox |
| `approveItem(btn)` | `app.js` | Marks approval card as approved |
| `toggleNotes(btn)` | `app.js` | Shows send-back notes field |
| `initKanban(boardId)` | `app.js` | Initialises drag-and-drop on a kanban board |
| `copyColor(hex, el)` | `app.js` | Copies hex code to clipboard in Brand Guidelines |
| `switchStudio(btn, panel)` | `app.js` | Studio tab switching |
| `addIdeaCard()` | `app.js` | Adds a new idea card in Studio > Idea |
| `addCharCard()` | `app.js` | Adds a character card in Studio > Characters |
| `addShotRow()` | `app.js` | Adds a row to the shot list table |
| `updateWordCount()` | `app.js` | Live word count + estimated duration in Script editor |

---

## Brand colors

| Token | Hex | Used for |
|---|---|---|
| `--bg-0` | `#060c16` | Deepest background (sidebar, header) |
| `--bg-1` | `#09111e` | Page background |
| `--bg-2` | `#0d1828` | Card backgrounds |
| `--bg-3` | `#111e30` | Inner card elements, kanban cards |
| `--blue` | `#004dfa` | Primary actions, active states, links |
| `--yellow` | `#ffcc00` | Accent buttons, warnings, badges |
| `--green` | `#1dfd3d` | Success, Ready status, positive metrics |
| `--purple` | `#9b59b6` | Studio section — all Studio-related accents |

Platform tag colors: Instagram `#e1306c` · Instagram FA `#e1306c` · Instagram EN `#c13584` · Instagram AR `#9b59b6` · Telegram `#2AABEE` · YouTube `#ff4444` · LinkedIn `#4d9de0` · Twitter `#1d9bf0`

---

## CSS architecture

All styles live in `styles.css`. Key sections:

```
Design tokens (CSS variables)    — :root
Auth pages                       — .auth-page, .auth-card
Dashboard layout                 — #page-dashboard, .sidebar, .main, .header
Hero banner                      — .hero-banner, .hero-content
Content shelves                  — .shelf, .shelf-row, .poster-card, .video-card
Status pills                     — .status-pill, .pill-ready/review/progress/draft
Section pages                    — .section-pad, .stats-row, .grid-2/3/4, .card
Studio                           — .studio-tabs, .studio-tab, .studio-panel
Approval inbox                   — .approval-card, .btn-approve, .btn-sendback
Kanban                           — .kanban-board, .kanban-col, .kanban-card
Forms                            — .form-group, .form-input, .form-select, .form-textarea
KPI cards                        — .kpi-card, .kpi-score, .kpi-bar-fill
Brand swatches                   — .swatch, .swatch-color
Responsive breakpoints           — 1200px, 1024px, 768px, 480px
```

All spacing, colors, and radius values use CSS variables from `:root`. Do not hardcode hex values — reference the tokens.

---

## File structure

```
Negar-Dashboard/
├── index.html     — All markup: auth pages, sidebar, header, all 10 section panels
├── styles.css     — All styles: design tokens, layout, components, responsive
├── app.js         — All logic: routing, auth, filters, kanban, Studio, approvals
└── README.md      — This file
```

No folders, no sub-files, no dependencies. Everything is in these three files.

---

## Git branches

| Branch | Purpose |
|---|---|
| `main` | Stable. Only reviewed, tested code. |
| `claude/forex-dashboard-frontend-zB7ah` | Original build branch (merged) |
| `claude/add-navigation-sidebar-4LkbY` | Section routing implementation (merged) |
| `claude/social-media-dashboard-YCNrH` | Latest features: Studio, all sections, UI redesign |

**Working convention:** always branch from `main`. Name new branches `feature/X` or `fix/X`. Open a pull request before merging.

---

## Who owns what

| Area | Owner |
|---|---|
| Social media strategy, content direction | Negar — Social Media Strategy Lead |
| Dashboard development | Dev team |
| Design, brand assets | Ali — Designer |
| Arabic copy, captions | Arabic team |
| Video production | Sara (Videographer) · Reza (Editor) |
| Written copy | Maryam — Copywriter |

---

## Known issues & next steps

**Known issues:**
- Login is cosmetic — no real authentication
- Data is all static/hardcoded — no API connections yet
- Mobile layout needs testing on iOS Safari (sidebar overlay)
- Drag-and-drop on kanban is basic — no persistence between sessions

**Next up:**
- [ ] Connect Studio brief generator to Anthropic API (AI-assisted brief writing)
- [ ] Connect Analytics to real Instagram / LinkedIn / Telegram data
- [ ] Add notification system for approval inbox
- [ ] Persist kanban state in localStorage
- [ ] Fix header username (replace `Mohammadi.negar77` → `Negar's Dashboard`)
- [ ] Remove Arabic Oversight section from sidebar and codebase
- [ ] Apply streaming-inspired UI redesign (hero banner, poster shelves, Barlow Condensed font)
