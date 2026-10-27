// ==========================================================================
// DATOS EDUCATIVOS DE LA TIENDITA KAWAII & TABLAS 1-12 🛍️💵🌸
// Para Niños y Jóvenes • Español de Chile 🇨🇱
// ==========================================================================

const TienditaData = {
  // ------------------------------------------------------------------------
  // 1. LAS TABLAS DEL 1 AL 12 CON SECRETOS KANBAN & EJEMPLOS DE COMPRA/VENTA
  // ------------------------------------------------------------------------
  tablesInfo: {
    1: {
      num: 1,
      audioFile: "assets/audio/tabla-1.mp3",
      icon: "🪞",
      title: "Tabla del 1: El Espejo Mágico Kawaii",
      kmmPractice: "Regla Base Instantánea",
      secret: "Cualquier número multiplicado por 1 se mira en el espejo y queda exactamente igual.",
      realLifeTip: "Si vendes 1 sticker a $350, cobras $350. ¡Flujo instantáneo sin esfuerzo mental!",
      highlightMultipliers: [7, 10, 12]
    },
    2: {
      num: 2,
      audioFile: "assets/audio/tabla-2.mp3",
      icon: "🍒",
      title: "Tabla del 2: Los Gemelos Duplicadores",
      kmmPractice: "Flujo Rápido WIP = 1",
      secret: "Multiplicar por 2 es sumar el número consigo mismo (el doble). Es la base de todas las tablas pares.",
      realLifeTip: "Si vendes 2 helados de $1.500: el doble de 1.000 es 2.000 y el doble de 500 es 1.000 ➡️ ¡$3.000!",
      highlightMultipliers: [6, 8, 12]
    },
    3: {
      num: 3,
      audioFile: "assets/audio/tabla-3.mp3",
      icon: "🍡",
      title: "Tabla del 3: El Trío Dango (Doble + 1 más)",
      kmmPractice: "Split & Merge en 2 Pasos",
      secret: "Si te cuesta ×3, primero calcula el DOBLE (×2) y luego súmale el número 1 vez más.",
      realLifeTip: "3 empanadas de $1.200: 2 son $2.400 + 1 más de $1.200 = ¡$3.600!",
      highlightMultipliers: [4, 7, 8, 12]
    },
    4: {
      num: 4,
      audioFile: "assets/audio/tabla-4.mp3",
      icon: "🍀",
      title: "Tabla del 4: El Doble del Doble",
      kmmPractice: "Dos Pasos WIP = 1 Seguidos",
      secret: "¡Nunca sufras con el 4! Duplica el número una vez (×2) y a ese resultado sácale el doble otra vez (×2).",
      realLifeTip: "4 jugos de $750: el doble de 750 es $1.500, y el doble de $1.500 es ¡$3.000!",
      highlightMultipliers: [6, 7, 8, 12]
    },
    5: {
      num: 5,
      audioFile: "assets/audio/tabla-5.mp3",
      icon: "🖐️",
      title: "Tabla del 5: La Mano de Monedas ($500) o Mitad de ×10",
      kmmPractice: "Atajo de Flujo Rápido",
      secret: "Siempre termina en 0 o en 5. Truco Pro: Multiplica por 10 (agrega un 0) y sácale la mitad.",
      realLifeTip: "8 monedas de $500: la mitad de 8 es 4 ➡️ ¡Son $4.000 al tiro!",
      highlightMultipliers: [6, 7, 8, 9, 12]
    },
    6: {
      num: 6,
      audioFile: "assets/audio/tabla-6.mp3",
      icon: "🧃",
      title: "Tabla del 6: El Pack de 6 (Media Docena)",
      kmmPractice: "Agrupación por Packs",
      secret: "Cuando multiplicas 6 por un número par (2, 4, 6, 8), el resultado termina en ese mismo número (12, 24, 36, 48). O haz (×5) + (×1).",
      realLifeTip: "Un six-pack (6 cajas) de leche a $800 c/u: 6 × 8 = 48 + Parking Lot de 00 = ¡$4.800!",
      highlightMultipliers: [4, 6, 7, 8, 12]
    },
    7: {
      num: 7,
      audioFile: "assets/audio/tabla-7.mp3",
      icon: "🌈",
      title: "Tabla del 7: La Semana Kawaii (5 Días + Fin de Semana)",
      kmmPractice: "Separar en Partes Fáciles",
      secret: "El 7 parece difícil hasta que lo partes en dos fichas fáciles: (×5) + (×2). ¡5 días de clases + 2 del finde!",
      realLifeTip: "7 lápices gel a $600: (5 × 600 = $3.000) + (2 × 600 = $1.200) = ¡$4.200!",
      highlightMultipliers: [6, 7, 8, 9, 12]
    },
    8: {
      num: 8,
      audioFile: "assets/audio/tabla-8.mp3",
      icon: "🐙",
      title: "Tabla del 8: El Pulpito (Doble-Doble-Doble o 10 − 2)",
      kmmPractice: "Desbloqueo Mental",
      secret: "Tienes 2 caminos: duplicar 3 veces seguidas, o multiplicar ×10 y restarle ×2.",
      realLifeTip: "8 galletas a $700: 8 × 7 = 56 (recuerda: 5, 6, 7, 8 ➡️ 56 = 7 × 8) + 00 = ¡$5.600!",
      highlightMultipliers: [6, 7, 8, 9, 12]
    },
    9: {
      num: 9,
      audioFile: "assets/audio/tabla-9.mp3",
      icon: "🎈",
      title: "Tabla del 9: El Precio de Oferta (×10 menos 1 vez)",
      kmmPractice: "Pensamiento Inverso Inteligente",
      secret: "¡El mejor truco para vender! Multiplica por 10 y réstale el número 1 sola vez. Además, los dígitos del resultado siempre suman 9 (ej: 9×7=63, y 6+3=9).",
      realLifeTip: "9 libretas de $800: 10 libretas serían $8.000, menos 1 libreta ($800) = ¡$7.200!",
      highlightMultipliers: [6, 7, 8, 9, 12]
    },
    10: {
      num: 10,
      audioFile: "assets/audio/tabla-10.mp3",
      icon: "🅿️",
      title: "Tabla del 10: El Rey del Parking Lot de Ceros",
      kmmPractice: "Parking Lot de Ceros",
      secret: "Solo le pones un 0 al final del número. En pesos chilenos, multiplicar por 10 convierte cientos en miles.",
      realLifeTip: "10 dulces de $250: al 250 le agregas un cero ➡️ ¡$2.500!",
      highlightMultipliers: [5, 8, 10, 12]
    },
    11: {
      num: 11,
      audioFile: "assets/audio/tabla-11.mp3",
      icon: "🥢",
      title: "Tabla del 11: Los Palitos Gemelos (×10 más ×1)",
      kmmPractice: "Split & Merge Instantáneo",
      secret: "Del 1 al 9 repite el dígito (11, 22, 33... 99). Para 11×11 (121) o 11×12 (132), multiplica ×10 y súmale el número 1 vez.",
      realLifeTip: "11 empanadas de queso a $1.000 = $11.000. Y si cuestan $300: 11 × 3 = 33 + 00 = ¡$3.300!",
      highlightMultipliers: [7, 9, 11, 12]
    },
    12: {
      num: 12,
      audioFile: "assets/audio/tabla-12.mp3",
      icon: "🍩",
      title: "Tabla del 12: La Docena de Feria y Pastelería (×10 + ×2)",
      kmmPractice: "Maestría Split & Merge en Ventas",
      secret: "¡La reina de las ventas cotidianas (1 docena = 12 unidades)! Nunca multipliques por 12 de golpe: separa en Ficha ×10 + Ficha ×2.",
      realLifeTip: "1 docena (12) de huevos o donas a $400 c/u: 10 son $4.000 + 2 son $800 ➡️ ¡$4.800 en 2 segundos!",
      highlightMultipliers: [4, 5, 6, 7, 8, 9, 12]
    }
  },

  // ------------------------------------------------------------------------
  // 2. PRODUCTOS DEL KIOSCO / FERIA KAWAII PARA EL SIMULADOR DE CAJA Y VUELTO
  // ------------------------------------------------------------------------
  shopProducts: [
    { id: "p1", audioFile: "assets/audio/pos-p1.mp3", icon: "🍬", name: "Gomita Kawaii", price: 150, defaultQty: 6, defaultBill: 1000, hint: "6 × $150: (6×100=$600) + (6×50=$300) = $900" },
    { id: "p2", audioFile: "assets/audio/pos-p2.mp3", icon: "🥐", name: "Pan / Queque", price: 250, defaultQty: 8, defaultBill: 5000, hint: "8 × $250: 4 son $1.000, así que 8 son $2.000" },
    { id: "p3", audioFile: "assets/audio/pos-p3.mp3", icon: "🥚", name: "Huevo de Campo", price: 300, defaultQty: 12, defaultBill: 5000, hint: "Docena (12 × $300): 10 son $3.000 + 2 son $600 = $3.600" },
    { id: "p4", audioFile: "assets/audio/pos-p4.mp3", icon: "🍩", name: "Dona Glaseada", price: 400, defaultQty: 7, defaultBill: 5000, hint: "7 × $400: 7 × 4 = 28 + 00 (Parking Lot) = $2.800" },
    { id: "p5", audioFile: "assets/audio/pos-p5.mp3", icon: "🧃", name: "Jugo Natural", price: 600, defaultQty: 9, defaultBill: 10000, hint: "9 × $600: (10×600=$6.000) menos 1 ($600) = $5.400" },
    { id: "p6", audioFile: "assets/audio/pos-p6.mp3", icon: "📓", name: "Libreta Sticker", price: 800, defaultQty: 4, defaultBill: 5000, hint: "4 × $800: 4 × 8 = 32 + 00 = $3.200" },
    { id: "p7", audioFile: "assets/audio/pos-p7.mp3", icon: "🥟", name: "Empanada Pino", price: 1200, defaultQty: 6, defaultBill: 10000, hint: "6 × $1.200: (6×1.000=$6.000) + (6×200=$1.200) = $7.200" },
    { id: "p8", audioFile: "assets/audio/pos-p8.mp3", icon: "🧋", name: "Boba Tea Kawaii", price: 1500, defaultQty: 5, defaultBill: 10000, hint: "5 × $1.500: (5×1.000=$5.000) + (5×500=$2.500) = $7.500" }
  ],

  // ------------------------------------------------------------------------
  // 3. CAPÍTULOS DEL VIDEO-ESTUDIO ANIMADO: TABLAS 1-12, VENTAS Y VUELTO
  // ------------------------------------------------------------------------
  videoChapters: [
    {
      id: 0,
      audioFile: "",
      title: "Cap. 1: ¿Por qué nos enredamos al cobrar y dar vuelto rápido?",
      mascot: "🐱 Mochi la Cajera",
      durationMs: 8500,
      narration: "¡Hola! Bienvenido y bienvenida a la Tiendita Kawaii. Cuando alguien te compra siete jugos a cuatrocientos pesos y te paga con cinco mil, tratar de multiplicar y restar todo junto da Muri, sobrecarga mental. ¡Pero con Kanban lo hacemos en dos pasos súper simples!",
      subtitle: "🌸 Mochi: «Cobrar y dar vuelto al mismo tiempo satura la mente (Muri). Con Límite WIP = 1: primero calculamos el Total y después hacemos el Puente del Vuelto.»",
      sceneType: "shop_muri"
    },
    {
      id: 1,
      audioFile: "assets/audio/tiendita-cap-1.mp3",
      title: "Cap. 2: El Secreto de las Tablas Grandes (7, 8, 9 y la Docena del 12)",
      mascot: "🐰 Usagi el Vendedor",
      durationMs: 9000,
      narration: "¡No necesitas memorizar como robot! Con Split y Merge partes cualquier tabla difícil en dos fichas fáciles: la tabla del doce es diez más dos. La tabla del nueve es diez menos uno. ¡Y la del siete es cinco más dos!",
      subtitle: "✨ Usagi: «¡Divide y vencerás! Tabla del 12 = (×10) + (×2) | Tabla del 9 = (×10) − (×1) | Tabla del 7 = (×5) + (×2).»",
      sceneType: "tables_split"
    },
    {
      id: 2,
      audioFile: "assets/audio/tiendita-cap-2.mp3",
      title: "Cap. 3: Multiplicar Precios Reales con el Parking Lot de Ceros",
      mascot: "🐼 Kuma el Pastelero",
      durationMs: 8500,
      narration: "Si vendes seis pastelitos a ochocientos pesos, guarda los dos ceros de ochocientos en el Parking Lot. Solo multiplicas seis por ocho igual cuarenta y ocho, devuelves los dos ceros y listo: cuatro mil ochocientos pesos.",
      subtitle: "🅿️ Kuma: «Para 6 × $800: estaciona los 2 ceros (.00), multiplica 6 × 8 = 48 y devuelve los ceros ➡️ ¡$4.800 al tiro!»",
      sceneType: "price_parking"
    },
    {
      id: 3,
      audioFile: "assets/audio/tiendita-cap-3.mp3",
      title: "Cap. 4: El Secreto de los Cajeros: Dar Vuelto Sumando hacia Arriba",
      mascot: "🦄 Hoshi la Experta",
      durationMs: 9500,
      narration: "Para dar vuelto sin equivocarte con las llevadas de la resta, usa el Puente del Vuelto: cuenta cuánto falta para llegar al billete. De tres mil seiscientos a cuatro mil faltan cuatrocientos, y de cuatro mil a cinco mil falta mil. ¡Vuelto total: mil cuatrocientos!",
      subtitle: "💵 Hoshi: «¡Nunca restes con llevadas! Salta hacia arriba: de $3.600 a $4.000 (+$400) y de $4.000 a $5.000 (+$1.000) = ¡$1.400 de vuelto!»",
      sceneType: "change_bridge"
    },
    {
      id: 4,
      audioFile: "",
      title: "Cap. 5: Venta Completa: 12 Huevos a $300 pagando con $5.000 🎉",
      mascot: "🌟 Equipo Tiendita Kawaii",
      durationMs: 9000,
      narration: "¡Mira qué rápido! Doce huevos a trescientos pesos: diez son tres mil, más dos que son seiscientos, dan tres mil seiscientos. Pagan con cinco mil: cuatrocientos para llegar a cuatro mil, más mil para cinco mil... ¡Mil cuatrocientos de vuelto! ¡Qué seco o seca!",
      subtitle: "🎉 Venta Completa: 12 × $300 = $3.600 ➡️ Pagan con $5.000 ➡️ +$400 (a $4.000) + $1.000 (a $5.000) = ¡$1.400 de vuelto!",
      sceneType: "full_sale"
    }
  ],

  // ------------------------------------------------------------------------
  // 4. GALERÍA DE 8 CASOS COTIDIANOS (TABLAS 1-12, COMPRAS, VENTAS Y VUELTO)
  // ------------------------------------------------------------------------
  dailyCases: [
    {
      id: "case-1",
      audioFile: "assets/audio/case-1.mp3",
      title: "La Docena de Huevos en la Feria",
      badge: "🥚 Tabla del 12 + Vuelto",
      kmmPractice: "Split (×10 + ×2) + Puente del Vuelto",
      scenario: "Un cliente compra 1 docena (12) de huevos a $300 cada uno y paga con un billete de $5.000.",
      problemSummary: "12 × $300 = $3.600 | Vuelto de $5.000 = $1.400",
      boardNumber: 300,
      boardMult: 12,
      cards: [
        { label: "🍓 Ficha ×10", colorClass: "ticket-millions", calc: "10 × $300", result: "$3.000" },
        { label: "🍋 Ficha ×2", colorClass: "ticket-hundred-k", calc: "2 × $300", result: "$600" },
        { label: "🧾 Total a Cobrar", colorClass: "ticket-ten-k", calc: "$3.000 + $600", result: "$3.600" },
        { label: "💵 Puente Vuelto ($5.000)", colorClass: "ticket-zeros", calc: "+$400 (a $4.000) + $1.000", result: "$1.400" }
      ],
      shortcut: "Para ×12 separa en 10 + 2 ($3.000 + $600 = $3.600). Y para el vuelto sube de $3.600 a $4.000 (+$400) y a $5.000 (+$1.000) = $1.400."
    },
    {
      id: "case-2",
      audioFile: "assets/audio/case-2.mp3",
      title: "Promoción de 9 Jugos Naturales",
      badge: "🧃 Tabla del 9 + Vuelto",
      kmmPractice: "Truco (×10 − ×1) + Límite WIP = 1",
      scenario: "Vendes 9 jugos a $600 cada uno para un cumpleaños y te pagan con un billete de $10.000.",
      problemSummary: "9 × $600 = $5.400 | Vuelto de $10.000 = $4.600",
      boardNumber: 600,
      boardMult: 9,
      cards: [
        { label: "🍓 Ficha ×10 (Base)", colorClass: "ticket-millions", calc: "10 × $600", result: "$6.000" },
        { label: "🍋 Resta 1 unidad", colorClass: "ticket-hundred-k", calc: "$6.000 − $600", result: "$5.400" },
        { label: "💵 Salto 1 (a $6.000)", colorClass: "ticket-ten-k", calc: "De $5.400 a $6.000", result: "+$600" },
        { label: "💵 Salto 2 (a $10.000)", colorClass: "ticket-zeros", calc: "De $6.000 a $10.000", result: "+$4.000 ➡️ $4.600" }
      ],
      shortcut: "9 × 6 = 54 ➡️ $5.400. De $5.400 para llegar a $6.000 faltan $600, más $4.000 para llegar a $10.000 = ¡$4.600 de vuelto!"
    },
    {
      id: "case-3",
      audioFile: "assets/audio/case-3.mp3",
      title: "7 Lápices Gel en la Librería",
      badge: "🌈 Tabla del 7 + Vuelto",
      kmmPractice: "Split (5 + 2) + Parking Lot",
      scenario: "Un amigo compra 7 lápices brillantes a $800 c/u y paga con $10.000.",
      problemSummary: "7 × $800 = $5.600 | Vuelto de $10.000 = $4.400",
      boardNumber: 800,
      boardMult: 7,
      cards: [
        { label: "🍓 Ficha 5 lápices", colorClass: "ticket-millions", calc: "5 × $800", result: "$4.000" },
        { label: "🍋 Ficha 2 lápices", colorClass: "ticket-hundred-k", calc: "2 × $800", result: "$1.600" },
        { label: "🧾 Total (7 × $800)", colorClass: "ticket-ten-k", calc: "$4.000 + $1.600", result: "$5.600" },
        { label: "💵 Vuelto de $10.000", colorClass: "ticket-zeros", calc: "+$400 (a $6.000) + $4.000", result: "$4.400" }
      ],
      shortcut: "Recuerda la escalera 5-6-7-8: 56 = 7 × 8. Con los dos ceros son $5.600. Para $10.000 faltan $400 + $4.000 = $4.400."
    },
    {
      id: "case-4",
      audioFile: "assets/audio/case-4.mp3",
      title: "6 Empanadas Calientitas del Domingo",
      badge: "🥟 Tabla del 6 + Precio Compuesto",
      kmmPractice: "Split Posicional ($1.000 + $200)",
      scenario: "La familia compra 6 empanadas a $1.200 cada una y pagan con $10.000.",
      problemSummary: "6 × $1.200 = $7.200 | Vuelto de $10.000 = $2.800",
      boardNumber: 1200,
      boardMult: 6,
      cards: [
        { label: "🍓 Ficha Miles", colorClass: "ticket-millions", calc: "6 × $1.000", result: "$6.000" },
        { label: "🍋 Ficha Cientos", colorClass: "ticket-hundred-k", calc: "6 × $200", result: "$1.200" },
        { label: "🧾 Total (6 × 12 = 72)", colorClass: "ticket-ten-k", calc: "$6.000 + $1.200", result: "$7.200" },
        { label: "💵 Vuelto de $10.000", colorClass: "ticket-zeros", calc: "+$800 (a $8.000) + $2.000", result: "$2.800" }
      ],
      shortcut: "6 × 12 es 72 (de la tabla del 12), más dos ceros = $7.200. De $7.200 a $8.000 son $800, y a $10.000 son $2.000 ➡️ $2.800."
    },
    {
      id: "case-5",
      audioFile: "assets/audio/case-5.mp3",
      title: "8 Pastelitos en la Pastelería Kawaii",
      badge: "🐙 Tabla del 8 + Monedas",
      kmmPractice: "Doble de 4 + Puente del Vuelto",
      scenario: "Vendes 8 quequitos a $450 cada uno y te pagan con un billete de $5.000.",
      problemSummary: "8 × $450 = $3.600 | Vuelto de $5.000 = $1.400",
      boardNumber: 450,
      boardMult: 8,
      cards: [
        { label: "🍓 Ficha Centenas", colorClass: "ticket-millions", calc: "8 × $400", result: "$3.200" },
        { label: "🍋 Ficha Cincuentas", colorClass: "ticket-hundred-k", calc: "8 × $50", result: "$400" },
        { label: "🧾 Total (8 × $450)", colorClass: "ticket-ten-k", calc: "$3.200 + $400", result: "$3.600" },
        { label: "💵 Vuelto de $5.000", colorClass: "ticket-zeros", calc: "+$400 (a $4.000) + $1.000", result: "$1.400" }
      ],
      shortcut: "También puedes pensar: 2 quequitos de $450 son $900. Como 8 son 4 pares: 4 × $900 = $3.600. ¡Vuelto: $1.400!"
    },
    {
      id: "case-6",
      audioFile: "assets/audio/case-6.mp3",
      title: "11 Packs de Stickers Coleccionables",
      badge: "🥢 Tabla del 11 + Vuelto",
      kmmPractice: "Patrón Gemelo del 11",
      scenario: "Un curso encarga 11 sobres de stickers a $700 cada uno y pagan con un billete de $10.000.",
      problemSummary: "11 × $700 = $7.700 | Vuelto de $10.000 = $2.300",
      boardNumber: 700,
      boardMult: 11,
      cards: [
        { label: "🍓 Gemelos del 11", colorClass: "ticket-millions", calc: "11 × 7", result: "77" },
        { label: "🅿️ Parking Lot (00)", colorClass: "ticket-hundred-k", calc: "Devolver 2 ceros", result: "$7.700" },
        { label: "💵 Salto a $8.000", colorClass: "ticket-ten-k", calc: "De $7.700 a $8.000", result: "+$300" },
        { label: "💵 Salto a $10.000", colorClass: "ticket-zeros", calc: "De $8.000 a $10.000", result: "+$2.000 ➡️ $2.300" }
      ],
      shortcut: "11 × 7 = 77 ➡️ $7.700. Con $300 llegas a $8.000 y con $2.000 llegas a $10.000: ¡$2.300 de vuelto!"
    },
    {
      id: "case-7",
      audioFile: "assets/audio/case-7.mp3",
      title: "4 Entradas al Cine con Combo",
      badge: "🍀 Tabla del 4 (Doble del Doble)",
      kmmPractice: "Duplicación en Cadena",
      scenario: "4 amigos compran entradas de $3.500 cada una y pagan con un billete de $20.000.",
      problemSummary: "4 × $3.500 = $14.000 | Vuelto de $20.000 = $6.000",
      boardNumber: 3500,
      boardMult: 4,
      cards: [
        { label: "🍓 Primer Doble (×2)", colorClass: "ticket-millions", calc: "2 × $3.500", result: "$7.000" },
        { label: "🍋 Segundo Doble (×4)", colorClass: "ticket-hundred-k", calc: "2 × $7.000", result: "$14.000" },
        { label: "💵 Puente a $20.000", colorClass: "ticket-zeros", calc: "De $14.000 a $20.000", result: "$6.000 de vuelto" }
      ],
      shortcut: "El doble de $3.500 es $7.000, y el doble de $7.000 es $14.000. De 14 mil a 20 mil faltan 6 mil: ¡$6.000 de vuelto!"
    },
    {
      id: "case-8",
      audioFile: "assets/audio/case-8.mp3",
      title: "La Docena Suprema: 12 Colaciones a $1.200",
      badge: "🍩👑 12 × 12 en la Vida Real",
      kmmPractice: "Maestría Total Kanban",
      scenario: "Encargan 12 colaciones de $1.200 cada una y pagan con un billete de $20.000.",
      problemSummary: "12 × $1.200 = $14.400 | Vuelto de $20.000 = $5.600",
      boardNumber: 1200,
      boardMult: 12,
      cards: [
        { label: "🍓 10 Colaciones", colorClass: "ticket-millions", calc: "10 × $1.200", result: "$12.000" },
        { label: "🍋 2 Colaciones", colorClass: "ticket-hundred-k", calc: "2 × $1.200", result: "$2.400" },
        { label: "🧾 Total (12×12=144)", colorClass: "ticket-ten-k", calc: "$12.000 + $2.400", result: "$14.400" },
        { label: "💵 Vuelto de $20.000", colorClass: "ticket-zeros", calc: "+$600 (a $15.000) + $5.000", result: "$5.600" }
      ],
      shortcut: "12 × 12 = 144 ➡️ con dos ceros son $14.400. Súmale $600 para llegar a $15.000 y $5.000 para llegar a $20.000 = ¡$5.600!"
    }
  ],

  // ------------------------------------------------------------------------
  // 5. BANCOS DE PRUEBAS INTERACTIVAS (4 MODOS: TABLAS, VENTAS, VUELTO, EXAMEN)
  // ------------------------------------------------------------------------
  quizzes: {
    // MODO 1: Trucos de las Tablas 1 al 12
    mode1: [
      {
        q: "Para resolver rápido la tabla del 12 (una docena), ¿cómo la partimos en 2 Fichas Kawaii?",
        problem: "Truco para × 12",
        hint: "12 se forma sumando 10 + 2.",
        options: [
          "Multiplicar × 10 y sumarle × 2",
          "Multiplicar × 10 y restarle × 5",
          "Multiplicar × 6 y restarle 1",
          "No se puede partir"
        ],
        correct: 0,
        explanation: "¡Súper! 12 es 10 + 2. Por ejemplo, 12 × 6 = (10×6=60) + (2×6=12) = 72."
      },
      {
        q: "Usando el truco de la docena (10 + 2), ¿cuánto es 12 × 7?",
        problem: "12 × 7",
        hint: "🍓 10 × 7 = 70 | 🍋 2 × 7 = 14. Ahora súmalos.",
        options: ["84", "74", "82", "94"],
        correct: 0,
        explanation: "¡Exacto! 70 + 14 = 84. ¡12 × 7 = 84 sin esfuerzo!"
      },
      {
        q: "El truco de la Tabla del 9 es multiplicar × 10 y restar 1 vez el número. ¿Cuánto es 9 × 8?",
        problem: "9 × 8",
        hint: "10 × 8 = 80. Ahora réstale 8.",
        options: ["72", "64", "78", "81"],
        correct: 0,
        explanation: "¡Brillante! 80 − 8 = 72 (y mira que 7 + 2 = 9)."
      },
      {
        q: "En la escalera mágica «5, 6, 7, 8», ¿cuánto es 7 × 8?",
        problem: "7 × 8",
        hint: "También puedes hacer (5 × 8 = 40) + (2 × 8 = 16).",
        options: ["56", "54", "48", "64"],
        correct: 0,
        explanation: "¡Genial! 40 + 16 = 56 (5, 6 = 7 × 8)."
      },
      {
        q: "¿Cuánto es una docena de docenas (12 × 12)?",
        problem: "12 × 12",
        hint: "🍓 10 × 12 = 120 | 🍋 2 × 12 = 24.",
        options: ["144", "124", "132", "148"],
        correct: 0,
        explanation: "¡Maestro/a! 120 + 24 = 144."
      }
    ],

    // MODO 2: Cobrar en la Tiendita (Multiplicar Cantidad × Precio)
    mode2: [
      {
        q: "Un cliente te compra 6 jugos a $400 cada uno. ¿Cuánto debes cobrar en total?",
        problem: "6 × $400",
        cardsPreview: ["⚡ 6 × 4 = 24", "🅿️ Parking Lot: + 00"],
        hint: "Multiplica 6 × 4 y agrégale los dos ceros de los cientos.",
        options: ["$2.400", "$2.040", "$1.800", "$2.800"],
        correct: 0,
        explanation: "¡Perfecto! 6 × 4 = 24, y con los dos ceros son $2.400."
      },
      {
        q: "Te compran 1 docena (12) de donas a $300 cada una. ¿Cuánto es el total?",
        problem: "12 × $300",
        cardsPreview: ["🍓 10 × $300 = $3.000", "🍋 2 × $300 = $600"],
        hint: "Suma las 10 donas ($3.000) más las 2 donas ($600).",
        options: ["$3.600", "$3.200", "$3.900", "$4.200"],
        correct: 0,
        explanation: "¡Seco/a! $3.000 + $600 = $3.600."
      },
      {
        q: "Vendes 8 galletas grandes a $500 cada una. ¿Cuánto cobras?",
        problem: "8 × $500",
        cardsPreview: ["🖐️ Truco: Cada 2 monedas de $500 forman $1.000"],
        hint: "8 × 5 = 40. Agrega los dos ceros.",
        options: ["$4.000", "$4.500", "$3.500", "$8.000"],
        correct: 0,
        explanation: "¡Al tiro! 8 monedas de $500 son $4.000."
      },
      {
        q: "Un cliente lleva 7 libretas Kawaii de $700 cada una. ¿Cuánto es el total?",
        problem: "7 × $700",
        cardsPreview: ["🍓 7 × 7 = 49", "🅿️ Parking Lot: + 00"],
        hint: "7 × 7 = 49, y devuelves los 2 ceros.",
        options: ["$4.900", "$4.200", "$5.600", "$4.700"],
        correct: 0,
        explanation: "¡Exacto! 7 × 7 = 49 ➡️ $4.900."
      },
      {
        q: "Vendes 11 helados a $600 cada uno. ¿Cuánto cobras en total?",
        problem: "11 × $600",
        cardsPreview: ["🍓 10 × $600 = $6.000", "🍋 1 × $600 = $600"],
        hint: "11 × 6 = 66, más dos ceros.",
        options: ["$6.600", "$6.100", "$7.200", "$5.600"],
        correct: 0,
        explanation: "¡Impecable! 11 × $600 = $6.600."
      }
    ],

    // MODO 3: El Puente del Vuelto (Dar Vuelto Sin Restas Difíciles)
    mode3: [
      {
        q: "La compra sale $1.700 y el cliente te paga con un billete de $2.000. ¿Cuánto vuelto le das?",
        problem: "Cobras $1.700 | Pagan con $2.000",
        cardsPreview: ["🌉 Salto: De $1.700 para llegar a $2.000"],
        hint: "¿Cuánto le falta a 700 para completar otros 1.000?",
        options: ["$300", "$700", "$200", "$400"],
        correct: 0,
        explanation: "¡Súper! $1.700 + $300 = $2.000. ¡El vuelto es $300!"
      },
      {
        q: "La cuenta es $3.600 y te pagan con un billete de $5.000. Usa el Puente del Vuelto:",
        problem: "Cobras $3.600 | Pagan con $5.000",
        cardsPreview: ["Salto 1: De $3.600 a $4.000 (+$400)", "Salto 2: De $4.000 a $5.000 (+$1.000)"],
        hint: "Suma los dos saltos: $400 + $1.000.",
        options: ["$1.400", "$2.400", "$1.600", "$1.200"],
        correct: 0,
        explanation: "¡Cajero/a estrella! $400 para llegar a $4.000, más $1.000 para llegar a $5.000 = $1.400."
      },
      {
        q: "Cobras $6.800 y te pagan con un billete azul de $10.000. ¿Cuánto es el vuelto?",
        problem: "Cobras $6.800 | Pagan con $10.000",
        cardsPreview: ["Salto 1: De $6.800 a $7.000 (+$200)", "Salto 2: De $7.000 a $10.000 (+$3.000)"],
        hint: "Con $200 llegas a $7.000. ¿Cuánto falta de $7.000 a $10.000?",
        options: ["$3.200", "$4.200", "$3.800", "$2.200"],
        correct: 0,
        explanation: "¡Excelente! $200 + $3.000 = $3.200 de vuelto."
      },
      {
        q: "La compra sale $12.500 y te pagan con un billete de $20.000. ¿Cuánto das de vuelto?",
        problem: "Cobras $12.500 | Pagan con $20.000",
        cardsPreview: ["Salto 1: De $12.500 a $13.000 (+$500)", "Salto 2: De $13.000 a $20.000 (+$7.000)"],
        hint: "$500 para llegar a $13.000, más $7.000 para llegar a $20.000.",
        options: ["$7.500", "$8.500", "$6.500", "$7.000"],
        correct: 0,
        explanation: "¡Seco/a! $500 + $7.000 = $7.500 de vuelto."
      },
      {
        q: "Cobras $2.350 y te pagan con $5.000. ¿Cuánto vuelto entregas?",
        problem: "Cobras $2.350 | Pagan con $5.000",
        cardsPreview: ["+$50 (a $2.400)", "+$600 (a $3.000)", "+$2.000 (a $5.000)"],
        hint: "De 350 a 1.000 faltan 650. Y de $3.000 a $5.000 faltan $2.000.",
        options: ["$2.650", "$2.750", "$3.650", "$2.350"],
        correct: 0,
        explanation: "¡Dominio total del vuelto! $50 + $600 + $2.000 = $2.650."
      }
    ],

    // MODO 4: Examen Estrella de la Tiendita (10 Retos Completos: Multiplicar + Dar Vuelto)
    mode4: [
      {
        q: "Reto 1/10: Te compran 4 jugos de $600 y pagan con $5.000. ¿Cuánto es el TOTAL y el VUELTO?",
        problem: "4 × $600 | Pagan con $5.000",
        hint: "4 × $600 = $2.400. De $2.400 a $3.000 son $600 + $2.000 para $5.000.",
        options: [
          "Total: $2.400 | Vuelto: $2.600",
          "Total: $2.400 | Vuelto: $3.600",
          "Total: $2.600 | Vuelto: $2.400",
          "Total: $1.800 | Vuelto: $3.200"
        ],
        correct: 0,
        explanation: "¡4 × $600 = $2.400! Y de $2.400 a $5.000 el vuelto es $2.600."
      },
      {
        q: "Reto 2/10: Vendes 1 docena (12) de huevos a $300 c/u y pagan con $5.000. ¿Total y Vuelto?",
        problem: "12 × $300 | Pagan con $5.000",
        hint: "12 × $300 = $3.600. De $3.600 a $5.000 faltan $400 + $1.000.",
        options: [
          "Total: $3.600 | Vuelto: $1.400",
          "Total: $3.600 | Vuelto: $2.400",
          "Total: $3.200 | Vuelto: $1.800",
          "Total: $4.200 | Vuelto: $800"
        ],
        correct: 0,
        explanation: "¡12 × $300 = $3.600 y el vuelto de $5.000 es $1.400!"
      },
      {
        q: "Reto 3/10: ¿Cuánto es 9 × 7 usando el truco Kanban (10×7 menos 7)?",
        problem: "9 × 7",
        hint: "70 − 7.",
        options: ["63", "56", "67", "72"],
        correct: 0,
        explanation: "70 − 7 = 63. ¡Rápido y seguro!"
      },
      {
        q: "Reto 4/10: Compran 7 donas a $500 c/u y pagan con $5.000. ¿Total y Vuelto?",
        problem: "7 × $500 | Pagan con $5.000",
        hint: "7 × $500 = $3.500. ¿Cuánto falta de $3.500 para llegar a $5.000?",
        options: [
          "Total: $3.500 | Vuelto: $1.500",
          "Total: $3.500 | Vuelto: $2.500",
          "Total: $4.000 | Vuelto: $1.000",
          "Total: $3.000 | Vuelto: $2.000"
        ],
        correct: 0,
        explanation: "7 × $500 = $3.500. Con $500 llegas a $4.000 y con $1.000 a $5.000 ➡️ $1.500 de vuelto."
      },
      {
        q: "Reto 5/10: ¿Cuánto es 12 × 8 (1 docena de cosas que valen 8)?",
        problem: "12 × 8",
        hint: "(10 × 8 = 80) + (2 × 8 = 16).",
        options: ["96", "86", "92", "104"],
        correct: 0,
        explanation: "80 + 16 = 96. ¡Excelente uso de Split & Merge!"
      },
      {
        q: "Reto 6/10: Vendes 8 lápices a $800 c/u y te pagan con $10.000. ¿Total y Vuelto?",
        problem: "8 × $800 | Pagan con $10.000",
        hint: "8 × 8 = 64 ➡️ $6.400. De $6.400 a $7.000 son $600 + $3.000 a $10.000.",
        options: [
          "Total: $6.400 | Vuelto: $3.600",
          "Total: $6.400 | Vuelto: $4.600",
          "Total: $5.600 | Vuelto: $4.400",
          "Total: $6.800 | Vuelto: $3.200"
        ],
        correct: 0,
        explanation: "8 × $800 = $6.400. Y $600 + $3.000 = $3.600 de vuelto."
      },
      {
        q: "Reto 7/10: Vendes 6 empanadas a $1.200 c/u y pagan con $10.000. ¿Total y Vuelto?",
        problem: "6 × $1.200 | Pagan con $10.000",
        hint: "6 × $1.200 = $7.200. De $7.200 a $8.000 son $800 + $2.000 a $10.000.",
        options: [
          "Total: $7.200 | Vuelto: $2.800",
          "Total: $7.200 | Vuelto: $3.800",
          "Total: $6.200 | Vuelto: $3.800",
          "Total: $7.600 | Vuelto: $2.400"
        ],
        correct: 0,
        explanation: "6 × $1.200 = $7.200, y el vuelto es $2.800. ¡Seco/a!"
      },
      {
        q: "Reto 8/10: Vendes 9 stickers a $300 c/u y pagan con $5.000. ¿Total y Vuelto?",
        problem: "9 × $300 | Pagan con $5.000",
        hint: "9 × $300 = $2.700. De $2.700 a $3.000 son $300 + $2.000 a $5.000.",
        options: [
          "Total: $2.700 | Vuelto: $2.300",
          "Total: $2.700 | Vuelto: $3.300",
          "Total: $2.400 | Vuelto: $2.600",
          "Total: $2.900 | Vuelto: $2.100"
        ],
        correct: 0,
        explanation: "9 × $300 = $2.700, y de $2.700 a $5.000 son $2.300 de vuelto."
      },
      {
        q: "Reto 9/10: Te compran 11 alfajores a $400 c/u y pagan con $5.000. ¿Total y Vuelto?",
        problem: "11 × $400 | Pagan con $5.000",
        hint: "11 × 4 = 44 ➡️ $4.400. ¿Cuánto falta para $5.000?",
        options: [
          "Total: $4.400 | Vuelto: $600",
          "Total: $4.400 | Vuelto: $1.600",
          "Total: $4.000 | Vuelto: $1.000",
          "Total: $4.800 | Vuelto: $200"
        ],
        correct: 0,
        explanation: "11 × $400 = $4.400 y faltan $600 para llegar a $5.000."
      },
      {
        q: "Reto Final 10/10: 12 cajas de lápices a $1.200 c/u pagando con $20.000. ¿Total y Vuelto?",
        problem: "12 × $1.200 | Pagan con $20.000",
        hint: "12 × 12 = 144 ➡️ $14.400. De $14.400 a $15.000 (+$600) y a $20.000 (+$5.000).",
        options: [
          "Total: $14.400 | Vuelto: $5.600",
          "Total: $14.400 | Vuelto: $6.600",
          "Total: $12.400 | Vuelto: $7.600",
          "Total: $14.000 | Vuelto: $6.000"
        ],
        correct: 0,
        explanation: "¡12 × $1.200 = $14.400 y el vuelto es $5.600! ¡Dominaste las Tablas y la Tiendita Kawaii!"
      }
    ]
  },

  // ------------------------------------------------------------------------
  // 6. RANGOS KAWAII DE PROGRESO (N0 a N5) EN LA TIENDITA
  // ------------------------------------------------------------------------
  kmmLevels: [
    {
      level: "N0",
      name: "Inicial • Pollito Aprendiz de Tienda 🐣",
      value: "Descubriendo las Tablas sin Miedo",
      desc: "Antes intentabas memorizar las tablas del 1 al 12 de memoria o restar el vuelto con llevadas en el aire. Ahora tienes tu sistema visual.",
      xpRequired: 0
    },
    {
      level: "N1",
      name: "Explorador • Conejito de las Tablas 1–6 🐰",
      value: "Visualización de Dobles y Mitades",
      desc: "Dominas los dobles (×2, ×4), los grupos de 5 y separas precios en fichas de colores.",
      xpRequired: 30
    },
    {
      level: "N2",
      name: "Enfocado • Gatito Cajero WIP = 1 🐱",
      value: "Flujo Ordenado: Primero Total, Luego Vuelto",
      desc: "Nunca mezclas la multiplicación con el vuelto al mismo tiempo: primero cierras el Total y luego saltas al billete.",
      xpRequired: 70
    },
    {
      level: "N3",
      name: "Avanzado • Panda Maestro de la Docena (7–12) 🐼",
      value: "Dominio de 7, 8, 9, 11 y 12 con Split & Merge",
      desc: "Resuelves la tabla del 12 como (10+2) y la del 9 como (10−1), y das vuelto exacto con billetes de $5.000 y $10.000.",
      xpRequired: 120
    },
    {
      level: "N4",
      name: "Veloz • Unicornio del Vuelto Rápido 🦄",
      value: "Velocidad en Compras Reales",
      desc: "Calculas totales y vueltos en la feria, el kiosco o el supermercado en pocos segundos y sin calculadora.",
      xpRequired: 180
    },
    {
      level: "N5",
      name: "Leyenda • Estrella de la Tiendita Kawaii 🌟",
      value: "Confianza Matemática Total en la Vida Diaria",
      desc: "Dominas tanto los millones como todas las tablas del 1 al 12, ventas y vueltos de la vida cotidiana.",
      xpRequired: 250
    }
  ]
};

window.StudioData = TienditaData;
