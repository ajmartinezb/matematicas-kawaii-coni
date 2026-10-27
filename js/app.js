// ==========================================================================
// CONTROLADOR PRINCIPAL DEL ESTUDIO KAWAII KANBAN 🌸✨
// Para Niños y Jóvenes • Español de Chile 🇨🇱
// ==========================================================================

const StudioApp = {
  state: {
    xp: 20,
    solvedCount: 0,
    streak: 0,
    leadTimes: [12, 9, 7],
    reflections: [
      "¡Separar 1.500.000 y 70.000 hace que 1.570.000 × 2 salga al tiro!"
    ]
  },

  quizState: {
    mode: 'mode1',
    index: 0,
    score: 0,
    questionStartTime: 0,
    answered: false
  },

  init() {
    this.loadSavedState();
    this.updateHeaderAndKMMUI();
    this.renderKanBahnMode('kanbahn');
    this.renderStarStrategy(1);
    this.renderGuidedExamples();
    this.selectQuizMode('mode1', false);
    this.renderLeadTimeChart();
    this.renderReflections();
    this.setupNavigationLinks();

    KawaiiVideoPlayer.init();
    KawaiiKanbanBoard.init();
  },

  loadSavedState() {
    try {
      const saved = localStorage.getItem('kawaii_kanban_millones_state_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      // Ignore storage errors
    }
  },

  saveState() {
    try {
      localStorage.setItem('kawaii_kanban_millones_state_v1', JSON.stringify(this.state));
    } catch (e) {
      // Ignore storage errors
    }
  },

  addXP(amount, reasonText = '') {
    const oldLevel = this.getCurrentKMMLevel().level;
    this.state.xp += amount;
    this.saveState();
    const newLevelObj = this.getCurrentKMMLevel();

    this.updateHeaderAndKMMUI();

    if (newLevelObj.level !== oldLevel) {
      KawaiiSound.playLevelUp();
      this.launchConfetti();
      this.showToast(`🎉 ¡SUBISTE DE RANGO KAWAII! Ahora eres ${newLevelObj.level}: ${newLevelObj.name}`);
    } else if (reasonText) {
      this.showToast(`✨ +${amount} XP Kawaii: ${reasonText}`);
    }
  },

  getCurrentKMMLevel() {
    let current = StudioData.kmmLevels[0];
    for (const lvl of StudioData.kmmLevels) {
      if (this.state.xp >= lvl.xpRequired) {
        current = lvl;
      }
    }
    return current;
  },

  updateHeaderAndKMMUI() {
    const xpEl = document.getElementById('header-xp-val');
    const solvedEl = document.getElementById('header-solved-val');
    const streakEl = document.getElementById('header-streak-val');
    const kmmHeaderEl = document.getElementById('header-kmm-val');

    const currentLvl = this.getCurrentKMMLevel();

    if (xpEl) xpEl.textContent = `${this.state.xp} XP`;
    if (solvedEl) solvedEl.textContent = `${this.state.solvedCount}`;
    if (streakEl) streakEl.textContent = `${this.state.streak}🔥`;
    if (kmmHeaderEl) kmmHeaderEl.textContent = `${currentLvl.level}: ${currentLvl.name.split('•')[1] || currentLvl.name}`;

    // Renderizar escalera de niveles en #progreso-kmm
    const ladderEl = document.getElementById('kmm-levels-grid');
    if (ladderEl) {
      ladderEl.innerHTML = StudioData.kmmLevels.map(lvl => {
        const unlocked = this.state.xp >= lvl.xpRequired;
        const isCurrent = lvl.level === currentLvl.level;
        return `
          <div class="kmm-level-card ${unlocked ? 'unlocked' : ''} ${isCurrent ? 'current-level' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span class="section-badge" style="margin:0;">${lvl.level}</span>
              <span style="font-size:0.78rem; font-weight:800; color:${unlocked ? '#2E9F65' : '#826A80'};">
                ${unlocked ? '✅ Desbloqueado' : `🔒 Requiere ${lvl.xpRequired} XP`}
              </span>
            </div>
            <h4 style="color:var(--pink-dark); font-size:1.05rem; margin-bottom:4px;">${lvl.name}</h4>
            <div style="font-size:0.76rem; font-weight:800; color:#6C43A3; margin-bottom:6px;">
              💎 Superpoder: ${lvl.value}
            </div>
            <p style="font-size:0.84rem; color:var(--text-main);">${lvl.desc}</p>
          </div>
        `;
      }).join('');
    }

    // Actualizar métricas Kanban (Tiempo promedio, Retos resueltos)
    const avgLtEl = document.getElementById('metric-avg-leadtime');
    const deliveryEl = document.getElementById('metric-delivery-rate');
    if (avgLtEl && this.state.leadTimes.length > 0) {
      const avg = (this.state.leadTimes.reduce((a, b) => a + b, 0) / this.state.leadTimes.length).toFixed(1);
      avgLtEl.textContent = `${avg} seg`;
    }
    if (deliveryEl) {
      deliveryEl.textContent = `${this.state.solvedCount} retos`;
    }
  },

  // ------------------------------------------------------------------------
  // SIMULADOR INTERACTIVO DE LA AUTOPISTA KAN-BAHN
  // ------------------------------------------------------------------------
  renderKanBahnMode(mode) {
    const container = document.getElementById('kanbahn-Interactive-view');
    const btnJam = document.getElementById('btn-kanbahn-jam');
    const btnFlow = document.getElementById('btn-kanbahn-flow');
    if (!container) return;

    if (btnJam && btnFlow) {
      btnJam.classList.toggle('active', mode === 'jam');
      btnFlow.classList.toggle('active', mode === 'kanbahn');
    }

    if (mode === 'jam') {
      container.innerHTML = `
        <div class="kanbahn-road" style="border-color:#FF6B6B;">
          <div style="color:#FFD166; font-family:'Fredoka',sans-serif; margin-bottom:8px;">
            🚨 MODO SIN KANBAN (100% Lleno = ¡Taco Total en la Mente!):
          </div>
          <div class="road-lane">
            <span class="traffic-light-badge">🔴 Semáforo Roto (Sin Límite WIP)</span>
            <span class="kawaii-car" style="background:#FFD6E8; color:#8A1C4A;">🚗 1 × 2</span>
            <span class="kawaii-car" style="background:#FFF3B0; color:#7A5200;">🚕 5 × 2 (¡Reserva!)</span>
            <span class="kawaii-car" style="background:#C1F7DC; color:#0F5C35;">🚙 7 × 2 (¡Otra reserva!)</span>
            <span class="kawaii-car" style="background:#D0EFFF; color:#0D4F6C;">🚌 0 × 2</span>
            <span class="kawaii-car" style="background:#D0EFFF; color:#0D4F6C;">🚌 000 × 2</span>
            <span style="color:#FFF; font-weight:800;">💥 ¡Bocinazos mentales! Nadie avanza</span>
          </div>
        </div>
        <p style="font-size:0.9rem; font-weight:700; color:#9E1B32;">
          💡 <strong>¿Por qué pasa esto?:</strong> Cuando la autopista de tu mente se llena al 100% con los 7 dígitos al mismo tiempo, se arma un taco gigante y nos quedamos en blanco.
        </p>
      `;
    } else {
      container.innerHTML = `
        <div class="kanbahn-road" style="border-color:#4ECDC4;">
          <div style="color:#C1F7DC; font-family:'Fredoka',sans-serif; margin-bottom:8px;">
            ✨ MODO KAN-BAHN KAWAII (Límite WIP = 1 + Señales Pull + Parking Lot):
          </div>
          <div class="road-lane">
            <span class="traffic-light-badge">🟢 Semáforo WIP = 1</span>
            <span class="kawaii-car" style="background:#FFD6E8; color:#8A1C4A;">🍓 1.500.000 × 2 ➡️ 3.000.000 ✅</span>
            <span style="color:#FFF; font-weight:800;">⬅️ Señal Pull</span>
            <span class="kawaii-car" style="background:#C1F7DC; color:#0F5C35;">🌿 70.000 × 2 ➡️ 140.000 ✅</span>
            <span style="color:#FFF3B0; font-family:'Fredoka',sans-serif; font-size:1.1rem;">🏁 Meta: 3.140.000</span>
          </div>
        </div>
        <p style="font-size:0.9rem; font-weight:700; color:#0F5C35;">
          💡 <strong>El Secreto Kanban:</strong> El semáforo de entrada deja pasar solo <strong>1 ficha a la vez</strong>. Primero multiplicas <code>1.500.000 × 2 = 3.000.000</code>, luego <code>70.000 × 2 = 140.000</code>, y llegas a la meta en 3 segundos: <strong>3.140.000</strong>.
        </p>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // 3 ESTRATEGIAS KAWAII PARA EL CASO ESTRELLA: 1.570.000 × 2 (#caso-estrella)
  // ------------------------------------------------------------------------
  renderStarStrategy(num) {
    KawaiiSound.playPop();
    const container = document.getElementById('star-strategy-content');
    if (!container) return;

    [1, 2, 3].forEach(i => {
      const btn = document.getElementById(`strat-btn-${i}`);
      if (btn) btn.classList.toggle('active', i === num);
    });

    if (num === 1) {
      container.innerHTML = `
        <h4 style="color:var(--pink-dark); font-size:1.2rem; margin-bottom:8px;">
          🌸 Estrategia 1: 3 Fichas de Colores por Valor Posicional (Separar y Juntar)
        </h4>
        <p style="font-weight:700; color:var(--text-muted); margin-bottom:14px;">
          Dividimos <strong>1.570.000</strong> en tres fichas según el color de cada posición, las duplicamos una por una (WIP=1) y las juntamos al final:
        </p>
        <div class="Star-flow-grid">
          <div class="kawaii-ticket ticket-millions">
            <div class="ticket-top-bar"><span>🍓 FICHA #1</span><span>Millones</span></div>
            <div class="ticket-number">1.000.000 × 2</div>
            <div class="ticket-subtext">Resultado: <strong>2.000.000</strong> (2 millones)</div>
          </div>
          <div class="kawaii-ticket ticket-hundred-k">
            <div class="ticket-top-bar"><span>🍋 FICHA #2</span><span>Cent. de Mil</span></div>
            <div class="ticket-number">500.000 × 2</div>
            <div class="ticket-subtext">Resultado: <strong>1.000.000</strong> (¡Otro millón!)</div>
          </div>
          <div class="kawaii-ticket ticket-ten-k">
            <div class="ticket-top-bar"><span>🌿 FICHA #3</span><span>Dec. de Mil</span></div>
            <div class="ticket-number">70.000 × 2</div>
            <div class="ticket-subtext">Resultado: <strong>140.000</strong> (140 mil)</div>
          </div>
        </div>
        <div class="merge-result-banner">
          <div>✨ <strong>MERGE FINAL EN TU MENTE:</strong></div>
          <div class="merge-equation">2.000.000 + 1.000.000 = 3.000.000 ➡️ + 140.000 = <strong>3.140.000</strong></div>
        </div>
      `;
    } else if (num === 2) {
      container.innerHTML = `
        <h4 style="color:#0D4F6C; font-size:1.2rem; margin-bottom:8px;">
          🅿️ Estrategia 2: El Parking Lot de los 4 Ceros (Estacionamiento de Ceros)
        </h4>
        <p style="font-weight:700; color:var(--text-muted); margin-bottom:14px;">
          ¿Te marean tantos ceros? ¡Estaciónalos en el Parking Lot y multiplica solo <strong>157 × 2</strong>!
        </p>
        <div class="Star-flow-grid">
          <div class="kawaii-ticket ticket-zeros">
            <div class="ticket-top-bar"><span>🅿️ PASO 1: ESTACIONAR</span><span>Ceros</span></div>
            <div class="ticket-number">Guardamos 0.000</div>
            <div class="ticket-subtext">Los 4 ceros esperan tranquilos</div>
          </div>
          <div class="kawaii-ticket ticket-hundred-k">
            <div class="ticket-top-bar"><span>⚡ PASO 2: DUPLICAR 157</span><span>WIP=1</span></div>
            <div class="ticket-number">150×2=300 y 7×2=14</div>
            <div class="ticket-subtext">300 + 14 = <strong>314</strong></div>
          </div>
          <div class="kawaii-ticket ticket-millions">
            <div class="ticket-top-bar"><span>🎉 PASO 3: DEVOLVER CEROS</span><span>Merge</span></div>
            <div class="ticket-number">314 + 0.000</div>
            <div class="ticket-subtext">Resultado: <strong>3.140.000</strong></div>
          </div>
        </div>
        <div class="merge-result-banner">
          <div>✨ <strong>TRUCO DEL PARKING LOT:</strong></div>
          <div class="merge-equation">157 × 2 = 314 ➡️ Devuelve los 4 ceros = <strong>3.140.000</strong></div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <h4 style="color:#0F5C35; font-size:1.2rem; margin-bottom:8px;">
          💰 Estrategia 3: El Truco de «Un Millón y Medio» (2 Fichas Ultra-Rápidas)
        </h4>
        <p style="font-weight:700; color:var(--text-muted); margin-bottom:14px;">
          Empieza con lo que ya sabes: <strong>1 millón y medio × 2 son 3 millones</strong>. ¡Solo falta agregar los 70 mil!
        </p>
        <div class="Star-flow-grid">
          <div class="kawaii-ticket ticket-millions">
            <div class="ticket-top-bar"><span>🍓 FICHA GRANDE</span><span>1,5 Millones</span></div>
            <div class="ticket-number">1.500.000 × 2</div>
            <div class="ticket-subtext">1 millón y medio × 2 = <strong>3.000.000</strong></div>
          </div>
          <div class="kawaii-ticket ticket-ten-k">
            <div class="ticket-top-bar"><span>🌿 FICHA PEQUEÑA</span><span>70 Mil</span></div>
            <div class="ticket-number">70.000 × 2</div>
            <div class="ticket-subtext">70 mil × 2 = <strong>140.000</strong></div>
          </div>
        </div>
        <div class="merge-result-banner">
          <div>✨ <strong>EL ATAJO FAVORITO EN 2 SEGUNDOS:</strong></div>
          <div class="merge-equation">3.000.000 + 140.000 = <strong>3.140.000</strong></div>
        </div>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // GALERÍA DE EJEMPLOS GUIADOS (#ejemplos)
  // ------------------------------------------------------------------------
  renderGuidedExamples() {
    const grid = document.getElementById('guided-examples-grid');
    if (!grid) return;

    grid.innerHTML = StudioData.guidedExamples.map(ex => `
      <div class="example-card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <span class="example-difficulty">${ex.difficulty}</span>
          <span style="font-size:0.75rem; font-weight:800; color:#6C43A3;">${ex.kmmPractice}</span>
        </div>
        <h4 style="font-size:1.15rem; color:var(--text-main);">${ex.title}</h4>
        <div style="background:#FFF; border:2px solid #FFB3D1; border-radius:14px; padding:10px 14px; text-align:center;">
          <div style="font-family:'Fredoka',sans-serif; font-size:1.45rem; color:var(--pink-dark);">
            ${ex.formattedProblem} = <span style="color:#1E824C;">${ex.formattedResult}</span>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${ex.cards.map(c => `
            <div class="kawaii-ticket ${c.colorClass}" style="padding:8px 12px; border-radius:12px;">
              <div style="display:flex; justify-content:space-between; font-size:0.84rem;">
                <span>${c.label}: <strong>${c.calc}</strong></span>
                <span>➡️ <strong>${c.result}</strong></span>
              </div>
            </div>
          `).join('')}
        </div>
        <p style="font-size:0.84rem; font-weight:700; color:var(--text-muted); background:#FFFDF2; padding:8px 10px; border-radius:10px; border:1.5px dashed #F4B942;">
          💡 <strong>Tip Kawaii:</strong> ${ex.mentalShortcut}
        </p>
        <div style="display:flex; gap:8px; margin-top:auto; flex-wrap:wrap;">
          <a href="#tablero-kanban" class="btn-kawaii btn-sm" style="flex:1;"
             onclick="KawaiiKanbanBoard.loadPreset(${ex.number}, ${ex.multiplier})">
            🗂️ Abrir en Tablero
          </a>
          <button class="btn-kawaii btn-yellow btn-sm"
                  onclick="KawaiiSound.playAudioOrSpeak('${ex.audioFile || ''}', '${ex.title}. ${ex.formattedProblem}. ${ex.mentalShortcut}')">
            🔊 Escuchar (Voz Chilena 🇨🇱)
          </button>
        </div>
      </div>
    `).join('');
  },

  // ------------------------------------------------------------------------
  // LABORATORIO DE PRUEBAS Y QUIZZES (4 MODOS - #pruebas)
  // ------------------------------------------------------------------------
  selectQuizMode(modeKey, playSnd = true) {
    if (playSnd) KawaiiSound.playPop();
    this.quizState.mode = modeKey;
    this.quizState.index = 0;
    this.quizState.score = 0;
    this.quizState.answered = false;
    this.quizState.questionStartTime = Date.now();

    ['mode1', 'mode2', 'mode3', 'mode4'].forEach(m => {
      const btn = document.getElementById(`quiz-mode-btn-${m}`);
      if (btn) btn.classList.toggle('active', m === modeKey);
    });

    this.renderCurrentQuestion();
  },

  renderCurrentQuestion() {
    const arena = document.getElementById('quiz-arena-container');
    if (!arena) return;

    const list = StudioData.quizzes[this.quizState.mode] || [];
    if (this.quizState.index >= list.length) {
      this.renderQuizCompletion(list.length);
      return;
    }

    const item = list[this.quizState.index];
    this.quizState.answered = false;
    this.quizState.questionStartTime = Date.now();

    const cardsPreviewHTML = item.cardsPreview
      ? `<div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-bottom:14px;">
          ${item.cardsPreview.map(cp => `
            <span style="background:#FFF; border:2px solid #FF9EBF; border-radius:12px; padding:6px 12px; font-family:'Fredoka',sans-serif; font-size:0.95rem; color:#8A1C4A;">
              ${cp}
            </span>
          `).join('')}
        </div>`
      : '';

    arena.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <span class="section-badge" style="margin:0;">
          Pregunta ${this.quizState.index + 1} de ${list.length}
        </span>
        <span style="font-family:'Fredoka',sans-serif; font-weight:700; color:#6C43A3;">
          ⭐ Puntaje Actual: ${this.quizState.score} / ${list.length}
        </span>
      </div>

      <h3 style="margin-top:12px; font-size:1.25rem; color:var(--text-main); text-align:center;">
        ${item.q}
      </h3>

      <div class="quiz-question-display">
        ${item.problem}
      </div>

      ${cardsPreviewHTML}

      <div style="text-align:center; margin-bottom:12px;">
        <button class="btn-kawaii btn-yellow btn-sm" onclick="StudioApp.toggleQuizHint()">
          💡 Ver Pista Kanban Kawaii
        </button>
        <div id="quiz-hint-box" style="display:none; margin-top:8px; background:#FFFDF0; border:2px dashed #F4B942; border-radius:12px; padding:8px 14px; font-weight:700; color:#7A5200;">
          🌸 <strong>Pista:</strong> ${item.hint}
        </div>
      </div>

      <div class="quiz-options-grid">
        ${item.options.map((opt, idx) => `
          <button class="quiz-option-btn" id="quiz-opt-${idx}"
                  onclick="StudioApp.submitQuizAnswer(${idx})">
            ${opt}
          </button>
        `).join('')}
      </div>

      <div id="quiz-feedback-area"></div>
    `;
  },

  toggleQuizHint() {
    KawaiiSound.playPop();
    const box = document.getElementById('quiz-hint-box');
    if (box) {
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    }
  },

  submitQuizAnswer(selectedIdx) {
    if (this.quizState.answered) return;
    this.quizState.answered = true;

    const list = StudioData.quizzes[this.quizState.mode] || [];
    const item = list[this.quizState.index];
    if (!item) return;

    const elapsedSec = Math.max(1, Math.round((Date.now() - this.quizState.questionStartTime) / 1000));
    const isCorrect = selectedIdx === item.correct;

    item.options.forEach((_, idx) => {
      const btn = document.getElementById(`quiz-opt-${idx}`);
      if (!btn) return;
      btn.disabled = true;
      if (idx === item.correct) btn.classList.add('correct');
      else if (idx === selectedIdx && !isCorrect) btn.classList.add('wrong');
    });

    const fbArea = document.getElementById('quiz-feedback-area');

    if (isCorrect) {
      this.quizState.score++;
      this.state.solvedCount++;
      this.state.streak++;
      this.state.leadTimes.push(Math.min(elapsedSec, 30));
      if (this.state.leadTimes.length > 10) this.state.leadTimes.shift();

      KawaiiSound.playSuccess();
      this.addXP(15, `¡Respuesta correcta en ${elapsedSec}s!`);
      this.renderLeadTimeChart();
    } else {
      this.state.streak = 0;
      this.saveState();
      this.updateHeaderAndKMMUI();
      KawaiiSound.playWipAlert();
    }

    if (fbArea) {
      fbArea.innerHTML = `
        <div style="margin-top:16px; padding:16px; border-radius:16px; background:${isCorrect ? '#E2FCEF' : '#FFF0F3'}; border:3px solid ${isCorrect ? '#2E9F65' : '#FF6B6B'};">
          <div style="font-family:'Fredoka',sans-serif; font-size:1.15rem; color:${isCorrect ? '#0B4F2C' : '#9E1B32'};">
            ${isCorrect ? `🎉 ¡SÚPER BIEN! ¡SECO/A! (Tiempo: ${elapsedSec} seg)` : '🌸 ¡Casi! Mira cómo lo resuelven las fichas Kanban:'}
          </div>
          <p style="font-weight:700; margin-top:6px;">${item.explanation}</p>
          <div style="margin-top:12px; text-align:right;">
            <button class="btn-kawaii" onclick="StudioApp.nextQuizQuestion()">
              Siguiente Reto ➡️
            </button>
          </div>
        </div>
      `;
    }
  },

  nextQuizQuestion() {
    KawaiiSound.playPop();
    this.quizState.index++;
    this.renderCurrentQuestion();
  },

  renderQuizCompletion(total) {
    const arena = document.getElementById('quiz-arena-container');
    if (!arena) return;

    this.launchConfetti();
    KawaiiSound.playLevelUp();

    const pct = Math.round((this.quizState.score / total) * 100);
    const currentLvl = this.getCurrentKMMLevel();

    arena.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <div style="font-size:3.4rem; margin-bottom:8px;">🏆🌸✨</div>
        <h3 style="font-size:1.8rem; color:var(--pink-dark);">
          ¡Prueba Completada! ¡Qué Seco/a!
        </h3>
        <p style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin:10px 0;">
          Acertaste <strong>${this.quizState.score} de ${total}</strong> (${pct}%)
        </p>

        <div style="max-width:560px; margin:18px auto; background:linear-gradient(135deg,#FFFDF0,#FFF0F6,#E6FAF5); border:4px solid #FF6B9E; border-radius:24px; padding:22px; box-shadow:0 8px 0 #E0487D;">
          <div style="font-family:'Fredoka',sans-serif; font-size:1.25rem; color:#E0487D; margin-bottom:6px;">
            🌟 ¡Nuevo Logro Desbloqueado en tu Mente Kanban! 🌟
          </div>
          <p style="font-weight:700; color:#4A3548;">
            Dominaste la técnica de <strong>Multiplicación Mental de Grandes Números</strong> usando Fichas Kawaii, Límite WIP = 1, Parking Lot de Ceros y Split & Merge.
          </p>
          <div style="margin-top:12px; font-family:'Fredoka',sans-serif; color:#5A2E98; font-size:1.05rem;">
            Rango Actual: ${currentLvl.level} — ${currentLvl.name} (${this.state.xp} XP)
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-top:18px;">
          <button class="btn-kawaii btn-yellow" onclick="StudioApp.selectQuizMode('${this.quizState.mode}', true)">
            🔄 Repetir esta Prueba
          </button>
          <button class="btn-kawaii btn-mint" onclick="StudioApp.selectQuizMode('mode4', true)">
            🌟 Ir al Examen Estrella (10 Preguntas)
          </button>
          <a href="#progreso-kmm" class="btn-kawaii btn-lavender">
            🏆 Ver mis Rangos y Métricas
          </a>
        </div>
      </div>
    `;
  },

  // ------------------------------------------------------------------------
  // GRÁFICO RUN CHART DE TIEMPO DE RESPUESTA
  // ------------------------------------------------------------------------
  renderLeadTimeChart() {
    const chartEl = document.getElementById('lead-time-bars');
    if (!chartEl) return;

    const times = this.state.leadTimes;
    const maxVal = Math.max(...times, 15);

    chartEl.innerHTML = times.map((t, i) => {
      const heightPct = Math.max(18, Math.round((t / maxVal) * 100));
      return `
        <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
          <span style="font-family:'Fredoka',sans-serif; font-size:0.8rem; color:var(--pink-dark);">${t}s</span>
          <div style="width:100%; max-width:38px; height:110px; background:#F7EBF2; border-radius:10px; display:flex; align-items:flex-end; padding:3px; border:2px solid #F3C6DC;">
            <div style="width:100%; height:${heightPct}%; background:linear-gradient(180deg,#FF85B3,#FFD166); border-radius:7px; transition:height 0.4s;"></div>
          </div>
          <span style="font-size:0.72rem; font-weight:800; color:var(--text-muted);">#${i + 1}</span>
        </div>
      `;
    }).join('');
  },

  // ------------------------------------------------------------------------
  // BITÁCORA PERSONAL DE TRUCOS
  // ------------------------------------------------------------------------
  addReflection() {
    const input = document.getElementById('reflection-input');
    if (!input || !input.value.trim()) return;
    KawaiiSound.playSuccess();
    this.state.reflections.unshift(input.value.trim());
    input.value = '';
    this.addXP(10, "¡Agregaste una nota en tu Bitácora Kawaii!");
    this.renderReflections();
  },

  renderReflections() {
    const listEl = document.getElementById('reflections-list');
    if (!listEl) return;
    listEl.innerHTML = this.state.reflections.map(r => `
      <div style="background:#FFF; border:2px solid #FFD6E8; border-radius:12px; padding:10px 14px; font-weight:700; font-size:0.88rem; color:var(--text-main);">
        🌸 «${r}»
      </div>
    `).join('');
  },

  // ------------------------------------------------------------------------
  // NAVEGACIÓN ACTIVA ENTRE MÚLTIPLES LINKS
  // ------------------------------------------------------------------------
  setupNavigationLinks() {
    const links = document.querySelectorAll('.nav-link, .quick-links-list a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        KawaiiSound.playPop();
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        document.querySelectorAll('.nav-link, .quick-links-list a').forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === href);
        });
      });
    });
  },

  // ------------------------------------------------------------------------
  // CONFETI Y NOTIFICACIONES KAWAII
  // ------------------------------------------------------------------------
  showToast(msg) {
    let toast = document.getElementById('kawaii-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kawaii-toast';
      toast.style.cssText = `
        position:fixed; bottom:24px; right:24px; z-index:1000;
        background:#FF6B9E; color:#FFF; border:3px solid #FFF;
        border-radius:999px; padding:12px 22px; font-family:'Fredoka',sans-serif;
        font-size:0.95rem; box-shadow:0 8px 24px rgba(224,72,125,0.35);
        transition:all 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
    }, 3400);
  },

  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FF85B3', '#FFD166', '#4ECDC4', '#B388EB', '#FF975A', '#C1F7DC'];
    const pieces = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      size: 7 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: -2 + Math.random() * 4,
      vy: 3 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2
    }));

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += 0.08;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      frame++;
      if (frame < 110) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    requestAnimationFrame(animate);
  }
};

window.StudioApp = StudioApp;
window.addEventListener('DOMContentLoaded', () => StudioApp.init());
