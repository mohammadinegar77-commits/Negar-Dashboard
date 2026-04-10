# Negar Dashboard

A responsive, single-page social media operations dashboard for **OPOFINANCE**, built with plain HTML, CSS, and JavaScript.

## Overview

This project provides:

- Authentication-style entry pages (login + signup UI)
- A multi-section social media dashboard
- Team/content workflows (planner, approvals, kanban)
- Lightweight interactions with no external framework dependencies

The app is designed as a static front-end prototype and can be run locally in any modern browser.

## Tech Stack

- **HTML5** (`index.html`)
- **CSS3** (`styles.css`)
- **Vanilla JavaScript** (`app.js`)

No build pipeline or package manager is required.

## Project Structure

```text
Negar-Dashboard/
├── index.html    # App layout and sections
├── styles.css    # Theme, layout, component styles, responsive behavior
├── app.js        # Navigation, auth simulation, filters, interactions
└── README.md
```

## Features

- **Auth flow (UI simulation):** login/signup views and in-session user name/avatar rendering.
- **Dashboard navigation:** sidebar section switching and dynamic page title updates.
- **Overview metrics:** stats cards and platform performance summary.
- **Content tools:** planner filters, approvals inbox actions, kanban drag-and-drop.
- **Studio helpers:** dynamic cards/rows and script word count utilities.
- **Responsive UX:** mobile sidebar toggle with overlay behavior.

## Getting Started

### Option 1: Open directly

1. Clone or download this repository.
2. Open `index.html` in your browser.

### Option 2: Run a local static server (recommended)

From the project root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Usage Notes

- Authentication is **mocked in the browser** via `sessionStorage`.
- There is no backend, API integration, or database persistence.
- Refresh behavior depends on client-side state only.

## Customization

- Update branding text/logo in `index.html`.
- Tune colors/spacing/typography in `styles.css`.
- Extend interactions or data mappings in `app.js` (e.g., analytics filters, kanban logic).

## Future Enhancements

- Integrate real authentication and role-based access.
- Connect social APIs for live metrics.
- Persist content and approval states in a backend.
- Add automated tests for key UI flows.

## License

No license file is currently included.
If you plan to distribute or open-source this project, add a `LICENSE` file (e.g., MIT).
