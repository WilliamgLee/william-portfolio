// The intro's soundtrack, generated live with the Web Audio API (no audio file).
// A short chiptune / lo-fi loop at 80 BPM: Am – F – C – G.
//
// Everything in the intro is timed in beats, so the visuals land on the music:
//   beat 0   "Hi."               (soft pad + arpeggio)
//   beat 2   avatar builds        (first kick)
//   beat 4   tagline, one part per beat  (hi-hats come in)
//   beat 6   riser
//   beat 8   DROP: pixel wipe + projects (full drums + bass)
//   every 4 beats after that: an accent as the next project bar starts
//   handoverBeat: one big hit, then the music fades out
//   (handoverBeat = 8 + the beats given to projects; see Intro.jsx)
//
// mode "dance" (the secret word) skips the build-up: the groove starts on beat 0
// and ends with the same big hit on handoverBeat.

export const BPM = 80;
export const BEAT = 60 / BPM; // 0.75 s

const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

// One chord per bar (4 beats), repeating: Am – F – C – G
const PROGRESSION = [
  [57, 60, 64], // Am
  [53, 57, 60], // F
  [48, 52, 55], // C
  [55, 59, 62], // G
];
const chordAt = (beat) => PROGRESSION[Math.floor(beat / 4) % PROGRESSION.length];
const BLIP_NOTES = [81, 84, 86, 88, 91]; // A minor pentatonic, for typing sounds

export function createIntroMusic({ handoverBeat = 20, mode = "intro" } = {}) {
  const H = handoverBeat;
  const intro = mode === "intro";
  const DROP = intro ? 8 : 0; // where drums and bass come in
  const AudioCtx = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
  if (!AudioCtx) return null;

  const ctx = new AudioCtx();
  const VOLUME = 0.75;
  const master = ctx.createGain();
  master.gain.value = 0;
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -14;
  compressor.ratio.value = 8;
  compressor.attack.value = 0.003;
  master.connect(compressor);
  compressor.connect(ctx.destination);

  // One second of white noise, reused by drums and effects.
  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  let t0 = 0;
  let muted = false;

  // ---- instruments ----

  function envelope(time, peak, attack, dur) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(peak, time + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    return g;
  }

  function tone(time, freq, dur, { type = "square", gain = 0.1, attack = 0.005, filter, detune = 0, slideTo } = {}) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, time + dur * 0.6);
    osc.detune.value = detune;
    const g = envelope(time, gain, attack, dur);
    let node = osc;
    if (filter) {
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = filter;
      osc.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(master);
    osc.start(time);
    osc.stop(time + dur + 0.05);
  }

  function noiseHit(time, dur, { gain = 0.2, type = "highpass", freq = 6000, q = 0.7 } = {}) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = envelope(time, gain, 0.002, dur);
    src.connect(f);
    f.connect(g);
    g.connect(master);
    src.start(time, Math.random() * 0.5);
    src.stop(time + dur + 0.05);
  }

  const kick = (t, gain = 0.9) => tone(t, 150, 0.32, { type: "sine", gain, slideTo: 42 });
  const snare = (t) => {
    noiseHit(t, 0.2, { gain: 0.32, type: "bandpass", freq: 1900, q: 0.8 });
    tone(t, 200, 0.1, { type: "triangle", gain: 0.18 });
  };
  const hat = (t, gain = 0.07) => noiseHit(t, 0.045, { gain, freq: 7500 });
  const crash = (t, gain = 0.22) => noiseHit(t, 1.8, { gain, freq: 4200 });

  function pad(t, chord, dur) {
    for (const n of chord) {
      for (const d of [-7, 7]) {
        tone(t, midi(n), dur, { type: "sawtooth", gain: 0.034, attack: 0.35, filter: 1300, detune: d });
      }
    }
  }

  function riser(start, end) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 2;
    f.frequency.setValueAtTime(300, start);
    f.frequency.exponentialRampToValueAtTime(7000, end);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.22, end - 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, end + 0.05);
    src.connect(f);
    f.connect(g);
    g.connect(master);
    src.start(start);
    src.stop(end + 0.1);
  }

  // ---- the arrangement ----

  function schedule() {
    const b = (beat) => t0 + beat * BEAT;
    const s16 = BEAT / 4;

    // Pads: one chord per bar, then the handover hit
    for (let bar = 0; bar * 4 < H; bar++) pad(b(bar * 4), chordAt(bar * 4), 4 * BEAT);
    pad(b(H), PROGRESSION[1], 3 * BEAT);

    // Arpeggio, 16th notes, brighter after the drop
    const pattern = [0, 1, 2, 1, 2, 0, 1, 2];
    for (let i = 0; i < H * 4; i++) {
      const beat = i / 4;
      const note = chordAt(beat)[pattern[i % pattern.length]] + 12;
      const after = beat >= DROP;
      tone(b(0) + i * s16, midi(note), s16 * 0.9, {
        type: "square",
        gain: after ? 0.035 : 0.03,
        filter: after ? 4200 : 1800,
      });
    }

    if (intro) {
      // Single kick when the avatar starts building
      kick(b(2), 0.55);
      // A tick on each tagline part (beats 4, 5, 6)
      for (const beat of [4, 5, 6]) tone(b(beat), midi(88), 0.12, { type: "square", gain: 0.05 });
      riser(b(6), b(8));
    }

    // Hi-hats on 8ths (from the tagline in the intro)
    for (let beat = intro ? 4 : 0; beat < H; beat += 0.5) hat(b(beat), beat % 1 ? 0.05 : 0.08);

    // The drop and the groove
    crash(b(DROP), 0.28);
    for (let beat = DROP; beat < H; beat++) {
      const inBar = beat % 4;
      if (inBar === 0 || inBar === 2) kick(b(beat));
      if (inBar === 1 || inBar === 3) snare(b(beat));
      if (inBar === 2) kick(b(beat + 0.75), 0.6); // little push into beat 4
    }

    // Bass: root note on 8ths
    for (let beat = DROP; beat < H; beat += 0.5) {
      tone(b(beat), midi(chordAt(beat)[0] - 24), BEAT * 0.45, { type: "square", gain: 0.09, filter: 700 });
    }

    // Accent at the start of every bar after the drop
    for (let beat = DROP + 4; beat < H; beat += 4) crash(b(beat), 0.14);

    // Handover: one big hit, then fade out
    kick(b(H), 1);
    crash(b(H), 0.3);
    tone(b(H), midi(33), 2 * BEAT, { type: "triangle", gain: 0.25 });
    master.gain.setValueAtTime(VOLUME, b(H + 1));
    master.gain.linearRampToValueAtTime(0, b(H + 4));
  }

  return {
    async start() {
      try {
        await ctx.resume();
      } catch (e) {}
      t0 = ctx.currentTime + 0.1;
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(muted ? 0 : VOLUME, t0 + 0.05);
      schedule();
    },
    // Seconds since beat 0, read from the audio clock so visuals stay on beat.
    now() {
      return ctx.currentTime - t0;
    },
    running() {
      return ctx.state === "running";
    },
    blip() {
      if (muted) return;
      const n = BLIP_NOTES[Math.floor(Math.random() * BLIP_NOTES.length)];
      tone(ctx.currentTime, midi(n), 0.035, { type: "square", gain: 0.018 });
    },
    setMuted(value) {
      muted = value;
      // A gain node can't go to 0 with setTargetAtTime abruptly; a quick glide is enough.
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(value ? 0 : VOLUME, ctx.currentTime, 0.05);
    },
    stop() {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.12);
      setTimeout(() => ctx.close().catch(() => {}), 800);
    },
  };
}
