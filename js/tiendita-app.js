// ==========================================================================
// CONTROLADOR PRINCIPAL: TIENDITA KAWAII & TABLAS 1-12 🛍️💵🌸
// Para Niños y Jóvenes • Español de Chile 🇨🇱
// ==========================================================================

const TienditaApp = {
  state: {
    xp: 25,
    solvedCount: 0,
    streak: 0,
    leadTimes: [11, 8, 6],
    reflections: [
      "¡Separar la tabla del 12 en (×10) + (×2) y dar vuelto saltando hacia arriba sale al tiro!"
    ]
  },

  selectedTable: 12,

  posState: {
    productId: "p3",
    qty: 12,
    unitPrice: 300,
    productName: "Huevo de Campo",
    productIcon: "🥚",
    paidWith: 5000
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
    this.renderTablesSelector();
    this.selectTable(12, false);
    this.renderShopCatalog();
    this.updatePosReceipt(false);
    this.renderDailyCases();
    this.selectQuizMode('mode1', false);
    this.renderLeadTimeChart();
    this.renderReflections();
    this.setupNavigationLinks();

    KawaiiVideoPlayer.init();
    KawaiiKanbanBoard.init(1200, 12);
  },

  formatCLP(amount) {
    return '$' + Number(amount).toLocaleString('es-CL');
  },

  loadSavedState() {
    try {
      const saved = localStorage.getItem('kawaii_tiendita_kanban_state_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {}
  },

  saveState() {
    try {
      localStorage.setItem('kawaii_tiendita_kanban_state_v1', JSON.stringify(this.state));
    } catch (e) {}
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
    let current = TienditaData.kmmLevels[0];
    for (const lvl of TienditaData.kmmLevels) {
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

    const ladderEl = document.getElementById('kmm-levels-grid');
    if (ladderEl) {
      ladderEl.innerHTML = TienditaData.kmmLevels.map(lvl => {
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

    const avgLtEl = document.getElementById('metric-avg-leadtime');
    const deliveryEl = document.getElementById('metric-delivery-rate');
    if (avgLtEl && this.state.leadTimes.length > 0) {
      const avg = (this.state.leadTimes.reduce((a, b) => a + b, 0) / this.state.leadTimes.length).toFixed(1);
      avgLtEl.textContent = `${avg} seg`;
    }
    if (deliveryEl) {
      deliveryEl.textContent = `${this.state.solvedCount} ventas`;
    }
  },

  // ------------------------------------------------------------------------
  // SALA 2: EXPLORADOR INTERACTIVO DE LAS TABLAS DEL 1 AL 12 (#tablas-1-12)
  // ------------------------------------------------------------------------
  renderTablesSelector() {
    const container = document.getElementById('tables-buttons-container');
    if (!container) return;

    const badges = {
      1: "Espejo", 2: "Doble", 3: "2 + 1", 4: "Doble×2",
      5: "Monedas", 6: "Six-Pack", 7: "5 + 2", 8: "Pulpito",
      9: "10 − 1", 10: "+ Cero", 11: "Gemelos", 12: "Docena"
    };

    container.innerHTML = Array.from({ length: 12 }, (_, idx) => {
      const n = idx + 1;
      const info = TienditaData.tablesInfo[n];
      return `
        <button id="table-btn-${n}" class="table-num-btn ${n === this.selectedTable ? 'active' : ''}"
                onclick="StudioApp.selectTable(${n}, true)">
          <span>${info.icon} ×${n}</span>
          <span class="table-sub-badge">${badges[n]}</span>
        </button>
      `;
    }).join('');
  },

  selectTable(tableNum, playSnd = true) {
    if (playSnd) KawaiiSound.playPop();
    this.selectedTable = tableNum;

    for (let i = 1; i <= 12; i++) {
      const btn = document.getElementById(`table-btn-${i}`);
      if (btn) btn.classList.toggle('active', i === tableNum);
    }

    const info = TienditaData.tablesInfo[tableNum];
    const detailContainer = document.getElementById('selected-table-detail');
    if (!detailContainer || !info) return;

    const cardsHTML = Array.from({ length: 12 }, (_, idx) => {
      const m = idx + 1;
      const result = tableNum * m;
      const isHighlight = info.highlightMultipliers.includes(m);
      const splitFormula = this.getSmartSplitExplanation(tableNum, m);
      const priceExample = this.formatCLP(result * 100);

      return `
        <div class="mult-fact-card ${isHighlight ? 'highlight-trick' : ''}"
             onclick="KawaiiSound.playAudioOrSpeak('${info.audioFile || ''}', '${tableNum} por ${m} es ${result}. ${splitFormula}')">
          <div style="display:flex; justify-content:space-between; font-size:0.72rem; font-weight:800; color:var(--text-muted);">
            <span>${isHighlight ? '⭐ Truco Clave' : `Ficha #${m}`}</span>
            <span>🔊 Voz 🇨🇱</span>
          </div>
          <div style="font-family:'Fredoka',sans-serif; font-size:1.45rem; color:var(--pink-dark); margin:4px 0;">
            ${tableNum} × ${m} = <span style="color:#0F5C35;">${result}</span>
          </div>
          <div style="font-size:0.78rem; font-weight:800; color:#5A2E98; background:#F7F0FF; border-radius:8px; padding:3px 6px; margin-bottom:4px;">
            🧩 ${splitFormula}
          </div>
          <div style="font-size:0.75rem; font-weight:700; color:#7A5200;">
            🛍️ Si vale $100: ${m} × $${tableNum}00 = <strong>${priceExample}</strong>
          </div>
        </div>
      `;
    }).join('');

    detailContainer.innerHTML = `
      <div style="background:linear-gradient(135deg,#FFF0F6,#FFFDF0,#E6FAF5); border:3px solid #FF85B3; border-radius:22px; padding:20px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <span class="section-badge" style="margin:0 0 6px 0;">${info.kmmPractice}</span>
            <h3 style="font-size:1.5rem; color:var(--pink-dark);">${info.icon} ${info.title}</h3>
          </div>
          <button class="btn-kawaii btn-yellow btn-sm"
                  onclick="KawaiiSound.playAudioOrSpeak('${info.audioFile || ''}', '${info.title}. ${info.secret}. Ejemplo real: ${info.realLifeTip}')">
            🔊 Escuchar Secreto (Voz Chilena 🇨🇱)
          </button>
        </div>
        <p style="font-weight:800; color:var(--text-main); margin-top:8px; font-size:0.98rem;">
          💡 <strong>Secreto Kanban (Split & Merge):</strong> ${info.secret}
        </p>
        <p style="font-weight:800; color:#0F5C35; margin-top:6px; background:#FFFFFF; padding:8px 14px; border-radius:12px; border:2px dashed #4CC98A;">
          🛍️ <strong>Ejemplo en Ventas Cotidianas:</strong> ${info.realLifeTip}
        </p>
      </div>

      <div style="font-size:0.86rem; font-weight:800; color:var(--text-muted); margin-bottom:6px;">
        ✨ Haz clic en cualquier tarjeta del ${tableNum} × 1 hasta ${tableNum} × 12 para escucharla por voz:
      </div>
      <div class="multiplication-grid-cards">
        ${cardsHTML}
      </div>
    `;
  },

  getSmartSplitExplanation(tableNum, m) {
    if (tableNum === 12) return `(10×${m}=${10*m}) + (2×${m}=${2*m})`;
    if (tableNum === 11) return `(10×${m}=${10*m}) + (1×${m}=${m})`;
    if (tableNum === 10) return `Al ${m} agrégale un 0 ➡️ ${10*m}`;
    if (tableNum === 9) return `(10×${m}=${10*m}) − ${m} = ${9*m}`;
    if (tableNum === 8) return `(4×${m}=${4*m}) × 2 = ${8*m}`;
    if (tableNum === 7) return `(5×${m}=${5*m}) + (2×${m}=${2*m})`;
    if (tableNum === 6) return `(5×${m}=${5*m}) + ${m} = ${6*m}`;
    if (tableNum === 5) return `Mitad de (${m}×10=${m*10}) = ${5*m}`;
    if (tableNum === 4) return `Doble de ${2*m} = ${4*m}`;
    if (tableNum === 3) return `(2×${m}=${2*m}) + ${m} = ${3*m}`;
    if (tableNum === 2) return `${m} + ${m} = ${2*m}`;
    return `Espejo de ${m} = ${m}`;
  },

  // ------------------------------------------------------------------------
  // SALA 3: SIMULADOR DE CAJA REGISTRADORA, VENTAS Y PUENTE DEL VUELTO (#caja-vuelto)
  // ------------------------------------------------------------------------
  renderShopCatalog() {
    const grid = document.getElementById('shop-products-catalog');
    if (!grid) return;

    grid.innerHTML = TienditaData.shopProducts.map(p => `
      <div id="prod-card-${p.id}" class="product-btn-card ${p.id === this.posState.productId ? 'selected' : ''}"
           onclick="StudioApp.selectShopProduct('${p.id}')">
        <div style="font-size:2rem;">${p.icon}</div>
        <div style="font-family:'Fredoka',sans-serif; font-size:0.95rem; color:var(--pink-dark);">${p.name}</div>
        <div style="font-weight:800; font-size:0.9rem; color:#0F5C35;">${this.formatCLP(p.price)} c/u</div>
        <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; margin-top:2px;">
          Sugerido: ×${p.defaultQty}
        </div>
      </div>
    `).join('');
  },

  selectShopProduct(prodId) {
    KawaiiSound.playPop();
    const p = TienditaData.shopProducts.find(item => item.id === prodId);
    if (!p) return;

    this.posState.productId = p.id;
    this.posState.qty = p.defaultQty;
    this.posState.unitPrice = p.price;
    this.posState.productName = p.name;
    this.posState.productIcon = p.icon;
    this.posState.paidWith = p.defaultBill;

    const qtyInput = document.getElementById('pos-input-qty');
    const priceInput = document.getElementById('pos-input-price');
    if (qtyInput) qtyInput.value = p.defaultQty;
    if (priceInput) priceInput.value = p.price;

    this.renderShopCatalog();
    this.updatePosReceipt(true);
  },

  setPosQty(qty) {
    KawaiiSound.playPop();
    this.posState.qty = Math.max(1, Math.min(20, parseInt(qty, 10) || 1));
    const qtyInput = document.getElementById('pos-input-qty');
    if (qtyInput) qtyInput.value = this.posState.qty;
    this.updatePosReceipt(false);
  },

  setPosBill(billAmount) {
    KawaiiSound.playCardPull();
    this.posState.paidWith = billAmount;
    this.updatePosReceipt(false);
  },

  updatePosFromManualInputs() {
    const q = parseInt(document.getElementById('pos-input-qty')?.value || '12', 10);
    const pr = parseInt(document.getElementById('pos-input-price')?.value || '300', 10);
    this.posState.qty = Math.max(1, Math.min(50, q || 1));
    this.posState.unitPrice = Math.max(10, pr || 100);
    this.updatePosReceipt(false);
  },

  buildMultiplicationBreakdown(qty, price) {
    if (qty === 12) {
      return `🍓 <strong>10 × ${this.formatCLP(price)} = ${this.formatCLP(10 * price)}</strong> + 🍋 <strong>2 × ${this.formatCLP(price)} = ${this.formatCLP(2 * price)}</strong>`;
    }
    if (qty === 11) {
      return `🍓 <strong>10 × ${this.formatCLP(price)} = ${this.formatCLP(10 * price)}</strong> + 🍋 <strong>1 × ${this.formatCLP(price)} = ${this.formatCLP(price)}</strong>`;
    }
    if (qty === 9) {
      return `🍓 <strong>10 × ${this.formatCLP(price)} = ${this.formatCLP(10 * price)}</strong> − 🍋 <strong>1 × ${this.formatCLP(price)} (${this.formatCLP(price)})</strong>`;
    }
    if (qty === 7) {
      return `🍓 <strong>5 × ${this.formatCLP(price)} = ${this.formatCLP(5 * price)}</strong> + 🍋 <strong>2 × ${this.formatCLP(price)} = ${this.formatCLP(2 * price)}</strong>`;
    }
    if (price >= 1000 && price % 1000 !== 0) {
      const thousands = Math.floor(price / 1000) * 1000;
      const rest = price % 1000;
      return `🍓 <strong>${qty} × ${this.formatCLP(thousands)} = ${this.formatCLP(qty * thousands)}</strong> + 🍋 <strong>${qty} × ${this.formatCLP(rest)} = ${this.formatCLP(qty * rest)}</strong>`;
    }
    if (price % 100 === 0) {
      const base = price / 100;
      return `⚡ <strong>${qty} × ${base} = ${qty * base}</strong> + 🅿️ Parking Lot de <strong>00</strong> = <strong>${this.formatCLP(qty * price)}</strong>`;
    }
    return `⚡ <strong>${qty} × ${this.formatCLP(price)} = ${this.formatCLP(qty * price)}</strong>`;
  },

  buildChangeSteps(total, bill) {
    if (bill < total) {
      const missing = total - bill;
      return {
        valid: false,
        message: `⚠️ El billete de ${this.formatCLP(bill)} no alcanza para pagar ${this.formatCLP(total)}. Faltan ${this.formatCLP(missing)}. Elige un billete más grande arriba.`
      };
    }
    if (bill === total) {
      return {
        valid: true,
        change: 0,
        steps: [`🎉 ¡Pago exacto con ${this.formatCLP(bill)}! Vuelto = $0`]
      };
    }

    const change = bill - total;
    const steps = [];
    let current = total;

    if (current % 100 !== 0) {
      const nextHundred = Math.ceil(current / 100) * 100;
      if (nextHundred <= bill) {
        const hop = nextHundred - current;
        steps.push(`➕ <strong>${this.formatCLP(hop)}</strong> (llegas a ${this.formatCLP(nextHundred)})`);
        current = nextHundred;
      }
    }

    if (current < bill && current % 1000 !== 0) {
      const nextThousand = Math.ceil(current / 1000) * 1000;
      if (nextThousand <= bill) {
        const hop = nextThousand - current;
        steps.push(`➕ <strong>${this.formatCLP(hop)}</strong> (llegas a ${this.formatCLP(nextThousand)})`);
        current = nextThousand;
      }
    }

    if (current < bill) {
      const hop = bill - current;
      steps.push(`➕ <strong>${this.formatCLP(hop)}</strong> (llegas a ${this.formatCLP(bill)})`);
    }

    return {
      valid: true,
      change,
      steps
    };
  },

  updatePosReceipt(announce = false) {
    const { qty, unitPrice, productName, productIcon } = this.posState;
    const total = qty * unitPrice;

    const bills = [1000, 2000, 5000, 10000, 20000, 50000];
    if (announce && this.posState.paidWith < total) {
      this.posState.paidWith = bills.find(b => b >= total) || 50000;
    }

    const paidWith = this.posState.paidWith;

    [1000, 2000, 5000, 10000, 20000].forEach(b => {
      const btn = document.getElementById(`bill-chip-${b}`);
      if (btn) btn.classList.toggle('active', b === paidWith);
    });

    const multBreakdown = this.buildMultiplicationBreakdown(qty, unitPrice);
    const changeInfo = this.buildChangeSteps(total, paidWith);

    const receiptEl = document.getElementById('pos-live-receipt');
    if (!receiptEl) return;

    const changeBridgeHTML = changeInfo.valid
      ? `
        <div class="change-hop-bridge">
          <span class="kawaii-ticket ticket-millions" style="padding:6px 12px; font-size:0.9rem;">
            🧾 Cuenta: ${this.formatCLP(total)}
          </span>
          ${changeInfo.steps.map(s => `<span class="hop-step-pill">${s}</span>`).join('<span>➡️</span>')}
        </div>
        <div style="background:linear-gradient(135deg,#C1F7DC,#FFF3B0); border:3px solid #2E9F65; border-radius:16px; padding:14px; text-align:center; margin-top:8px;">
          <div style="font-size:0.8rem; font-weight:800; color:#0F5C35;">💵 VUELTO A ENTREGAR AL CLIENTE (Sin restar con llevadas):</div>
          <div style="font-family:'Fredoka',sans-serif; font-size:2rem; color:#0B4F2C;">
            ${this.formatCLP(changeInfo.change)} 🎉
          </div>
        </div>
      `
      : `
        <div style="background:#FFE8EC; border:2px solid #FF6B6B; border-radius:14px; padding:12px; color:#9E1B32; font-weight:800;">
          ${changeInfo.message}
        </div>
      `;

    receiptEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #FFB3D1; padding-bottom:8px;">
        <span style="font-family:'Fredoka',sans-serif; font-size:1.15rem; color:var(--pink-dark);">
          🧾 Boleta Kawaii: ${productIcon} ${qty} × ${productName}
        </span>
        <span class="section-badge" style="margin:0;">WIP = 1 Paso a Paso</span>
      </div>

      <!-- PASO 1 KANBAN: MULTIPLICAR PARA SACAR EL TOTAL -->
      <div style="background:#FFFFFF; border:2px solid #FFB3D1; border-radius:14px; padding:12px;">
        <div style="font-size:0.78rem; font-weight:800; color:var(--pink-dark);">
          PASO 1 (Ficha Multiplicación): ${qty} unidades × ${this.formatCLP(unitPrice)}
        </div>
        <div style="margin:6px 0; font-size:0.92rem;">
          ${multBreakdown}
        </div>
        <div style="font-family:'Fredoka',sans-serif; font-size:1.55rem; color:var(--pink-dark);">
          Total a Cobrar = <span style="color:#0F5C35;">${this.formatCLP(total)}</span>
        </div>
      </div>

      <!-- PASO 2 KANBAN: EL PUENTE DEL VUELTO -->
      <div style="background:#FFFFFF; border:2px solid #5BC0BE; border-radius:14px; padding:12px;">
        <div style="font-size:0.78rem; font-weight:800; color:#0D4F6C; margin-bottom:6px;">
          PASO 2 (El Puente del Vuelto): Cliente paga con <strong>${this.formatCLP(paidWith)}</strong>
        </div>
        ${changeBridgeHTML}
      </div>

      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:4px;">
        <button class="btn-kawaii btn-yellow btn-sm" style="flex:1;"
                onclick="StudioApp.speakPosReceipt()">
          🔊 Escuchar Cobro y Vuelto (Voz Chilena 🇨🇱)
        </button>
        <a href="#tablero-kanban" class="btn-kawaii btn-mint btn-sm"
           onclick="KawaiiKanbanBoard.loadPreset(${unitPrice}, ${Math.min(qty, 12)})">
          🗂️ Enviar ${this.formatCLP(unitPrice)} × ${Math.min(qty, 12)} al Tablero
        </a>
      </div>
    `;
  },

  speakPosReceipt() {
    const { productId, qty, unitPrice, paidWith } = this.posState;
    const prod = TienditaData.shopProducts.find(p => p.id === productId);
    const total = qty * unitPrice;
    const change = Math.max(0, paidWith - total);
    const fallbackText = `Venta de ${qty} por ${unitPrice} pesos. El total a cobrar es ${total} pesos. Si te pagan con ${paidWith}, el vuelto es ${change} pesos.`;

    if (prod && prod.audioFile && qty === prod.defaultQty && unitPrice === prod.price && paidWith === prod.defaultBill) {
      KawaiiSound.playAudioOrSpeak(prod.audioFile, fallbackText);
    } else {
      KawaiiSound.playAudioOrSpeak(prod?.audioFile || '', fallbackText);
    }
  },

  // ------------------------------------------------------------------------
  // SALA 6: GALERÍA DE 8 CASOS COTIDIANOS (#casos-cotidianos)
  // ------------------------------------------------------------------------
  renderDailyCases() {
    const grid = document.getElementById('daily-cases-grid');
    if (!grid) return;

    grid.innerHTML = TienditaData.dailyCases.map(c => `
      <div class="example-card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <span class="example-difficulty">${c.badge}</span>
          <span style="font-size:0.74rem; font-weight:800; color:#6C43A3;">${c.kmmPractice}</span>
        </div>
        <h4 style="font-size:1.15rem; color:var(--text-main);">${c.title}</h4>
        <p style="font-size:0.86rem; font-weight:700; color:var(--text-muted);">${c.scenario}</p>
        <div style="background:#FFF; border:2px solid #FFB3D1; border-radius:14px; padding:10px 12px; text-align:center;">
          <div style="font-family:'Fredoka',sans-serif; font-size:1.18rem; color:var(--pink-dark);">
            ${c.problemSummary}
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${c.cards.map(card => `
            <div class="kawaii-ticket ${card.colorClass}" style="padding:8px 12px; border-radius:12px;">
              <div style="display:flex; justify-content:space-between; font-size:0.83rem;">
                <span>${card.label}: <strong>${card.calc}</strong></span>
                <span>➡️ <strong>${card.result}</strong></span>
              </div>
            </div>
          `).join('')}
        </div>
        <p style="font-size:0.83rem; font-weight:700; color:var(--text-muted); background:#FFFDF2; padding:8px 10px; border-radius:10px; border:1.5px dashed #F4B942;">
          💡 <strong>Atajo de Feria/Tienda:</strong> ${c.shortcut}
        </p>
        <div style="display:flex; gap:8px; margin-top:auto; flex-wrap:wrap;">
          <a href="#tablero-kanban" class="btn-kawaii btn-sm" style="flex:1;"
             onclick="KawaiiKanbanBoard.loadPreset(${c.boardNumber}, ${c.boardMult})">
            🗂️ Ver en Tablero
          </a>
          <button class="btn-kawaii btn-yellow btn-sm"
                  onclick="KawaiiSound.playAudioOrSpeak('${c.audioFile || ''}', '${c.title}. ${c.scenario}. ${c.shortcut}')">
            🔊 Escuchar (Voz Chilena 🇨🇱)
          </button>
        </div>
      </div>
    `).join('');
  },

  // ------------------------------------------------------------------------
  // SALA 7: LABORATORIO DE PRUEBAS (TABLAS 1-12, COBRO Y VUELTO - #pruebas)
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

    const list = TienditaData.quizzes[this.quizState.mode] || [];
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
          Reto ${this.quizState.index + 1} de ${list.length}
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
          💡 Ver Pista de la Tiendita Kawaii
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

    const list = TienditaData.quizzes[this.quizState.mode] || [];
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
      this.addXP(15, `¡Venta/Tabla resuelta en ${elapsedSec}s!`);
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
            ${isCorrect ? `🎉 ¡SÚPER BIEN! ¡SECO/A! (Tiempo: ${elapsedSec} seg)` : '🌸 ¡Casi! Mira el truco de la Tiendita Kanban:'}
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
        <div style="font-size:3.4rem; margin-bottom:8px;">🛍️🏆💵</div>
        <h3 style="font-size:1.8rem; color:var(--pink-dark);">
          ¡Prueba de la Tiendita Completada! ¡Seco/a!
        </h3>
        <p style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin:10px 0;">
          Acertaste <strong>${this.quizState.score} de ${total}</strong> (${pct}%)
        </p>

        <div style="max-width:560px; margin:18px auto; background:linear-gradient(135deg,#FFFDF0,#FFF0F6,#E6FAF5); border:4px solid #FF6B9E; border-radius:24px; padding:22px; box-shadow:0 8px 0 #E0487D;">
          <div style="font-family:'Fredoka',sans-serif; font-size:1.25rem; color:#E0487D; margin-bottom:6px;">
            🌟 ¡Logro Desbloqueado en la Tiendita Kawaii! 🌟
          </div>
          <p style="font-weight:700; color:#4A3548;">
            Dominaste las <strong>Tablas del 1 al 12</strong>, el cobro rápido de productos y el <strong>Puente del Vuelto</strong> en compras cotidianas usando Kanban.
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
            🌟 Ir al Examen Estrella (10 Retos)
          </button>
          <a href="#progreso-kmm" class="btn-kawaii btn-lavender">
            🏆 Ver mis Rangos y Métricas
          </a>
        </div>
      </div>
    `;
  },

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
            <div style="width:100%; height:${heightPct}%; background:linear-gradient(180deg,#4ECDC4,#FFD166); border-radius:7px; transition:height 0.4s;"></div>
          </div>
          <span style="font-size:0.72rem; font-weight:800; color:var(--text-muted);">#${i + 1}</span>
        </div>
      `;
    }).join('');
  },

  addReflection() {
    const input = document.getElementById('reflection-input');
    if (!input || !input.value.trim()) return;
    KawaiiSound.playSuccess();
    this.state.reflections.unshift(input.value.trim());
    input.value = '';
    this.addXP(10, "¡Agregaste una nota en tu Bitácora de la Tiendita!");
    this.renderReflections();
  },

  renderReflections() {
    const listEl = document.getElementById('reflections-list');
    if (!listEl) return;
    listEl.innerHTML = this.state.reflections.map(r => `
      <div style="background:#FFF; border:2px solid #FFD6E8; border-radius:12px; padding:10px 14px; font-weight:700; font-size:0.88rem; color:var(--text-main);">
        🛍️ «${r}»
      </div>
    `).join('');
  },

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

window.StudioApp = TienditaApp;
window.addEventListener('DOMContentLoaded', () => TienditaApp.init());
