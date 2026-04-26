# 🧹 60-Minute Home Reset Checklist
### By The Spoiled Brand

A free interactive cleaning checklist for busy moms — live on the web via Vercel.

---

## 🚀 How to Deploy to Vercel (Beginner-Friendly)

### Option A — Deploy from GitHub (Recommended)

1. **Create a free account** at [github.com](https://github.com) if you don't have one
2. **Create a new repository** → click the green "New" button → name it `home-reset-checklist`
3. **Upload these files** by dragging the entire folder into the GitHub repo page
4. **Go to [vercel.com](https://vercel.com)** → sign up free with your GitHub account
5. Click **"Add New Project"** → import your GitHub repo
6. Leave all settings as-is → click **"Deploy"**
7. ✅ Done! Vercel gives you a live URL like `home-reset-checklist.vercel.app`

---

### Option B — Deploy with Vercel CLI

If you're comfortable with Terminal:

```bash
# Install dependencies
npm install

# Test locally first
npm run dev

# Install Vercel CLI & deploy
npm install -g vercel
vercel
```

---

## 📁 Folder Structure

```
home-reset-checklist/
├── index.html          ← Page shell (don't edit)
├── package.json        ← Project config
├── vite.config.js      ← Build config
├── README.md           ← You're reading this!
└── src/
    ├── main.jsx        ← App entry point (don't edit)
    └── App.jsx         ← ✏️ All checklist content lives here
```

---

## ✏️ How to Edit the Checklist

Open `src/App.jsx` — all the tasks are at the top in the `tasks` array. You can:
- Change task text
- Add/remove items
- Update zone names or colors

---

## 💕 The Spoiled Brand
- Spoiled Homes Cleaning Service
- Pop by Ria
- Spoiled Bears
- Digital Products
