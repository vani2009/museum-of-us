// Web Audio API Synthesizer for Romantic Museum Ambient Soundtrack

class MuseumAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.35;
    this.timer = null;
    this.masterGain = null;
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  playNote(freq, time, duration, type = 'sine', gainVal = 0.2) {
    if (!this.ctx || !this.isPlaying) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    // Warm low-pass filter for cozy museum acoustics
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.Q.setValueAtTime(1.5, time);

    // Envelope (soft pluck and warm sustain)
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(gainVal, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Harmonic chord progression in D Major / B Minor (Dreamy, romantic, nostalgic)
  playChordArpeggio(notes, startTime, baseDuration = 0.3) {
    notes.forEach((freq, idx) => {
      const noteTime = startTime + idx * baseDuration;
      // Acoustic guitar/harp harmonic blend
      this.playNote(freq, noteTime, 2.4, 'triangle', 0.18);
      this.playNote(freq * 2, noteTime, 1.2, 'sine', 0.06);
    });
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Frequencies (Hz)
    const D3 = 146.83, Fs3 = 185.00, A3 = 220.00, D4 = 293.66, Fs4 = 369.99, A4 = 440.00;
    const B2 = 123.47, D3_ = 146.83, Fs3_ = 185.00, B3 = 246.94, D4_ = 293.66;
    const G2 = 98.00, B2_ = 123.47, D3__ = 146.83, G3 = 196.00, B3_ = 246.94, D4__ = 293.66;
    const A2 = 110.00, Cs3 = 138.59, E3 = 164.81, A3_ = 220.00, Cs4 = 277.18, E4 = 329.63;

    const progression = [
      [D3, A3, D4, Fs4, A4, Fs4, D4, A3],     // D Major
      [B2, Fs3_, B3, D4_, Fs4, D4_, B3, Fs3_], // B Minor
      [G2, D3__, G3, B3_, D4__, B3_, G3, D3__], // G Major
      [A2, E3, A3_, Cs4, E4, Cs4, A3_, E3],   // A Major
    ];

    let chordIdx = 0;
    const playLoop = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime + 0.05;
      const currentChord = progression[chordIdx];
      this.playChordArpeggio(currentChord, now, 0.35);

      chordIdx = (chordIdx + 1) % progression.length;
      this.timer = setTimeout(playLoop, 2800);
    };

    playLoop();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const museumAudio = new MuseumAudioEngine();
