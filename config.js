// =====================================================================
//  ✏️  EDITÁ ACÁ  —  Todos los textos de la web están en este archivo.
// =====================================================================
//  Consejos:
//  - Escribí {nombre} donde quieras que aparezca el nombre de ella.
//  - Podés usar <strong>negrita</strong> y <em>cursiva</em> en los textos.
//  - Respetá las comillas '...' y las comas al final de cada línea.
//  - Si un texto lleva apóstrofe (ej: "D'Alessandro"), usá comillas dobles: "D'Alessandro".
// =====================================================================

const CONFIG = {
  // ---------- Datos básicos ----------
  nombre: 'Feli',            // Su nombre (o apodo)
  tuNombre: 'Talu',          // Tu nombre, aparece como firma en el certificado

  // ---------- Pantalla 1: el sobre ----------
  sobre: {
    emoji: '📩',
    titulo: 'Tenés un mensaje urgente',
    subtitulo: '(no es spam, lo juro)',
    boton: 'Abrir',
  },

  // ---------- Pantalla 2: el pedido de perdón ----------
  perdon: {
    titulo: 'Me perdonas? 🙏',
    parrafos: [
      'Ya sé... el reclamo fue <strong>malísimo</strong> ',
      'Prometo pensar dos veces antes de hablar <span class="muted">(bueno, una y media como mínimo)</span>.',
      // Agregá más párrafos acá con tus códigos internos 👇
    ],
    medidorTexto: 'Nivel de arrepentimiento',
    medidorFinal: '9999% 😭',
    pregunta: '¿Me perdonás?',
    botonSi: 'Sí, te perdono 💖',
  },

  // Lo que va diciendo el botón "No" en cada intento (el primero es el texto inicial)
  textosNo: [
    'No',
    '¿Segura?',
    '¿Segurísima?',
    'Pensalo bien 🤔',
    'Dale, no seas así',
    'Me vas a hacer llorar 😭',
    'Último aviso ⚠️',
    'Este botón está roto',
    'Error 404 🤖',
    'Ni lo intentes 😏',
    'Rendite 🏳️',
    'Jajaja no',
  ],

  // Mensajes que aparecen abajo cuando intenta apretar "No"
  pistas: [
    '',
    'Uy, se te escapó 🙈',
    'Ese botón es tímido...',
    'Parece que no quiere que lo toques 👀',
    'El botón "Sí" está ahí, eh 👉',
    'Mirá qué lindo está el "Sí" 💖',
    'Ya van varios intentos... 😅',
    'Te lo digo con cariño: no vas a poder',
    'Ok, admiro tu perseverancia 🫡',
    'Ese botón se fue a vivir a otro país ✈️',
    'Ya está, apretá el Sí y listo 🙏',
  ],

  // La carita de arriba va cambiando con cada intento
  caras: ['🥺', '😳', '😰', '😢', '😭', '🫠', '🙏', '🥹'],

  // ---------- Pantalla 3: cuando dice que sí ----------
  festejo: {
    emoji: '🥳',
    titulo: '¡SABÍA QUE ME QUERÍAS!',
    sinIntentos: '¡Y sin dudarlo ni un segundo! Sos la mejor 🥹',
    conIntentos: 'Intentaste apretar "No" {intentos} veces. Lo vamos a dejar pasar 😌',
    certificadoTitulo: 'Certificado Oficial de Reconciliación',
    certificadoIntro: 'Por medio del presente, <strong>Feli</strong> acepta las disculpas bajo las siguientes cláusulas:',
    clausulas: [
      'El chiste en cuestión queda archivado en la carpeta <em>"Nunca más"</em>.',
      'Este perdón es irrevocable, incluso si vuelvo a hacer un chiste malo (que probablemente pase).',
    ],
    sello: '✅ APROBADO',
    botonConfeti: 'Más confeti 🎉',
  },

  // Emojis que caen en el confeti y que flotan de fondo
  confeti: ['💖', '🎉', '✨', '🥳', '💕', '🌸', '🍦', '🎊'],
  fondo: ['😂', '🙏', '✨', '🤝', '⭐'],
};
