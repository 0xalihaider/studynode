You are an expert teacher and exam-question writer. Create a study document in the StudyNode Markdown format for a whole SUBJECT.

=== USER INPUT (edit only these lines) ===
SUBJECT: [Linux]
LEVEL: [Beginner]                      (Beginner / Intermediate / Advanced)
TOTAL_TOPICS: [10]                     (Total topics to divide the subject into)
TOPIC_RANGE_TO_GENERATE: [1-2]         (e.g., 1-2, 3-4, or ALL)
MIN_QUESTIONS_PER_TOPIC: [40]
MAX_QUESTIONS_PER_TOPIC: [60]
===========================================

RAW .MD OUTPUT (highest priority, overrides everything else)
- Your answer must be the contents of a plain-text .md file and nothing else.
- If you can create or attach files, create a file named <subject-in-lowercase-with-hyphens>.md (example: linux.md) and give it for download, with no other text.
- If you cannot create files, output the document inside ONE single fenced code block labeled markdown, so nothing gets rendered. The first line inside the block must be the opening "---" of the frontmatter, and the last line inside the block must be the final line of the last question.
- Write raw Markdown characters exactly as they are. NEVER put a backslash before any character: no \#, no \[, no \], no \-, no \_, no \*.
- Do NOT use bold, italics, emojis, tables, HTML, horizontal rules, numbered lists, or any decoration anywhere in the file.
- Use only plain straight quotes (" and '), never curly quotes.
- Options must stay exactly as "- [x] text" and "- [ ] text" (a space after the dash, and a space inside the empty brackets).
- Do not write any text before or after the file or code block: no greeting, no explanation, no "here is your file", no notes.

STEP 1: PLAN THE TOPICS (do this silently, do not print the plan)
- If the user did not provide explicit topics, automatically divide SUBJECT into exactly TOTAL_TOPICS topics suited to LEVEL.
- Order them logically like a real course: foundations first, with each topic building on previous ones.
- Topics must not overlap. Together they must cover everything essential for this LEVEL with zero gaps.

STEP 2: WRITE ONLY THE REQUESTED TOPIC RANGE
- Look at TOPIC_RANGE_TO_GENERATE. Write ONLY the topics specified in that range (e.g., if range is "1-2", generate only "# 1." and "# 2.").
- Number headings accurately matching their absolute topic index: "# <Topic Number>. <Topic Title>".

QUANTITY RULES
- Each generated topic gets between MIN_QUESTIONS_PER_TOPIC and MAX_QUESTIONS_PER_TOPIC MCQs (inclusive). Never go below the minimum or above the maximum.

CONTENT RULES
- Questions in a topic must cover ONLY that topic.
- Cover every core concept, command, term, rule, and pitfall needed for this LEVEL.
- Order questions inside a topic from foundational to advanced.
- Difficulty distribution: roughly 40% easy, 40% medium, 20% hard.
- Do not repeat an idea within a topic or across topics.
- Distractors must be believable. Write code or commands as plain text with no backticks.

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
   explain: <1 to 3 sentences on why the answer is correct and why common wrong choices are incorrect>
7. Leave one blank line between questions and before each topic heading.

FINAL CHECK (silently, before sending)
- Output is strictly the single code block or download file with zero surrounding conversational text.
- No backslashes, bold formatting, emojis, or curly quotes anywhere.
- Every question has 4 options, exactly one [x], and all required fields.
