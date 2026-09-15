// src/components/Soundscape.js — Velvet Hug Ambient Audio Engine
// Uses Web Audio API — must be triggered by user interaction (browser policy)

const SOUNDSCAPE_PRESETS = {
  rain: {
    label: 'Rain',
    generate(ctx) {
      const nodes = [];
      // White noise buffer
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.value = 1000;
      rainFilter.Q.value = 0.3;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.18;

      noise.connect(rainFilter);
      rainFilter.connect(gainNode);
      gainNode.connect(ctx.destination);
      noise.start();

      // Occasional thunder rumble (low frequency oscillation)
      const thunder = ctx.createOscillator();
      thunder.type = 'sine';
      thunder.frequency.value = 60;
      const tGain = ctx.createGain();
      tGain.gain.value = 0;
      thunder.connect(tGain);
      tGain.connect(ctx.destination);
      thunder.start();

      function scheduleThunder() {
        const delay = 8000 + Math.random() * 20000;
        setTimeout(() => {
          const now = ctx.currentTime;
          tGain.gain.setValueAtTime(0, now);
          tGain.gain.linearRampToValueAtTime(0.05, now + 0.5);
          tGain.gain.linearRampToValueAtTime(0, now + 3);
          scheduleThunder();
        }, delay);
      }
      scheduleThunder();

      nodes.push(noise, thunder);
      return { nodes, gainNodes: [gainNode, tGain] };
    }
  },

  ocean: {
    label: 'Ocean',
    generate(ctx) {
      const nodes = [];
      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const lowPass = ctx.createBiquadFilter();
      lowPass.type = 'lowpass';
      lowPass.frequency.value = 400;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.15;

      // LFO for wave rhythm
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.12; // wave every ~8 seconds
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.08;

      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      noise.connect(lowPass);
      lowPass.connect(gainNode);
      gainNode.connect(ctx.destination);
      noise.start();
      lfo.start();

      nodes.push(noise, lfo);
      return { nodes, gainNodes: [gainNode, lfoGain] };
    }
  },

  forest: {
    label: 'Forest',
    generate(ctx) {
      const nodes = [];
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.08;
      gainNode.connect(ctx.destination);

      // Wind
      const wBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const wd = wBuf.getChannelData(0);
      for (let i = 0; i < wd.length; i++) wd[i] = Math.random() * 2 - 1;
      const wind = ctx.createBufferSource();
      wind.buffer = wBuf;
      wind.loop = true;
      const wFilter = ctx.createBiquadFilter();
      wFilter.type = 'bandpass';
      wFilter.frequency.value = 200;
      wFilter.Q.value = 0.5;
      wind.connect(wFilter);
      wFilter.connect(gainNode);
      wind.start();

      // Birds — simple oscillator chirps
      function chirp() {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 1800 + Math.random() * 800;
        const g = ctx.createGain();
        g.gain.value = 0;
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start();
        const now = ctx.currentTime;
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.04, now + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.stop(now + 0.5);
        setTimeout(chirp, 1500 + Math.random() * 4000);
      }
      chirp();

      nodes.push(wind);
      return { nodes, gainNodes: [gainNode] };
    }
  },

  fireplace: {
    label: 'Fireplace',
    generate(ctx) {
      const nodes = [];
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 0.2;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.12;

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      noise.start();

      // Occasional crack
      function crack() {
        const crackBuf = ctx.createBuffer(1, 2048, ctx.sampleRate);
        const cd = crackBuf.getChannelData(0);
        for (let i = 0; i < cd.length; i++) cd[i] = (Math.random() * 2 - 1) * Math.exp(-i / 400);
        const src = ctx.createBufferSource();
        src.buffer = crackBuf;
        const cg = ctx.createGain();
        cg.gain.value = 0.6;
        src.connect(cg);
        cg.connect(ctx.destination);
        src.start();
        setTimeout(crack, 800 + Math.random() * 3000);
      }
      crack();

      nodes.push(noise);
      return { nodes, gainNodes: [gainNode] };
    }
  },

  breathing: {
    label: 'Breathe',
    generate(ctx) {
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0;
      gainNode.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 80;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 200;

      osc.connect(filter);
      filter.connect(gainNode);
      osc.start();

      // 4-7-8 breathing pattern
      function breathe() {
        const now = ctx.currentTime;
        // Inhale: 4 sec
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.06, now + 4);
        // Hold: 7 sec (stay audible softly)
        gainNode.gain.setValueAtTime(0.03, now + 4);
        gainNode.gain.setValueAtTime(0.03, now + 11);
        // Exhale: 8 sec
        gainNode.gain.linearRampToValueAtTime(0, now + 19);
        setTimeout(breathe, 22000);
      }
      breathe();

      return { nodes: [osc], gainNodes: [gainNode] };
    }
  }
};

class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.active = null;
    this.activeLabel = null;
    this.activeHandles = null;
    this._masterGain = null;
  }

  _initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this._masterGain = this.ctx.createGain();
      this._masterGain.gain.value = 1;
      this._masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  async play(presetKey) {
    this._initCtx();
    if (this.active === presetKey) {
      this.stop();
      return false;
    }
    this.stop();
    const preset = SOUNDSCAPE_PRESETS[presetKey];
    if (!preset) return false;
    this.activeHandles = preset.generate(this.ctx);
    this.active = presetKey;
    this.activeLabel = preset.label;
    return true;
  }

  stop() {
    if (this.activeHandles) {
      try {
        this.activeHandles.nodes.forEach(n => { try { n.stop(); } catch(e) {} });
        this.activeHandles.gainNodes.forEach(g => { try { g.gain.setValueAtTime(0, this.ctx.currentTime); } catch(e) {} });
      } catch(e) {}
      this.activeHandles = null;
    }
    this.active = null;
    this.activeLabel = null;
  }

  get isPlaying() { return !!this.active; }
  get currentPreset() { return this.active; }
  get presets() { return SOUNDSCAPE_PRESETS; }
}

export const soundEngine = new SoundscapeEngine();
export { SOUNDSCAPE_PRESETS };
