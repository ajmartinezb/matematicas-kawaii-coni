// ==========================================================================
// KAWAII SOUND & CHILEAN VOICE ENGINE (es-CL Neural MP3 + Web Speech API) 🎵🇨🇱🌸
// ==========================================================================

const KawaiiSound = {
  enabled: true,
  voiceEnabled: true,
  ctx: null,
  currentAudio: null,

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  toggleSound() {
    this.enabled = !this.enabled;
    const btn = document.getElementById('toggle-sound-btn');
    if (btn) {
      btn.innerHTML = this.enabled ? '🔊 Voz Chilena Kawaii: ON' : '🔇 Sonido: OFF';
    }
    if (this.enabled) {
      this.playPop();
    } else {
      this.stopSpeaking();
    }
  },

  playTone(freq, type = 'sine', duration = 0.14, delay = 0, vol = 0.12) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + delay;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(vol, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);
    } catch (e) {
      // Ignore audio errors if blocked by browser autoplay policy
    }
  },

  playPop() {
    this.playTone(587.33, 'sine', 0.09, 0, 0.11); // D5
    this.playTone(880, 'triangle', 0.11, 0.05, 0.1); // A5
  },

  playCardPull() {
    this.playTone(523.25, 'sine', 0.1, 0, 0.1);   // C5
    this.playTone(659.25, 'sine', 0.1, 0.06, 0.1); // E5
    this.playTone(783.99, 'sine', 0.14, 0.12, 0.12); // G5
  },

  playSuccess() {
    this.playTone(523.25, 'triangle', 0.14, 0, 0.13);
    this.playTone(659.25, 'triangle', 0.14, 0.08, 0.13);
    this.playTone(783.99, 'triangle', 0.14, 0.16, 0.13);
    this.playTone(1046.50, 'sine', 0.32, 0.24, 0.15);
  },

  playWipAlert() {
    this.playTone(349.23, 'sawtooth', 0.14, 0, 0.08);
    this.playTone(311.13, 'sawtooth', 0.18, 0.12, 0.08);
  },

  playLevelUp() {
    const notes = [523.25, 587.33, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((n, idx) => {
      this.playTone(n, 'triangle', 0.18, idx * 0.07, 0.14);
    });
  },

  // Reproduce el archivo MP3 con voz neuronal chilena (es-CL-CatalinaNeural) o usa fallback es-CL
  playAudioOrSpeak(audioUrl, fallbackText, rate = 1.0, onEndCallback = null) {
    if (!this.enabled || !this.voiceEnabled) {
      if (onEndCallback) setTimeout(onEndCallback, 3200);
      return;
    }
    this.stopSpeaking();

    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        audio.playbackRate = rate;
        this.currentAudio = audio;
        audio.onended = () => {
          this.currentAudio = null;
          if (onEndCallback) onEndCallback();
        };
        audio.onerror = () => {
          this.currentAudio = null;
          this.speak(fallbackText, rate, onEndCallback);
        };
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            this.currentAudio = null;
            this.speak(fallbackText, rate, onEndCallback);
          });
        }
        return;
      } catch (e) {
        // Fallback to Web Speech API es-CL
      }
    }
    this.speak(fallbackText, rate, onEndCallback);
  },

  speak(text, rate = 1.0, onEndCallback = null) {
    if (!this.enabled || !this.voiceEnabled || !('speechSynthesis' in window)) {
      if (onEndCallback) setTimeout(onEndCallback, 3200);
      return;
    }
    try {
      this.stopSpeaking();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'es-CL'; // Español de Chile
      utter.rate = rate;
      utter.pitch = 1.12;

      const voices = window.speechSynthesis.getVoices();
      // Prioridad 1: Voz chilena (es-CL / Catalina / Lorenzo)
      // Prioridad 2: Voz latinoamericana (es-419, es-AR, es-MX, es-US, Sabina, Dalia, Paloma)
      const clVoice =
        voices.find(v => v.lang.toLowerCase().includes('es-cl') || v.name.toLowerCase().includes('catalina') || v.name.toLowerCase().includes('chile')) ||
        voices.find(v => ['es-419', 'es-ar', 'es-mx', 'es-co', 'es-pe', 'es-us'].some(code => v.lang.toLowerCase().includes(code))) ||
        voices.find(v => v.lang.startsWith('es'));

      if (clVoice) utter.voice = clVoice;

      if (onEndCallback) {
        utter.onend = () => onEndCallback();
        utter.onerror = () => onEndCallback();
      }
      window.speechSynthesis.speak(utter);
    } catch (e) {
      if (onEndCallback) setTimeout(onEndCallback, 3200);
    }
  },

  stopSpeaking() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
