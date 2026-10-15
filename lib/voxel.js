// A tiny voxel renderer with no 3D library.
// The avatar is a list of boxes. Each frame we rotate the boxes, sort their
// faces back to front and fill them on a SMALL canvas. CSS then scales that
// canvas up with `image-rendering: pixelated`, which gives the pixel-game look
// while the motion itself stays smooth.
//
// Units are "blocks". y points up, feet stand on y = 0, the avatar faces +z
// (toward you). "Left" and "right" are from YOUR point of view.

// Where each body part rotates from.
const PIVOTS = {
  legLeft: [-2, 7, 0],
  legRight: [2, 7, 0],
  torso: [0, 7, 0],
  armLeft: [-5.5, 14, 0],
  armRight: [5.5, 14, 0],
  head: [0, 15.5, 0],
  world: [0, 0, 0],
};

const CAMERA_PITCH = 0.24; // look slightly down so the tops of blocks show
const LIGHT = normalize([-0.45, 0.8, 0.55]);

// ---------- model ----------

export function buildModel(cfg) {
  const boxes = [];
  const box = (part, x, y, z, w, h, d, color, tag) =>
    boxes.push({ part, c: [x, y, z], s: [w, h, d], color, tag });
  // Small things stuck on a bigger block (eyes, fringe, glasses). They are
  // drawn after the block they sit on, so they never disappear behind it.
  const detail = (...args) => {
    box(...args);
    boxes[boxes.length - 1].detail = true;
  };

  // Legs + shoes
  for (const side of [-1, 1]) {
    const part = side < 0 ? "legLeft" : "legRight";
    box(part, side * 2, 0.75, 0.3, 3.6, 1.5, 4.4, cfg.shoes);
    box(part, side * 2, 4.25, 0, 3.4, 5.5, 3.6, cfg.pants);
  }

  // Torso, with a small lighter patch on the chest
  box("torso", 0, 11, 0, 8, 8, 5, cfg.shirt);
  detail("torso", 2, 13, 2.6, 1.6, 1.6, 0.2, mix(cfg.shirt, "#ffffff", 0.35));

  // Arms: sleeve + forearm
  for (const side of [-1, 1]) {
    const part = side < 0 ? "armLeft" : "armRight";
    box(part, side * 5.5, 12.5, 0, 3.2, 4, 3.2, cfg.shirt);
    box(part, side * 5.5, 8.5, 0, 2.8, 4, 2.8, cfg.skin);
  }

  // Head
  box("head", 0, 19.5, 0, 10, 9, 9, cfg.skin);
  buildFace(cfg, detail, boxes);

  // Hair
  box("head", 0, 24.1, -0.2, 10.6, 2.4, 9.6, cfg.hair);
  box("head", 0, 20.5, -4.6, 10.6, 7, 1.4, cfg.hair);
  box("head", -5.15, 21.3, -1, 0.9, 3.6, 7.2, cfg.hair);
  box("head", 5.15, 21.3, -1, 0.9, 3.6, 7.2, cfg.hair);
  if (cfg.hairStyle === "swept") {
    detail("head", -1.2, 22.2, 4.65, 7.6, 1.8, 1.2, cfg.hair);
    detail("head", 3.5, 22.6, 4.65, 2.6, 1, 1.2, cfg.hair);
  } else {
    detail("head", 0, 22.5, 4.6, 9.6, 1, 1.1, cfg.hair);
  }
  if (cfg.hairStyle === "spiky") {
    for (const x of [-3.4, 0, 3.4]) box("head", x, 25.8, 0, 2.4, 1.6, 2.4, cfg.hair);
  }

  // Glasses: two square frames and a bridge
  if (cfg.glasses) {
    const g = cfg.glassesColor;
    for (const x of [-2.2, 2.2]) {
      detail("head", x, 20.75, 4.85, 3.2, 0.45, 0.3, g);
      detail("head", x, 18.05, 4.85, 3.2, 0.45, 0.3, g);
      detail("head", x - 1.38, 19.4, 4.85, 0.45, 2.3, 0.3, g);
      detail("head", x + 1.38, 19.4, 4.85, 0.45, 2.3, 0.3, g);
    }
    detail("head", 0, 19.9, 4.85, 1.2, 0.4, 0.3, g);
  }

  // Nightcap, worn in dark mode: a trim, then a soft cone flopping to one side
  const cap = "#4a5f82";
  const trim = "#efede6";
  const hat = (x, y, z, w, h, d, color) => box("head", x, y, z, w, h, d, color, "hat-nightcap");
  hat(0, 24.95, -0.2, 10.9, 0.9, 9.9, trim);
  hat(0, 25.9, -0.2, 10.2, 1.6, 9.2, cap);
  hat(1.2, 27.2, -0.3, 6.8, 1.4, 6.6, cap);
  hat(3.4, 28.0, -0.4, 4.0, 1.1, 3.8, cap);
  hat(5.5, 27.6, -0.4, 2.4, 1.2, 2.4, cap);
  hat(6.9, 26.6, -0.4, 2.2, 2.2, 2.2, trim);

  // Props, only drawn by the poses that use them
  box("armRight", 5.5, 4.6, 0, 3.4, 3.4, 3.4, cfg.block, "prop-block");
  box("world", -0.4, 1.6, -0.4, 8.5, 3.2, 8.5, cfg.crate, "prop-crate");

  boxes.forEach((b, i) => (b.order = i));
  return boxes;
}

// Blocks you see on the default (smiling) avatar.
export function countBlocks(boxes) {
  const extra = (b) => b.tag && (b.tag.startsWith("prop") || b.tag.startsWith("hat"));
  return boxes.filter((b) => !extra(b) && (!b.expr || b.expr.includes("smile"))).length;
}

// ---------- face ----------
//
// Every expression has its own small set of face blocks. Each block lists the
// expressions it belongs to (`expr`), and the renderer only draws the blocks
// for the current one. All sizes are in blocks; the head front is at z = 4.5.
const FACE_DROP = 0.55; // leaves a strip of skin between brows and fringe
export const EXPRESSIONS = [
  "neutral", "smile", "happy", "excited", "surprised", "wink", "proud", "focused", "sleep", "confused", "yawn", "grimace",
];

function buildFace(cfg, detail, boxes) {
  const add = (expr, x, y, w, h, color, extra = {}) => {
    detail("head", x, y - FACE_DROP, extra.z ?? 4.6, w, h, extra.d ?? 0.4, color, extra.tag);
    boxes[boxes.length - 1].expr = expr;
  };
  const mouth = mix(cfg.skin, "#2a0f0c", 0.6);
  const tongue = "#d9776f";
  const blush = mix(cfg.skin, "#e0506a", 0.45);
  const brow = cfg.hair;
  const white = "#ffffff";

  for (const side of [-1, 1]) {
    const x = side * 2.2;
    const inner = -side; // direction toward the nose

    // Eyes, normal (these blink)
    add(["neutral", "smile", "proud", "focused"], x, 19.4, 1.2, 1.8, cfg.eyes, { tag: "eye" });
    // Wink: right eye open, left eye closed in a ^ shape
    if (side > 0) add(["wink"], x, 19.4, 1.2, 1.8, cfg.eyes, { tag: "eye" });

    // Eyes, closed and happy: a little ^ arch
    const happyEyes = side < 0 ? ["happy", "wink"] : ["happy"];
    add(happyEyes, x, 20.0, 1.0, 0.6, cfg.eyes);
    add(happyEyes, x - 0.75, 19.45, 0.6, 0.75, cfg.eyes);
    add(happyEyes, x + 0.75, 19.45, 0.6, 0.75, cfg.eyes);

    // Eyes, big and sparkly
    add(["excited", "surprised"], x, 19.45, 1.5, 2.3, cfg.eyes, { tag: "eye" });
    add(["excited", "surprised"], x - 0.35, 20.1, 0.5, 0.5, white, { z: 4.85, d: 0.1 });

    // Eyebrows
    add(["neutral", "smile", "wink"], x, 20.95, 1.7, 0.45, brow);
    add(["happy", "excited", "surprised"], x, 21.2, 1.7, 0.45, brow);
    add(["proud"], x, side > 0 ? 21.15 : 20.9, 1.7, 0.45, brow); // one brow up
    // Focused: slanted, lower toward the nose
    add(["focused"], x - inner * 0.45, 21.0, 0.85, 0.45, brow);
    add(["focused"], x + inner * 0.45, 20.65, 0.85, 0.45, brow);

    // Confused: eyes glancing to the side, one brow up and one down
    add(["confused"], x + 0.35, 19.4, 1.2, 1.8, cfg.eyes, { tag: "eye" });
    add(["confused"], x, side < 0 ? 21.25 : 20.75, 1.7, 0.45, brow);

    // Asleep: eyes shut in a flat line, brows relaxed
    add(["sleep", "yawn"], x, 19.1, 1.4, 0.4, cfg.eyes);
    add(["sleep"], x, 20.8, 1.7, 0.45, brow);
    add(["yawn"], x, 21.15, 1.7, 0.45, brow);

    // Rosy cheeks
    add(["happy", "excited", "wink"], side * 3.5, 18.2, 1.3, 0.6, blush);
  }

  // Mouths
  add(["neutral"], 0, 17.3, 1.8, 0.45, mouth);
  // Smile: a small U
  add(["smile", "wink"], 0, 17.0, 1.6, 0.45, mouth);
  add(["smile", "wink"], -1.0, 17.4, 0.45, 0.5, mouth);
  add(["smile", "wink"], 1.0, 17.4, 0.45, 0.5, mouth);
  // Big open grin with a tongue
  add(["happy", "excited"], 0, 17.15, 2.6, 1.3, mouth);
  add(["happy", "excited"], 0, 16.8, 1.5, 0.55, tongue, { z: 4.75, d: 0.1 });
  // Surprised: an O
  add(["surprised"], 0, 17.05, 1.1, 1.3, mouth);
  // Proud: a lopsided smirk
  add(["proud"], 0.25, 17.1, 1.5, 0.45, mouth);
  add(["proud"], 1.2, 17.5, 0.45, 0.5, mouth);
  // Confused: a wobbly little mouth
  add(["confused"], -0.6, 17.15, 0.6, 0.4, mouth);
  add(["confused"], 0, 16.95, 0.6, 0.4, mouth);
  add(["confused"], 0.6, 17.15, 0.6, 0.4, mouth);
  // Yawn: a big tall O
  add(["yawn"], 0, 16.85, 1.5, 1.9, mouth);
  // Grimace (hands over his eyes, so only the mouth shows): a wide flat line
  add(["grimace"], 0, 16.75, 2.2, 0.45, mouth);
  add(["grimace"], -1.2, 16.55, 0.45, 0.5, mouth);
  add(["grimace"], 1.2, 16.55, 0.45, 0.5, mouth);
  // Asleep: a small round mouth
  add(["sleep"], 0, 17.1, 0.8, 0.7, mouth);
  // Focused: a flat line, a bit to the side
  add(["focused"], 0.4, 17.2, 1.3, 0.4, mouth);
}

// ---------- poses ----------

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

// 0 → 1 → 0 over ~2.8 seconds, for a single wave
function waveEnvelope(dt) {
  if (dt < 0 || dt > 2.8) return 0;
  return Math.min(smooth(dt / 0.4), smooth((2.8 - dt) / 0.4));
}

// Returns rotations (radians) and offsets for each part at time t.
// state.beat (optional) is the music's beat count; on-beat moves use it so
// they land on the music. Without it, 80 BPM is assumed.
export function getPose(name, t, state) {
  const B = state.beat ?? t / 0.75;
  const onBeat = B - Math.floor(B); // 0 on the beat, rising to 1
  const breathe = Math.sin(t * 2.1);
  const pose = { root: { ty: breathe * 0.15, yaw: 0, rx: 0, rz: 0 }, parts: {}, prop: null, expression: "smile" };
  const set = (k, v) => (pose.parts[k] = { ...pose.parts[k], ...v });

  set("armLeft", { rz: -0.07 - breathe * 0.02 });
  set("armRight", { rz: 0.07 + breathe * 0.02 });

  const wave = (amount) =>
    set("armRight", {
      rz: lerp(0.07, 2.55, amount) + Math.sin(t * 10) * 0.3 * amount,
      rx: -0.15 * amount,
    });

  switch (name) {
    case "stand": {
      const w = waveEnvelope(t - state.waveStart);
      wave(w);
      if (w > 0) pose.expression = "happy";
      break;
    }
    case "wave":
      wave(1);
      pose.expression = "happy";
      break;
    case "point":
      set("armRight", { rz: 1.5 + Math.sin(t * 3) * 0.04, rx: -0.1 });
      pose.root.yaw = 0.3;
      pose.expression = "proud";
      break;
    case "hold":
      set("armRight", { rz: 2.45 + breathe * 0.03, rx: -0.2 });
      pose.prop = "prop-block";
      pose.expression = "proud";
      break;
    case "sit":
      pose.root.ty = -3.6 + breathe * 0.1;
      pose.root.yaw = 0.6; // turned a little, so the legs read as legs
      set("legLeft", { rx: -1.35, rz: -0.06 });
      set("legRight", { rx: -1.25, rz: 0.06 });
      set("armLeft", { rx: -0.55, rz: -0.12 });
      set("armRight", { rx: -0.55, rz: 0.12 });
      pose.prop = "prop-crate";
      break;

    // ---- intro moves ----

    // A hop on every beat, arms flung up while in the air.
    case "jump": {
      const air = 4 * onBeat * (1 - onBeat); // 0 on the beat, 1 at the top
      pose.root.ty = air * 3.5;
      set("armLeft", { rz: -0.2 - 2.4 * Math.min(1, air * 1.6) });
      set("armRight", { rz: 0.2 + 2.4 * Math.min(1, air * 1.6) });
      set("legLeft", { rx: -0.5 * air });
      set("legRight", { rx: -0.35 * air });
      pose.expression = "excited";
      break;
    }

    // A small hop and a fist pump on each beat.
    case "pump": {
      const k = Math.max(0, 1 - onBeat * 2.2); // strongest right on the beat
      pose.root.ty = k * 1.4;
      set("armRight", { rz: 0.1 + 2.7 * k, rx: -0.3 * k });
      set("armLeft", { rz: -0.15, rx: 0.2 });
      set("head", { rx: 0.15 * k });
      pose.expression = "proud";
      break;
    }

    // Crouching and shaking with excitement before the drop.
    case "charge": {
      const p = state.charge ?? 1; // 0 → 1 across the build-up
      pose.root.ty = -1.4 * p;
      pose.root.rx = 0.18 * p; // lean forward
      pose.root.yaw = Math.sin(t * 45) * 0.04 * p;
      set("armLeft", { rx: 0.9 * p, rz: -0.25 });
      set("armRight", { rx: 0.9 * p, rz: 0.25 });
      pose.expression = "excited";
      break;
    }

    // Bounce on the beat, sway side to side, arms swinging.
    case "dance": {
      const swing = Math.sin(B * Math.PI); // flips sides every beat
      pose.root.ty = Math.abs(swing) * 0.9;
      pose.root.rz = swing * 0.12;
      set("armLeft", { rx: swing * 0.8, rz: -0.35 });
      set("armRight", { rx: -swing * 0.8, rz: 0.35 });
      set("legLeft", { rx: Math.max(0, swing) * -0.4 });
      set("legRight", { rx: Math.max(0, -swing) * -0.4 });
      set("head", { rz: -swing * 0.12 });
      break;
    }

    // ---- reactions (used by VoxelAvatar and the page-to-page flight) ----

    // Mid-air with a front flip; state.progress goes 0 → 1 over the flight.
    case "fly": {
      const p = state.progress ?? 0.5;
      pose.root.rx = -Math.PI * 2 * smooth(p);
      set("armLeft", { rz: -2.6 });
      set("armRight", { rz: 2.6 });
      set("legLeft", { rx: -0.6 });
      set("legRight", { rx: -0.4 });
      pose.expression = "excited";
      break;
    }

    // Touching down: a quick dip, arms out for balance.
    case "land": {
      const p = state.progress ?? 1;
      const k = Math.sin(Math.PI * Math.min(1, p * 1.4));
      pose.root.ty = -1.3 * k;
      set("armLeft", { rz: -0.15 - 1.1 * (1 - p) });
      set("armRight", { rz: 0.15 + 1.1 * (1 - p) });
      pose.expression = "happy";
      break;
    }

    // Shaking his head, arms crossed-ish: tapped too many times.
    case "shake":
      pose.root.yaw = Math.sin(t * 22) * 0.18;
      set("armLeft", { rx: -1.2, rz: 0.55 });
      set("armRight", { rx: -1.2, rz: -0.55 });
      pose.expression = "focused";
      break;

    // Dozing: head down, slow breathing.
    case "sleep": {
      const slow = Math.sin(t * 1.3);
      pose.root.ty = slow * 0.2 - 0.3;
      pose.root.rx = 0.06;
      set("head", { rx: 0.42, rz: 0.08 });
      set("armLeft", { rz: -0.04 });
      set("armRight", { rz: 0.04 });
      pose.expression = "sleep";
      break;
    }

    // A big stretch and yawn: lights just went out (switched to dark mode).
    case "yawn": {
      const k = Math.sin(Math.PI * Math.min(1, (state.progress ?? 0.5) * 1.15));
      set("armLeft", { rz: -0.1 - 2.7 * k });
      set("armRight", { rz: 0.1 + 2.7 * k });
      set("head", { rx: -0.25 * k });
      pose.root.rx = -0.1 * k;
      pose.root.ty = 0.5 * k;
      pose.expression = "yawn";
      break;
    }

    // Hands over his eyes: too bright (switched to light mode).
    case "cover":
      set("armLeft", { rx: -2.5, rz: -0.55 });
      set("armRight", { rx: -2.5, rz: 0.55 });
      set("head", { rx: 0.12 });
      pose.root.rx = 0.08;
      pose.root.yaw = Math.sin(t * 16) * 0.05;
      pose.depthBias = { armLeft: 4, armRight: 4 }; // draw the hands in front of the face
      pose.expression = "grimace";
      break;

    // Fist out toward you: "got it".
    case "thumbs":
      set("armRight", { rx: -1.45, rz: 0.25 });
      pose.root.yaw = -0.15;
      pose.expression = "wink";
      break;

    // Walking sideways (the scroll buddy). state.walkPhase moves the legs,
    // state.walkAmp (0–1) fades the stride in and out, state.facing turns him.
    case "walk": {
      const phase = state.walkPhase ?? t * 7;
      const amp = state.walkAmp ?? 1;
      const swing = Math.sin(phase) * amp;
      pose.root.yaw = state.facing ?? 1.2;
      pose.root.ty = Math.abs(Math.cos(phase)) * 0.6 * amp;
      set("legLeft", { rx: swing * 0.75 });
      set("legRight", { rx: -swing * 0.75 });
      set("armLeft", { rx: -swing * 0.6, rz: -0.08 });
      set("armRight", { rx: swing * 0.6, rz: 0.08 });
      pose.expression = state.walkFace || "smile";
      break;
    }

    // Lost: scratching his head and looking around (404 page).
    case "scratch":
      set("armRight", { rz: 2.65 + Math.sin(t * 14) * 0.1, rx: -0.75 });
      set("head", { rz: 0.12 });
      pose.root.yaw = Math.sin(t * 0.9) * 0.3;
      pose.expression = "confused";
      break;

    // Points down and to his left (your left), at the projects below him on the Work page.
    case "pointDown": {
      set("armLeft", { rz: -0.8 + Math.sin(t * 3) * 0.04, rx: -0.6 });
      pose.root.yaw = -0.35;
      set("head", { rx: 0.15 });
      pose.expression = "proud";
      break;
    }

    // Points down at the project card under him.
    case "present":
      set("armRight", { rz: 1.0, rx: -0.7 });
      pose.root.yaw = 0.35;
      if (state.beat !== undefined) {
        // Intro: snaps up on the music's beat, on purpose.
        pose.root.ty = Math.max(0, 1 - onBeat * 3) * 1.2;
      } else {
        // On a page there's no music, so a snap reads as a glitch. Instead a
        // smooth little hop every 2 seconds: up and down over 0.5 s, then rest.
        const p = (t % 2) / 0.5;
        pose.root.ty = breathe * 0.15 + (p < 1 ? Math.sin(Math.PI * p) : 0);
      }
      pose.expression = "happy";
      break;
  }
  return pose;
}

// ---------- rendering ----------

const FACES = [
  { idx: [1, 3, 7, 5], n: [1, 0, 0] },
  { idx: [0, 4, 6, 2], n: [-1, 0, 0] },
  { idx: [2, 6, 7, 3], n: [0, 1, 0] },
  { idx: [0, 1, 5, 4], n: [0, -1, 0] },
  { idx: [4, 5, 7, 6], n: [0, 0, 1] },
  { idx: [0, 2, 3, 1], n: [0, 0, -1] },
];

// options: { assembleStart, t, blink, expression, hat }
//
// Faces are filled pixel by pixel into our own buffer instead of using the
// canvas path API. Canvas paths are antialiased, which makes soft, blurry
// edges once the canvas is scaled up. Our own fill has hard edges only, like
// real pixel art, and we add a 1-pixel dark outline around the silhouette.
const OUTLINE = packRgb([22, 24, 28]);
const SHADOW = packRgba([20, 24, 30, 38]);

// Pixel buffers, reused between frames (one per canvas size).
const buffers = new Map();

export function renderScene(ctx, boxes, pose, options) {
  const { width: W, height: H } = ctx.canvas;
  const scale = H / 34;
  const groundY = H * 0.9;
  const project = (v) => [W / 2 + v[0] * scale, groundY - v[1] * scale];

  const key = W + "x" + H;
  if (!buffers.has(key)) buffers.set(key, { buffer: ctx.createImageData(W, H), mask: new Uint8Array(W * H) });
  const { buffer, mask } = buffers.get(key);
  const px = new Uint32Array(buffer.data.buffer);
  px.fill(0);
  mask.fill(0);

  // Ground shadow (a hard-edged ellipse)
  const [sx, sy] = project(toCamera([0, 0, 0]));
  const rx = 7.5 * scale, ry = 2.2 * scale;
  for (let y = Math.floor(sy - ry); y <= sy + ry; y++) {
    for (let x = Math.floor(sx - rx); x <= sx + rx; x++) {
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const dx = (x + 0.5 - sx) / rx, dy = (y + 0.5 - sy) / ry;
      if (dx * dx + dy * dy <= 1) px[y * W + x] = SHADOW;
    }
  }

  const faces = [];
  const total = boxes.length;

  for (const b of boxes) {
    if (b.tag && b.tag.startsWith("prop") && b.tag !== pose.prop) continue;
    if (b.expr && !b.expr.includes(options.expression || pose.expression)) continue;
    if (b.tag && b.tag.startsWith("hat-") && b.tag !== "hat-" + options.hat) continue;

    // Block-by-block assembly (intro)
    let drop = 0;
    if (options.assembleStart != null) {
      const delay = (b.order / total) * 1.1;
      const p = (options.t - options.assembleStart - delay) / 0.35;
      if (p <= 0) continue;
      drop = (1 - smooth(p)) * 14;
    }

    const part = pose.parts[b.part] || {};
    const pivot = PIVOTS[b.part];
    const isWorld = b.part === "world";
    let [w, h, d] = b.s;
    if (b.tag === "eye") h *= options.blink;

    const corners = [];
    for (let i = 0; i < 8; i++) {
      let v = [
        b.c[0] + (i & 1 ? w : -w) / 2 - pivot[0],
        b.c[1] + (i & 2 ? h : -h) / 2 - pivot[1],
        b.c[2] + (i & 4 ? d : -d) / 2 - pivot[2],
      ];
      v = rotate(v, part.rx || 0, part.ry || 0, part.rz || 0);
      v = [v[0] + pivot[0], v[1] + pivot[1] + drop, v[2] + pivot[2]];
      if (!isWorld) v = moveBody(v, pose.root);
      corners.push(toCamera(v));
    }

    for (const f of FACES) {
      let n = rotate(f.n, part.rx || 0, part.ry || 0, part.rz || 0);
      if (!isWorld) n = rotate(rotate(n, pose.root.rx, 0, pose.root.rz), 0, pose.root.yaw, 0);
      n = rotate(n, CAMERA_PITCH, 0, 0);
      if (n[2] <= 0.01) continue; // facing away

      const pts = f.idx.map((i) => corners[i]);
      const bias = (b.detail ? 2.5 : 0) + (pose.depthBias?.[b.part] || 0);
      const depth = (pts[0][2] + pts[1][2] + pts[2][2] + pts[3][2]) / 4 + bias;
      const light = 0.6 + 0.4 * Math.max(0, dot(n, LIGHT));
      faces.push({ pts: pts.map(project), depth, color: shade(b.color, light) });
    }
  }

  faces.sort((a, b) => a.depth - b.depth);
  for (const f of faces) fillQuad(px, mask, W, H, f.pts, f.color);

  // Outline: any empty pixel touching the avatar becomes dark.
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (mask[i]) continue;
      if (
        (x > 0 && mask[i - 1] === 1) ||
        (x < W - 1 && mask[i + 1] === 1) ||
        (y > 0 && mask[i - W] === 1) ||
        (y < H - 1 && mask[i + W] === 1)
      ) {
        px[i] = OUTLINE;
        mask[i] = 2;
      }
    }
  }

  ctx.putImageData(buffer, 0, 0);
}

// Fill a convex 4-point polygon, testing each pixel's center. No blending.
function fillQuad(px, mask, W, H, pts, color) {
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (const [x, y] of pts) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const x0 = Math.max(0, Math.floor(minX)), x1 = Math.min(W - 1, Math.ceil(maxX));
  const y0 = Math.max(0, Math.floor(minY)), y1 = Math.min(H - 1, Math.ceil(maxY));

  for (let y = y0; y <= y1; y++) {
    const cy = y + 0.5;
    for (let x = x0; x <= x1; x++) {
      const cx = x + 0.5;
      let pos = false, neg = false;
      for (let k = 0; k < 4; k++) {
        const [ax, ay] = pts[k];
        const [bx, by] = pts[(k + 1) & 3];
        const e = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
        if (e > 0) pos = true;
        else if (e < 0) neg = true;
      }
      if (pos && neg) continue; // outside
      const i = y * W + x;
      px[i] = color;
      mask[i] = 1;
    }
  }
}

// ---------- math helpers ----------

// Whole-body movement: lean (rx/rz around the hips), lift (ty), turn (yaw).
const HIPS = 7;
function moveBody(v, root) {
  let r = [v[0], v[1] - HIPS, v[2]];
  if (root.rx || root.rz) r = rotate(r, root.rx, 0, root.rz);
  r = [r[0], r[1] + HIPS + root.ty, r[2]];
  return root.yaw ? rotate(r, 0, root.yaw, 0) : r;
}

function toCamera(v) {
  const r = rotate([v[0], v[1] - 12, v[2]], CAMERA_PITCH, 0, 0);
  return [r[0], r[1] + 12, r[2]];
}

// Rotate around X, then Z, then Y.
function rotate([x, y, z], rx, ry, rz) {
  let c, s;
  if (rx) {
    c = Math.cos(rx); s = Math.sin(rx);
    [y, z] = [y * c - z * s, y * s + z * c];
  }
  if (rz) {
    c = Math.cos(rz); s = Math.sin(rz);
    [x, y] = [x * c - y * s, x * s + y * c];
  }
  if (ry) {
    c = Math.cos(ry); s = Math.sin(ry);
    [x, z] = [x * c + z * s, -x * s + z * c];
  }
  return [x, y, z];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalize(v) {
  const l = Math.hypot(...v);
  return v.map((x) => x / l);
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b);
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * t));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
}

// Pixels are stored as 32-bit numbers: alpha, blue, green, red (little endian).
function packRgba([r, g, b, a]) {
  return ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;
}
function packRgb(rgb) {
  return packRgba([...rgb, 255]);
}

const shadeCache = new Map();
function shade(hex, k) {
  const q = Math.round(k * 12) / 12; // a few fixed light levels, like a palette
  const key = hex + q;
  let out = shadeCache.get(key);
  if (out === undefined) {
    out = packRgb(hexToRgb(hex).map((v) => Math.min(255, Math.round(v * q))));
    shadeCache.set(key, out);
  }
  return out;
}
