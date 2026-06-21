# 🧩 Face Puzzle — Day 20 of 60-Day Claude AI Challenge

> Turn your face, your gallery, or any generated scene into a sliding puzzle — and solve it.

![Challenge Badge](https://img.shields.io/badge/60--Day%20AI%20Challenge-Day%2020-7b5cf8?style=for-the-badge)
![Built With](https://img.shields.io/badge/Built%20With-Claude%20%2B%20Vanilla%20JS-00c8b0?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen?style=for-the-badge)

---

## What It Does

Face Puzzle is a browser-based sliding puzzle game. Take a selfie, upload any image from your gallery, or pick one of 18 procedurally generated scenes — the app slices it into tiles and scrambles them. Your job is to put it back together.

Three difficulty levels: **Easy (3×3)**, **Medium (4×4)**, **Hard (5×5)**.

---

## Features

| Feature | Details |
|---|---|
| 📸 Selfie capture | Front camera via native file input — works on `file://`, HTTP, and HTTPS |
| 📁 Gallery upload | Upload any image from your device and turn it into a puzzle |
| 🎨 18 generated themes | 3 categories: Places, Animals, Creative — all drawn with Canvas API, no images fetched |
| 🔢 3 difficulty levels | 3×3 · 4×4 · 5×5 grids |
| 🏆 Leaderboard | Best move counts stored locally per image and difficulty |
| 🔒 100% offline | Your photos never leave your device. No server. No API calls. |
| 📱 Mobile-first | Designed for phone screens; works on desktop too |

---

## The 18 Generated Themes

**🏙 Places** — Sunset · Ocean · Forest · Neon City · Desert · Mountains

**🐾 Animals** — Lion · Peacock · Whale · Butterfly · Fox · Jellyfish

**✨ Creative** — Space · Abstract · Mandala · Aurora Borealis · Crystal · Lava

Every scene is drawn entirely with the HTML5 Canvas API — gradients, bezier curves, particle effects, and layered compositing. No external images.

---

## The Technical Problem (And How We Solved It)

The original brief called for `getUserMedia()` to access the front camera. That API requires a **secure context** — either `HTTPS` or `localhost`. A downloaded `.html` file opens as `file://`, which browsers block at the OS level. No amount of clicking "Allow" in the permissions dialog fixes it, because the browser ignores those settings for `file://` entirely.

**The fix:** swap the primary capture method to `<input type="file" accept="image/*" capture="user">`. This is the native browser API that opens the front camera on phones without needing HTTPS, a permissions dialog, or a secure context. It works on `file://`, Safari, Chrome, and the Claude app.

The live `getUserMedia` preview is still there as a **bonus** — if you serve the file over `localhost` or HTTPS, it activates automatically. Otherwise the file input path handles everything silently, with no error messages shown to the user.

---

## How to Run

No installation. No build step. No server required.

1. Download `facepuzzle.html`
2. Open it in any browser
3. That's it

If you want the live camera preview (optional):
```bash
python3 -m http.server 8080
# then open http://localhost:8080/facepuzzle.html
```

---

## How to Play

1. **Take a selfie** or **upload any image** from your gallery, or pick a theme
2. Choose your difficulty — Easy, Medium, or Hard
3. Tap tiles to slide them into the empty space
4. Reconstruct the original image in as few moves as possible
5. Beat your high score

---

## Built With

- HTML5 Canvas API — all image generation and puzzle rendering
- Vanilla JavaScript — zero frameworks, zero dependencies
- CSS custom properties — theming and animations
- FileReader API — local image uploads, nothing sent anywhere
- localStorage — leaderboard persistence

---

## Part of the 60-Day Claude AI Challenge

This is Day 20 of a 60-day challenge building real, portfolio-worthy projects using Claude as a development partner — one per day, shipped as single self-contained files.

**Previous projects:** LifeLens · Stock Dashboard · and more

Follow the journey: [LinkedIn](#) · [GitHub](#)

---

*Built by Temi · Powered by Claude (Anthropic)*
