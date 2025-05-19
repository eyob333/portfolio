# 🌐 Vite + Three.js + Custom Shaders + Theatre.js + GSAP

This project is a high-performance WebGL experience built with [Vite](https://vitejs.dev/), [Three.js](https://threejs.org/), [GSAP](https://gsap.com/), [Theatre.js](https://www.theatrejs.com/), and custom GLSL shaders. It features dynamic loading, smooth animations, and real-time 3D interaction.

---

## 🚀 Features

- ⚡️ Fast bundling with **Vite**
- 🧱 Interactive 3D with **Three.js**
- 🎨 Visual effects using **custom GLSL shaders**
- 🎭 Animation & state management via **Theatre.js**
- 🌀 Smooth transitions & motion with **GSAP**
- ⏳ Loading screen until all assets are loaded

---


## 📦 Installation

```bash
git clone https://github.com/your-username/portofolio.git
cd portofolio
npm install
---

## 🛠️ Development
```bash
npm run dev

---
🧰 Project Structure

├── public/               # Static assets
├── src/
│   ├── assets/           # Models, textures, shaders
│   ├── shaders/          # GLSL shader files
│   ├── animations/       # GSAP + Theatre.js animation setup
│   ├── main.js           # Entry point
│   └── loading.js        # Loading screen logic
├── index.html
└── vite.config.js