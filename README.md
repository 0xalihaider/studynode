# 🚀 StudyNode

> A privacy-first, retro-brutalist offline study & MCQ mastery platform built for deep learning, active recall, and zero-distraction exam preparation.

![StudyNode Visual Aesthetic](https://img.shields.io/badge/Aesthetic-Retro--Brutalist-yellow?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 🌟 What is StudyNode?

**StudyNode** is an intelligent, offline-capable learning environment designed to organize your study subjects into structured topics and practice multiple-choice questions (MCQs) with instant feedback. 

Unlike bloated LMS tools or cloud platforms that lock your study materials behind paywalls and automated tracking, **StudyNode gives 100% data ownership back to you**. Your data stays safely in your browser via IndexedDB, with zero sign-ups, zero tracking, and absolute user control over imports and exports.

---

## 🔥 Key Advantages of Using StudyNode

* 🎨 **Tactile Retro-Brutalist Visual Design**: Featuring high-contrast borders (`3px border-ink`), bold pastel option cards (`Lime`, `Yellow`, `Periwinkle`, `Slate`), and tactile shadows (`shadow-hard`), designed to keep your eyes focused and engaged.
* 🔒 **100% Local & Privacy-First**: Powered by browser IndexedDB. No remote database or account registration needed. Your study materials never leave your device.
* 🤖 **Built-in Resilient AI Markdown Parser**: Seamlessly import whole subjects or targeted topic files created with LLMs (ChatGPT, Gemini, Claude). The parser automatically strips escaped characters (`\- \[x\]`, backslashes, fenced code blocks) to ensure 0% parse failure.
* ⚡ **Manual & Custom Pace Quiz Runner**: Auto-advance is disabled by default so you can absorb answer explanations without being rushed. Need speed runs? Enable **Auto Next** with custom timers whenever you want.
* 🎵 **Ambient Study Focus**: Built-in audio controller with ambient soundscapes and retro sound effects to keep you in the flow zone.
* 📦 **Total Import / Export Control**: Full platform JSON backups and standard StudyNode `.md` file support, giving you total freedom over your data.

---

## 🛠️ How to Use StudyNode

### 1. Managing Subjects & Topics
* **Create a Subject**: Click **+ Subject** on the dashboard to start a new course (e.g., *Linux*, *HTML & Web Standards*, *World Geography*).
* **Organize Topics**: Click on any subject card to open its topic accordion. You can reorder topics, add custom notes, or launch targeted quizzes per topic.

### 2. Importing Study Content via AI Prompts
StudyNode includes built-in AI Prompt Generators for generating whole subjects or individual topics:
1. Click **Import Markdown** on the main dashboard or inside a Subject page.
2. Select **Subject Generator** or **Topic Generator** to configure parameters (`SUBJECT`, `LEVEL`, `QUESTIONS_PER_TOPIC`).
3. Click **Copy AI Prompt** and paste it into any AI tool (ChatGPT/Claude/Gemini).
4. Paste or upload the raw `.md` output back into StudyNode and click **Execute Import**.

### 3. Taking Quizzes & Active Recall
* Click **Start Topic Quiz** or use the **Quiz Builder** to combine topics.
* Click an option (A, B, C, D) to instantly inspect the correct answer and read the detailed explanation.
* Use keyboard shortcuts or click **Next Question ➔** to progress at your own pace.

---

## 📜 StudyNode Markdown Standard Format

To manually write or format custom `.md` study files, use the official StudyNode specification:

```markdown
---
studynode: 1
subject: html
---

# 1. Document Structure & Semantics

## Q: Which HTML element represents a self-contained composition?

type: mcq
difficulty: easy
tags: semantics, structure

- [x] The article element
- [ ] The section element
- [ ] The div element
- [ ] The main element

explain: The article element is intended for self-contained, reusable content like blog posts or news items.
