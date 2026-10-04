# AI Career Roadmap Portal
A multi-page front-end website that helps students choose and follow AI / Data Science careers.

## Problem Statement
After learning programming, many students are unsure which AI or data career to pursue or what to learn next.

## Goal
Give students guidance, structured roadmaps, free resources and progress tracking in one place.

## Features
- 8 career profiles with skills, duration, demand and projects
- Dynamic 6-phase roadmap per career (`roadmap.html?career=ai-engineer`)
- 8-question scored career quiz with match breakdown
- Progress tracker, skill and project checklists, career goal, reset with confirmation
- Free resources, validated contact form, responsive UI with 3D tilt cards and animated cube

## Tech Stack
HTML5, CSS3, Vanilla JavaScript, SVG. No frameworks, no backend.

## Folder Structure
```
career-roadmap-portal/
├── index.html  style.css  script.js  README.md
├── images/ (logo, ai-career, data-career, roadmap .svg)
└── pages/ (careers, roadmap, quiz, resources, tracker, contact .html)
```

## How to Run
Open `index.html` in a browser, or use VS Code Live Server.

## How the Roadmap Works
Career data lives in `script.js`. The Careers page links to `roadmap.html?career=<id>`; the script reads the URL parameter and builds six phases (fundamentals, maths, core, advanced, projects, career prep). Marking a phase complete updates the percentage and progress bar.

## How localStorage Is Used
One key, `acrp`, stores `{career, done{careerId:[phases]}, skills[], projects[], quiz{}}`. Everything persists after refresh; Reset Progress removes the key.

## Quiz Functionality
Each answer awards 2 points to its primary career and 1 to secondary ones. The highest total is recommended, saved, and shown with a match breakdown.

## Future Improvements
User accounts, backend for the contact form, more careers, certificates, dark/light toggle.

## Deploy on GitHub Pages
1. Push the folder to a GitHub repository.
2. Repository → Settings → Pages.
3. Source: `main` branch, `/ (root)` → Save.
4. Visit `https://<username>.github.io/<repo>/`.
