// Little chiptune sound effects for the avatar, made with Web Audio (no audio files).
//
// Browsers keep audio locked until the visitor really interacts with the page.
// On phones the avatar reacts on pointerdown, which doesn't count yet, so we
// also try to unlock on the next touchend/click. A sound scheduled while the
// audio is still locked simply plays a moment later, once it unlocks.

let ctx = null;

function audio() {
  if (ctx) return ctx;
  const AudioCtx = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
  if (!AudioCtx) return null;
  ctx = new AudioCtx();
  const unlock = () => {
    if (ctx.state === "running") return;
    try {
      // iOS only unlocks if something plays inside the gesture.
      const src = ctx.createBufferSource();
      src.buffer = ctx.createBuffer(1, 1, 22050);
      src.connect(ctx.destination);
      src.start(0);
    } catch (e) {}
    ctx.resume().catch(() => {});
  };
  for (const type of ["touchend", "click", "keydown"]) {
    document.addEventListener(type, unlock, { capture: true, passive: true });
  }
  unlock();
  return ctx;
}

// One note: a square/saw wave that glides from f1 to f2, with a short envelope.
function note(c, at, { type = "square", f1, f2 = f1, dur, gain = 0.12, vibrato = 0, filter = 0 }) {
  const osc = c.createOscillator();
  const amp = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(f1, at);
  osc.frequency.exponentialRampToValueAtTime(f2, at + dur);

  let out = osc;
  if (vibrato) {
    const lfo = c.createOscillator();
    const depth = c.createGain();
    lfo.frequency.value = 22;
    depth.gain.value = vibrato;
    lfo.connect(depth).connect(osc.frequency);
    lfo.start(at);
    lfo.stop(at + dur + 0.05);
  }
  if (filter) {
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = filter;
    out.connect(lp);
    out = lp;
  }
  amp.gain.setValueAtTime(0.0001, at);
  amp.gain.exponentialRampToValueAtTime(gain, at + 0.012);
  amp.gain.setValueAtTime(gain, at + dur * 0.6);
  amp.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  out.connect(amp).connect(c.destination);
  osc.start(at);
  osc.stop(at + dur + 0.05);
}

// Tap: a happy "boing", slightly different every time.
export function playHop() {
  const c = audio();
  if (!c) return;
  if (c.state !== "running") c.resume().catch(() => {});
  const t = c.currentTime + 0.01;
  const k = 0.9 + Math.random() * 0.25;
  note(c, t, { f1: 260 * k, f2: 820 * k, dur: 0.11, gain: 0.09 });
  note(c, t + 0.1, { f1: 900 * k, f2: 1250 * k, dur: 0.07, gain: 0.05 });
}

// Spammed: a grumpy "hmph-hmph!", low and buzzy.
export function playAnnoyed() {
  const c = audio();
  if (!c) return;
  if (c.state !== "running") c.resume().catch(() => {});
  const t = c.currentTime + 0.01;
  note(c, t, { type: "sawtooth", f1: 210, f2: 150, dur: 0.16, gain: 0.13, vibrato: 18, filter: 1400 });
  note(c, t + 0.2, { type: "sawtooth", f1: 190, f2: 95, dur: 0.3, gain: 0.13, vibrato: 24, filter: 1200 });
  note(c, t + 0.2, { type: "square", f1: 95, f2: 60, dur: 0.3, gain: 0.05, filter: 600 });
}

// Contact page: the envelope flies off...
export function playWhoosh() {
  const c = audio();
  if (!c) return;
  if (c.state !== "running") c.resume().catch(() => {});
  note(c, c.currentTime + 0.01, { type: "triangle", f1: 520, f2: 1400, dur: 0.28, gain: 0.06 });
}

// ...and lands in the mailbox: a cheerful two-note "ding-dong".
export function playMail() {
  const c = audio();
  if (!c) return;
  if (c.state !== "running") c.resume().catch(() => {});
  const t = c.currentTime + 0.01;
  note(c, t, { type: "triangle", f1: 1046, dur: 0.14, gain: 0.14 });
  note(c, t + 0.13, { type: "triangle", f1: 1318, dur: 0.3, gain: 0.14 });
  note(c, t + 0.13, { type: "square", f1: 659, dur: 0.18, gain: 0.03 });
}
