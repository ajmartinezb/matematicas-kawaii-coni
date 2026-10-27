// ==========================================================================
// DATOS EDUCATIVOS DEL ESTUDIO KAWAII KANBAN 🌸✨
// Para Niños y Jóvenes • Español de Chile 🇨🇱
// ==========================================================================

const StudioData = {
  // ------------------------------------------------------------------------
  // 1. CAPÍTULOS DEL VIDEO-ESTUDIO ANIMADO KAWAII (#video-estudio)
  // ------------------------------------------------------------------------
  videoChapters: [
    {
      id: 0,
      audioFile: "",
      title: "Cap. 1: ¿Por qué nos bloqueamos con 1.570.000 × 2?",
      mascot: "🐱 Mochi la Gatita",
      durationMs: 7500,
      narration: "¡Hola! ¿Cachai cuando intentas multiplicar un millón quinientos setenta mil por dos todo junto en tu cabeza? Ahí tu mente sufre Muri, que en Kanban significa sobrecarga. ¡Es como meter siete autos al mismo tiempo en la Costanera en hora punta!",
      subtitle: "🌸 Mochi: «¿Cachai que intentar multiplicar 1.570.000 × 2 de golpe crea un taco mental (Muri / Sobrecarga)? ¡No eres tú, es tratar de hacer todo al mismo tiempo!»",
      sceneType: "muri_jam"
    },
    {
      id: 1,
      audioFile: "",
      title: "Cap. 2: Poder 1 y 2 — Fichas de Colores y Límite WIP = 1",
      mascot: "🐰 Usagi el Conejito",
      durationMs: 8000,
      narration: "En el método Kanban aprendemos dos poderes súper bacanes: Primero, visualizar el número en Fichas Kawaii de colores. Segundo, limitar el trabajo en progreso a UNO. ¡Deja de empezar y empieza a terminar!",
      subtitle: "✨ Usagi: «¡Divide el número gigante en Fichas Kawaii de colores y aplica Límite WIP = 1! Tu mente solo multiplica UNA ficha chiquitita a la vez.»",
      sceneType: "cards_split"
    },
    {
      id: 2,
      audioFile: "",
      title: "Cap. 3: El Parking Lot de Ceros (Estacionamiento Mágico)",
      mascot: "🐼 Kuma el Panda",
      durationMs: 8000,
      narration: "Mira los cuatro ceros del final de un millón quinientos setenta mil. En Kanban usamos un Parking Lot, un estacionamiento especial. Guardamos los ceros ahí tranquilitos y solo nos queda ciento cincuenta y siete por dos.",
      subtitle: "🅿️ Kuma: «Usamos un Parking Lot: estacionamos los ceros finales un ratito y el problema baja de 1.570.000 a partes súper fáciles.»",
      sceneType: "parking_lot"
    },
    {
      id: 3,
      audioFile: "assets/audio/video-cap-3.mp3",
      title: "Cap. 4: Flujo Pull con 1.570.000 × 2 (Separar y Juntar)",
      mascot: "🦄 Hoshi el Unicornio",
      durationMs: 9000,
      narration: "¡Ahora sale al tiro! Primera ficha rosada: un millón por dos son dos millones. Segunda ficha amarilla: quinientos mil por dos es un millón. Tercera ficha menta: setenta mil por dos son ciento cuarenta mil.",
      subtitle: "⚡ Hoshi: «Ficha Rosada: 1.000.000 × 2 = 2.000.000 | Ficha Amarilla: 500.000 × 2 = 1.000.000 | Ficha Menta: 70.000 × 2 = 140.000»",
      sceneType: "pull_flow"
    },
    {
      id: 4,
      audioFile: "",
      title: "Cap. 5: Merge Final y Entrega Exitosa = 3.140.000 🎉",
      mascot: "🌟 Todas las Mascotas",
      durationMs: 8000,
      narration: "¡Último paso! En la columna de Entrega juntamos todo con el Merge: dos millones más un millón son tres millones, más ciento cuarenta mil... ¡Tres millones ciento cuarenta mil! ¡Qué seco o seca eres, viste qué fácil!",
      subtitle: "🎉 ¡MERGE FINAL! 2.000.000 + 1.000.000 = 3.000.000 ➡️ + 140.000 = 3.140.000. ¡Seco/a, lo lograste al tiro sin calculadora!",
      sceneType: "final_merge"
    }
  ],

  // ------------------------------------------------------------------------
  // 2. GALERÍA DE 8 EJEMPLOS GUIADOS CON FICHAS KAWAII (#ejemplos)
  // ------------------------------------------------------------------------
  guidedExamples: [
    {
      id: "ex-1",
      audioFile: "",
      title: "El Reto Estrella de los Millones",
      number: 1570000,
      multiplier: 2,
      formattedProblem: "1.570.000 × 2",
      formattedResult: "3.140.000",
      difficulty: "⭐ Caso Estrella (Con Llevada)",
      kmmPractice: "Split & Merge + Parking Lot",
      tip: "Separa 1.500.000 y 70.000, o haz 1 millón + 500 mil + 70 mil. ¡Dos millones + un millón forman 3 millones al tiro!",
      cards: [
        { label: "Ficha Rosa (Millones)", colorClass: "ticket-millions", part: "1.000.000", calc: "1.000.000 × 2", result: "2.000.000" },
        { label: "Ficha Amarilla (Cent. Mil)", colorClass: "ticket-hundred-k", part: "500.000", calc: "500.000 × 2", result: "1.000.000" },
        { label: "Ficha Menta (Dec. Mil)", colorClass: "ticket-ten-k", part: "70.000", calc: "70.000 × 2", result: "140.000" },
        { label: "Parking Lot (Ceros)", colorClass: "ticket-zeros", part: "0.000", calc: "Esperan en 🅿️", result: "Se mantienen" }
      ],
      mentalShortcut: "Truco Rápido: 1 millón y medio por 2 son 3 millones. Y 70 mil por 2 son 140 mil. Juntos dan al tiro: ¡3 millones 140 mil!"
    },
    {
      id: "ex-2",
      audioFile: "assets/audio/ex-2.mp3",
      title: "Flujo Suave Sin Llevadas",
      number: 2340000,
      multiplier: 2,
      formattedProblem: "2.340.000 × 2",
      formattedResult: "4.680.000",
      difficulty: "🐣 Nivel Suave (N1)",
      kmmPractice: "Visualización por Colores",
      tip: "Aquí ningún número pasa de 10 al multiplicarse por 2. ¡Cada ficha se duplica directo!",
      cards: [
        { label: "Ficha Rosa (Millones)", colorClass: "ticket-millions", part: "2.000.000", calc: "2.000.000 × 2", result: "4.000.000" },
        { label: "Ficha Amarilla (Cent. Mil)", colorClass: "ticket-hundred-k", part: "300.000", calc: "300.000 × 2", result: "600.000" },
        { label: "Ficha Menta (Dec. Mil)", colorClass: "ticket-ten-k", part: "40.000", calc: "40.000 × 2", result: "80.000" }
      ],
      mentalShortcut: "Duplica el 2 en 4, el 3 en 6 y el 4 en 8, y devuelves los ceros del Parking Lot: ¡4 millones 680 mil!"
    },
    {
      id: "ex-3",
      audioFile: "assets/audio/ex-3.mp3",
      title: "El Truco de los Medios Millones",
      number: 4500000,
      multiplier: 2,
      formattedProblem: "4.500.000 × 2",
      formattedResult: "9.000.000",
      difficulty: "🐰 Nivel Rápido (N1)",
      kmmPractice: "Limitar WIP = 1",
      tip: "500.000 es justo medio millón. Al multiplicarlo por 2, se convierte en 1 millón entero.",
      cards: [
        { label: "Ficha Rosa (Millones)", colorClass: "ticket-millions", part: "4.000.000", calc: "4.000.000 × 2", result: "8.000.000" },
        { label: "Ficha Amarilla (Cent. Mil)", colorClass: "ticket-hundred-k", part: "500.000", calc: "500.000 × 2", result: "1.000.000" }
      ],
      mentalShortcut: "4 millones por 2 son 8 millones, más 1 millón de los 500 mil por 2: ¡9 millones cerrados!"
    },
    {
      id: "ex-4",
      audioFile: "assets/audio/ex-4.mp3",
      title: "Desbloqueando Llevadas Dobles",
      number: 1850000,
      multiplier: 2,
      formattedProblem: "1.850.000 × 2",
      formattedResult: "3.700.000",
      difficulty: "🐱 Nivel Estratega (N2)",
      kmmPractice: "Gestión de Llevadas sin Enredos",
      tip: "En vez de complicarte con el 8 y el 5, pasa una ficha a la vez por la zona WIP = 1.",
      cards: [
        { label: "Ficha Rosa (Millones)", colorClass: "ticket-millions", part: "1.000.000", calc: "1.000.000 × 2", result: "2.000.000" },
        { label: "Ficha Amarilla (Cent. Mil)", colorClass: "ticket-hundred-k", part: "800.000", calc: "800.000 × 2", result: "1.600.000" },
        { label: "Ficha Menta (Dec. Mil)", colorClass: "ticket-ten-k", part: "50.000", calc: "50.000 × 2", result: "100.000" }
      ],
      mentalShortcut: "2 millones más 1 millón 600 mil son 3 millones 600 mil. Más 100 mil: ¡3 millones 700 mil!"
    },
    {
      id: "ex-5",
      audioFile: "assets/audio/ex-5.mp3",
      title: "Multiplicando por 3 con Kanban",
      number: 3200000,
      multiplier: 3,
      formattedProblem: "3.200.000 × 3",
      formattedResult: "9.600.000",
      difficulty: "🐱 Nivel Estratega (N2)",
      kmmPractice: "Reglas Claras por Posición",
      tip: "¡El tablero Kanban funciona igual de bacán cuando multiplicas por 3, 4 o 5!",
      cards: [
        { label: "Ficha Rosa (Millones)", colorClass: "ticket-millions", part: "3.000.000", calc: "3.000.000 × 3", result: "9.000.000" },
        { label: "Ficha Amarilla (Cent. Mil)", colorClass: "ticket-hundred-k", part: "200.000", calc: "200.000 × 3", result: "600.000" }
      ],
      mentalShortcut: "3 millones por 3 son 9 millones, más 200 mil por 3 que son 600 mil: ¡9 millones 600 mil!"
    },
    {
      id: "ex-6",
      audioFile: "assets/audio/ex-6.mp3",
      title: "Decenas de Millones sin Miedo",
      number: 12400000,
      multiplier: 2,
      formattedProblem: "12.400.000 × 2",
      formattedResult: "24.800.000",
      difficulty: "🐼 Nivel Maestro (N3)",
      kmmPractice: "Parking Lot de 5 Ceros",
      tip: "Guarda los 5 ceros (.00.000) en el Parking Lot y solo duplica el 12 y el 4.",
      cards: [
        { label: "Ficha Rosa (Millones)", colorClass: "ticket-millions", part: "12.000.000", calc: "12.000.000 × 2", result: "24.000.000" },
        { label: "Ficha Amarilla (Cent. Mil)", colorClass: "ticket-hundred-k", part: "400.000", calc: "400.000 × 2", result: "800.000" }
      ],
      mentalShortcut: "12 millones por 2 son 24 millones, y 400 mil por 2 son 800 mil: ¡24 millones 800 mil!"
    },
    {
      id: "ex-7",
      audioFile: "assets/audio/ex-7.mp3",
      title: "Multiplicar por 4 (Doble Duplicación)",
      number: 750000,
      multiplier: 4,
      formattedProblem: "750.000 × 4",
      formattedResult: "3.000.000",
      difficulty: "🦄 Nivel Veloz (N4)",
      kmmPractice: "Mejora Continua Kaizen",
      tip: "Multiplicar por 4 es duplicar dos veces: 750 mil por 2 es 1 millón y medio, y por 2 de nuevo son 3 millones.",
      cards: [
        { label: "Ficha Amarilla (Cent. Mil)", colorClass: "ticket-hundred-k", part: "700.000", calc: "700.000 × 4", result: "2.800.000" },
        { label: "Ficha Menta (Dec. Mil)", colorClass: "ticket-ten-k", part: "50.000", calc: "50.000 × 4", result: "200.000" }
      ],
      mentalShortcut: "2 millones 800 mil más 200 mil dan justo ¡3 millones!"
    },
    {
      id: "ex-8",
      audioFile: "assets/audio/ex-8.mp3",
      title: "Cuatro Fichas en Armonía",
      number: 2635000,
      multiplier: 2,
      formattedProblem: "2.635.000 × 2",
      formattedResult: "5.270.000",
      difficulty: "🌟 Nivel Estrella (N5)",
      kmmPractice: "Flujo Completo de 4 Fichas",
      tip: "Agrupa de dos en dos: (2.600.000 × 2 = 5.200.000) y (35.000 × 2 = 70.000).",
      cards: [
        { label: "Ficha Rosa (Millones)", colorClass: "ticket-millions", part: "2.000.000", calc: "2.000.000 × 2", result: "4.000.000" },
        { label: "Ficha Amarilla (Cent. Mil)", colorClass: "ticket-hundred-k", part: "600.000", calc: "600.000 × 2", result: "1.200.000" },
        { label: "Ficha Menta (Dec. Mil)", colorClass: "ticket-ten-k", part: "30.000", calc: "30.000 × 2", result: "60.000" },
        { label: "Ficha Lavanda (Miles)", colorClass: "ticket-thousands", part: "5.000", calc: "5.000 × 2", result: "10.000" }
      ],
      mentalShortcut: "4 millones más 1 millón 200 mil son 5 millones 200 mil. Y 60 mil más 10 mil son 70 mil: ¡5 millones 270 mil!"
    }
  ],

  // ------------------------------------------------------------------------
  // 3. BANCOS DE PRUEBAS Y QUIZZES (4 MODOS DE APRENDIZAJE - #pruebas)
  // ------------------------------------------------------------------------
  quizzes: {
    // MODO 1: Rompe-Números (Descomposición en Fichas Kanban)
    mode1: [
      {
        q: "¿Cómo se divide 1.570.000 en 3 Fichas Kawaii de valor posicional para nuestro tablero Kanban?",
        problem: "Descomponer: 1.570.000",
        hint: "Mira el 1 (millones), el 5 (centenas de mil) y el 7 (decenas de mil).",
        options: [
          "1.000.000 + 500.000 + 70.000",
          "1.000.000 + 50.000 + 7.000",
          "100.000 + 500.000 + 70.000",
          "1.500.000 + 700.000"
        ],
        correct: 0,
        explanation: "¡Exacto! 🍓 Ficha Rosa = 1.000.000, 🍋 Ficha Amarilla = 500.000 y 🌿 Ficha Menta = 70.000."
      },
      {
        q: "Si estacionamos los ceros finales de 1.570.000 en el Parking Lot, ¿cuántos ceros guardamos y qué número nos queda para multiplicar por 2?",
        problem: "Parking Lot: 1.570.000",
        hint: "Cuenta todos los ceros seguidos a la derecha del 7.",
        options: [
          "Guardamos 4 ceros (0.000) y multiplicamos 157 × 2",
          "Guardamos 2 ceros (00) y multiplicamos 157 × 2",
          "Guardamos 6 ceros y multiplicamos 15 × 2",
          "No hay ceros para guardar"
        ],
        correct: 0,
        explanation: "¡Súper! 1.570.000 tiene 4 ceros al final. Calculas 157 × 2 = 314 y luego devuelves los 4 ceros: 3.140.000."
      },
      {
        q: "En el tablero Kanban con Límite WIP = 1, ¿cuánto da la Ficha Amarilla de 500.000 × 2?",
        problem: "Ficha Amarilla: 500.000 × 2",
        hint: "500 mil es medio millón. ¿Cuánto son dos medios millones?",
        options: [
          "1.000.000 (Un millón)",
          "100.000 (Cien mil)",
          "10.000.000 (Diez millones)",
          "520.000"
        ],
        correct: 0,
        explanation: "¡Brillante! 500.000 × 2 = 1.000.000. Esa es la clave para que 1.570.000 × 2 pase de 2 millones a 3 millones."
      },
      {
        q: "¿Cómo descomponemos 3.460.000 en Fichas Kawaii para multiplicarlo mentalmente?",
        problem: "Descomponer: 3.460.000",
        hint: "Separa los millones, las centenas de mil y las decenas de mil.",
        options: [
          "3.000.000 + 400.000 + 60.000",
          "3.000.000 + 40.000 + 6.000",
          "300.000 + 40.000 + 600",
          "3.400.000 + 600.000"
        ],
        correct: 0,
        explanation: "¡Muy bien! 3.000.000 (Rosa) + 400.000 (Amarilla) + 60.000 (Menta)."
      },
      {
        q: "En la técnica Split & Merge (Separar y Juntar), si ya calculaste: 2.000.000 + 1.000.000 + 140.000, ¿cuál es el Merge (suma final)?",
        problem: "Merge: 2.000.000 + 1.000.000 + 140.000",
        hint: "Suma primero los millones (2M + 1M) y luego agrega los 140.000.",
        options: [
          "3.140.000",
          "2.140.000",
          "3.014.000",
          "314.000"
        ],
        correct: 0,
        explanation: "¡Increíble! 2.000.000 + 1.000.000 = 3.000.000, y más 140.000 = 3.140.000."
      }
    ],

    // MODO 2: Paso a Paso con Fichas Visibles
    mode2: [
      {
        q: "Observa las fichas ya separadas y elige el resultado final de 1.570.000 × 2:",
        problem: "1.570.000 × 2",
        cardsPreview: ["🍓 1.000.000 × 2 = 2.000.000", "🍋 500.000 × 2 = 1.000.000", "🌿 70.000 × 2 = 140.000"],
        hint: "Suma las 3 fichas: 2.000.000 + 1.000.000 + 140.000",
        options: ["3.140.000", "2.140.000", "3.040.000", "2.570.000"],
        correct: 0,
        explanation: "¡Exacto! 2.000.000 + 1.000.000 = 3.000.000 + 140.000 = 3.140.000."
      },
      {
        q: "Usa las Fichas Kawaii visibles para resolver 1.640.000 × 2:",
        problem: "1.640.000 × 2",
        cardsPreview: ["🍓 1.000.000 × 2 = 2.000.000", "🍋 600.000 × 2 = 1.200.000", "🌿 40.000 × 2 = 80.000"],
        hint: "2.000.000 + 1.200.000 = 3.200.000. Ahora súmale 80.000.",
        options: ["3.280.000", "2.280.000", "3.240.000", "3.680.000"],
        correct: 0,
        explanation: "¡Súper bien! 2.000.000 + 1.200.000 = 3.200.000 + 80.000 = 3.280.000."
      },
      {
        q: "Resuelve con apoyo de fichas: 2.530.000 × 2",
        problem: "2.530.000 × 2",
        cardsPreview: ["🍓 2.000.000 × 2 = 4.000.000", "🍋 500.000 × 2 = 1.000.000", "🌿 30.000 × 2 = 60.000"],
        hint: "4 millones + 1 millón = 5 millones. Más 60 mil...",
        options: ["5.060.000", "4.060.000", "5.600.000", "4.560.000"],
        correct: 0,
        explanation: "¡Genial! 4.000.000 + 1.000.000 = 5.000.000 + 60.000 = 5.060.000."
      },
      {
        q: "Resuelve con apoyo de fichas: 3.700.000 × 2",
        problem: "3.700.000 × 2",
        cardsPreview: ["🍓 3.000.000 × 2 = 6.000.000", "🍋 700.000 × 2 = 1.400.000"],
        hint: "6 millones + 1 millón 400 mil.",
        options: ["7.400.000", "6.400.000", "7.140.000", "6.700.000"],
        correct: 0,
        explanation: "¡Perfecto! 6.000.000 + 1.400.000 = 7.400.000."
      },
      {
        q: "Resuelve con apoyo de fichas: 4.150.000 × 2",
        problem: "4.150.000 × 2",
        cardsPreview: ["🍓 4.000.000 × 2 = 8.000.000", "🍋 100.000 × 2 = 200.000", "🌿 50.000 × 2 = 100.000"],
        hint: "8 millones + 200 mil + 100 mil.",
        options: ["8.300.000", "8.150.000", "8.250.000", "9.300.000"],
        correct: 0,
        explanation: "¡Eso es! 200.000 + 100.000 = 300.000, así que queda 8.300.000."
      }
    ],

    // MODO 3: Cálculo Mental Puro (Kanban en tu Mente)
    mode3: [
      {
        q: "Hazlo en tu mente creando las Fichas Kawaii imaginarias:",
        problem: "1.570.000 × 2",
        hint: "1,5 millones × 2 = 3 millones. 70 mil × 2 = 140 mil.",
        options: ["3.140.000", "2.140.000", "3.040.000", "3.170.000"],
        correct: 0,
        explanation: "¡Lo dominaste! 1.570.000 × 2 = 3.140.000."
      },
      {
        q: "Calcula mentalmente usando Límite WIP = 1:",
        problem: "1.590.000 × 2",
        hint: "1.500.000 × 2 = 3.000.000. Y 90.000 × 2 = 180.000.",
        options: ["3.180.000", "2.180.000", "3.090.000", "3.900.000"],
        correct: 0,
        explanation: "¡Impresionante! 3.000.000 + 180.000 = 3.180.000."
      },
      {
        q: "Calcula mentalmente:",
        problem: "2.540.000 × 2",
        hint: "2.500.000 × 2 = 5.000.000. Y 40.000 × 2 = 80.000.",
        options: ["5.080.000", "4.080.000", "5.800.000", "4.580.000"],
        correct: 0,
        explanation: "¡Excelente! 2,5 millones × 2 son 5 millones, más 80 mil = 5.080.000."
      },
      {
        q: "Calcula mentalmente:",
        problem: "3.560.000 × 2",
        hint: "3.500.000 × 2 = 7.000.000. Y 60.000 × 2 = 120.000.",
        options: ["7.120.000", "6.120.000", "7.060.000", "6.560.000"],
        correct: 0,
        explanation: "¡Brillante! 7.000.000 + 120.000 = 7.120.000."
      },
      {
        q: "Calcula mentalmente:",
        problem: "1.450.000 × 2",
        hint: "1.400.000 × 2 = 2.800.000. Y 50.000 × 2 = 100.000.",
        options: ["2.900.000", "2.850.000", "3.900.000", "2.450.000"],
        correct: 0,
        explanation: "¡Súper! 2.800.000 + 100.000 = 2.900.000."
      }
    ],

    // MODO 4: Examen Estrella (10 Retos para subir de rango)
    mode4: [
      {
        q: "Reto 1/10: El desafío estrella. ¿Cuánto es 1.570.000 × 2?",
        problem: "1.570.000 × 2",
        hint: "Ficha 1.500.000 × 2 = 3.000.000 | Ficha 70.000 × 2 = 140.000",
        options: ["3.140.000", "2.140.000", "3.014.000", "2.570.000"],
        correct: 0,
        explanation: "¡3.140.000! Ya nunca más te dará miedo este número."
      },
      {
        q: "Reto 2/10: ¿Qué significa «Límite WIP = 1» en nuestro método Kanban mental?",
        problem: "Concepto Kanban: WIP = 1",
        hint: "WIP = Work in Progress (Trabajo en Progreso).",
        options: [
          "Multiplicar solo 1 ficha pequeña a la vez antes de pasar a la siguiente",
          "Multiplicar todos los números al mismo tiempo con prisa",
          "Hacer solo un ejercicio al año",
          "No usar colores"
        ],
        correct: 0,
        explanation: "¡Correcto! Límite WIP = 1 evita la sobrecarga mental (Muri): «Deja de empezar y empieza a terminar»."
      },
      {
        q: "Reto 3/10: Calcula mentalmente con tus fichas:",
        problem: "1.350.000 × 2",
        hint: "1.300.000 × 2 = 2.600.000 | 50.000 × 2 = 100.000",
        options: ["2.700.000", "2.650.000", "3.700.000", "2.350.000"],
        correct: 0,
        explanation: "2.600.000 + 100.000 = 2.700.000. ¡Impecable!"
      },
      {
        q: "Reto 4/10: Calcula mentalmente:",
        problem: "2.580.000 × 2",
        hint: "2.500.000 × 2 = 5.000.000 | 80.000 × 2 = 160.000",
        options: ["5.160.000", "4.160.000", "5.080.000", "5.800.000"],
        correct: 0,
        explanation: "5.000.000 + 160.000 = 5.160.000. ¡Flujo perfecto!"
      },
      {
        q: "Reto 5/10: Calcula mentalmente:",
        problem: "4.600.000 × 2",
        hint: "4.000.000 × 2 = 8.000.000 | 600.000 × 2 = 1.200.000",
        options: ["9.200.000", "8.200.000", "8.600.000", "9.600.000"],
        correct: 0,
        explanation: "8.000.000 + 1.200.000 = 9.200.000. ¡Excelente!"
      },
      {
        q: "Reto 6/10: ¡Probemos por 3! Calcula mentalmente:",
        problem: "1.200.000 × 3",
        hint: "1.000.000 × 3 = 3.000.000 | 200.000 × 3 = 600.000",
        options: ["3.600.000", "3.200.000", "2.600.000", "4.200.000"],
        correct: 0,
        explanation: "3.000.000 + 600.000 = 3.600.000. ¡Qué rapidez!"
      },
      {
        q: "Reto 7/10: Calcula mentalmente:",
        problem: "1.750.000 × 2",
        hint: "1.700.000 × 2 = 3.400.000 | 50.000 × 2 = 100.000",
        options: ["3.500.000", "3.450.000", "2.500.000", "3.700.000"],
        correct: 0,
        explanation: "3.400.000 + 100.000 = 3.500.000. ¡Nivel Pro!"
      },
      {
        q: "Reto 8/10: Número de decenas de millones:",
        problem: "15.400.000 × 2",
        hint: "15.000.000 × 2 = 30.000.000 | 400.000 × 2 = 800.000",
        options: ["30.800.000", "25.800.000", "30.400.000", "31.800.000"],
        correct: 0,
        explanation: "30 millones + 800 mil = 30.800.000. ¡Sin miedo a los millones!"
      },
      {
        q: "Reto 9/10: Calcula mentalmente:",
        problem: "3.850.000 × 2",
        hint: "3.800.000 × 2 = 7.600.000 | 50.000 × 2 = 100.000",
        options: ["7.700.000", "6.700.000", "7.650.000", "7.850.000"],
        correct: 0,
        explanation: "7.600.000 + 100.000 = 7.700.000. ¡Eres imparable!"
      },
      {
        q: "Reto Final 10/10: El Gran Jefe Kawaii:",
        problem: "6.570.000 × 2",
        hint: "6.500.000 × 2 = 13.000.000 | 70.000 × 2 = 140.000",
        options: ["13.140.000", "12.140.000", "13.040.000", "12.570.000"],
        correct: 0,
        explanation: "6,5 millones × 2 = 13 millones, más 140 mil = ¡13.140.000! ¡Dominio Absoluto!"
      }
    ]
  },

  // ------------------------------------------------------------------------
  // 4. RANGOS KAWAII DE PROGRESO (N0 a N5) (#progreso-kmm)
  // ------------------------------------------------------------------------
  kmmLevels: [
    {
      level: "N0",
      name: "Inicial • Pollito Curioso 🐣",
      value: "Logro Personal",
      desc: "Antes intentabas multiplicar todo el número gigante de golpe en la cabeza (Muri). Ahora descubres tu Tablero Personal Kanban.",
      xpRequired: 0
    },
    {
      level: "N1",
      name: "Explorador • Conejito Visual 🐰",
      value: "Visualización por Colores",
      desc: "Haces visible lo invisible: conviertes números grandes en Fichas Kawaii de colores según su valor.",
      xpRequired: 30
    },
    {
      level: "N2",
      name: "Enfocado • Gatito Estratega 🐱",
      value: "Flujo y Límite WIP = 1",
      desc: "Respetas la regla de oro: Límite WIP = 1 («Deja de empezar y empieza a terminar») y estacionas los ceros.",
      xpRequired: 70
    },
    {
      level: "N3",
      name: "Avanzado • Panda Maestro 🐼",
      value: "Cero Bloqueos Mentales",
      desc: "Resuelves multiplicaciones con llevadas como 1.570.000 × 2 = 3.140.000 usando Parking Lot y Split & Merge.",
      xpRequired: 120
    },
    {
      level: "N4",
      name: "Veloz • Unicornio Ágil 🦄",
      value: "Velocidad y Precisión",
      desc: "Tu tiempo de respuesta baja cada vez más porque tu flujo mental no tiene tacos ni atascos.",
      xpRequired: 180
    },
    {
      level: "N5",
      name: "Leyenda • Estrella Kawaii Suprema 🌟",
      value: "Mente Imparable",
      desc: "El tablero Kanban ya vive dentro de tu mente. ¡Cualquier número grande te hace más fuerte y lo resuelves jugando!",
      xpRequired: 250
    }
  ]
};
