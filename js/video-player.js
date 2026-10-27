// ==========================================================================
// KAWAII INTERACTIVE VIDEO PLAYER ENGINE 🎬🌸
// Video-Tutorial Animado Paso a Paso con Voz Chilena y Subtítulos
// ==========================================================================

const KawaiiVideoPlayer = {
  currentChapter: 0,
  isPlaying: false,
  playbackRate: 1.0,
  timer: null,

  init() {
    this.renderChapterButtons();
    this.loadChapter(0, false);
  },

  renderChapterButtons() {
    const container = document.getElementById('video-chapters-list');
    if (!container) return;
    container.innerHTML = StudioData.videoChapters.map((ch, idx) => `
      <button class="chapter-chip ${idx === this.currentChapter ? 'active' : ''}"
              onclick="KawaiiVideoPlayer.selectChapter(${idx})">
        Cap. ${idx + 1}
      </button>
    `).join('');
  },

  selectChapter(idx) {
    KawaiiSound.playPop();
    this.pause();
    this.loadChapter(idx, true);
  },

  togglePlay() {
    KawaiiSound.playPop();
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },

  play() {
    this.isPlaying = true;
    this.updatePlayButtonUI();
    this.playCurrentChapterScene();
  },

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    KawaiiSound.stopSpeaking();
    this.updatePlayButtonUI();
  },

  restart() {
    KawaiiSound.playPop();
    this.pause();
    this.loadChapter(0, true);
  },

  changeSpeed(rate) {
    this.playbackRate = parseFloat(rate) || 1.0;
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  },

  updatePlayButtonUI() {
    const btn = document.getElementById('video-play-btn');
    const statusBadge = document.getElementById('video-status-badge');
    if (btn) {
      btn.innerHTML = this.isPlaying ? '⏸️ Pausar Video' : '▶️ Reproducir Video Kawaii';
    }
    if (statusBadge) {
      statusBadge.innerHTML = this.isPlaying ? '🔴 REPRODUCIENDO CON VOZ' : '✨ LISTO PARA REPRODUCIR';
    }
  },

  loadChapter(idx, autoPlay = false) {
    this.currentChapter = idx;
    const chapter = StudioData.videoChapters[idx];
    if (!chapter) return;

    this.renderChapterButtons();

    const titleEl = document.getElementById('video-chapter-title');
    const mascotEl = document.getElementById('video-mascot-badge');
    const subEl = document.getElementById('video-subtitle-text');
    const fillEl = document.getElementById('video-progress-fill');

    if (titleEl) titleEl.textContent = chapter.title;
    if (mascotEl) mascotEl.textContent = chapter.mascot;
    if (subEl) subEl.textContent = chapter.subtitle;
    if (fillEl) {
      const pct = ((idx + 1) / StudioData.videoChapters.length) * 100;
      fillEl.style.width = `${pct}%`;
    }

    this.renderSceneGraphic(chapter.sceneType);

    if (autoPlay) {
      this.play();
    }
  },

  playCurrentChapterScene() {
    const chapter = StudioData.videoChapters[this.currentChapter];
    if (!chapter) return;

    const advanceToNext = () => {
      if (!this.isPlaying) return;
      if (this.currentChapter < StudioData.videoChapters.length - 1) {
        KawaiiSound.playCardPull();
        this.loadChapter(this.currentChapter + 1, false);
        this.playCurrentChapterScene();
      } else {
        this.isPlaying = false;
        this.updatePlayButtonUI();
        KawaiiSound.playSuccess();
        if (window.StudioApp) {
          window.StudioApp.addXP(15, "¡Viste el Video-Estudio Kawaii completo!");
        }
      }
    };

    if (KawaiiSound.enabled && KawaiiSound.voiceEnabled) {
      KawaiiSound.playAudioOrSpeak(chapter.audioFile, chapter.narration, this.playbackRate, () => {
        if (this.isPlaying) {
          this.timer = setTimeout(advanceToNext, 900);
        }
      });
    } else {
      const waitTime = Math.round(chapter.durationMs / this.playbackRate);
      this.timer = setTimeout(advanceToNext, waitTime);
    }
  },

  renderSceneGraphic(sceneType) {
    const stage = document.getElementById('video-scene-canvas');
    if (!stage) return;

    if (sceneType === 'muri_jam') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="display:inline-block; background:#FFD6D6; border:3px solid #FF6B6B; border-radius:20px; padding:12px 22px; margin-bottom:14px; font-family:'Fredoka',sans-serif; color:#9E1B32; font-size:1.15rem;">
            🚨 ¡ALERTA MURI (Sobrecarga Mental)! 7 dígitos intentando entrar a la vez:
          </div>
          <div style="display:flex; justify-content:center; align-items:center; gap:8px; flex-wrap:wrap; margin:10px 0;">
            ${['1','5','7','0','0','0','0'].map(d => `
              <div style="width:52px; height:58px; background:#FFF; border:3px solid #FF6B6B; border-radius:14px; display:flex; align-items:center; justify-content:center; font-family:'Fredoka',sans-serif; font-size:1.6rem; color:#D9383A; box-shadow:0 4px 0 #FF9E9E;">
                ${d}
              </div>
            `).join('')}
            <div style="font-family:'Fredoka',sans-serif; font-size:1.8rem; color:#4A3548; padding:0 8px;">× 2 = 😵‍💫❓</div>
          </div>
          <p style="font-weight:700; color:#7A4968; margin-top:10px;">
            Cuando todos los autos de números entran juntos a la autopista mental, ¡se arma un taco y nadie avanza!
          </p>
        </div>
      `;
    } else if (sceneType === 'cards_split') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="font-family:'Fredoka',sans-serif; color:#D83A7C; font-size:1.15rem; margin-bottom:12px;">
            ✨ Poder Kanban 1 y 2: Visualizar en Fichas de Colores + Límite WIP = 1
          </div>
          <div style="display:flex; justify-content:center; gap:14px; flex-wrap:wrap;">
            <div class="kawaii-ticket ticket-millions" style="min-width:165px;">
              <div class="ticket-top-bar"><span>🍓 MILLONES</span><span>Ficha #1</span></div>
              <div class="ticket-number">1.000.000</div>
              <div class="ticket-subtext">1 millón</div>
            </div>
            <div class="kawaii-ticket ticket-hundred-k" style="min-width:165px;">
              <div class="ticket-top-bar"><span>🍋 CENT. MIL</span><span>Ficha #2</span></div>
              <div class="ticket-number">500.000</div>
              <div class="ticket-subtext">Medio millón</div>
            </div>
            <div class="kawaii-ticket ticket-ten-k" style="min-width:165px;">
              <div class="ticket-top-bar"><span>🌿 DEC. MIL</span><span>Ficha #3</span></div>
              <div class="ticket-number">70.000</div>
              <div class="ticket-subtext">Setenta mil</div>
            </div>
          </div>
          <div style="margin-top:14px; display:inline-block; background:#FFF3B0; border:2px solid #F4B942; border-radius:999px; padding:6px 18px; font-weight:800; color:#7A5200;">
            🚦 Regla Kanban: ¡Solo multiplicamos 1 ficha a la vez! («Deja de empezar y empieza a terminar»)
          </div>
        </div>
      `;
    } else if (sceneType === 'parking_lot') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="font-family:'Fredoka',sans-serif; color:#0D4F6C; font-size:1.15rem; margin-bottom:12px;">
            🅿️ Estacionamiento Mágico: El Parking Lot de Ceros
          </div>
          <div style="display:flex; justify-content:center; align-items:center; gap:18px; flex-wrap:wrap;">
            <div style="background:#FFF; border:3px solid #FF85B3; border-radius:20px; padding:16px 24px; box-shadow:0 5px 0 #FFB3D1;">
              <div style="font-size:0.82rem; font-weight:800; color:#826A80;">NÚMERO ACTIVO</div>
              <div style="font-family:'Fredoka',sans-serif; font-size:2rem; color:#E0487D;">157 × 2</div>
              <div style="font-size:0.85rem; font-weight:700; color:#4A3548;">(150 × 2 = 300) + (7 × 2 = 14) = <strong>314</strong></div>
            </div>
            <div style="font-size:2rem;">➕</div>
            <div class="kawaii-ticket ticket-zeros" style="min-width:210px;">
              <div class="ticket-top-bar"><span>🅿️ PARKING LOT</span><span>Ceros</span></div>
              <div class="ticket-number">.0.000 (4 ceros)</div>
              <div class="ticket-subtext">¡Descansando sin estorbar! ☁️</div>
            </div>
          </div>
        </div>
      `;
    } else if (sceneType === 'pull_flow') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="font-family:'Fredoka',sans-serif; color:#5A2E98; font-size:1.1rem; margin-bottom:12px;">
            ⚡ Flujo Pull en Acción (Límite WIP = 1 ficha por turno):
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(195px, 1fr)); gap:12px;">
            <div style="background:#FFD6E8; border:3px solid #FF7EB3; border-radius:16px; padding:12px;">
              <div style="font-weight:800; color:#8A1C4A;">1️⃣ Turno Ficha Rosa</div>
              <div style="font-family:'Fredoka',sans-serif; font-size:1.25rem; color:#8A1C4A; margin:6px 0;">1.000.000 × 2</div>
              <div style="background:#FFF; border-radius:10px; padding:4px 8px; font-weight:800; color:#E0487D;">= 2.000.000 ✅</div>
            </div>
            <div style="background:#FFF3B0; border:3px solid #F4B942; border-radius:16px; padding:12px;">
              <div style="font-weight:800; color:#7A5200;">2️⃣ Turno Ficha Amarilla</div>
              <div style="font-family:'Fredoka',sans-serif; font-size:1.25rem; color:#7A5200; margin:6px 0;">500.000 × 2</div>
              <div style="background:#FFF; border-radius:10px; padding:4px 8px; font-weight:800; color:#B27800;">= 1.000.000 ✅</div>
            </div>
            <div style="background:#C1F7DC; border:3px solid #4CC98A; border-radius:16px; padding:12px;">
              <div style="font-weight:800; color:#0F5C35;">3️⃣ Turno Ficha Menta</div>
              <div style="font-family:'Fredoka',sans-serif; font-size:1.25rem; color:#0F5C35; margin:6px 0;">70.000 × 2</div>
              <div style="background:#FFF; border-radius:10px; padding:4px 8px; font-weight:800; color:#1E824C;">= 140.000 ✅</div>
            </div>
          </div>
        </div>
      `;
    } else if (sceneType === 'final_merge') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="background:linear-gradient(135deg,#FFF3B0,#FFD6E8,#C1F7DC); border:4px solid #FF6B9E; border-radius:24px; padding:20px; box-shadow:0 6px 0 #E0487D;">
            <div style="font-size:0.9rem; font-weight:800; color:#8A1C4A;">🌸 MERGE FINAL (Juntar los Resultados) 🌸</div>
            <div style="font-family:'Fredoka',sans-serif; font-size:1.35rem; color:#4A3548; margin:8px 0;">
              <span style="background:#FFD6E8; padding:3px 10px; border-radius:8px;">2.000.000</span> +
              <span style="background:#FFF3B0; padding:3px 10px; border-radius:8px;">1.000.000</span> +
              <span style="background:#C1F7DC; padding:3px 10px; border-radius:8px;">140.000</span>
            </div>
            <div style="font-family:'Fredoka',sans-serif; font-size:2.4rem; color:#E0487D; font-weight:700; margin-top:6px;">
              = 3.140.000 🎉✨
            </div>
            <p style="font-weight:800; color:#4A3548; margin-top:6px;">
              ¡Tres millones ciento cuarenta mil! ¡Calculado 100% en la mente con Kanban!
            </p>
          </div>
        </div>
      `;
    } else if (sceneType === 'shop_muri') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="display:inline-block; background:#FFD6D6; border:3px solid #FF6B6B; border-radius:20px; padding:10px 20px; margin-bottom:12px; font-family:'Fredoka',sans-serif; color:#9E1B32; font-size:1.1rem;">
            🚨 ¡MURI EN LA FILA DEL KIOSCO! Intentar cobrar y restar el vuelto al mismo tiempo:
          </div>
          <div style="display:flex; justify-content:center; align-items:center; gap:12px; flex-wrap:wrap; margin:8px 0;">
            <div class="kawaii-ticket ticket-millions">🧃 7 jugos × $400</div>
            <div style="font-family:'Fredoka',sans-serif; font-size:1.4rem;">➕</div>
            <div class="kawaii-ticket ticket-hundred-k">💵 Pagan con $5.000</div>
            <div style="font-family:'Fredoka',sans-serif; font-size:1.4rem;">➡️ 😵‍💫 ¿Cuánto doy de vuelto?</div>
          </div>
          <div style="margin-top:12px; display:inline-block; background:#E6FAF5; border:2px solid #4CC98A; border-radius:999px; padding:6px 18px; font-weight:800; color:#0F5C35;">
            🟢 Solución Kanban WIP = 1: Paso 1 = Calcular Total ($2.800) | Paso 2 = Puente del Vuelto ($2.200)
          </div>
        </div>
      `;
    } else if (sceneType === 'tables_split') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="font-family:'Fredoka',sans-serif; color:#D83A7C; font-size:1.15rem; margin-bottom:12px;">
            ✨ Técnica Split & Merge para las Tablas Grandes (7, 9 y 12)
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:12px;">
            <div class="kawaii-ticket ticket-millions">
              <div class="ticket-top-bar"><span>🍩 TABLA DEL 12</span><span>Docena</span></div>
              <div class="ticket-number">(×10) + (×2)</div>
              <div class="ticket-subtext">12×4 = 40 + 8 = <strong>48</strong></div>
            </div>
            <div class="kawaii-ticket ticket-hundred-k">
              <div class="ticket-top-bar"><span>🎈 TABLA DEL 9</span><span>Oferta</span></div>
              <div class="ticket-number">(×10) − (×1)</div>
              <div class="ticket-subtext">9×6 = 60 − 6 = <strong>54</strong></div>
            </div>
            <div class="kawaii-ticket ticket-ten-k">
              <div class="ticket-top-bar"><span>🌈 TABLA DEL 7</span><span>Semana</span></div>
              <div class="ticket-number">(×5) + (×2)</div>
              <div class="ticket-subtext">7×8 = 40 + 16 = <strong>56</strong></div>
            </div>
          </div>
        </div>
      `;
    } else if (sceneType === 'price_parking') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="font-family:'Fredoka',sans-serif; color:#0D4F6C; font-size:1.15rem; margin-bottom:12px;">
            🅿️ Parking Lot de Ceros en Precios Chilenos (6 pastelitos × $800)
          </div>
          <div style="display:flex; justify-content:center; align-items:center; gap:16px; flex-wrap:wrap;">
            <div style="background:#FFF; border:3px solid #FF85B3; border-radius:20px; padding:14px 22px;">
              <div style="font-size:0.8rem; font-weight:800; color:#826A80;">TABLA DEL 6</div>
              <div style="font-family:'Fredoka',sans-serif; font-size:1.9rem; color:#E0487D;">6 × 8 = 48</div>
            </div>
            <div style="font-size:1.8rem;">➕</div>
            <div class="kawaii-ticket ticket-zeros">
              <div class="ticket-top-bar"><span>🅿️ PARKING LOT</span><span>Cientos</span></div>
              <div class="ticket-number">00 (2 ceros)</div>
            </div>
            <div style="font-size:1.8rem;">➡️</div>
            <div style="background:#C1F7DC; border:3px solid #2E9F65; border-radius:20px; padding:14px 22px; font-family:'Fredoka',sans-serif; font-size:1.9rem; color:#0B4F2C;">
              $4.800 ✅
            </div>
          </div>
        </div>
      `;
    } else if (sceneType === 'change_bridge') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="font-family:'Fredoka',sans-serif; color:#5A2E98; font-size:1.15rem; margin-bottom:12px;">
            🌉 El Puente del Vuelto: Cobras $3.600 y te pagan con $5.000
          </div>
          <div class="change-hop-bridge">
            <span class="kawaii-ticket ticket-millions" style="padding:8px 14px;">🧾 Cuenta: $3.600</span>
            <span class="hop-step-pill">➕ $400 ➡️ llegas a $4.000</span>
            <span class="hop-step-pill">➕ $1.000 ➡️ llegas a $5.000</span>
            <span style="font-family:'Fredoka',sans-serif; font-size:1.35rem; color:#0F5C35; background:#FFF3B0; padding:8px 16px; border-radius:14px; border:2px solid #F4B942;">
              🎉 Vuelto = $1.400
            </span>
          </div>
        </div>
      `;
    } else if (sceneType === 'full_sale') {
      stage.innerHTML = `
        <div style="text-align:center; width:100%;">
          <div style="background:linear-gradient(135deg,#FFF3B0,#FFD6E8,#C1F7DC); border:4px solid #FF6B9E; border-radius:24px; padding:18px; box-shadow:0 6px 0 #E0487D;">
            <div style="font-size:0.9rem; font-weight:800; color:#8A1C4A;">🛍️ VENTA ESTRELLA EN LA TIENDITA KAWAII 🛍️</div>
            <div style="font-family:'Fredoka',sans-serif; font-size:1.25rem; color:#4A3548; margin:8px 0;">
              🥚 <strong>12 huevos × $300</strong> = ($3.000 + $600) = <strong>$3.600</strong>
            </div>
            <div style="font-family:'Fredoka',sans-serif; font-size:1.55rem; color:#E0487D; font-weight:700; margin-top:6px;">
              💵 Pagan con $5.000 ➡️ Vuelto: +$400 + $1.000 = <strong>$1.400</strong> 🎉✨
            </div>
          </div>
        </div>
      `;
    }
  }
};
