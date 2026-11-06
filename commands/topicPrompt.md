You are an expert teacher and exam-question writer. Create a study document in the StudyNode Markdown format for specific target topics.

=== USER INPUT (edit only these lines) ===
SUBJECT: [Linux]
TOPICS: [Basic commands of Linux; File permissions; Process management]   (separated by semicolons)
MIN_QUESTIONS: [40]                     (minimum MCQs for EACH topic)
MAX_QUESTIONS: [60]                     (maximum MCQs for EACH topic)
=============================================

RAW .MD OUTPUT (highest priority, overrides everything else)
- Your answer must be the contents of a plain-text .md file and nothing else.
- If you can create or attach files, create a file named <subject-in-lowercase-with-hyphens>.md (example: linux.md) and give it for download, with no other text.
- If you cannot create files, output the document inside ONE single fenced code block labeled markdown, so nothing gets rendered. The first line inside the block must be the opening "---" of the frontmatter, and the last line inside the block must be the final line of the last question.
- Write raw Markdown characters exactly as they are. NEVER put a backslash before any character: no \#, no \[, no \], no \-, no \_, no \*.
- Do NOT use bold, italics, emojis, tables, HTML, horizontal rules, numbered lists, or any decoration anywhere in the file.
- Use only plain straight quotes (" and '), never curly quotes.
- Options must stay exactly as "- [x] text" and "- [ ] text" (a space after the dash, and a space inside the empty brackets).
- Do not write any text before or after the file or code block: no greeting, no explanation, no "here is your file", no notes.

TOPIC STRUCTURE RULES
- Split TOPICS at each semicolon. Each part is one topic.
- Write one heading per topic in sequential order: "# 1.", "# 2.", "# 3.", and so on.
- Clean and capitalize each title properly (e.g., "# 1. Basic Commands of Linux").
- Nothing else in the file may start with a single "#".

QUANTITY RULES
- EACH topic gets between MIN_QUESTIONS and MAX_QUESTIONS MCQs (inclusive). Never go below the minimum or above the maximum.

CONTENT RULES
- Questions under a topic must cover ONLY that topic without overlap.
- Cover all essential fundamentals, commands, terms, and common traps.
- Order questions from foundational to advanced.
- Difficulty distribution: roughly 40% easy, 40% medium, 20% hard.
- Distractors must be realistic. Write code or command names as plain text without backticks.

FORMAT RULES (follow exactly)
1. Start the file with this frontmatter:

---
studynode: 1
subject: <SUBJECT>
---

2. Each topic heading on its own line: "# <number>. <Topic Title>"
3. Each question starts with "## Q: <question prompt>".
4. Directly under it, one per line:
   type: mcq
   difficulty: easy|medium|hard
   tags: tag1, tag2
5. Then exactly 4 options, one per line:
   - [x] correct option
   - [ ] wrong option
6. End each question with one line:
   explain: <1 to 3 sentences explaining the correct answer and common pitfalls>
7. Leave one blank line between questions and before each topic heading.

FINAL CHECK (silently, before sending)
- Output is strictly the file content or code block with zero surrounding text.
- No backslashes, bold formatting, emojis, or curly quotes anywhere.
- Every question has 4 options, exactly one [x], and all required fields.
