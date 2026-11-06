import React, { useState, useEffect, useRef } from "react";
import type { ReactElement, FormEvent, MouseEvent, ChangeEvent } from "react";
import {
  BookOpen,
  Plus,
  Terminal,
  ArrowLeft,
  Play,
  CheckCircle2,
  XCircle,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  Upload,
  Copy,
  Check,
  FileText,
  X,
  Music,
  Pause,
  Clock,
  Settings,
  Award,
  RefreshCw,
  Layers,
  Moon,
  Sun,
} from "lucide-react";

// --- Types & Interfaces ---
export interface ItemOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface Item {
  id: string;
  prompt: string;
  options: ItemOption[];
  explanation?: string;
}

export interface Topic {
  id: string;
  order: number;
  title: string;
  description?: string;
  items: Item[];
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: typeof BookOpen;
  topics: Topic[];
}

export interface ParsedItem {
  prompt: string;
  options: ItemOption[];
  explanation: string;
}

export interface ParsedTopic {
  title: string;
  description: string;
  items: ParsedItem[];
}

// Inline SVGs for brand & custom icons to guarantee safety
const TwitterIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const GithubIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const EditIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);
const ArrowUpIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);
const ArrowDownIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);
const SkipBackIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="19" x2="5" y2="5" />
  </svg>
);
const SkipForwardIcon = ({ size = 16 }: { size?: number }): ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </svg>
);

const globalStyles = `
  :root {
    --bg: #FFF8E7;
    --surface: #FFFDF6;
    --ink: #2B1B17;
    --muted: #705D55;
    --lime: #C9E28F;
    --yellow: #F5E04D;
    --periwinkle: #A9B1D9;
    --slate: #93AAB8;
    --orange: #F58220;
    --teal: #1B9A83;
    --red: #E0524D;
  }

  [data-theme="dark"] {
    --bg: #1E1512;
    --surface: #2A1E1A;
    --ink: #FFF8E7;
    --muted: #DCCFC0;
    --lime: #8DA862;
    --yellow: #B6A62F;
    --periwinkle: #70799F;
    --slate: #607884;
    --orange: #F58220;
    --teal: #42B49D;
    --red: #EF716A;
  }

  body {
    background-color: var(--bg);
    color: var(--ink);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .border-ink {
    border: 3px solid var(--ink);
  }

  .shadow-hard {
    box-shadow: 4px 4px 0 var(--ink);
  }

  .babadum-btn {
    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease, background-color 0.2s;
  }
  .babadum-btn:hover {
    transform: translateY(-2px);
  }
  .babadum-btn:active {
    transform: translate(2px, 2px) !important;
    box-shadow: 1px 1px 0 var(--ink) !important;
  }

  .babadum-card {
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
  }
  .babadum-card:hover {
    transform: translateY(-4px);
  }

  .logo-blob {
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    animation: blob-bounce 3s infinite alternate ease-in-out;
  }

  @keyframes blob-bounce {
    0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }

  @keyframes streak-pop {
    0% { transform: scale(0.6) rotate(-5deg); opacity: 0; }
    50% { transform: scale(1.15) rotate(3deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  .animate-shake {
    animation: shake 0.4s ease-in-out;
  }

  .animate-streak {
    animation: streak-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;

// Simple Markdown Parser for StudyNode Documents
function parseStudyMarkdown(source: string): {
  subjectTitle: string;
  topics: ParsedTopic[];
} {
  // Clean backslash escape sequences commonly outputted by LLMs (e.g. \- \[x\] -> - [x])
  const cleanedSource = source.replace(/\\([#\[\]\-_*])/g, "$1");
  const lines = cleanedSource.replace(/\r\n?/g, "\n").split("\n");
  let subjectTitle = "Imported Subject";
  let frontmatter = false;

  const topics: ParsedTopic[] = [];
  let currentTopic: ParsedTopic | null = null;
  let currentItem: ParsedItem | null = null;

  function finishItem(): void {
    if (currentItem && currentTopic) {
      if (currentItem.prompt.trim() && currentItem.options.length > 0) {
        currentTopic.items.push(currentItem);
      }
      currentItem = null;
    }
  }

  function finishTopic(): void {
    finishItem();
    if (currentTopic && (currentTopic.items.length > 0 || currentTopic.title)) {
      topics.push(currentTopic);
      currentTopic = null;
    }
  }

  lines.forEach((line: string, index: number) => {
    const trimmed = line.trim();
    if (index === 0 && trimmed === "---") {
      frontmatter = true;
      return;
    }
    if (frontmatter && trimmed === "---") {
      frontmatter = false;
      return;
    }
    if (frontmatter) {
      const match = trimmed.match(/^subject\s*:\s*(.+)$/i);
      if (match) subjectTitle = match[1].trim().replace(/^['"]|['"]$/g, "");
      return;
    }

    // STRICT Match for single '#' Topic headers ONLY (e.g. # 1. Topic Title or # Topic Title)
    const topicMatch = trimmed.match(/^#\s+(?![#Q])\s*(\d*\.?\s*.+)$/i);
    if (topicMatch) {
      finishTopic();
      const cleanTitle = topicMatch[1].trim().replace(/^\d+\.\s*/, "");
      currentTopic = {
        title: cleanTitle || topicMatch[1].trim(),
        description: "",
        items: [],
      };
      return;
    }

    const qMatch = trimmed.match(/^##\s*Q:\s*(.+)$/i);
    if (qMatch) {
      finishItem();
      if (!currentTopic) {
        currentTopic = {
          title: "Topic 1",
          description: "Imported Questions",
          items: [],
        };
      }
      currentItem = { prompt: qMatch[1].trim(), options: [], explanation: "" };
      return;
    }

    if (currentItem) {
      if (trimmed.match(/^(type|difficulty|tags)\s*:/i)) {
        return;
      }

      // Flexible matching for checkboxes (- [x], - [ ], * [x], etc.)
      const optionMatch = trimmed.match(/^[-*]\s*\[([ xX])\]\s*(.*)$/);
      if (optionMatch) {
        currentItem.options.push({
          id: "opt-" + Math.random().toString(36).substring(2, 9),
          text: optionMatch[2].trim(),
          correct: optionMatch[1].toLowerCase() === "x",
        });
        return;
      }

      const expMatch = trimmed.match(/^explain\s*:\s*(.+)$/i);
      if (expMatch) {
        currentItem.explanation = expMatch[1].trim();
      }
    }
  });

  finishTopic();
  return { subjectTitle, topics };
}

// Audio Synthesizer for Quiz Effects
const playSound = (
  type: "correct" | "wrong" | "streak" | "victory" | "tick",
  soundEnabled = true,
): void => {
  if (!soundEnabled) return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "correct") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.18);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.setValueAtTime(150, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "streak") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.08);
      osc.frequency.setValueAtTime(659.25, now + 0.16);
      osc.frequency.setValueAtTime(880, now + 0.24);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === "victory") {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(freq, now + idx * 0.1);
        g.connect(ctx.destination);
        o.connect(g);
        g.gain.setValueAtTime(0.2, now + idx * 0.1);
        g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.3);
        o.start(now + idx * 0.1);
        o.stop(now + idx * 0.1 + 0.3);
      });
    } else if (type === "tick") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // Ignore audio context failures
  }
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  let variantStyles =
    "bg-[var(--orange)] text-[var(--ink)] border-ink shadow-hard";
  if (variant === "secondary") {
    variantStyles =
      "bg-[var(--surface)] text-[var(--ink)] border-ink shadow-hard";
  } else if (variant === "ghost") {
    variantStyles = "hover:bg-[var(--surface)] text-[var(--ink)]";
  } else if (variant === "danger") {
    variantStyles = "bg-[var(--red)] text-white border-ink shadow-hard";
  }

  return (
    <button
      className={`font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer babadum-btn select-none whitespace-nowrap ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  color = "var(--yellow)",
  className = "",
}) => (
  <span
    className={`font-bold text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl border-ink border-2 inline-flex items-center gap-1 select-none whitespace-nowrap ${className}`}
    style={{ backgroundColor: color }}
  >
    {children}
  </span>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-[var(--surface)] border-ink shadow-hard rounded-[24px] sm:rounded-[32px] max-w-lg w-full p-4 sm:p-6 md:p-8 relative z-10 space-y-4 max-h-[90vh] overflow-y-auto my-auto">
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--ink)]/15">
          <h3 className="font-extrabold text-xl sm:text-2xl truncate pr-2">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-ink bg-[var(--bg)] hover:bg-[var(--red)] hover:text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer shrink-0"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default function App(): ReactElement {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [currentView, setCurrentView] = useState<"home" | "subject" | "quiz">(
    "home",
  );
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Audio Playlist State
  const [playlist, setPlaylist] = useState<{ name: string; url: string }[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaylistMenuOpen, setIsPlaylistMenuOpen] = useState<boolean>(false);
  const playlistContainerRef = useRef<HTMLDivElement | null>(null);

  // Data & Export Menus State
  const [isDataMenuOpen, setIsDataMenuOpen] = useState<boolean>(false);
  const dataMenuRef = useRef<HTMLDivElement | null>(null);
  const [isSubjectExportMenuOpen, setIsSubjectExportMenuOpen] =
    useState<boolean>(false);
  const subjectMenuRef = useRef<HTMLDivElement | null>(null);

  // Mobile Drawer Navigation State
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // Quiz State
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [quizQuestions, setQuizQuestions] = useState<Item[]>([]);
  const [quizTimerSeconds, setQuizTimerSeconds] = useState<number>(0);

  // Accordions & Modals State
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {},
  );
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState<boolean>(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const [isAddTopicOpen, setIsAddTopicOpen] = useState<boolean>(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const [isAddItemOpen, setIsAddItemOpen] = useState<boolean>(false);
  const [activeTopicForNewItem, setActiveTopicForNewItem] =
    useState<Topic | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const [isQuizBuilderOpen, setIsQuizBuilderOpen] = useState<boolean>(false);

  // Import Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importType, setImportType] = useState<
    "platform" | "subject" | "topic"
  >("subject");
  const [importSourceText, setImportSourceText] = useState<string>("");
  const [importTargetTopicId, setImportTargetTopicId] = useState<string>("");
  const [importTargetTopicMode, setImportTargetTopicMode] = useState<
    "auto" | "existing" | "custom"
  >("auto");
  const [importCustomTopicTitle, setImportCustomTopicTitle] =
    useState<string>("");
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Prompt Form States - Defaulting to Universal, General Non-Technical Subjects
  const [promptSubject, setPromptSubject] = useState<string>("World Geography");
  const [promptLevel, setPromptLevel] = useState<string>("Beginner");
  const [promptTotalTopics, setPromptTotalTopics] = useState<number>(10);
  const [promptTopicRange, setPromptTopicRange] = useState<string>("1-2");
  const [promptMinQs, setPromptMinQs] = useState<number>(40);
  const [promptMaxQs, setPromptMaxQs] = useState<number>(60);

  const [topicPromptList, setTopicPromptList] = useState<string>(
    "Oceans & Continents; World Capitals; Famous Landmarks",
  );
  const [topicPromptMinQs, setTopicPromptMinQs] = useState<number>(40);
  const [topicPromptMaxQs, setTopicPromptMaxQs] = useState<number>(60);

  // Form Fields State
  const [newSubTitle, setNewSubTitle] = useState<string>("");
  const [newSubDesc, setNewSubDesc] = useState<string>("");

  const [topicTitleInput, setTopicTitleInput] = useState<string>("");
  const [topicDescInput, setTopicDescInput] = useState<string>("");

  const [newItemPrompt, setNewItemPrompt] = useState<string>("");
  const [newItemOpts, setNewItemOpts] = useState<string[]>(["", "", "", ""]);
  const [newItemCorrectIdx, setNewItemCorrectIdx] = useState<number>(0);
  const [newItemExp, setNewItemExp] = useState<string>("");

  // Custom Quiz Builder State
  const [quizScopeMode, setQuizScopeMode] = useState<
    "all" | "range" | "specific"
  >("all");
  const [rangeStartOrder, setRangeStartOrder] = useState<number>(1);
  const [rangeEndOrder, setRangeEndOrder] = useState<number>(1);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [customTimerInput, setCustomTimerInput] = useState<string>("45");
  const [useCustomTimer, setUseCustomTimer] = useState<boolean>(false);

  // Initial Subjects Setup
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "sub-1",
      title: "World Geography & Continents",
      description:
        "Explore world capitals, oceans, major rivers, and continental landmarks.",
      color: "var(--lime)",
      icon: BookOpen,
      topics: [
        {
          id: "top-1",
          order: 1,
          title: "Oceans & Continents Basics",
          description: "Fundamental facts about Earth’s geography.",
          items: [
            {
              id: "item-1",
              prompt: "Which is the largest ocean on Planet Earth?",
              options: [
                { id: "opt-1", text: "Pacific Ocean", correct: true },
                { id: "opt-2", text: "Atlantic Ocean", correct: false },
                { id: "opt-3", text: "Indian Ocean", correct: false },
                { id: "opt-4", text: "Arctic Ocean", correct: false },
              ],
              explanation:
                "The Pacific Ocean covers over 30% of the Earth’s surface, making it the largest ocean.",
            },
            {
              id: "item-2",
              prompt:
                "Which continent has the largest population in the world?",
              options: [
                { id: "opt-21", text: "Europe", correct: false },
                { id: "opt-22", text: "Asia", correct: true },
                { id: "opt-23", text: "Africa", correct: false },
                { id: "opt-24", text: "North America", correct: false },
              ],
              explanation:
                "Asia is home to around 60% of the total human population.",
            },
          ],
        },
        {
          id: "top-2",
          order: 2,
          title: "World Capitals",
          description: "Famous capital cities across the globe.",
          items: [
            {
              id: "item-3",
              prompt: "What is the capital city of France?",
              options: [
                { id: "opt-31", text: "Rome", correct: false },
                { id: "opt-32", text: "Paris", correct: true },
                { id: "opt-33", text: "Madrid", correct: false },
                { id: "opt-34", text: "Berlin", correct: false },
              ],
              explanation:
                "Paris is the capital and most populous city of France.",
            },
          ],
        },
      ],
    },
    {
      id: "sub-2",
      title: "General Science & Planet Earth",
      description:
        "Solar system, nature, atmospheric layers, and basic physics.",
      color: "var(--yellow)",
      icon: Terminal,
      topics: [
        {
          id: "top-3",
          order: 1,
          title: "Solar System Fundamentals",
          description: "Planets and celestial bodies.",
          items: [
            {
              id: "item-4",
              prompt: 'Which planet is known as the "Red Planet"?',
              options: [
                { id: "opt-41", text: "Venus", correct: false },
                { id: "opt-42", text: "Mars", correct: true },
                { id: "opt-43", text: "Jupiter", correct: false },
                { id: "opt-44", text: "Saturn", correct: false },
              ],
              explanation:
                "Mars gets its reddish color from iron oxide (rust) on its surface.",
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = (): void =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const activeSubject = subjects.find((s: Subject) => s.id === activeSubjectId);

  const renumberTopics = (topicsList: Topic[]): Topic[] => {
    return topicsList.map((t: Topic, index: number) => ({
      ...t,
      order: index + 1,
    }));
  };

  const toggleTopicAccordion = (topicId: string): void => {
    setExpandedTopics((prev: Record<string, boolean>) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const handleOpenAddSubject = (): void => {
    setEditingSubject(null);
    setNewSubTitle("");
    setNewSubDesc("");
    setIsAddSubjectOpen(true);
  };

  const handleOpenEditSubject = (subject: Subject, e?: MouseEvent): void => {
    if (e) e.stopPropagation();
    setEditingSubject(subject);
    setNewSubTitle(subject.title);
    setNewSubDesc(subject.description || "");
    setIsAddSubjectOpen(true);
  };

  const handleSaveSubject = (e: FormEvent): void => {
    e.preventDefault();
    if (!newSubTitle.trim()) return;

    if (editingSubject) {
      setSubjects((prev: Subject[]) =>
        prev.map((s: Subject) =>
          s.id === editingSubject.id
            ? {
                ...s,
                title: newSubTitle.trim(),
                description: newSubDesc.trim(),
              }
            : s,
        ),
      );
    } else {
      const colors = [
        "var(--lime)",
        "var(--yellow)",
        "var(--periwinkle)",
        "var(--slate)",
      ];
      const newSubject: Subject = {
        id: "sub-" + Date.now(),
        title: newSubTitle.trim(),
        description: newSubDesc.trim() || "No description provided.",
        color: colors[subjects.length % colors.length],
        icon: BookOpen,
        topics: [],
      };
      setSubjects((prev: Subject[]) => [...prev, newSubject]);
    }

    setNewSubTitle("");
    setNewSubDesc("");
    setEditingSubject(null);
    setIsAddSubjectOpen(false);
  };

  const handleDeleteSubject = (subjectId: string, e?: MouseEvent): void => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const targetSubject = subjects.find((s: Subject) => s.id === subjectId);
    if (!targetSubject) return;

    if (
      window.confirm(
        `Are you sure you want to delete "${targetSubject.title}" and all its topics/questions?`,
      )
    ) {
      setSubjects((prev: Subject[]) => {
        const next = prev.filter((s: Subject) => s.id !== subjectId);
        return [...next];
      });
      if (activeSubjectId === subjectId) {
        setActiveSubjectId(null);
        setCurrentView("home");
      }
    }
  };

  const handleOpenAddTopic = (): void => {
    setEditingTopic(null);
    setTopicTitleInput("");
    setTopicDescInput("");
    setIsAddTopicOpen(true);
  };

  const handleOpenEditTopic = (topic: Topic, e: MouseEvent): void => {
    e.stopPropagation();
    setEditingTopic(topic);
    setTopicTitleInput(topic.title);
    setTopicDescInput(topic.description || "");
    setIsAddTopicOpen(true);
  };

  const handleSaveTopic = (e: FormEvent): void => {
    e.preventDefault();
    if (!activeSubject || !topicTitleInput.trim()) return;

    if (editingTopic) {
      const updatedTopics = activeSubject.topics.map((t: Topic) =>
        t.id === editingTopic.id
          ? {
              ...t,
              title: topicTitleInput.trim(),
              description: topicDescInput.trim(),
            }
          : t,
      );
      setSubjects((prev: Subject[]) =>
        prev.map((s: Subject) =>
          s.id === activeSubject.id ? { ...s, topics: updatedTopics } : s,
        ),
      );
    } else {
      const newTopic: Topic = {
        id: "top-" + Date.now(),
        order: activeSubject.topics.length + 1,
        title: topicTitleInput.trim(),
        description: topicDescInput.trim(),
        items: [],
      };
      const updatedTopics = renumberTopics([...activeSubject.topics, newTopic]);
      setSubjects((prev: Subject[]) =>
        prev.map((s: Subject) =>
          s.id === activeSubject.id ? { ...s, topics: updatedTopics } : s,
        ),
      );
      setExpandedTopics((prev: Record<string, boolean>) => ({
        ...prev,
        [newTopic.id]: true,
      }));
    }

    setIsAddTopicOpen(false);
    setEditingTopic(null);
  };

  const handleDeleteTopic = (topicId: string, e?: MouseEvent): void => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!activeSubject) return;
    if (
      window.confirm(
        "Are you sure you want to delete this topic and all its questions?",
      )
    ) {
      const filtered = activeSubject.topics.filter(
        (t: Topic) => t.id !== topicId,
      );
      const renumbered = renumberTopics(filtered);
      setSubjects((prev: Subject[]) =>
        prev.map((s: Subject) =>
          s.id === activeSubject.id ? { ...s, topics: [...renumbered] } : s,
        ),
      );
    }
  };

  const handleMoveTopic = (
    topicId: string,
    direction: "up" | "down",
    e?: MouseEvent,
  ): void => {
    if (e) e.stopPropagation();
    if (!activeSubject) return;
    const topics = [...activeSubject.topics];
    const index = topics.findIndex((t: Topic) => t.id === topicId);
    if (index === -1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= topics.length) return;

    const temp = topics[index];
    topics[index] = topics[targetIndex];
    topics[targetIndex] = temp;

    const renumbered = renumberTopics(topics);
    setSubjects((prev: Subject[]) =>
      prev.map((s: Subject) =>
        s.id === activeSubject.id ? { ...s, topics: renumbered } : s,
      ),
    );
  };

  const handleOpenAddItem = (topic: Topic, e?: MouseEvent): void => {
    if (e) e.stopPropagation();
    setActiveTopicForNewItem(topic);
    setEditingItem(null);
    setNewItemPrompt("");
    setNewItemOpts(["", "", "", ""]);
    setNewItemCorrectIdx(0);
    setNewItemExp("");
    setIsAddItemOpen(true);
  };

  const handleOpenEditItem = (
    topic: Topic,
    item: Item,
    e?: MouseEvent,
  ): void => {
    if (e) e.stopPropagation();
    setActiveTopicForNewItem(topic);
    setEditingItem(item);
    setNewItemPrompt(item.prompt);
    setNewItemOpts(item.options.map((o: ItemOption) => o.text));
    const correctIndex = item.options.findIndex((o: ItemOption) => o.correct);
    setNewItemCorrectIdx(correctIndex >= 0 ? correctIndex : 0);
    setNewItemExp(item.explanation || "");
    setIsAddItemOpen(true);
  };

  const handleSaveItem = (e: FormEvent): void => {
    e.preventDefault();
    if (!activeSubject || !activeTopicForNewItem || !newItemPrompt.trim())
      return;

    const options: ItemOption[] = newItemOpts.map(
      (optText: string, idx: number) => ({
        id: "opt-" + Date.now() + "-" + idx,
        text: optText.trim() || `Option ${String.fromCharCode(65 + idx)}`,
        correct: idx === newItemCorrectIdx,
      }),
    );

    if (editingItem) {
      const updatedTopics = activeSubject.topics.map((t: Topic) => {
        if (t.id === activeTopicForNewItem.id) {
          const updatedItems = t.items.map((it: Item) =>
            it.id === editingItem.id
              ? {
                  ...it,
                  prompt: newItemPrompt.trim(),
                  options,
                  explanation: newItemExp.trim(),
                }
              : it,
          );
          return { ...t, items: updatedItems };
        }
        return t;
      });
      setSubjects((prev: Subject[]) =>
        prev.map((s: Subject) =>
          s.id === activeSubject.id ? { ...s, topics: updatedTopics } : s,
        ),
      );
    } else {
      const newItem: Item = {
        id: "item-" + Date.now(),
        prompt: newItemPrompt.trim(),
        options,
        explanation: newItemExp.trim(),
      };
      const updatedTopics = activeSubject.topics.map((t: Topic) =>
        t.id === activeTopicForNewItem.id
          ? { ...t, items: [...t.items, newItem] }
          : t,
      );
      setSubjects((prev: Subject[]) =>
        prev.map((s: Subject) =>
          s.id === activeSubject.id ? { ...s, topics: updatedTopics } : s,
        ),
      );
    }

    setIsAddItemOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (
    topicId: string,
    itemId: string,
    e?: MouseEvent,
  ): void => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!activeSubject) return;
    if (window.confirm("Delete this question?")) {
      const updatedTopics = activeSubject.topics.map((t: Topic) => {
        if (t.id === topicId) {
          return {
            ...t,
            items: t.items.filter((it: Item) => it.id !== itemId),
          };
        }
        return t;
      });
      setSubjects((prev: Subject[]) =>
        prev.map((s: Subject) =>
          s.id === activeSubject.id ? { ...s, topics: [...updatedTopics] } : s,
        ),
      );
    }
  };

  // --- Quiz Launchers ---
  // Topic listing quick quiz: NO timer applied
  const handleStartTopicQuiz = (topic: Topic, e?: MouseEvent): void => {
    if (e) e.stopPropagation();
    if (topic.items.length === 0) {
      alert(`Topic ${topic.order} has no questions to quiz on yet!`);
      return;
    }
    setQuizTitle(`Topic ${topic.order}: ${topic.title}`);
    setQuizQuestions([...topic.items].sort(() => Math.random() - 0.5));
    setQuizTimerSeconds(0); // 0 means Timer Off for topic listing quick quiz
    setCurrentView("quiz");
  };

  const handleOpenQuizBuilder = (): void => {
    if (!activeSubject) return;
    setSelectedTopicIds(activeSubject.topics.map((t: Topic) => t.id));
    if (activeSubject.topics.length > 0) {
      setRangeStartOrder(1);
      setRangeEndOrder(activeSubject.topics.length);
    }
    setIsQuizBuilderOpen(true);
  };

  // Main custom quiz: timer applies based on user selection
  const handleStartCustomQuiz = (): void => {
    if (!activeSubject) return;
    let targetTopics: Topic[] = [];

    if (quizScopeMode === "all") {
      targetTopics = activeSubject.topics;
    } else if (quizScopeMode === "range") {
      const minO = Math.min(rangeStartOrder, rangeEndOrder);
      const maxO = Math.max(rangeStartOrder, rangeEndOrder);
      targetTopics = activeSubject.topics.filter(
        (t: Topic) => t.order >= minO && t.order <= maxO,
      );
    } else if (quizScopeMode === "specific") {
      targetTopics = activeSubject.topics.filter((t: Topic) =>
        selectedTopicIds.includes(t.id),
      );
    }

    const allQuestions = targetTopics.flatMap((t: Topic) => t.items);
    if (allQuestions.length === 0) {
      alert("No questions found in the selected topic scope!");
      return;
    }

    const finalTimer = useCustomTimer
      ? Math.max(5, parseInt(customTimerInput, 10) || 30)
      : quizTimerSeconds;

    setQuizTitle(`Custom Quiz: ${activeSubject.title}`);
    setQuizQuestions([...allQuestions].sort(() => Math.random() - 0.5));
    setQuizTimerSeconds(finalTimer);
    setIsQuizBuilderOpen(false);
    setCurrentView("quiz");
  };

  // Export & Import handlers
  const handleExportPlatformBackup = (): void => {
    const backupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      subjects,
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `studynode_platform_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSubjectJSON = (): void => {
    if (!activeSubject) return;
    const jsonStr = JSON.stringify(activeSubject, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeSubject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.studynode.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSubjectMarkdown = (): void => {
    if (!activeSubject) return;
    let md = `---\nstudynode: 1\nsubject: ${activeSubject.title}\n---\n\n`;
    activeSubject.topics.forEach((t: Topic) => {
      md += `# ${t.order}. ${t.title}\n\n`;
      t.items.forEach((it: Item) => {
        md += `## Q: ${it.prompt}\ntype: mcq\ndifficulty: medium\ntags: general\n`;
        it.options.forEach((opt: ItemOption) => {
          md += `- [${opt.correct ? "x" : " "}] ${opt.text}\n`;
        });
        if (it.explanation) {
          md += `explain: ${it.explanation}\n`;
        }
        md += `\n`;
      });
    });

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeSubject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSubjectPromptText = (): string => {
    const slug = promptSubject.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `You are an expert teacher and exam-question writer. Create a study document in the StudyNode Markdown format for a whole SUBJECT.

=== USER INPUT (edit only these lines) ===
SUBJECT: [${promptSubject}]
LEVEL: [${promptLevel}]                      (Beginner / Intermediate / Advanced)
TOTAL_TOPICS: [${promptTotalTopics}]                     (Total topics to divide the subject into)
TOPIC_RANGE_TO_GENERATE: [${promptTopicRange}]         (e.g., 1-2, 3-4, or ALL)
MIN_QUESTIONS_PER_TOPIC: [${promptMinQs}]
MAX_QUESTIONS_PER_TOPIC: [${promptMaxQs}]
===========================================

RAW .MD OUTPUT (highest priority, overrides everything else)
- Your answer must be the contents of a plain-text .md file and nothing else.
- If you can create or attach files, create a file named ${slug || "subject"}.md and give it for download, with no other text.
- If you cannot create files, output the document inside ONE single fenced code block labeled markdown, so nothing gets rendered. The first line inside the block must be the opening "---" of the frontmatter, and the last line inside the block must be the final line of the last question.
- Write raw Markdown characters exactly as they are. NEVER put a backslash before any character: no backslashes before dashes, brackets, numbers, or hash symbols.
- Do NOT use bold, italics, emojis, tables, HTML, horizontal rules, numbered lists, or any decoration anywhere in the file.
- Use only plain straight quotes (" and '), never curly quotes.
- Options MUST stay exactly as "- [x] text" (for correct) and "- [ ] text" (for incorrect). Always include a space after the dash and inside brackets.
- Do not write any text before or after the file or code block: no greeting, no explanation, no "here is your file", no notes.

STEP 1: PLAN THE TOPICS (do this silently, do not print the plan)
- Automatically divide SUBJECT into exactly TOTAL_TOPICS topics suited to LEVEL.
- Order them logically like a real course: foundations first, with each topic building on previous ones.
- Topics must not overlap. Together they must cover everything essential for this LEVEL with zero gaps.

STEP 2: WRITE ONLY THE REQUESTED TOPIC RANGE
- Look at TOPIC_RANGE_TO_GENERATE. Write ONLY the topics specified in that range (e.g., if range is "1-2", generate only "# 1." and "# 2.").
- Number headings accurately matching their absolute topic index: "# <Topic Number>. <Topic Title>".

QUANTITY RULES
- Each generated topic gets between MIN_QUESTIONS_PER_TOPIC and MAX_QUESTIONS_PER_TOPIC MCQs (inclusive). Never go below the minimum or above the maximum.

CONTENT RULES
- Questions in a topic must cover ONLY that topic.
- Cover every core concept, term, rule, and pitfall needed for this LEVEL.
- Order questions inside a topic from foundational to advanced.
- Difficulty distribution: roughly 40% easy, 40% medium, 20% hard.
- Do not repeat an idea within a topic or across topics.
- Distractors must be believable plain text without backticks or Markdown code formatting.

FORMAT RULES (follow exactly)
1. Start the file with this frontmatter:

---
studynode: 1
subject: ${promptSubject}
---

2. Each topic heading on its own line: "# <number>. <Topic Title>"
3. Each question starts with "## Q: <question prompt>".
4. Directly under it, one per line:
   type: mcq
   difficulty: easy|medium|hard
   tags: tag1, tag2
5. Then exactly 4 options, one per line:
   - [x] correct option
   - [ ] wrong option 1
   - [ ] wrong option 2
   - [ ] wrong option 3
6. End each question with one line:
   explain: <1 to 3 sentences on why the answer is correct and why common wrong choices are incorrect>
7. Leave one blank line between questions and before each topic heading.

FINAL CHECK (silently, before sending)
- Output is strictly the single code block or download file with zero surrounding conversational text.
- Absolutely NO backslashes (\\), no bold formatting (**), no emojis, or curly quotes anywhere.
- Every question has exactly 4 options, exactly one [x], and all required fields.`;
  };

  const getTopicPromptText = (): string => {
    return `You are an expert teacher and exam-question writer. Create a study document in the StudyNode Markdown format for specific target topics.

=== USER INPUT (edit only these lines) ===
TOPICS: [${topicPromptList}]   (separated by semicolons)
MIN_QUESTIONS: [${topicPromptMinQs}]                     (minimum MCQs for EACH topic)
MAX_QUESTIONS: [${topicPromptMaxQs}]                     (maximum MCQs for EACH topic)
=============================================

RAW .MD OUTPUT (highest priority, overrides everything else)
- Your answer must be the contents of a plain-text .md file and nothing else.
- If you can create or attach files, create a file named topics.md and give it for download, with no other text.
- If you cannot create files, output the document inside ONE single fenced code block labeled markdown, so nothing gets rendered. The first line inside the block must be the opening "---" of the frontmatter, and the last line inside the block must be the final line of the last question.
- Write raw Markdown characters exactly as they are. NEVER put a backslash before any character: no backslashes before dashes, brackets, numbers, or hash symbols.
- Do NOT use bold, italics, emojis, tables, HTML, horizontal rules, numbered lists, or any decoration anywhere in the file.
- Use only plain straight quotes (" and '), never curly quotes.
- Options MUST stay exactly as "- [x] text" (for correct) and "- [ ] text" (for incorrect). Always include a space after the dash and inside brackets.
- Do not write any text before or after the file or code block: no greeting, no explanation, no "here is your file", no notes.

TOPIC STRUCTURE RULES
- Split TOPICS at each semicolon. Each part is one topic.
- Write one heading per topic in sequential order: "# 1.", "# 2.", "# 3.", and so on.
- Clean and capitalize each title properly (e.g., "# 1. Oceans & Continents").
- Nothing else in the file may start with a single "#".

QUANTITY RULES
- EACH topic gets between MIN_QUESTIONS and MAX_QUESTIONS MCQs (inclusive). Never go below the minimum or above the maximum.

CONTENT RULES
- Questions under a topic must cover ONLY that topic without overlap.
- Cover all essential fundamentals, terms, and common traps.
- Order questions from foundational to advanced.
- Difficulty distribution: roughly 40% easy, 40% medium, 20% hard.
- Distractors must be realistic. Write terms or concept names as plain text without backticks.

FORMAT RULES (follow exactly)
1. Start the file with this frontmatter:

---
studynode: 1
---

2. Each topic heading on its own line: "# <number>. <Topic Title>"
3. Each question starts with "## Q: <question prompt>".
4. Directly under it, one per line:
   type: mcq
   difficulty: easy|medium|hard
   tags: tag1, tag2
5. Then exactly 4 options, one per line:
   - [x] correct option
   - [ ] wrong option 1
   - [ ] wrong option 2
   - [ ] wrong option 3
6. End each question with one line:
   explain: <1 to 3 sentences explaining the correct answer and common pitfalls>
7. Leave one blank line between questions and before each topic heading.

FINAL CHECK (silently, before sending)
- Output is strictly the file content or code block with zero surrounding text.
- Absolutely NO backslashes (\\), no bold formatting (**), no emojis, or curly quotes anywhere.
- Every question has exactly 4 options, exactly one [x], and all required fields.`;
  };

  const handleCopyPrompt = (text: string): void => {
    void navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        setImportSourceText(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handleMusicUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          const newTrack = { name: file.name, url: base64Url };
          setPlaylist((prev: { name: string; url: string }[]) => {
            const updated = [...prev, newTrack];
            if (prev.length === 0 && updated.length === 1) {
              setCurrentTrackIndex(0);
              setIsMusicPlaying(true);
              if (audioRef.current) {
                audioRef.current.src = base64Url;
                audioRef.current.play().catch(() => setIsMusicPlaying(false));
              }
            }
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectTrack = (index: number): void => {
    setCurrentTrackIndex(index);
    setIsMusicPlaying(true);
    if (audioRef.current && playlist[index]) {
      audioRef.current.src = playlist[index].url;
      audioRef.current.play().catch(() => setIsMusicPlaying(false));
    }
  };

  const handleDeleteTrack = (index: number, e: MouseEvent): void => {
    e.stopPropagation();
    const updated = playlist.filter((_, idx) => idx !== index);
    setPlaylist(updated);
    if (updated.length === 0) {
      if (audioRef.current) audioRef.current.pause();
      setIsMusicPlaying(false);
      setCurrentTrackIndex(0);
    } else if (index === currentTrackIndex) {
      const nextIdx = 0;
      setCurrentTrackIndex(nextIdx);
      if (audioRef.current) {
        audioRef.current.src = updated[nextIdx].url;
        if (isMusicPlaying) audioRef.current.play().catch(() => {});
      }
    } else if (index < currentTrackIndex) {
      setCurrentTrackIndex((prev) => prev - 1);
    }
  };

  const toggleBgMusic = (): void => {
    if (!audioRef.current || playlist.length === 0) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    }
  };

  const handleNextTrack = (): void => {
    if (playlist.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIdx);
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = playlist[nextIdx].url;
      audioRef.current.play().catch(() => setIsMusicPlaying(false));
    }
  };

  const handlePrevTrack = (): void => {
    if (playlist.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIdx);
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = playlist[prevIdx].url;
      audioRef.current.play().catch(() => setIsMusicPlaying(false));
    }
  };

  const handleExecuteImport = (): void => {
    if (!importSourceText.trim()) return;

    try {
      const parsedJSON = JSON.parse(importSourceText) as {
        version?: number;
        subjects?: Subject[];
        id?: string;
        title?: string;
        topics?: Topic[];
      };
      if (parsedJSON.version === 1 && Array.isArray(parsedJSON.subjects)) {
        if (
          confirm(
            `Restore platform with ${parsedJSON.subjects.length} subject(s)?`,
          )
        ) {
          setSubjects((prev: Subject[]) => [...prev, ...parsedJSON.subjects!]);
          setIsImportModalOpen(false);
          setImportSourceText("");
          alert("Platform restored successfully!");
          return;
        }
      } else if (
        parsedJSON.id &&
        parsedJSON.title &&
        Array.isArray(parsedJSON.topics)
      ) {
        const importedSubject: Subject = {
          ...(parsedJSON as Subject),
          id: "sub-" + Date.now(),
        };
        setSubjects((prev: Subject[]) => [...prev, importedSubject]);
        setIsImportModalOpen(false);
        setImportSourceText("");
        alert(`Subject "${importedSubject.title}" imported!`);
        return;
      }
    } catch {
      // Markdown fallback
    }

    const { subjectTitle, topics: mdTopics } =
      parseStudyMarkdown(importSourceText);
    if (mdTopics.length === 0) {
      alert("Could not parse any valid questions from the provided text.");
      return;
    }

    if (importType === "topic" && activeSubject) {
      let updatedTopics: Topic[] = [...activeSubject.topics];

      if (importTargetTopicMode === "existing" && importTargetTopicId) {
        // Merge into user-chosen existing topic
        const allItems: Item[] = mdTopics
          .flatMap((t: ParsedTopic) => t.items)
          .map((it: ParsedItem, iIdx: number) => ({
            id: "item-" + Date.now() + "-" + iIdx,
            prompt: it.prompt,
            options: it.options,
            explanation: it.explanation,
          }));

        updatedTopics = updatedTopics.map((t: Topic) => {
          if (t.id === importTargetTopicId) {
            return { ...t, items: [...t.items, ...allItems] };
          }
          return t;
        });
      } else if (
        importTargetTopicMode === "custom" &&
        importCustomTopicTitle.trim()
      ) {
        // Create topic with explicit title typed by user
        const allItems: Item[] = mdTopics
          .flatMap((t: ParsedTopic) => t.items)
          .map((it: ParsedItem, iIdx: number) => ({
            id: "item-" + Date.now() + "-" + iIdx,
            prompt: it.prompt,
            options: it.options,
            explanation: it.explanation,
          }));

        updatedTopics.push({
          id: "top-" + Date.now(),
          order: updatedTopics.length + 1,
          title: importCustomTopicTitle.trim(),
          description: "Custom imported topic",
          items: allItems,
        });
      } else {
        // Auto-create topics from markdown headers
        mdTopics.forEach((mdT: ParsedTopic, idx: number) => {
          updatedTopics.push({
            id: "top-" + Date.now() + "-" + idx,
            order: updatedTopics.length + 1,
            title: mdT.title,
            description: mdT.description,
            items: mdT.items.map((it: ParsedItem, iIdx: number) => ({
              id: "item-" + Date.now() + "-" + idx + "-" + iIdx,
              prompt: it.prompt,
              options: it.options,
              explanation: it.explanation,
            })),
          });
        });
      }

      const renumbered = renumberTopics(updatedTopics);
      setSubjects((prev: Subject[]) =>
        prev.map((s: Subject) =>
          s.id === activeSubject.id ? { ...s, topics: renumbered } : s,
        ),
      );
      alert(`Successfully imported topics into "${activeSubject.title}"!`);
    } else if (!activeSubject) {
      const colors = [
        "var(--lime)",
        "var(--yellow)",
        "var(--periwinkle)",
        "var(--slate)",
      ];
      const newSub: Subject = {
        id: "sub-" + Date.now(),
        title: subjectTitle,
        description: "Imported from StudyNode Markdown file",
        color: colors[subjects.length % colors.length],
        icon: BookOpen,
        topics: mdTopics.map((t: ParsedTopic, idx: number) => ({
          id: "top-" + Date.now() + "-" + idx,
          order: idx + 1,
          title: t.title,
          description: t.description,
          items: t.items.map((it: ParsedItem, iIdx: number) => ({
            id: "item-" + Date.now() + "-" + idx + "-" + iIdx,
            prompt: it.prompt,
            options: it.options.length
              ? it.options
              : [
                  { id: "opt-1", text: "Option A", correct: true },
                  { id: "opt-2", text: "Option B", correct: false },
                ],
            explanation: it.explanation,
          })),
        })),
      };
      setSubjects((prev: Subject[]) => [...prev, newSub]);
      alert(`Created new Subject "${newSub.title}"!`);
    }

    setIsImportModalOpen(false);
    setImportSourceText("");
  };

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent): void => {
      if (
        playlistContainerRef.current &&
        !playlistContainerRef.current.contains(e.target as Node)
      ) {
        setIsPlaylistMenuOpen(false);
      }
      if (
        dataMenuRef.current &&
        !dataMenuRef.current.contains(e.target as Node)
      ) {
        setIsDataMenuOpen(false);
      }
      if (
        subjectMenuRef.current &&
        !subjectMenuRef.current.contains(e.target as Node)
      ) {
        setIsSubjectExportMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <audio ref={audioRef} loop preload="auto" />

      <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col overflow-x-hidden">
        {/* Header Navigation */}
        <header className="sticky top-0 z-40 bg-[var(--bg)] border-b-[3px] border-[var(--ink)] px-2.5 sm:px-6 md:px-8 py-2.5 sm:py-3 shadow-xs">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group shrink-0"
              onClick={() => setCurrentView("home")}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--orange)] border-ink shadow-hard text-white flex items-center justify-center logo-blob group-hover:rotate-12 transition-transform duration-300">
                <span className="font-extrabold text-base sm:text-xl text-[var(--ink)]">
                  S
                </span>
              </div>
              <h1 className="font-extrabold text-lg sm:text-2xl tracking-wide">
                StudyNode
              </h1>
            </div>

            {/* Desktop Header Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Music Player Bar */}
              <div
                ref={playlistContainerRef}
                className="relative flex items-center gap-1 bg-[var(--surface)] border-ink rounded-2xl p-1 shadow-hard"
              >
                {playlist.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevTrack}
                      title="Previous Track"
                      aria-label="Previous Track"
                      className="w-7 h-7 rounded-xl hover:bg-[var(--yellow)] flex items-center justify-center text-[var(--ink)] transition-colors cursor-pointer"
                    >
                      <SkipBackIcon size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={toggleBgMusic}
                      title={isMusicPlaying ? "Pause Music" : "Play Music"}
                      aria-label="Toggle background music"
                      className="w-7 h-7 rounded-xl hover:bg-[var(--lime)] flex items-center justify-center text-[var(--ink)] transition-colors cursor-pointer"
                    >
                      {isMusicPlaying ? (
                        <Pause size={14} fill="currentColor" />
                      ) : (
                        <Play size={14} fill="currentColor" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextTrack}
                      title="Next Track"
                      aria-label="Next Track"
                      className="w-7 h-7 rounded-xl hover:bg-[var(--yellow)] flex items-center justify-center text-[var(--ink)] transition-colors cursor-pointer"
                    >
                      <SkipForwardIcon size={14} />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setIsPlaylistMenuOpen(!isPlaylistMenuOpen)}
                  title="Music Playlist"
                  aria-label="View Playlist"
                  className="px-2.5 py-1.5 rounded-xl hover:bg-[var(--yellow)] text-xs font-bold flex items-center gap-1.5 text-[var(--ink)] truncate max-w-[130px] cursor-pointer"
                >
                  <Music size={15} strokeWidth={2.5} />
                  <span className="truncate">
                    {playlist.length > 0
                      ? playlist[currentTrackIndex].name
                      : "Music"}
                  </span>
                  <ChevronDown size={14} />
                </button>

                {/* Playlist Dropdown */}
                {isPlaylistMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 max-w-[90vw] bg-[var(--surface)] border-ink shadow-hard rounded-2xl p-4 z-50 space-y-3">
                    <div className="flex items-center justify-between border-b-2 border-[var(--ink)]/15 pb-2">
                      <span className="font-extrabold text-sm">
                        Playlist Songs ({playlist.length})
                      </span>
                      <label className="text-xs font-bold text-[var(--orange)] bg-[var(--yellow)]/40 px-2 py-1 rounded-lg border border-[var(--ink)] cursor-pointer hover:bg-[var(--yellow)]">
                        + Add Songs
                        <input
                          type="file"
                          accept="audio/*"
                          multiple
                          onChange={handleMusicUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {playlist.length === 0 ? (
                      <div className="text-center py-6 text-xs font-semibold opacity-70">
                        No songs uploaded yet. Add audio files to play
                        background music!
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-56 overflow-y-auto">
                        {playlist.map((track, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectTrack(idx)}
                            className={`flex items-center justify-between gap-2 p-2 rounded-xl border-2 border-[var(--ink)] cursor-pointer text-xs font-bold transition-colors ${idx === currentTrackIndex ? "bg-[var(--lime)]" : "bg-[var(--bg)] hover:bg-[var(--yellow)]/30"}`}
                          >
                            <span className="truncate flex-1">
                              {track.name}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              {idx === currentTrackIndex && isMusicPlaying && (
                                <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-ping" />
                              )}
                              <button
                                type="button"
                                onClick={(e) => handleDeleteTrack(idx, e)}
                                title="Remove song"
                                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-[var(--red)] hover:text-white text-[var(--red)] cursor-pointer"
                              >
                                <TrashIcon size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Header Data Menu */}
              <div ref={dataMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsDataMenuOpen(!isDataMenuOpen)}
                  title="Data & Backup Options"
                  aria-label="Data Menu"
                  className="font-bold text-xs md:text-sm px-3 py-2 rounded-2xl border-ink shadow-hard bg-[var(--yellow)] hover:bg-[var(--lime)] text-[var(--ink)] flex items-center gap-1.5 transition-colors cursor-pointer babadum-btn"
                >
                  <Layers size={16} strokeWidth={2.5} />
                  <span>Data Menu</span>
                  <ChevronDown size={14} />
                </button>

                {isDataMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--surface)] border-ink shadow-hard rounded-2xl p-2 z-50 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDataMenuOpen(false);
                        handleExportPlatformBackup();
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[var(--yellow)]/40 font-bold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <Download size={15} /> Backup Whole Platform
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDataMenuOpen(false);
                        setImportType("platform");
                        setImportSourceText("");
                        setIsImportModalOpen(true);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[var(--yellow)]/40 font-bold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <Upload size={15} /> Restore Platform Backup
                    </button>
                  </div>
                )}
              </div>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? "Mute Sound" : "Enable Sound"}
                aria-label="Toggle Sound"
                className="w-9 h-9 md:w-10 md:h-10 rounded-2xl border-ink shadow-hard bg-[var(--surface)] hover:bg-[var(--lime)] text-[var(--ink)] flex items-center justify-center transition-colors cursor-pointer babadum-btn"
              >
                {soundEnabled ? (
                  <Volume2 size={18} strokeWidth={2.5} />
                ) : (
                  <VolumeX size={18} strokeWidth={2.5} />
                )}
              </button>

              {/* Theme Mode Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                title="Toggle Light/Dark Theme"
                aria-label="Toggle Theme"
                className="w-9 h-9 md:w-10 md:h-10 rounded-2xl border-ink shadow-hard bg-[var(--surface)] hover:bg-[var(--yellow)] text-[var(--ink)] flex items-center justify-center transition-colors cursor-pointer babadum-btn"
              >
                {theme === "light" ? (
                  <Moon size={18} strokeWidth={2.5} />
                ) : (
                  <Sun size={18} strokeWidth={2.5} />
                )}
              </button>
            </div>

            {/* Mobile Actions Toolbar */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label="Toggle Sound"
                className="w-8 h-8 rounded-xl border-ink bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] cursor-pointer"
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="w-8 h-8 rounded-xl border-ink bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] cursor-pointer"
              >
                {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
              </button>

              <button
                type="button"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                aria-label="Toggle Mobile Navigation"
                className="w-8 h-8 rounded-xl border-ink shadow-hard bg-[var(--yellow)] text-[var(--ink)] flex items-center justify-center cursor-pointer babadum-btn"
              >
                {isMobileNavOpen ? (
                  <X size={18} strokeWidth={3} />
                ) : (
                  <Settings size={18} strokeWidth={3} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Collapsible Drawer */}
          {isMobileNavOpen && (
            <div className="md:hidden mt-3 pt-3 border-t-2 border-[var(--ink)]/20 flex flex-col gap-2.5 animate-streak">
              <div className="flex items-center justify-between bg-[var(--surface)] border-2 border-[var(--ink)] rounded-2xl p-2.5">
                <span className="font-bold text-xs flex items-center gap-1.5 truncate max-w-[180px]">
                  <Music size={15} className="shrink-0" />{" "}
                  <span className="truncate">
                    {playlist.length > 0
                      ? playlist[currentTrackIndex].name
                      : "No Music Playing"}
                  </span>
                </span>
                <label className="text-xs font-bold text-[var(--orange)] bg-[var(--yellow)]/40 px-2.5 py-1 rounded-xl border border-[var(--ink)] cursor-pointer shrink-0">
                  + Songs
                  <input
                    type="file"
                    accept="audio/*"
                    multiple
                    onChange={handleMusicUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    handleExportPlatformBackup();
                  }}
                  className="p-2 rounded-xl border-2 border-[var(--ink)] bg-[var(--yellow)] font-bold text-xs flex items-center justify-center gap-1 whitespace-nowrap"
                >
                  <Download size={14} /> Backup Platform
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    setImportType("platform");
                    setImportSourceText("");
                    setIsImportModalOpen(true);
                  }}
                  className="p-2 rounded-xl border-2 border-[var(--ink)] bg-[var(--periwinkle)] font-bold text-xs flex items-center justify-center gap-1 whitespace-nowrap"
                >
                  <Upload size={14} /> Restore Backup
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Dynamic App Views */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-10">
          {/* VIEW 1: HOME */}
          {currentView === "home" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div>
                  <span className="font-bold text-[var(--teal)] uppercase tracking-widest text-[10px] sm:text-xs mb-0.5 block">
                    Interactive Workspace
                  </span>
                  <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl">
                    Subject Nodes
                  </h2>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setImportType("subject");
                      setImportSourceText("");
                      setIsImportModalOpen(true);
                    }}
                  >
                    <Upload size={15} /> Import Subject
                  </Button>
                  <Button variant="primary" onClick={handleOpenAddSubject}>
                    <Plus strokeWidth={3} size={16} /> New Subject
                  </Button>
                </div>
              </div>

              {/* Subject Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {subjects.map((sub: Subject) => {
                  const totalItems = sub.topics.reduce(
                    (acc: number, t: Topic) => acc + t.items.length,
                    0,
                  );
                  const IconComp =
                    typeof sub.icon === "function" ? sub.icon : BookOpen;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setActiveSubjectId(sub.id);
                        setCurrentView("subject");
                      }}
                      className="babadum-card border-ink rounded-[20px] sm:rounded-[24px] shadow-hard p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 cursor-pointer relative"
                      style={{ backgroundColor: sub.color }}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--surface)] border-ink shadow-hard rounded-[14px] sm:rounded-[16px] flex items-center justify-center shrink-0">
                          <IconComp size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-end">
                          <Badge color="var(--surface)">
                            {sub.topics.length} Topics
                          </Badge>
                          <div
                            className="flex items-center gap-0.5 bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-0.5 shadow-xs"
                            onClick={(e: MouseEvent) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={(e: MouseEvent) =>
                                handleOpenEditSubject(sub, e)
                              }
                              title="Edit Subject"
                              aria-label="Edit Subject"
                              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-[var(--yellow)] text-[var(--ink)] transition-colors cursor-pointer"
                            >
                              <EditIcon size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={(e: MouseEvent) =>
                                handleDeleteSubject(sub.id, e)
                              }
                              title="Delete Subject"
                              aria-label="Delete Subject"
                              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-[var(--red)] hover:text-white text-[var(--red)] transition-colors cursor-pointer"
                            >
                              <TrashIcon size={13} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-xl sm:text-2xl leading-snug mb-1 line-clamp-2">
                          {sub.title}
                        </h3>
                        {/* Unbolded Subject Description */}
                        <p className="text-xs sm:text-sm font-medium opacity-80 line-clamp-2">
                          {sub.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between border-t-2 border-[var(--ink)]/20">
                        <span className="font-bold text-[11px] sm:text-xs uppercase tracking-wider">
                          {totalItems} Questions
                        </span>
                        <span className="font-extrabold text-sm sm:text-base flex items-center gap-1">
                          Open ↗
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Create Subject Card Tile */}
                <div
                  onClick={handleOpenAddSubject}
                  className="border-[3px] border-dashed border-[var(--ink)] rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer hover:bg-black/5 transition-colors min-h-[180px] sm:min-h-[220px] group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--surface)] border-ink rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                    <Plus
                      size={20}
                      className="text-[var(--orange)]"
                      strokeWidth={3}
                    />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg">
                    Add Subject
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: SUBJECT WORKSPACE */}
          {currentView === "subject" && activeSubject && (
            <div className="space-y-4 sm:space-y-6">
              {/* Header Navigation Controls */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <Button
                  variant="secondary"
                  onClick={() => setCurrentView("home")}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2"
                >
                  <ArrowLeft size={15} strokeWidth={3} /> All Subjects
                </Button>

                {/* Export / Import Dropdown */}
                <div ref={subjectMenuRef} className="relative">
                  <Button
                    variant="secondary"
                    className="text-xs px-3 py-1.5 sm:py-2 font-extrabold"
                    onClick={() =>
                      setIsSubjectExportMenuOpen(!isSubjectExportMenuOpen)
                    }
                  >
                    <Download size={14} /> Export & Import{" "}
                    <ChevronDown size={14} />
                  </Button>

                  {isSubjectExportMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 sm:w-56 bg-[var(--surface)] border-ink shadow-hard rounded-2xl p-2 z-50 space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubjectExportMenuOpen(false);
                          handleExportSubjectMarkdown();
                        }}
                        className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-[var(--yellow)]/40 font-bold text-xs flex items-center gap-2 cursor-pointer"
                      >
                        <FileText size={14} /> Export Subject (.md)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubjectExportMenuOpen(false);
                          handleExportSubjectJSON();
                        }}
                        className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-[var(--yellow)]/40 font-bold text-xs flex items-center gap-2 cursor-pointer"
                      >
                        <Download size={14} /> Export Subject (.json)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubjectExportMenuOpen(false);
                          setImportType("topic");
                          setImportSourceText("");
                          setImportTargetTopicId(
                            activeSubject.topics[0]?.id || "",
                          );
                          setIsImportModalOpen(true);
                        }}
                        className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-[var(--yellow)]/40 font-bold text-xs flex items-center gap-2 border-t border-[var(--ink)]/10 pt-2 cursor-pointer"
                      >
                        <Upload size={14} /> Import Topics File
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Subject Hero Card */}
              <div
                className="bg-[var(--surface)] border-ink shadow-hard rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6"
                style={{ borderLeft: `8px solid ${activeSubject.color}` }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl">
                      {activeSubject.title}
                    </h2>
                    <div className="flex items-center gap-1 bg-[var(--bg)] border-2 border-[var(--ink)] rounded-xl p-0.5 shadow-xs shrink-0">
                      <button
                        type="button"
                        onClick={(e: MouseEvent) =>
                          handleOpenEditSubject(activeSubject, e)
                        }
                        title="Edit Subject"
                        aria-label="Edit Subject"
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-[var(--yellow)] text-[var(--ink)] transition-colors cursor-pointer"
                      >
                        <EditIcon size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={(e: MouseEvent) =>
                          handleDeleteSubject(activeSubject.id, e)
                        }
                        title="Delete Subject"
                        aria-label="Delete Subject"
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-[var(--red)] hover:text-white text-[var(--red)] transition-colors cursor-pointer"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                  {/* Unbolded Subject Workspace Hero Description */}
                  <p className="font-medium opacity-85 text-xs sm:text-sm leading-relaxed">
                    {activeSubject.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
                  <Button variant="primary" onClick={handleOpenQuizBuilder}>
                    <Filter size={16} strokeWidth={2.5} /> Custom Quiz Builder
                  </Button>
                  <Button variant="secondary" onClick={handleOpenAddTopic}>
                    <Plus size={16} strokeWidth={3} /> Add Topic
                  </Button>
                </div>
              </div>

              {/* Topics Header */}
              <div className="flex justify-between items-center pt-1">
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl">
                    Topics ({activeSubject.topics.length})
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold opacity-70">
                    Click a topic to expand/collapse questions
                  </p>
                </div>
                <Button
                  variant="secondary"
                  className="text-xs px-2.5 py-1 sm:px-3 sm:py-1.5"
                  onClick={handleOpenAddTopic}
                >
                  + New Topic
                </Button>
              </div>

              {/* Topics List */}
              {activeSubject.topics.length === 0 ? (
                <div className="bg-[var(--surface)] border-ink shadow-hard rounded-[20px] sm:rounded-[24px] p-6 sm:p-10 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[var(--yellow)] border-ink rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl sm:text-2xl">
                    💡
                  </div>
                  <h4 className="font-bold text-lg sm:text-xl mb-1">
                    No Topics Added Yet
                  </h4>
                  <p className="text-xs opacity-75 mb-4 max-w-sm mx-auto">
                    Create Topic 1 or import a Markdown study file to get
                    started.
                  </p>
                  <Button
                    variant="primary"
                    className="text-xs px-4 py-2 mx-auto"
                    onClick={handleOpenAddTopic}
                  >
                    + Add Topic 1
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {activeSubject.topics.map((topic: Topic) => {
                    const isExpanded = !!expandedTopics[topic.id];
                    return (
                      <div
                        key={topic.id}
                        className="bg-[var(--surface)] border-ink shadow-hard rounded-[18px] sm:rounded-[24px] overflow-hidden transition-all duration-200"
                      >
                        {/* Accordion Bar */}
                        <div
                          onClick={() => toggleTopicAccordion(topic.id)}
                          className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-black/5 select-none transition-colors"
                        >
                          <div className="flex items-start sm:items-center gap-2.5">
                            <span className="font-extrabold text-xs bg-[var(--yellow)] border-ink w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                              #{topic.order}
                            </span>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-extrabold text-base sm:text-xl leading-tight truncate">
                                Topic {topic.order}: {topic.title}
                              </h4>
                              {topic.description && (
                                <p className="font-medium text-[11px] sm:text-xs opacity-75 line-clamp-1">
                                  {topic.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 sm:gap-2 justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--ink)]/10">
                            <Badge color="var(--periwinkle)" className="mr-0.5">
                              {topic.items.length} Qs
                            </Badge>

                            {/* Move Up/Down */}
                            <div
                              className="flex items-center gap-0.5 bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-0.5 shadow-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                disabled={topic.order === 1}
                                onClick={(e) =>
                                  handleMoveTopic(topic.id, "up", e)
                                }
                                title="Move Up"
                                aria-label="Move Topic Up"
                                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-[var(--yellow)] disabled:opacity-30 text-[var(--ink)] cursor-pointer"
                              >
                                <ArrowUpIcon size={13} />
                              </button>
                              <button
                                type="button"
                                disabled={
                                  topic.order === activeSubject.topics.length
                                }
                                onClick={(e) =>
                                  handleMoveTopic(topic.id, "down", e)
                                }
                                title="Move Down"
                                aria-label="Move Topic Down"
                                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-[var(--yellow)] disabled:opacity-30 text-[var(--ink)] cursor-pointer"
                              >
                                <ArrowDownIcon size={13} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handleStartTopicQuiz(topic, e)}
                              className="font-extrabold text-[11px] sm:text-xs bg-[var(--orange)] text-[var(--ink)] border-ink px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-xs babadum-btn flex items-center gap-1 cursor-pointer whitespace-nowrap"
                            >
                              <Play size={12} fill="currentColor" /> Quiz
                            </button>

                            {/* Edit / Delete */}
                            <div
                              className="flex items-center gap-0.5 bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-0.5 shadow-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={(e) => handleOpenEditTopic(topic, e)}
                                title="Edit Topic"
                                aria-label="Edit Topic"
                                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-[var(--yellow)] text-[var(--ink)] cursor-pointer"
                              >
                                <EditIcon size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleDeleteTopic(topic.id, e)}
                                title="Delete Topic"
                                aria-label="Delete Topic"
                                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-[var(--red)] hover:text-white text-[var(--red)] cursor-pointer"
                              >
                                <TrashIcon size={13} />
                              </button>
                            </div>

                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-[var(--surface)] border-2 border-[var(--ink)] flex items-center justify-center text-[var(--ink)] shrink-0">
                              {isExpanded ? (
                                <ChevronUp size={15} strokeWidth={3} />
                              ) : (
                                <ChevronDown size={15} strokeWidth={3} />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Collapsible Question Items */}
                        {isExpanded && (
                          <div className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-2 border-t-2 border-[var(--ink)]/15 bg-[var(--bg)]/40 space-y-2.5 sm:space-y-3">
                            <div className="flex justify-between items-center pt-1">
                              <span className="font-bold text-[11px] uppercase opacity-75">
                                Topic Questions ({topic.items.length})
                              </span>
                              <Button
                                variant="secondary"
                                className="text-[11px] px-2.5 py-1"
                                onClick={(e) => handleOpenAddItem(topic, e)}
                              >
                                + Add Question
                              </Button>
                            </div>

                            {topic.items.length === 0 ? (
                              <div className="bg-[var(--surface)] border-ink rounded-2xl p-4 text-center text-xs font-bold opacity-75">
                                No questions in this topic.
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {topic.items.map((item: Item, qIdx: number) => (
                                  <div
                                    key={item.id}
                                    className="bg-[var(--surface)] border-ink rounded-2xl p-3.5 sm:p-5 flex flex-col gap-3 shadow-xs"
                                  >
                                    {/* Question Header & Action Buttons */}
                                    <div className="flex items-start justify-between gap-2 sm:gap-3 border-b-2 border-[var(--ink)]/10 pb-2.5">
                                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                        <span className="font-extrabold text-[10px] sm:text-xs bg-[var(--periwinkle)] border-ink px-2 py-0.5 rounded-lg shrink-0 mt-0.5">
                                          Q{qIdx + 1}
                                        </span>
                                        <h5 className="font-extrabold text-sm sm:text-base leading-snug break-words">
                                          {item.prompt}
                                        </h5>
                                      </div>
                                      <div className="flex items-center gap-0.5 shrink-0 bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-0.5 shadow-xs">
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            handleOpenEditItem(topic, item, e)
                                          }
                                          title="Edit Question"
                                          aria-label="Edit Question"
                                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[var(--yellow)] text-[var(--ink)] transition-colors cursor-pointer"
                                        >
                                          <EditIcon size={14} />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            handleDeleteItem(
                                              topic.id,
                                              item.id,
                                              e,
                                            )
                                          }
                                          title="Delete Question"
                                          aria-label="Delete Question"
                                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[var(--red)] hover:text-white text-[var(--red)] transition-colors cursor-pointer"
                                        >
                                          <TrashIcon size={14} />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Options Grid (All 4 Options Shown with Correct Mark) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                      {item.options.map(
                                        (opt: ItemOption, oIdx: number) => (
                                          <div
                                            key={opt.id || oIdx}
                                            className={`p-2.5 sm:p-3 rounded-xl border-2 font-bold text-xs flex items-center justify-between gap-2 transition-colors ${
                                              opt.correct
                                                ? "bg-[var(--lime)]/40 border-[var(--ink)] shadow-xs"
                                                : "bg-[var(--bg)] border-[var(--ink)]/30 opacity-75"
                                            }`}
                                          >
                                            <div className="flex items-center gap-2 min-w-0">
                                              <span className="w-5 h-5 rounded-lg bg-[var(--surface)] border border-[var(--ink)] flex items-center justify-center font-extrabold text-[10px] shrink-0">
                                                {String.fromCharCode(65 + oIdx)}
                                              </span>
                                              <span className="break-words line-clamp-2">
                                                {opt.text}
                                              </span>
                                            </div>
                                            {opt.correct && (
                                              <Badge
                                                color="var(--teal)"
                                                className="text-[10px] text-white py-0.2 px-1.5 shrink-0"
                                              >
                                                <CheckCircle2 size={12} />{" "}
                                                Correct
                                              </Badge>
                                            )}
                                          </div>
                                        ),
                                      )}
                                    </div>

                                    {/* Explanation Box */}
                                    {item.explanation && (
                                      <div className="bg-[var(--bg)] border-2 border-[var(--ink)]/20 p-3 rounded-xl text-xs space-y-0.5">
                                        <span className="font-extrabold text-[var(--orange)] flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                          💡 Explanation:
                                        </span>
                                        <p className="font-medium opacity-90 leading-relaxed break-words">
                                          {item.explanation}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: INTELLIGENT AUTO-ADVANCING QUIZ SCREEN */}
          {currentView === "quiz" && (
            <IntelligentQuizRunner
              title={quizTitle}
              questions={quizQuestions}
              soundEnabled={soundEnabled}
              timerSecondsDefault={quizTimerSeconds}
              onExit={() => setCurrentView("subject")}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t-[3px] border-[var(--ink)] bg-[var(--surface)] py-4 sm:py-6 px-4 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="font-extrabold text-xs sm:text-sm">
                StudyNode © {new Date().getFullYear()} — Designed by{" "}
                <span className="text-[var(--orange)]">0xalihaider</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/0xalihaider"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl border-ink bg-[var(--bg)] flex items-center justify-center hover:bg-[var(--yellow)]"
                title="Twitter"
                aria-label="Twitter"
              >
                <TwitterIcon size={15} />
              </a>
              <a
                href="https://github.com/0xalihaider"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl border-ink bg-[var(--bg)] flex items-center justify-center hover:bg-[var(--yellow)]"
                title="GitHub"
                aria-label="GitHub"
              >
                <GithubIcon size={15} />
              </a>
              <a
                href="https://linkedin.com/in/0xalihaider"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl border-ink bg-[var(--bg)] flex items-center justify-center hover:bg-[var(--yellow)]"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={15} />
              </a>
              <a
                href="https://instagram.com/0xalihaider"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl border-ink bg-[var(--bg)] flex items-center justify-center hover:bg-[var(--yellow)]"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon size={15} />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* MODALS */}
      {/* 1. Add/Edit Subject Modal */}
      <Modal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        title={editingSubject ? "Edit Subject" : "Add New Subject"}
      >
        <form onSubmit={handleSaveSubject} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase mb-1">
              Subject Title
            </label>
            <input
              type="text"
              required
              value={newSubTitle}
              onChange={(e) => setNewSubTitle(e.target.value)}
              placeholder="e.g. World History, Solar System, Biology..."
              className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-2xl p-2.5 sm:p-3 font-bold text-xs sm:text-sm outline-none focus:bg-[var(--surface)]"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold uppercase mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={newSubDesc}
              onChange={(e) => setNewSubDesc(e.target.value)}
              placeholder="Brief summary of what this subject covers..."
              className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-2xl p-2.5 sm:p-3 font-medium text-xs sm:text-sm outline-none focus:bg-[var(--surface)]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddSubjectOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Subject
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. Add/Edit Topic Modal */}
      <Modal
        isOpen={isAddTopicOpen}
        onClose={() => setIsAddTopicOpen(false)}
        title={editingTopic ? "Edit Topic" : "Add New Topic"}
      >
        <form onSubmit={handleSaveTopic} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase mb-1">
              Topic Title
            </label>
            <input
              type="text"
              required
              value={topicTitleInput}
              onChange={(e) => setTopicTitleInput(e.target.value)}
              placeholder="e.g. Oceans & Seas, Famous World Capitals..."
              className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-2xl p-2.5 sm:p-3 font-bold text-xs sm:text-sm outline-none focus:bg-[var(--surface)]"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold uppercase mb-1">
              Topic Description (Optional)
            </label>
            <input
              type="text"
              value={topicDescInput}
              onChange={(e) => setTopicDescInput(e.target.value)}
              placeholder="Short description..."
              className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-2xl p-2.5 sm:p-3 font-medium text-xs sm:text-sm outline-none focus:bg-[var(--surface)]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddTopicOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Topic
            </Button>
          </div>
        </form>
      </Modal>

      {/* 3. Add/Edit Question Modal */}
      <Modal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        title={
          editingItem
            ? "Edit MCQ Question"
            : `Add Question to ${activeTopicForNewItem?.title || "Topic"}`
        }
      >
        <form onSubmit={handleSaveItem} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase mb-1">
              Question Prompt
            </label>
            <textarea
              rows={2}
              required
              value={newItemPrompt}
              onChange={(e) => setNewItemPrompt(e.target.value)}
              placeholder="e.g. What is the capital city of France?"
              className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-2xl p-2.5 sm:p-3 font-bold text-xs sm:text-sm outline-none focus:bg-[var(--surface)]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase">
              Options (Select radio for correct answer)
            </label>
            {newItemOpts.map((optVal: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctOption"
                  checked={newItemCorrectIdx === idx}
                  onChange={() => setNewItemCorrectIdx(idx)}
                  className="w-4 h-4 cursor-pointer accent-[var(--teal)] shrink-0"
                />
                <input
                  type="text"
                  value={optVal}
                  onChange={(e) => {
                    const next = [...newItemOpts];
                    next[idx] = e.target.value;
                    setNewItemOpts(next);
                  }}
                  placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                  className={`flex-1 min-w-0 bg-[var(--bg)] border-2 rounded-xl p-2 sm:p-2.5 font-bold text-xs outline-none ${newItemCorrectIdx === idx ? "border-[var(--teal)] bg-[var(--lime)]/20" : "border-[var(--ink)]"}`}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase mb-1">
              Explanation (Optional)
            </label>
            <input
              type="text"
              value={newItemExp}
              onChange={(e) => setNewItemExp(e.target.value)}
              placeholder="Why this answer is correct..."
              className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-2xl p-2.5 sm:p-3 font-medium text-xs outline-none focus:bg-[var(--surface)]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddItemOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Question
            </Button>
          </div>
        </form>
      </Modal>

      {/* 4. Custom Quiz Builder Modal */}
      <Modal
        isOpen={isQuizBuilderOpen}
        onClose={() => setIsQuizBuilderOpen(false)}
        title="Custom Quiz Builder"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase mb-2">
              Scope Options
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setQuizScopeMode("all")}
                className={`p-2 sm:p-2.5 rounded-xl border-2 font-bold text-[11px] sm:text-xs cursor-pointer ${quizScopeMode === "all" ? "bg-[var(--yellow)] border-[var(--ink)] shadow-xs" : "border-transparent bg-[var(--bg)]"}`}
              >
                All Topics
              </button>
              <button
                type="button"
                onClick={() => setQuizScopeMode("range")}
                className={`p-2 sm:p-2.5 rounded-xl border-2 font-bold text-[11px] sm:text-xs cursor-pointer ${quizScopeMode === "range" ? "bg-[var(--yellow)] border-[var(--ink)] shadow-xs" : "border-transparent bg-[var(--bg)]"}`}
              >
                Topic Range
              </button>
              <button
                type="button"
                onClick={() => setQuizScopeMode("specific")}
                className={`p-2 sm:p-2.5 rounded-xl border-2 font-bold text-[11px] sm:text-xs cursor-pointer ${quizScopeMode === "specific" ? "bg-[var(--yellow)] border-[var(--ink)] shadow-xs" : "border-transparent bg-[var(--bg)]"}`}
              >
                Specific Topics
              </button>
            </div>
          </div>

          {quizScopeMode === "range" && activeSubject && (
            <div className="flex flex-wrap items-center gap-2 bg-[var(--bg)] p-3 rounded-2xl border-2 border-[var(--ink)]">
              <span className="text-xs font-bold">From Topic #</span>
              <input
                type="number"
                min={1}
                max={activeSubject.topics.length || 1}
                value={rangeStartOrder}
                onChange={(e) =>
                  setRangeStartOrder(parseInt(e.target.value, 10) || 1)
                }
                className="w-14 sm:w-16 bg-[var(--surface)] border border-[var(--ink)] rounded-xl p-1 font-bold text-center text-xs"
              />
              <span className="text-xs font-bold">to #</span>
              <input
                type="number"
                min={1}
                max={activeSubject.topics.length || 1}
                value={rangeEndOrder}
                onChange={(e) =>
                  setRangeEndOrder(parseInt(e.target.value, 10) || 1)
                }
                className="w-14 sm:w-16 bg-[var(--surface)] border border-[var(--ink)] rounded-xl p-1 font-bold text-center text-xs"
              />
            </div>
          )}

          {quizScopeMode === "specific" && activeSubject && (
            <div className="space-y-1.5 max-h-40 overflow-y-auto bg-[var(--bg)] p-3 rounded-2xl border-2 border-[var(--ink)]">
              {activeSubject.topics.map((t: Topic) => (
                <label
                  key={t.id}
                  className="flex items-center gap-2 text-xs font-bold cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTopicIds.includes(t.id)}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedTopicIds((prev) => [...prev, t.id]);
                      else
                        setSelectedTopicIds((prev) =>
                          prev.filter((id) => id !== t.id),
                        );
                    }}
                    className="accent-[var(--teal)] cursor-pointer shrink-0"
                  />
                  <span className="truncate">
                    Topic {t.order}: {t.title}
                  </span>
                </label>
              ))}
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold uppercase mb-2">
              MCQ Timer Options
            </label>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-2">
              {[0, 10, 15, 30].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => {
                    setQuizTimerSeconds(sec);
                    setUseCustomTimer(false);
                  }}
                  className={`p-1.5 sm:p-2 rounded-xl border-2 font-bold text-xs cursor-pointer ${!useCustomTimer && quizTimerSeconds === sec ? "bg-[var(--lime)] border-[var(--ink)] shadow-xs" : "bg-[var(--bg)] border-transparent"}`}
                >
                  {sec === 0 ? "Off" : `${sec}s`}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCustomTimer}
                  onChange={(e) => setUseCustomTimer(e.target.checked)}
                  className="accent-[var(--teal)] cursor-pointer shrink-0"
                />
                Custom Timer (Sec):
              </label>
              {useCustomTimer && (
                <input
                  type="number"
                  min={5}
                  max={300}
                  value={customTimerInput}
                  onChange={(e) => setCustomTimerInput(e.target.value)}
                  className="w-16 bg-[var(--bg)] border-2 border-[var(--ink)] rounded-xl p-1 font-bold text-xs text-center"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsQuizBuilderOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleStartCustomQuiz}
            >
              <Play size={15} fill="currentColor" /> Start Quiz
            </Button>
          </div>
        </div>
      </Modal>

      {/* 5. Import Modal (Subject & Topic Levels) */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title={
          importType === "platform"
            ? "Restore Platform Backup"
            : importType === "subject"
              ? "Import Subject File"
              : "Import Topics File"
        }
      >
        <div className="space-y-4">
          {/* Target Topic Selection Control for Topic Importer */}
          {importType === "topic" && activeSubject && (
            <div className="bg-[var(--surface)] border-2 border-[var(--ink)] p-3 rounded-2xl space-y-2">
              <label className="block text-xs font-extrabold uppercase">
                Destination Topic Control
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setImportTargetTopicMode("auto")}
                  className={`p-2 rounded-xl border-2 font-bold ${importTargetTopicMode === "auto" ? "bg-[var(--yellow)] border-[var(--ink)]" : "bg-[var(--bg)] border-transparent"}`}
                >
                  From File Headers
                </button>
                <button
                  type="button"
                  onClick={() => setImportTargetTopicMode("existing")}
                  className={`p-2 rounded-xl border-2 font-bold ${importTargetTopicMode === "existing" ? "bg-[var(--yellow)] border-[var(--ink)]" : "bg-[var(--bg)] border-transparent"}`}
                >
                  Merge Existing Topic
                </button>
                <button
                  type="button"
                  onClick={() => setImportTargetTopicMode("custom")}
                  className={`p-2 rounded-xl border-2 font-bold ${importTargetTopicMode === "custom" ? "bg-[var(--yellow)] border-[var(--ink)]" : "bg-[var(--bg)] border-transparent"}`}
                >
                  Custom Topic Title
                </button>
              </div>

              {importTargetTopicMode === "existing" && (
                <div className="mt-2">
                  <label className="block text-[10px] font-bold uppercase mb-1">
                    Select Topic
                  </label>
                  <select
                    value={importTargetTopicId}
                    onChange={(e) => setImportTargetTopicId(e.target.value)}
                    className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-xl p-2 font-bold text-xs"
                  >
                    {activeSubject.topics.map((t: Topic) => (
                      <option key={t.id} value={t.id}>
                        Topic #{t.order}: {t.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {importTargetTopicMode === "custom" && (
                <div className="mt-2">
                  <label className="block text-[10px] font-bold uppercase mb-1">
                    Type Topic Title
                  </label>
                  <input
                    type="text"
                    value={importCustomTopicTitle}
                    onChange={(e) => setImportCustomTopicTitle(e.target.value)}
                    placeholder="e.g. Mathematics Basics, Coding Fundamentals..."
                    className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-xl p-2 font-bold text-xs"
                  />
                </div>
              )}
            </div>
          )}

          {/* AI Generator Banner & Form */}
          {importType !== "platform" && (
            <div className="bg-[var(--yellow)]/30 border-3 border-[var(--ink)] shadow-hard p-3 sm:p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-extrabold text-xs sm:text-sm flex items-center gap-1">
                  ✨ AI Prompt Generator (
                  {importType === "subject" ? "Subject" : "Topics"})
                </span>
                <Button
                  type="button"
                  variant="primary"
                  className="text-xs px-2 py-1"
                  onClick={() =>
                    handleCopyPrompt(
                      importType === "subject"
                        ? getSubjectPromptText()
                        : getTopicPromptText(),
                    )
                  }
                >
                  <Copy size={12} /> {copiedPrompt ? "Copied!" : "Copy"}
                </Button>
              </div>

              {importType === "subject" ? (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="font-bold block text-[10px] uppercase">
                      Subject Title
                    </label>
                    <input
                      type="text"
                      value={promptSubject}
                      onChange={(e) => setPromptSubject(e.target.value)}
                      className="w-full bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-1.5 font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block text-[10px] uppercase">
                      Difficulty Level
                    </label>
                    <select
                      value={promptLevel}
                      onChange={(e) => setPromptLevel(e.target.value)}
                      className="w-full bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-1.5 font-bold text-xs"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold block text-[10px] uppercase">
                      Total Topics
                    </label>
                    <input
                      type="number"
                      value={promptTotalTopics}
                      onChange={(e) =>
                        setPromptTotalTopics(parseInt(e.target.value, 10) || 1)
                      }
                      className="w-full bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-1.5 font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block text-[10px] uppercase">
                      Topic Range
                    </label>
                    <input
                      type="text"
                      value={promptTopicRange}
                      onChange={(e) => setPromptTopicRange(e.target.value)}
                      className="w-full bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-1.5 font-bold text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="col-span-2">
                    <label className="font-bold block text-[10px] uppercase">
                      Target Topics (Semicolon Separated)
                    </label>
                    <input
                      type="text"
                      value={topicPromptList}
                      onChange={(e) => setTopicPromptList(e.target.value)}
                      className="w-full bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-1.5 font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block text-[10px] uppercase">
                      Min Qs Per Topic
                    </label>
                    <input
                      type="number"
                      value={topicPromptMinQs}
                      onChange={(e) =>
                        setTopicPromptMinQs(parseInt(e.target.value, 10) || 1)
                      }
                      className="w-full bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-1.5 font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block text-[10px] uppercase">
                      Max Qs Per Topic
                    </label>
                    <input
                      type="number"
                      value={topicPromptMaxQs}
                      onChange={(e) =>
                        setTopicPromptMaxQs(parseInt(e.target.value, 10) || 1)
                      }
                      className="w-full bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-1.5 font-bold text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold uppercase mb-1">
              {importType === "platform"
                ? "Select Platform JSON File"
                : "Upload Study Document (.md or .json)"}
            </label>
            <input
              type="file"
              accept={importType === "platform" ? ".json" : ".md,.json,.txt"}
              onChange={handleFileUpload}
              className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-2xl p-2 text-xs font-bold cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase mb-1">
              Or Paste Document Content
            </label>
            <textarea
              rows={5}
              value={importSourceText}
              onChange={(e) => setImportSourceText(e.target.value)}
              placeholder={
                importType === "platform"
                  ? "Paste platform backup JSON content..."
                  : "Paste StudyNode markdown content..."
              }
              className="w-full bg-[var(--bg)] border-2 border-[var(--ink)] rounded-2xl p-2.5 font-mono text-xs outline-none focus:bg-[var(--surface)]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsImportModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleExecuteImport}
            >
              Execute Import
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

// --- Intelligent Quiz Runner Component with Auto-Advance & Gamified Streaks ---
interface IntelligentQuizRunnerProps {
  title: string;
  questions: Item[];
  soundEnabled: boolean;
  timerSecondsDefault: number;
  onExit: () => void;
}

const IntelligentQuizRunner: React.FC<IntelligentQuizRunnerProps> = ({
  title,
  questions,
  soundEnabled,
  timerSecondsDefault,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [streakPopup, setStreakPopup] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Timer & Auto-Advance States
  const [timeLeft, setTimeLeft] = useState<number>(timerSecondsDefault);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState<
    number | null
  >(null);
  const [userAnswers, setUserAnswers] = useState<
    { question: Item; chosenOptId: string | null; isCorrect: boolean }[]
  >([]);

  const currentQuestion = questions[currentIndex];

  // Per-Question Timer Logic
  useEffect(() => {
    if (timerSecondsDefault <= 0 || isAnswered || isFinished) return;

    setTimeLeft(timerSecondsDefault);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        if (prev <= 4) playSound("tick", soundEnabled);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnswered, isFinished, timerSecondsDefault]);

  const handleTimeOut = (): void => {
    if (isAnswered) return;
    setIsAnswered(true);
    playSound("wrong", soundEnabled);
    setStreak(0);
    setUserAnswers((prev) => [
      ...prev,
      { question: currentQuestion, chosenOptId: null, isCorrect: false },
    ]);
    triggerAutoAdvance();
  };

  const handleSelectOption = (optId: string): void => {
    if (isAnswered) return;
    setSelectedOptId(optId);
    setIsAnswered(true);

    const chosenOpt = currentQuestion.options.find(
      (o: ItemOption) => o.id === optId,
    );
    const isCorrect = !!chosenOpt?.correct;

    if (isCorrect) {
      playSound("correct", soundEnabled);
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      if (newStreak === 3) {
        setStreakPopup("⚡ 3 IN A ROW!");
        playSound("streak", soundEnabled);
      } else if (newStreak === 5) {
        setStreakPopup("🔥 5 ON FIRE!");
        playSound("streak", soundEnabled);
      } else if (newStreak >= 10 && newStreak % 5 === 0) {
        setStreakPopup(`💥 ${newStreak} UNSTOPPABLE!`);
        playSound("streak", soundEnabled);
      } else {
        setStreakPopup(null);
      }
    } else {
      playSound("wrong", soundEnabled);
      setStreak(0);
      setStreakPopup(null);
    }

    setUserAnswers((prev) => [
      ...prev,
      { question: currentQuestion, chosenOptId: optId, isCorrect },
    ]);
    triggerAutoAdvance();
  };

  const triggerAutoAdvance = (): void => {
    setAutoAdvanceCountdown(100);
    const timer = setTimeout(() => {
      handleNextQuestion();
    }, 1500);
    return () => clearTimeout(timer);
  };

  const handleNextQuestion = (): void => {
    setSelectedOptId(null);
    setIsAnswered(false);
    setAutoAdvanceCountdown(null);
    setStreakPopup(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      playSound("victory", soundEnabled);
    }
  };

  if (!currentQuestion && !isFinished) {
    return (
      <div className="text-center py-12">
        <h3 className="font-extrabold text-xl">No questions available!</h3>
        <Button onClick={onExit} className="mt-4 mx-auto">
          Return to Subject
        </Button>
      </div>
    );
  }

  // Quiz Completion & Emotional Celebration Screen
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let titleMsg = "Good Effort! 💪";
    let subMsg = "Keep practicing to master this topic!";
    if (percentage >= 90) {
      titleMsg = "🎉 ABSOLUTE MASTERY!";
      subMsg = "Outstanding performance! You aced this quiz!";
    } else if (percentage >= 70) {
      titleMsg = "🌟 GREAT JOB!";
      subMsg =
        "Solid understanding! A little more practice and you will be perfect.";
    }

    return (
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 bg-[var(--surface)] border-ink shadow-hard rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 md:p-10 text-center animate-streak">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--yellow)] border-ink shadow-hard rounded-full flex items-center justify-center mx-auto text-3xl sm:text-4xl animate-bounce">
          {percentage >= 70 ? "🏆" : "📚"}
        </div>

        <div>
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-1">
            {titleMsg}
          </h2>
          <p className="font-medium opacity-80 text-xs sm:text-sm max-w-md mx-auto">
            {subMsg}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-[var(--bg)] border-2 border-[var(--ink)] p-3 sm:p-4 rounded-2xl">
          <div>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase opacity-75 block">
              Score
            </span>
            <span className="font-extrabold text-lg sm:text-2xl text-[var(--teal)]">
              {score} / {questions.length}
            </span>
          </div>
          <div>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase opacity-75 block">
              Accuracy
            </span>
            <span className="font-extrabold text-lg sm:text-2xl text-[var(--orange)]">
              {percentage}%
            </span>
          </div>
          <div>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase opacity-75 block">
              Max Streak
            </span>
            <span className="font-extrabold text-lg sm:text-2xl text-[var(--red)]">
              {maxStreak} 🔥
            </span>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="text-left space-y-2 sm:space-y-3 pt-1">
          <h4 className="font-extrabold text-base sm:text-lg border-b-2 border-[var(--ink)]/15 pb-2">
            Question Performance Breakdown
          </h4>
          <div className="space-y-2 max-h-52 sm:max-h-60 overflow-y-auto pr-1">
            {userAnswers.map((ans, idx) => (
              <div
                key={idx}
                className={`p-2.5 sm:p-3 rounded-xl border-2 text-xs font-bold flex items-start gap-2 ${ans.isCorrect ? "bg-[var(--lime)]/20 border-[var(--teal)]" : "bg-[var(--red)]/10 border-[var(--red)]"}`}
              >
                <div className="shrink-0 mt-0.5">
                  {ans.isCorrect ? (
                    <CheckCircle2 size={15} className="text-[var(--teal)]" />
                  ) : (
                    <XCircle size={15} className="text-[var(--red)]" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs font-bold break-words">
                    {idx + 1}. {ans.question.prompt}
                  </p>
                  {ans.question.explanation && (
                    <p className="text-[11px] font-medium opacity-80 bg-[var(--surface)] p-2 rounded-lg border border-[var(--ink)]/10 break-words">
                      💡 {ans.question.explanation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t-2 border-[var(--ink)]/15 flex-wrap">
          <Button variant="secondary" onClick={onExit}>
            Exit Workspace
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setCurrentIndex(0);
              setSelectedOptId(null);
              setIsAnswered(false);
              setScore(0);
              setStreak(0);
              setMaxStreak(0);
              setUserAnswers([]);
              setIsFinished(false);
            }}
          >
            <RefreshCw size={15} /> Retry Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-3 sm:space-y-5">
      {/* Quiz Top Bar */}
      <div className="flex items-center justify-between gap-2 bg-[var(--surface)] border-ink shadow-hard rounded-2xl p-2.5 sm:p-4">
        <Button
          variant="secondary"
          className="text-xs px-2.5 py-1 sm:px-3 sm:py-1.5"
          onClick={onExit}
        >
          <ArrowLeft size={13} /> Exit
        </Button>
        <span className="font-extrabold text-xs sm:text-sm truncate max-w-[140px] sm:max-w-xs">
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          {timerSecondsDefault > 0 && (
            <Badge
              color={timeLeft <= 5 ? "var(--red)" : "var(--yellow)"}
              className="text-[11px] sm:text-xs"
            >
              <Clock size={12} /> {timeLeft}s
            </Badge>
          )}
          <Badge color="var(--periwinkle)">
            {currentIndex + 1} / {questions.length}
          </Badge>
        </div>
      </div>

      {/* Dynamic Streak Popup */}
      {streakPopup && (
        <div className="bg-[var(--orange)] text-[var(--ink)] border-ink shadow-hard p-2 sm:p-2.5 rounded-2xl text-center font-extrabold text-sm sm:text-base tracking-wide animate-streak">
          {streakPopup}
        </div>
      )}

      {/* Main MCQ Card */}
      <div className="bg-[var(--surface)] border-ink shadow-hard rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full bg-[var(--bg)] h-2 sm:h-2.5 rounded-full border border-[var(--ink)]/20 overflow-hidden">
          <div
            className="bg-[var(--teal)] h-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div>
          <span className="font-extrabold text-[10px] sm:text-xs bg-[var(--yellow)] border-ink px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl inline-block mb-1.5">
            Question #{currentIndex + 1}
          </span>
          <h3 className="font-extrabold text-lg sm:text-xl md:text-2xl leading-snug break-words">
            {currentQuestion.prompt}
          </h3>
        </div>

        {/* Options List */}
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          {currentQuestion.options.map((opt: ItemOption, idx: number) => {
            const isChosen = selectedOptId === opt.id;
            let optStyle =
              "bg-[var(--bg)] border-2 border-[var(--ink)] hover:bg-[var(--yellow)]/30";
            let icon: ReactElement | null = null;

            if (isAnswered) {
              if (opt.correct) {
                optStyle =
                  "bg-[var(--lime)] border-3 border-[var(--ink)] shadow-xs";
                icon = (
                  <CheckCircle2
                    size={18}
                    className="text-[var(--ink)] shrink-0"
                  />
                );
              } else if (isChosen && !opt.correct) {
                optStyle =
                  "bg-[var(--red)]/20 border-3 border-[var(--red)] animate-shake";
                icon = (
                  <XCircle size={18} className="text-[var(--red)] shrink-0" />
                );
              } else {
                optStyle =
                  "bg-[var(--bg)] opacity-40 border-2 border-transparent";
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-3 sm:p-4 rounded-2xl font-bold text-xs sm:text-sm md:text-base text-left flex items-center justify-between gap-2.5 cursor-pointer transition-all ${optStyle}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-[var(--surface)] border-2 border-[var(--ink)] flex items-center justify-center font-extrabold text-xs shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="break-words">{opt.text}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation Box */}
        {isAnswered && currentQuestion.explanation && (
          <div className="bg-[var(--bg)] border-2 border-[var(--ink)] p-3 sm:p-4 rounded-2xl text-xs space-y-1 animate-streak">
            <span className="font-extrabold text-[var(--orange)] flex items-center gap-1">
              💡 Explanation:
            </span>
            <p className="font-medium opacity-90 leading-relaxed break-words">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Auto-Advance Visual Progress Indicator */}
        {isAnswered && autoAdvanceCountdown !== null && (
          <div className="pt-1 sm:pt-2">
            <div className="flex justify-between text-[10px] sm:text-[11px] font-bold mb-1 opacity-75">
              <span>Auto-advancing to next question...</span>
              <span>Next ➔</span>
            </div>
            <div className="w-full bg-[var(--bg)] h-1.5 sm:h-2 rounded-full overflow-hidden border border-[var(--ink)]">
              <div className="bg-[var(--orange)] h-full w-full animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
