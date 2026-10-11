"use client";

import { useEffect, useRef, useState } from "react";
import { avatarConfig } from "@/lib/avatar-config";
import { buildModel, getPose, renderScene } from "@/lib/voxel";
import { flyAvatar, registerTravelAvatar, takePendingTravel } from "@/lib/avatar-travel";
import SpeechBubble from "./SpeechBubble";

const MODEL = buildModel(avatarConfig);
const SLEEP_AFTER = 15; // seconds without any activity

const BEAT = 0.75; // seconds per beat at 80 BPM, the same as the intro music

// Shared by every avatar on the page: where the pointer is, when the visitor
// last did anything, and what (if anything) the avatar should look at.
const shared = { x: 0, y: 0, lastActive: 0, lookAt: null };
if (typeof window !== "undefined") {
  shared.lastActive = performance.now() / 1000;
  const active = () => (shared.lastActive = performance.now() / 1000);
  window.addEventListener("pointermove", (e) => {
    shared.x = e.clientX / window.innerWidth - 0.5;
    shared.y = e.clientY / window.innerHeight - 0.5;
    active();
  });
  for (const type of ["pointerdown", "keydown", "scroll", "touchstart"]) {
    window.addEventListener(type, active, { passive: true });
  }
  // Sent by HoverLook (Work page): { x, y } in page pixels, or null.
  window.addEventListener("avatar:look", (e) => (shared.lookAt = e.detail));
}

// What he says. A random line is picked each time (never the same twice in a row).
const LINES = {
  hop: ["Hey!", "Hehe.", "Boing!", "That tickles!", "Again?"],
  annoyed: ["Okay, okay!", "I'm dizzy...", "Hey, quit it!"],
  wake: ["Huh? I'm up!", "5 more minutes...", "I wasn't sleeping!"],
  look: ["I made this!", "Try this one!", "Fun, right?"],
  yawn: ["Lights out...", "Time for bed."],
  squint: ["Too bright!", "My eyes!"],
  copy: ["Copying my homework?", "Ctrl+C, huh?", "Take good notes!"],
};
let lastLine = "";
function pick(list) {
  const options = list.filter((l) => l !== lastLine);
  lastLine = options[Math.floor(Math.random() * options.length)];
  return lastLine;
}

// Short reactions: which pose and face, and for how long (seconds).
const REACTIONS = {
  hop: { pose: "jump", expression: "happy", duration: 0.6 },
  annoyed: { pose: "shake", expression: "focused", duration: 1.4 },
  wake: { pose: "jump", expression: "surprised", duration: 0.6 },
  land: { pose: "land", expression: "happy", duration: 0.55 },
  yawn: { pose: "yawn", expression: "yawn", duration: 1.8 }, // switched to dark mode
  squint: { pose: "cover", expression: "grimace", duration: 1.4 }, // switched to light mode
  copy: { pose: "point", expression: "proud", duration: 1.8 }, // visitor copied some text
  thumbs: { pose: "thumbs", expression: "wink", duration: 1.4 }, // email copied
  greet: { pose: "wave", expression: "happy", duration: 2.2 }, // typed "hi"
  dance: { pose: "dance", expression: "happy", duration: 16 * BEAT }, // typed "dance"
};

/**
 * pose: "stand" | "wave" | "point" | "hold" | "sit"
 * res: height of the internal canvas in pixels. Lower = chunkier pixels.
 * assemble: build the avatar block by block when it mounts (used by the intro).
 * driveRef: optional ref the intro updates every frame with
 *   { pose, expression, beat, charge } so moves and faces land on the music.
 * interactive: reacts to taps, falls asleep when left alone, and flies
 *   between pages. Used by the page avatars, not the intro.
 * greeting: what he says when the page opens (or when he lands after flying in).
 * asleep: sleeps no matter what (Contact page at night in Jakarta). A tap wakes
 *   him for a few seconds.
 *
 * Other parts of the site make him react by sending a window event:
 *   window.dispatchEvent(new CustomEvent("avatar:react", { detail: { reaction: "hop", line: "Hey!" } }))
 * reaction: a key of REACTIONS, or "sleep". line: optional text for the bubble.
 */
export default function VoxelAvatar({
  pose = "stand",
  res = 132,
  assemble = false,
  driveRef,
  interactive = false,
  greeting,
  asleep = false,
  label,
  className = "",
}) {
  const canvasRef = useRef(null);
  const poseRef = useRef(pose);
  const stateRef = useRef(null);
  const [sleeping, setSleeping] = useState(false);
  const [bubble, setBubble] = useState(null); // { text, id }
  const bubbleTimer = useRef(0);
  const asleepRef = useRef(asleep);
  poseRef.current = pose;
  asleepRef.current = asleep;

  // Show a speech bubble. Without a duration it stays until replaced.
  const say = (text, duration) => {
    clearTimeout(bubbleTimer.current);
    setBubble(text ? { text, id: performance.now() } : null);
    if (text && duration !== Infinity) {
      bubbleTimer.current = setTimeout(() => setBubble(null), duration ?? 1500 + text.length * 60);
    }
  };

  // Start a reaction (if motion is allowed), with a line to go with it.
  const react = (name, line, startAt) => {
    const state = stateRef.current;
    if (!state || !REACTIONS[name]) return;
    if (line) say(line);
    else if (LINES[name]) say(pick(LINES[name]));
    if (state.reduceMotion) return;
    const t = performance.now() / 1000;
    state.reaction = { ...REACTIONS[name], start: startAt ?? t };
    state.awakeUntil = t + REACTIONS[name].duration + 4; // a forced sleeper stays up for a bit
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const now = () => performance.now() / 1000;
    const state = {
      waveStart: assemble ? -100 : now() + 0.3, // no wave while assembling
      reaction: null,
      sleeping: false,
      hidden: false,
      reduceMotion,
    };
    stateRef.current = state;
    const assembleStart = assemble && !reduceMotion ? now() : null;
    const look = { x: 0, y: 0 };
    let nextBlink = now() + 2 + Math.random() * 2;
    let frame = 0;
    let visible = true;

    const draw = () => {
      const t = now();

      // Fall asleep when left alone (or when told to); wake up with a start.
      if (interactive && !reduceMotion) {
        const forced = asleepRef.current && t > (state.awakeUntil || 0);
        const idle = forced || t - shared.lastActive > SLEEP_AFTER;
        if (idle !== state.sleeping) {
          state.sleeping = idle;
          setSleeping(idle);
          if (idle) say(null);
          else if (!state.reaction) react("wake"); // woken by a tap or another reaction: let that one play
        }
      }

      // A line when a project starts being hovered (not every time).
      if (interactive && shared.lookAt && !state.looking && t - (state.lastLookLine || 0) > 4) {
        say(pick(LINES.look));
        state.lastLookLine = t;
      }
      state.looking = !!shared.lookAt;

      // Where to look: a hovered project, otherwise the pointer.
      let target = { x: shared.x * 0.8, y: shared.y * 0.4 };
      if (shared.lookAt) {
        const r = canvas.getBoundingClientRect();
        target = {
          x: Math.max(-0.7, Math.min(0.7, ((shared.lookAt.x - (r.left + r.width / 2)) / window.innerWidth) * 1.6)),
          y: Math.max(-0.3, Math.min(0.5, ((shared.lookAt.y - (r.top + r.height / 2)) / window.innerHeight) * 0.9)),
        };
      }
      if (state.sleeping) target = { x: 0, y: 0 };
      look.x += (target.x - look.x) * 0.08;
      look.y += (target.y - look.y) * 0.08;

      let blink = 1;
      if (t > nextBlink) {
        blink = 0.15;
        if (t > nextBlink + 0.12) nextBlink = t + 2.5 + Math.random() * 3;
      }

      // What to do this frame: intro choreography > reaction > sleep > page pose.
      const drive = driveRef?.current;
      let poseName = poseRef.current;
      let expression = null;
      if (drive) {
        state.beat = drive.beat;
        state.charge = drive.charge;
        poseName = drive.pose;
        expression = drive.expression;
        if ((drive.say || "") !== (state.driveSay || "")) {
          state.driveSay = drive.say || "";
          say(drive.say || null, Infinity);
        }
      } else {
        state.beat = undefined;
        const r = state.reaction;
        if (r && t < r.start + r.duration) {
          state.progress = Math.max(0, (t - r.start) / r.duration);
          poseName = r.pose;
          expression = r.expression;
          if (r.pose === "jump") state.beat = state.progress; // one hop over the reaction
          if (r.pose === "dance") {
            // on the music's beat; winks on every other bar
            state.beat = Math.max(0, t - r.start) / BEAT;
            const bar = Math.floor(state.beat / 4);
            expression = bar % 2 && state.beat % 1 < 0.5 ? "wink" : "happy";
          }
        } else {
          state.reaction = null;
          if (state.sleeping) poseName = "sleep";
          else if (shared.lookAt && interactive) expression = "excited";
        }
      }

      const p = getPose(poseName, t, state);
      const head = p.parts.head || {};
      p.parts.head = { ...head, ry: look.x - p.root.yaw * 0.5, rx: look.y + (head.rx || 0) };
      // In dark mode he wears a nightcap.
      const hat = document.documentElement.dataset.theme === "dark" ? "nightcap" : null;
      renderScene(ctx, MODEL, p, { t, assembleStart, blink, expression: expression || p.expression, hat });
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame && visible && !document.hidden && !reduceMotion) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Pause when scrolled away or when the tab is hidden.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Greeting: after the intro (Home), after landing (flew in), or shortly after load.
    const introPlaying = document.documentElement.dataset.intro !== "skip";
    let greetTimer = 0;
    const greet = (delay) => {
      if (greeting) greetTimer = setTimeout(() => say(greeting), delay);
    };

    // After the intro hands over to the hero, wave hello.
    const onIntroDone = () => {
      state.waveStart = now() + 0.1;
      greet(300);
    };
    window.addEventListener("intro:done", onIntroDone);

    // Reactions sent from elsewhere (theme toggle, copy, secret words, copy email).
    const onReact = (e) => {
      const { reaction, line, startAt } = e.detail || {};
      if (reaction === "sleep") {
        shared.lastActive = now() - SLEEP_AFTER - 0.1; // nod off right away
        return;
      }
      react(reaction, line, startAt);
      if (reduceMotion) draw(); // no animation loop: at least show the new hat/face
    };
    if (interactive) window.addEventListener("avatar:react", onReact);

    // Page-to-page flight: if we arrived by clicking a link, fly in.
    let unregister = () => {};
    if (interactive) {
      unregister = registerTravelAvatar(canvas);
      const from = !reduceMotion && takePendingTravel();
      if (from) {
        canvas.style.opacity = "0";
        flyAvatar(from, canvas).then(() => {
          canvas.style.opacity = "";
          react("land");
          greet(250);
        });
      } else if (!introPlaying) {
        greet(700);
      }
    }

    draw(); // first frame, also the only one with reduced motion
    start();

    return () => {
      stop();
      io.disconnect();
      unregister();
      window.removeEventListener("avatar:react", onReact);
      clearTimeout(greetTimer);
      clearTimeout(bubbleTimer.current);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("intro:done", onIntroDone);
    };
  }, [assemble, interactive]);

  // Tap: a happy hop. Tap a lot, quickly: he gets annoyed.
  const taps = useRef([]);
  const onTap = () => {
    if (!interactive) return;
    const t = performance.now() / 1000;
    const r = stateRef.current?.reaction;
    if (r && r.pose === "shake" && t < r.start + r.duration) return; // let him finish being annoyed
    if (stateRef.current) stateRef.current.awakeUntil = t + 5; // wakes a forced sleeper
    taps.current = [...taps.current.filter((x) => t - x < 2), t];
    if (taps.current.length >= 4) {
      taps.current = [];
      react("annoyed");
    } else {
      react("hop");
    }
  };

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={Math.round(res * 0.9)}
        height={res}
        role="img"
        aria-label={label || "A blocky 3D avatar of William"}
        onPointerDown={onTap}
        className={`pixelated block aspect-[9/10] h-auto w-full ${interactive ? "cursor-pointer touch-manipulation select-none" : ""}`}
      />
      {bubble && <SpeechBubble key={bubble.id} text={bubble.text} />}
      {sleeping && (
        <div className="pointer-events-none absolute right-[18%] top-[6%] font-pixel text-ink" aria-hidden="true">
          <span className="zzz absolute text-[10px]" style={{ animationDelay: "0s" }}>z</span>
          <span className="zzz absolute text-[13px]" style={{ animationDelay: "0.8s" }}>z</span>
          <span className="zzz absolute text-[17px]" style={{ animationDelay: "1.6s" }}>Z</span>
        </div>
      )}
    </div>
  );
}
