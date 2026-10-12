"use client";

import { useEffect, useRef, useState } from "react";
import VoxelAvatar from "./VoxelAvatar";
import { site } from "@/data/site";
import { avatarConfig } from "@/lib/avatar-config";
import { buildModel, countBlocks } from "@/lib/voxel";
import { BEAT, createIntroMusic } from "@/lib/intro-music";

const BLOCKS = countBlocks(buildModel(avatarConfig));

// Timeline in BEATS (80 BPM, 1 beat = 0.75 s), matched to lib/intro-music.js.
// One bar (4 beats, 3 s) per project; a single project gets two bars.
// 1 project: 2 bars. 2 projects: 1.5 bars each, so the pitch can still be read. 3+: 1 bar each.
const BEATS_PER_PROJECT = site.projects.length === 1 ? 8 : site.projects.length === 2 ? 6 : 4;
const HANDOVER = 8 + site.projects.length * BEATS_PER_PROJECT;
const STEPS = { hi: 0, name: 2, tagline: 4, projects: 8, handover: HANDOVER, end: HANDOVER + 2 };
const SCENES = ["hi", "name", "tagline", "projects"];
const WIPE = { from: 7.5, to: 9.5 }; // pixel wipe peaks on the drop (beat 8)

// What the avatar does, beat by beat. Each project gets its own reaction.
const PROJECT_FACES = ["happy", "wink", "excited"];
function choreography(beat) {
  if (beat < 3.7) return { pose: "stand", expression: "neutral" }; // building himself
  if (beat < 4) return { pose: "stand", expression: "surprised" }; // "oh, I'm done!"
  if (beat < 6) return { pose: "pump", expression: "proud" }; // fist pump on each tagline part
  if (beat < 8) return { pose: "charge", expression: "excited", charge: (beat - 6) / 2 }; // build-up
  if (beat < 10) return { pose: "jump", expression: "excited" }; // the drop
  if (beat < STEPS.handover) {
    const bar = Math.floor((beat - STEPS.projects) / 4);
    const inBar = (beat - STEPS.projects) % 4;
    if (beat >= 12 && inBar < 1) return { pose: "present", expression: "happy" }; // "look at this!"
    let expression = PROJECT_FACES[bar % PROJECT_FACES.length];
    if (expression === "wink" && inBar % 1 > 0.5) expression = "happy"; // winks on the beat
    return { pose: "dance", expression };
  }
  return { pose: "wave", expression: "happy" };
}

// What he says during the intro (a speech bubble above his head).
function introLine(beat) {
  if (beat >= 3.7 && beat < 4.8) return "Whoa!";
  if (beat >= 8.8 && beat < 10.2) return "Woo-hoo!";
  const inBar = (beat - STEPS.projects) % 4;
  if (beat >= 12 && beat < STEPS.handover && inBar < 1.5) return "I made this!";
  return "";
}

// Little pixel cubes that float around the avatar while it builds.
// x/y: offset from the avatar's center in % of its width. s: size in px.
const CUBES = [
  { x: -78, y: -40, s: 30, c: "slate", d: 0 },
  { x: 70, y: -55, s: 22, c: "soft", d: 80 },
  { x: 86, y: 30, s: 34, c: "block", d: 160 },
  { x: -92, y: 34, s: 20, c: "ink", d: 240 },
  { x: -118, y: -8, s: 16, c: "block", d: 320 },
  { x: 112, y: -30, s: 18, c: "slate", d: 400 },
  { x: 12, y: -88, s: 14, c: "ink", d: 480 },
];

export default function Intro() {
  const [step, setStep] = useState("gate");
  const [beat, setBeat] = useState(0);
  const [done, setDone] = useState(false);
  const [muted, setMuted] = useState(false);
  const avatarRef = useRef(null);
  const musicRef = useRef(null);
  const frameRef = useRef(0);
  const driveRef = useRef({ pose: "stand", expression: "neutral", beat: 0 });

  const finish = () => {
    cancelAnimationFrame(frameRef.current);
    musicRef.current?.stop();
    musicRef.current = null;
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch (e) {}
    document.documentElement.dataset.intro = "skip";
    document.body.style.overflow = "";
    window.dispatchEvent(new Event("intro:done"));
    setDone(true);
  };

  // Starts on the visitor's first key press or tap. Browsers only allow sound
  // after an interaction, so this is what lets the music play.
  const start = async () => {
    if (step !== "gate") return;
    setStep("hi");
    let music = createIntroMusic({ handoverBeat: HANDOVER });
    musicRef.current = music;
    const withSound = music ? await music.start() : false;
    if (!withSound && music) {
      // Audio is locked (some phones): play the intro silently on the normal clock.
      music.stop();
      music = null;
      musicRef.current = null;
    }
    const fallbackStart = performance.now() + 100;

    // Read the time from the audio clock every frame, so scenes land on the beat.
    // Without sound, fall back to the page clock. The choice is made once, so the
    // timeline never jumps between the two clocks.
    const tick = () => {
      const seconds = music ? music.now() : (performance.now() - fallbackStart) / 1000;
      const b = seconds / BEAT;
      driveRef.current = { ...choreography(b), say: introLine(b), beat: b };
      setBeat(b);
      let current = "hi";
      for (const [name, at] of Object.entries(STEPS)) if (b >= at) current = name;
      if (current === "end") return finish();
      setStep(current);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    // The boot script in layout.jsx already decided to skip.
    if (document.documentElement.dataset.intro === "skip") {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      cancelAnimationFrame(frameRef.current);
      musicRef.current?.stop();
    };
  }, []);

  // "Replay intro" in the footer, while already on Home: start over from the title screen.
  useEffect(() => {
    const onReplay = () => {
      cancelAnimationFrame(frameRef.current);
      musicRef.current?.stop();
      musicRef.current = null;
      driveRef.current = { pose: "stand", expression: "neutral", beat: 0 };
      setBeat(0);
      setStep("gate");
      setDone(false);
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    };
    window.addEventListener("intro:replay", onReplay);
    return () => window.removeEventListener("intro:replay", onReplay);
  }, []);

  // Any key (except Tab, so keyboard users can reach the buttons) starts the intro.
  useEffect(() => {
    if (step !== "gate" || done) return;
    const onKey = (e) => {
      if (e.key === "Tab" || e.key === "Shift") return;
      start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Handover: fly the intro avatar onto the hero avatar's exact spot,
  // while the paper behind it fades away to reveal the page.
  useEffect(() => {
    if (step !== "handover") return;
    const target = document.getElementById("hero-avatar")?.querySelector("canvas");
    const from = avatarRef.current;
    if (!target || !from) return;
    const a = from.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const dx = b.left + b.width / 2 - (a.left + a.width / 2);
    const dy = b.top + b.height / 2 - (a.top + a.height / 2);
    from.style.transition = "transform 1.3s cubic-bezier(0.65, 0, 0.25, 1)";
    from.style.transform = `translate(${dx}px, ${dy}px) scale(${b.width / a.width})`;
  }, [step]);

  if (done) return null;

  const order = ["gate", ...Object.keys(STEPS)];
  const reached = (name) => order.indexOf(step) >= order.indexOf(name);
  const handover = step === "handover";
  const projectIndex = Math.min(site.projects.length - 1, Math.max(0, Math.floor((beat - STEPS.projects) / BEATS_PER_PROJECT)));

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    musicRef.current?.setMuted(next);
  };

  return (
    <div
      className={`intro fixed inset-0 z-50 overflow-hidden transition-colors duration-[1300ms] ${
        handover ? "bg-transparent" : "bg-paper"
      }`}
      // A click (not pointerdown) counts as a "real" tap on phones, which is
      // what browsers require before they let audio play.
      onClick={(e) => {
        if (step === "gate" && !e.target.closest("button")) start();
      }}
    >
      <Frame leaving={handover} step={step} />

      <div className="relative flex h-full flex-col items-center justify-center px-5">
        <div className="relative w-[min(56vw,260px)]">
          {/* Cubes sit behind the avatar and don't travel with it */}
          {reached("name") && (
            <div className="pointer-events-none absolute inset-0 [--spread:0.62] sm:[--spread:1]" aria-hidden="true">
              {CUBES.map((cube, i) => (
                <PixelCube key={i} {...cube} leaving={handover} />
              ))}
            </div>
          )}
          <div ref={avatarRef} className="relative">
            {reached("name") ? (
              <VoxelAvatar
                assemble
                driveRef={driveRef}
                res={112}
                label="William's avatar, building itself block by block"
                className="w-full"
              />
            ) : (
              <div className="aspect-[9/10] w-full" />
            )}
          </div>
        </div>

        <div
          className={`mt-4 flex min-h-[11rem] w-full max-w-3xl flex-col items-center text-center transition-opacity duration-500 ${
            handover ? "opacity-0" : "opacity-100"
          }`}
          aria-live="polite"
        >
          {step === "gate" && <Gate onStart={start} />}
          {step === "hi" && <Hi />}
          {step === "name" && <SplitRise text={`I'm ${site.name}.`} className="font-serif text-5xl tracking-[-0.02em] sm:text-6xl" />}
          {step === "tagline" && <Tagline text={site.tagline} />}
          {(step === "projects" || handover) && (
            <ProjectReel key={projectIndex} project={site.projects[projectIndex]} onType={() => musicRef.current?.blip()} />
          )}
        </div>
      </div>

      {beat >= WIPE.from && beat < WIPE.to && <PixelWipe />}

      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        {step !== "gate" && (
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={muted}
            className="rounded-full border border-ink/25 bg-paper px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
          >
            {muted ? "Sound off" : "Sound on"}
          </button>
        )}
        <button
          type="button"
          onClick={finish}
          className="rounded-full border border-ink/25 bg-paper px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}

// The "title screen" before the intro starts.
function Gate({ onStart }) {
  // Phones and tablets have no keyboard, so they get "tap" instead of "press any key".
  const [touch, setTouch] = useState(false);
  useEffect(() => setTouch(window.matchMedia("(pointer: coarse)").matches), []);
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onStart}
        className="cursor-blink-slow font-pixel text-lg text-ink sm:text-xl"
      >
        {touch ? "Tap anywhere to start" : "Press any key to start"}
      </button>
      <p className="mt-4 text-sm text-muted">Best with sound on.</p>
    </div>
  );
}

// Thin rules that draw in from the edges, corner marks, a block counter and
// a progress bar with one segment per scene.
function Frame({ leaving, step }) {
  const scene = SCENES.indexOf(step);
  return (
    <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${leaving ? "opacity-0" : ""}`} aria-hidden="true">
      <div className="intro-rule absolute inset-x-6 top-16 h-px origin-left bg-rule sm:inset-x-10" />
      <div className="intro-rule absolute inset-x-6 bottom-20 h-px origin-right bg-rule sm:inset-x-10" style={{ animationDelay: "150ms" }} />

      <p className="intro-fade absolute left-6 top-7 font-serif text-lg italic sm:left-10">WL</p>
      <BlockCounter active={step !== "hi" && step !== "gate"} />

      <div className="absolute bottom-8 left-6 flex gap-1.5 sm:left-10">
        {SCENES.map((s, i) => (
          <span key={s} className="relative h-[3px] w-8 overflow-hidden bg-rule">
            <span
              className={`absolute inset-0 origin-left bg-ink ${
                i < scene || leaving ? "" : i === scene ? "intro-progress" : "scale-x-0"
              }`}
              style={i === scene && !leaving ? { animationDuration: `${sceneLength(s)}ms` } : undefined}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

// How long a scene lasts, in milliseconds.
function sceneLength(name) {
  const order = Object.keys(STEPS);
  return (STEPS[order[order.indexOf(name) + 1]] - STEPS[name]) * BEAT * 1000;
}

// Counts the blocks as the avatar puts itself together (matches lib/voxel.js timing).
function BlockCounter({ active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const id = setInterval(() => {
      const t = (performance.now() - start) / 1000;
      const count = Math.min(BLOCKS, Math.floor((t / 1.1) * BLOCKS) + 1);
      setN(count);
      if (count >= BLOCKS) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [active]);
  return (
    <p className="intro-fade absolute right-6 top-8 font-pixel text-[11px] text-muted sm:right-10">
      {String(n).padStart(2, "0")}/{BLOCKS} blocks
    </p>
  );
}

function Hi() {
  return (
    <div className="relative">
      <p className="font-pixel text-5xl">
        <SplitRise text="Hi." as="span" step={BEAT * 500} />
        <span className="cursor-blink ml-1 inline-block h-[0.85em] w-[0.45em] translate-y-[0.08em] bg-ink" />
      </p>
      {/* A small pixel burst when the greeting lands */}
      <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="intro-burst absolute block h-2 w-2 bg-slate"
            style={{ "--a": `${i * 45}deg`, animationDelay: `${BEAT * 1000}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// Splits text into characters that rise in one after another.
function SplitRise({ text, className = "", as: Tag = "p", step = 35 }) {
  return (
    <Tag className={className} aria-label={text}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="intro-char inline-block whitespace-pre"
          style={{ animationDelay: `${i * step}ms` }}
        >
          {ch}
        </span>
      ))}
    </Tag>
  );
}

// Each part of the tagline is revealed by a slate bar that sweeps across it.
function Tagline({ text }) {
  const parts = text.split("·").map((p) => p.trim());
  return (
    <p className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xl text-ink sm:text-2xl" aria-label={text}>
      {parts.map((part, i) => (
        <span key={part} className="relative inline-block overflow-hidden px-1" aria-hidden="true">
          <span className="intro-wipe-text inline-block" style={{ animationDelay: `${i * BEAT * 1000 + 270}ms` }}>
            {part}
          </span>
          <span className="intro-wipe-bar absolute inset-0 bg-slate" style={{ animationDelay: `${i * BEAT * 1000}ms` }} />
        </span>
      ))}
    </p>
  );
}

// One project per bar: preview + name, then the pitch types itself out.
function ProjectReel({ project, onType }) {
  return (
    <div className="intro-slide flex w-full flex-col items-center gap-5 text-left sm:flex-row sm:items-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt=""
        className="intro-pixel-reveal h-28 w-44 shrink-0 rounded-md bg-slate-soft object-cover sm:h-32 sm:w-52"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-ink">{project.title}</p>
        <Typewriter
          text={project.pitch}
          duration={BEAT * 1000 * BEATS_PER_PROJECT * 0.65}
          delay={250}
          onType={onType}
          className="mt-2 max-w-[48ch] font-serif text-lg leading-snug text-ink sm:text-xl"
        />
      </div>
    </div>
  );
}

// Types text one character at a time, with a soft blip every few characters.
function Typewriter({ text, duration, delay = 0, onType, className }) {
  const [count, setCount] = useState(0);
  const typed = useRef(0);
  useEffect(() => {
    let id;
    const startAt = performance.now() + delay;
    const tick = () => {
      const n = Math.min(text.length, Math.max(0, Math.floor(((performance.now() - startAt) / duration) * text.length)));
      if (Math.floor(n / 3) > Math.floor(typed.current / 3)) onType?.();
      typed.current = n;
      setCount(n);
      if (n < text.length) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [text, duration, delay]);
  return (
    <p className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-slate ${count >= text.length ? "cursor-blink" : ""}`}
      />
    </p>
  );
}

// A grid of squares that sweeps across the screen, like a game scene change.
function PixelWipe() {
  const cols = 14;
  const rows = 9;
  return (
    <div
      className="pointer-events-none absolute inset-0 grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      aria-hidden="true"
    >
      {Array.from({ length: cols * rows }, (_, k) => {
        const x = k % cols;
        const y = Math.floor(k / cols);
        return <span key={k} className="intro-cell bg-ink" style={{ animationDelay: `${(x + y) * 22}ms` }} />;
      })}
    </div>
  );
}

const CUBE_COLORS = {
  slate: ["#7d8fa2", "#56677a", "#3f4d5c"],
  soft: ["#e9edf1", "#cdd5dd", "#aab6c2"],
  block: [avatarConfig.block, "#7f93a7", "#647789"],
  ink: ["#4a4f57", "#2c3037", "#1b1d20"],
};

function PixelCube({ x, y, s, c, d, leaving }) {
  const [top, left, right] = CUBE_COLORS[c];
  const k = leaving ? 2.6 : 1; // on handover, cubes fly outward
  return (
    <span
      className="absolute block"
      style={{
        // --spread pulls the cubes in on narrow screens so none get cut off
        left: `calc(50% + ${x * k}% * var(--spread))`,
        top: `calc(50% + ${y * k}% * var(--spread))`,
        marginLeft: -s / 2,
        marginTop: -s / 2,
        opacity: leaving ? 0 : 1,
        transition: "left 0.9s cubic-bezier(0.5, 0, 0.75, 0), top 0.9s cubic-bezier(0.5, 0, 0.75, 0), opacity 0.5s ease 0.3s",
      }}
    >
      <span className="intro-pop block" style={{ animationDelay: `${d}ms` }}>
        <span className="intro-bob block" style={{ animationDelay: `${d * 2}ms` }}>
          <svg width={s} height={Math.round(s * 1.14)} viewBox="0 0 14 16" shapeRendering="crispEdges">
            <polygon points="7,0 14,4 7,8 0,4" fill={top} />
            <polygon points="0,4 7,8 7,16 0,12" fill={left} />
            <polygon points="14,4 7,8 7,16 14,12" fill={right} />
          </svg>
        </span>
      </span>
    </span>
  );
}
