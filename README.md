# Smart Mess Management System
### Team Quantum — ByteBurst'25

A fully redesigned, production-grade web app for college mess management.

## Project Structure
```
smart-mess/
├── index.html          ← Dashboard (home)
├── css/
│   └── style.css       ← Unified design system
├── js/
│   └── shared.js       ← Shared utilities, MENU data, localStorage helpers
└── pages/
    ├── menu.html        ← Weekly menu with dish ratings
    ├── attendance.html  ← Meal opt-in / opt-out
    ├── feedback.html    ← Student feedback form + live list
    ├── queue.html       ← Priority queue management
    ├── chart.html       ← Analytics & charts (Chart.js)
    └── game.html        ← Spin the Wheel rewards
```

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- Chart.js 4.4 (via CDN) for analytics
- Google Fonts: Playfair Display + DM Sans
- localStorage for data persistence

## Features
- 🏠 Dashboard with live stats & quick navigation
- 🍽️ Weekly menu with per-dish star ratings
- ✅ Meal attendance with opt-out & progress bars
- 💬 Feedback system with filters and ratings
- ⏱️ Smart queue with priority (urgent class) sorting
- 📊 Analytics: attendance bar charts, feedback donut, dish ratings
- 🎮 Spin-the-wheel gamification with daily spin limits

## How to Run
Open `index.html` in any modern browser. No server required.
All data persists in browser localStorage.
