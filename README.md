# Talk to TIME (TTT News) 📰⚡

> **"Understand the world. One story at a time."**  
> Managed by **FX Media House** • Established 15 August 2018

Talk to TIME is a modern, high-performance editorial news and media network platform. It features real-time breaking dispatches, multimedia video broadcasts, AI key takeaways, audio briefing playback, verified channel owner upload console, live IST digital clock, and dark/light editorial themes.

---

## 🌟 Key Features

- **Editorial 2-Column Responsive Feed:** Optimized full-width grid displaying real-time dispatches with thumbnail imagery, read-times, and AI insights.
- **Top Utility Bar:** Live financial market marquee ticker, bureau weather indicator, and an interactive animated digital clock (IST / 24-Hour Military format toggle).
- **Sticky Global Navigation:** Glowing category buttons (`Home`, `India`, `World`, `Politics`, `Technology`, `Business`, `Sports`, `Entertainment`, `Science`, `AI`).
- **Owner Broadcast Studio:** Protected video and news publishing console with upload dropzone and live video stream preview (restricted to verified channel owner).
- **Floating AI Audio Briefing Player:** Sticky, interactive audio player with animated sound waves, scrubbing timeline, and playback controls.
- **Theme Toggle:** Instant switch between Obsidian Dark and Editorial Light themes with local storage persistence.
- **Official Network Connect Buttons:** Animated 3D hover buttons for YouTube, Facebook, Phone Support, and Direct Email.
- **Search & Saved Library:** Instant search modal with hotkey (`Ctrl+K`) and personal offline bookmark system.

---

## 📁 Repository Structure

```text
News_website/
├── index.html          # Main HTML entrypoint (Clean, semantic, SEO-optimized)
├── .nojekyll           # Bypasses Jekyll on GitHub Pages for flawless static hosting
├── .gitignore          # Ignores system files, logs, and temp artifacts
├── README.md           # Documentation & deployment guide
├── assets/
│   └── logo.svg        # Talk to TIME SVG emblem & channel branding
├── css/
│   └── style.css       # Master responsive design system (Vanilla CSS)
└── js/
    ├── news-data.js    # Curated editorial news articles & video dispatches
    └── app.js          # Core application logic, live clocks, filters, & modals
```

---

## 🚀 How to Run Locally

You can run this project locally without any dependencies or build steps:

1. **Directly in Browser:**
   Double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).

2. **Using a Local Server (Recommended for full video/audio stream features):**
   ```bash
   # Using Python
   python -m http.server 8080

   # Using Node.js npx
   npx serve .
   ```
   Open `http://localhost:8080` in your browser.

---

## 🌐 How to Deploy on GitHub Pages

1. **Initialize Git & Commit:**
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit: Talk to TIME News Network"
   ```

2. **Create a New Repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Set repository name (e.g., `talk-to-time` or `news-website`)
   - Leave it public and do not initialize with README (we already have one)

3. **Push Code to GitHub:**
   ```bash
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Click **Settings** ⚙️ > **Pages** (in the left sidebar).
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Select Branch: **`main`** and Folder: **`/ (root)`**.
   - Click **Save**.
   - Your website will be live in ~1 minute at:
     `https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 🛡️ License & Copyright

Copyright © 2018–2026 **Talk to TIME**. Managed by **FX Media House**. All rights reserved.
