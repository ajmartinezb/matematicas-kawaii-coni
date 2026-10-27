// ==========================================================================
// TABLERO PERSONAL KANBAN INTERACTIVO PARA CÁLCULO MENTAL 🗂️🌸
// Implementa VZ0.1, VZ2.2 (Colores), LW0.1 (Límite WIP=1), VZ3.6 (Parking Lot) y VZ4.4 (Split & Merge)
// ==========================================================================

const KawaiiKanbanBoard = {
  baseNumber: 1570000,
  multiplier: 2,
  tickets: [],
  trailingZerosCount: 0,
  autoPlayInterval: null,

  init(defaultNumber = 1570000, defaultMult = 2) {
    this.loadProblem(defaultNumber, defaultMult, false);
  },

  formatNum(n) {
    return Number(n).toLocaleString('es-CL');
  },

  loadPreset(num, mult) {
    KawaiiSound.playPop();
    const numInput = document.getElementById('board-input-number');
    const multInput = document.getElementById('board-input-mult');
    if (numInput) numInput.value = num;
    if (multInput) multInput.value = mult;
    this.loadProblem(num, mult, true);
  },

  loadFromInputs() {
    KawaiiSound.playPop();
    const rawNum = document.getElementById('board-input-number')?.value || '1570000';
    const cleanNum = parseInt(String(rawNum).replace(/\D/g, ''), 10);
    const mult = parseInt(document.getElementById('board-input-mult')?.value || '2', 10);

    if (!cleanNum || cleanNum <= 0) return;
    const safeMult = Math.min(Math.max(mult || 2, 1), 12);
    this.loadProblem(cleanNum, safeMult, true);
  },

  loadProblem(number, multiplier, announce = false) {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    this.baseNumber = number;
    this.multiplier = multiplier;
    this.hideWipAlert();

    // Descomponer el número en Fichas Kawaii de colores (Split VZ4.4)
    const str = String(number);
    const len = str.length;
    this.tickets = [];

    // Contar ceros finales para el Parking Lot (VZ3.6)
    let zeros = 0;
    for (let i = len - 1; i >= 0; i--) {
      if (str[i] === '0') zeros++;
      else break;
    }
    this.trailingZerosCount = zeros;

    // Crear una ficha por cada dígito distinto de cero de izquierda a derecha
    for (let i = 0; i < len; i++) {
      const digit = parseInt(str[i], 10);
      if (digit === 0) continue;
      const placePower = len - 1 - i;
      const value = digit * Math.pow(10, placePower);
      const styleMeta = this.getPlaceStyle(placePower);

      this.tickets.push({
        id: `ticket-${i}-${value}`,
        digit,
        placePower,
        value,
        multipliedValue: value * multiplier,
        label: styleMeta.label,
        colorClass: styleMeta.colorClass,
        icon: styleMeta.icon,
        state: 'backlog' // 'backlog' | 'next' | 'wip' | 'done'
      });
    }

    this.render();
    if (announce) {
      KawaiiSound.playCardPull();
    }
  },

  getPlaceStyle(power) {
    if (power >= 6) {
      return { label: 'Millones', colorClass: 'ticket-millions', icon: '🍓' };
    } else if (power === 5) {
      return { label: 'Centenas de Mil', colorClass: 'ticket-hundred-k', icon: '🍋' };
    } else if (power === 4) {
      return { label: 'Decenas de Mil', colorClass: 'ticket-ten-k', icon: '🌿' };
    } else if (power === 3) {
      return { label: 'Unidades de Mil', colorClass: 'ticket-thousands', icon: '🔮' };
    } else {
      return { label: 'Centenas / Unid.', colorClass: 'ticket-hundreds', icon: '🍑' };
    }
  },

  // Mover una ficha al siguiente estado respetando el Límite WIP = 1 (LW0.1)
  advanceTicket(ticketId) {
    const ticket = this.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    if (ticket.state === 'backlog') {
      ticket.state = 'next';
      this.hideWipAlert();
      KawaiiSound.playPop();
    } else if (ticket.state === 'next') {
      // Verificar Límite WIP = 1 en la columna 'wip'
      const currentWipCount = this.tickets.filter(t => t.state === 'wip').length;
      if (currentWipCount >= 1) {
        this.showWipAlert();
        KawaiiSound.playWipAlert();
        return;
      }
      ticket.state = 'wip';
      this.hideWipAlert();
      KawaiiSound.playCardPull();
    } else if (ticket.state === 'wip') {
      ticket.state = 'done';
      this.hideWipAlert();
      KawaiiSound.playSuccess();

      // Si todas las fichas llegaron a Done, celebrar!
      const allDone = this.tickets.every(t => t.state === 'done');
      if (allDone && window.StudioApp) {
        window.StudioApp.launchConfetti();
        window.StudioApp.addXP(20, `¡Completaste ${this.formatNum(this.baseNumber)} × ${this.multiplier} en el Tablero Kanban!`);
      }
    }
    this.render();
  },

  moveBackTicket(ticketId) {
    const ticket = this.tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    this.hideWipAlert();
    KawaiiSound.playPop();

    if (ticket.state === 'done') ticket.state = 'wip';
    else if (ticket.state === 'wip') ticket.state = 'next';
    else if (ticket.state === 'next') ticket.state = 'backlog';
    this.render();
  },

  autoSolveStepByStep() {
    KawaiiSound.playPop();
    // Reiniciar al estado inicial primero
    this.tickets.forEach(t => { t.state = 'backlog'; });
    this.hideWipAlert();
    this.render();

    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);

    this.autoPlayInterval = setInterval(() => {
      // 1. Si hay una ficha en WIP, terminarla a Done ("Stop starting, start finishing!")
      const wipTicket = this.tickets.find(t => t.state === 'wip');
      if (wipTicket) {
        this.advanceTicket(wipTicket.id);
        return;
      }
      // 2. Si hay una ficha en Next, jalarla a WIP (Pull)
      const nextTicket = this.tickets.find(t => t.state === 'next');
      if (nextTicket) {
        this.advanceTicket(nextTicket.id);
        return;
      }
      // 3. Si hay una ficha en Backlog, comprometerla a Next
      const backlogTicket = this.tickets.find(t => t.state === 'backlog');
      if (backlogTicket) {
        this.advanceTicket(backlogTicket.id);
        return;
      }
      // 4. Todo terminado
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }, 950);
  },

  showWipAlert() {
    const alertEl = document.getElementById('kanban-wip-alert');
    if (alertEl) {
      alertEl.classList.add('visible');
    }
  },

  hideWipAlert() {
    const alertEl = document.getElementById('kanban-wip-alert');
    if (alertEl) {
      alertEl.classList.remove('visible');
    }
  },

  renderTicketHTML(t) {
    let actionLabel = '';
    let contentBody = '';

    if (t.state === 'backlog') {
      actionLabel = 'Comprometer a Listo ➡️';
      contentBody = `
        <div class="ticket-number">${this.formatNum(t.value)}</div>
        <div class="ticket-subtext">Dígito: <strong>${t.digit}</strong> (${t.label})</div>
      `;
    } else if (t.state === 'next') {
      actionLabel = '⚡ Jalar a Multiplicar (Pull) ➡️';
      contentBody = `
        <div class="ticket-number">${this.formatNum(t.value)} × ${this.multiplier}</div>
        <div class="ticket-subtext">Esperando turno (Señal Pull)</div>
      `;
    } else if (t.state === 'wip') {
      actionLabel = `✅ ¡Listo! Da ${this.formatNum(t.multipliedValue)} ➡️`;
      contentBody = `
        <div class="ticket-number">${this.formatNum(t.value)} × ${this.multiplier}</div>
        <div style="background:rgba(255,255,255,0.85); border-radius:10px; padding:6px 10px; margin:6px 0; font-size:0.9rem; font-weight:800;">
          💡 Piensa solo en: <strong>${t.digit} × ${this.multiplier} = ${t.digit * this.multiplier}</strong><br>
          Resultado de esta ficha: <strong>${this.formatNum(t.multipliedValue)}</strong>
        </div>
      `;
    } else if (t.state === 'done') {
      contentBody = `
        <div class="ticket-number">✨ ${this.formatNum(t.multipliedValue)}</div>
        <div class="ticket-subtext">(${this.formatNum(t.value)} × ${this.multiplier} completado)</div>
      `;
    }

    return `
      <div class="kawaii-ticket ${t.colorClass}">
        <div class="ticket-top-bar">
          <span>${t.icon} ${t.label}</span>
          ${t.state !== 'backlog' ? `<button onclick="KawaiiKanbanBoard.moveBackTicket('${t.id}')" style="background:none;border:none;cursor:pointer;font-size:0.8rem;" title="Retroceder ficha">⬅️</button>` : ''}
        </div>
        ${contentBody}
        ${actionLabel ? `
          <button class="btn-kawaii btn-sm" style="width:100%; margin-top:8px;"
                  onclick="KawaiiKanbanBoard.advanceTicket('${t.id}')">
            ${actionLabel}
          </button>
        ` : ''}
      </div>
    `;
  },

  render() {
    const colBacklog = document.getElementById('col-backlog-cards');
    const colNext = document.getElementById('col-next-cards');
    const colWip = document.getElementById('col-wip-cards');
    const colDone = document.getElementById('col-done-cards');

    if (!colBacklog || !colNext || !colWip || !colDone) return;

    const backlogList = this.tickets.filter(t => t.state === 'backlog');
    const nextList = this.tickets.filter(t => t.state === 'next');
    const wipList = this.tickets.filter(t => t.state === 'wip');
    const doneList = this.tickets.filter(t => t.state === 'done');

    colBacklog.innerHTML = backlogList.length
      ? backlogList.map(t => this.renderTicketHTML(t)).join('')
      : `<div style="text-align:center; color:var(--text-light); padding:20px; font-weight:700;">¡Todas las fichas salieron del Backlog! ✨</div>`;

    colNext.innerHTML = nextList.length
      ? nextList.map(t => this.renderTicketHTML(t)).join('')
      : `<div style="text-align:center; color:var(--text-light); padding:20px; font-weight:700;">Compromete fichas desde el Backlog ⬅️</div>`;

    colWip.innerHTML = wipList.length
      ? wipList.map(t => this.renderTicketHTML(t)).join('')
      : `<div style="text-align:center; color:#9C7A23; padding:24px; font-weight:800; border:2px dashed #F4B942; border-radius:14px;">
          🟢 ¡Slot Libre! (Capacidad Disponible)<br>
          <small>Señal Pull activa: jala 1 ficha desde «Listo»</small>
        </div>`;

    colDone.innerHTML = doneList.length
      ? doneList.map(t => this.renderTicketHTML(t)).join('')
      : `<div style="text-align:center; color:var(--text-light); padding:20px; font-weight:700;">Aquí se irán sumando las fichas terminadas ✅</div>`;

    // Actualizar contadores de columna
    const wipBadge = document.getElementById('wip-count-badge');
    if (wipBadge) {
      wipBadge.textContent = `WIP: ${wipList.length}/1`;
      wipBadge.style.background = wipList.length >= 1 ? '#FFD6E8' : '#C1F7DC';
    }

    // Actualizar Parking Lot de Ceros
    const parkingEl = document.getElementById('parking-lot-zeros-display');
    if (parkingEl) {
      const zerosStr = '0'.repeat(this.trailingZerosCount);
      const nonZeroPrefix = String(this.baseNumber).slice(0, String(this.baseNumber).length - this.trailingZerosCount);
      parkingEl.innerHTML = this.trailingZerosCount > 0
        ? `🅿️ <strong>Parking Lot de Ceros:</strong> Guardamos <strong>${this.trailingZerosCount} ceros (${zerosStr})</strong> al final. Así tu mente también puede pensar simplemente en <strong>${nonZeroPrefix} × ${this.multiplier} = ${parseInt(nonZeroPrefix,10) * this.multiplier}</strong> y devolver los <strong>${this.trailingZerosCount} ceros</strong> ➡️ <strong>${this.formatNum(this.baseNumber * this.multiplier)}</strong>.`
        : `🅿️ <strong>Parking Lot de Ceros:</strong> Este número no tiene ceros al final.`;
    }

    // Actualizar Banner de Merge (Suma Acumulada VZ4.4)
    const mergeBox = document.getElementById('kanban-merge-summary');
    if (mergeBox) {
      const sumSoFar = doneList.reduce((acc, t) => acc + t.multipliedValue, 0);
      const totalTarget = this.baseNumber * this.multiplier;
      const isComplete = doneList.length === this.tickets.length && this.tickets.length > 0;

      const partsFormula = doneList.length > 0
        ? doneList.map(t => this.formatNum(t.multipliedValue)).join(' + ')
        : '0';

      mergeBox.innerHTML = `
        <div style="font-size:0.9rem; font-weight:800; color:var(--pink-dark);">
          🌸 MERGE EN VIVO (Suma de Fichas Terminadas en «Hecho»):
        </div>
        <div class="merge-equation">
          ${partsFormula} = <span style="background:#FFF; padding:4px 14px; border-radius:12px; border:2px solid #FF6B9E;">${this.formatNum(sumSoFar)}</span>
        </div>
        <div style="margin-top:8px; font-weight:800; color:${isComplete ? '#0F5C35' : 'var(--text-muted)'};">
          ${isComplete
            ? `🎉 ¡ENTREGA KANBAN COMPLETA! ${this.formatNum(this.baseNumber)} × ${this.multiplier} = ${this.formatNum(totalTarget)} ✨`
            : `Faltan ${this.tickets.length - doneList.length} ficha(s) por terminar para completar ${this.formatNum(this.baseNumber)} × ${this.multiplier}`
          }
        </div>
      `;
    }
  }
};
