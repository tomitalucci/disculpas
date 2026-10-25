// Lógica de la web. Los textos se editan en config.js 😉

const $ = (s) => document.querySelector(s);
const params = new URLSearchParams(location.search);
// El nombre del link (?n=Sofi) tiene prioridad sobre el de config.js
const NOMBRE = (params.get('n') || params.get('nombre') || CONFIG.nombre).trim();
const t = (txt, extra = {}) =>
  String(txt)
    .replaceAll('{nombre}', NOMBRE)
    .replace(/\{(\w+)\}/g, (m, k) => (k in extra ? extra[k] : m));
const set = (sel, txt) => ($(sel).innerHTML = t(txt));

// ---------- Completar textos ----------
set('#sobre-emoji', CONFIG.sobre.emoji);
set('#sobre-titulo', CONFIG.sobre.titulo);
set('#sobre-subtitulo', CONFIG.sobre.subtitulo);
set('#btn-abrir', CONFIG.sobre.boton);

set('#cara', CONFIG.caras[0]);
set('#perdon-titulo', CONFIG.perdon.titulo);
$('#perdon-parrafos').innerHTML = CONFIG.perdon.parrafos.map((p) => `<p>${t(p)}</p>`).join('');
set('#meter-texto', CONFIG.perdon.medidorTexto);
set('#pregunta', CONFIG.perdon.pregunta);
set('#btn-si', CONFIG.perdon.botonSi);
set('#btn-no', CONFIG.textosNo[0]);

const F = CONFIG.festejo;
set('#festejo-emoji', F.emoji);
set('#festejo-titulo', F.titulo);
set('#cert-titulo', F.certificadoTitulo);
set('#cert-intro', F.certificadoIntro);
$('#cert-clausulas').innerHTML = F.clausulas.map((c) => `<li>${t(c)}</li>`).join('');
set('#cert-firma', CONFIG.tuNombre ? `Firma: <strong>${CONFIG.tuNombre}</strong> (arrepentido)` : '');
set('#sello', F.sello);
set('#btn-confeti', F.botonConfeti);

function mostrar(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  $(id).classList.add('active');
}

// ---------- Corazones de fondo ----------
(() => {
  const cont = $('#bg-hearts');
  const iconos = CONFIG.fondo;
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('span');
    s.textContent = iconos[i % iconos.length];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.fontSize = 14 + Math.random() * 22 + 'px';
    s.style.animationDuration = 9 + Math.random() * 10 + 's';
    s.style.animationDelay = -Math.random() * 15 + 's';
    cont.appendChild(s);
  }
})();

// ---------- Pantalla 1 -> 2 ----------
$('#btn-abrir').addEventListener('click', () => {
  mostrar('#screen-perdon');
  setTimeout(llenarMedidor, 400);
});

function llenarMedidor() {
  const fill = $('#meter-fill');
  const val = $('#meter-value');
  fill.style.width = '100%';
  const inicio = performance.now();
  const dur = 2200;
  (function tick(t) {
    const p = Math.min((t - inicio) / dur, 1);
    val.textContent = Math.round(p * 100) + '%';
    if (p < 1) requestAnimationFrame(tick);
    else
      setTimeout(() => {
        val.textContent = CONFIG.perdon.medidorFinal;
        $('.meter').classList.add('overflow');
      }, 300);
  })(inicio);
}

// ---------- El botón escurridizo ----------
const btnNo = $('#btn-no');
const btnSi = $('#btn-si');
const pista = $('#pista');
const cara = $('#cara');
let intentos = 0;
let ultimoEscape = 0;

const textosNo = CONFIG.textosNo;
const pistas = CONFIG.pistas;
const caras = CONFIG.caras;

function escapar(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const ahora = Date.now();
  if (ahora - ultimoEscape < 180) return;
  ultimoEscape = ahora;
  intentos++;

  if (!btnNo.classList.contains('suelto')) {
    // Se mueve al body para que position:fixed use toda la pantalla
    // (el backdrop-filter de la tarjeta lo encerraría si no).
    const r = btnNo.getBoundingClientRect();
    btnNo.style.left = r.left + 'px';
    btnNo.style.top = r.top + 'px';
    document.body.appendChild(btnNo);
    btnNo.classList.add('suelto');
    void btnNo.offsetWidth; // fuerza reflow para que anime
  }

  btnNo.innerHTML = t(textosNo[Math.min(intentos, textosNo.length - 1)]);
  mover();

  // El "Sí" crece, el "No" se achica
  btnSi.style.transform = `scale(${Math.min(1 + intentos * 0.08, 1.7)})`;
  if (intentos > 8) btnNo.style.transform = `scale(${Math.max(1 - (intentos - 8) * 0.06, 0.6)})`;

  pista.innerHTML = t(pistas[Math.min(intentos, pistas.length - 1)]);
  pista.classList.remove('shake'); void pista.offsetWidth; pista.classList.add('shake');
  cara.innerHTML = t(caras[Math.min(intentos, caras.length - 1)]);
  if (navigator.vibrate) navigator.vibrate(30);
}

function mover() {
  const pad = 12;
  const bw = btnNo.offsetWidth;
  const bh = btnNo.offsetHeight;
  const maxX = window.innerWidth - bw - pad;
  const maxY = window.innerHeight - bh - pad;
  const si = btnSi.getBoundingClientRect();
  const actual = btnNo.getBoundingClientRect();
  let x, y, intentosPos = 0;
  do {
    x = pad + Math.random() * Math.max(maxX - pad, 0);
    y = pad + Math.random() * Math.max(maxY - pad, 0);
    intentosPos++;
    var pisaSi = x < si.right + 20 && x + bw > si.left - 20 && y < si.bottom + 20 && y + bh > si.top - 20;
    var muyCerca = Math.hypot(x - actual.left, y - actual.top) < 120;
  } while (intentosPos < 60 && (pisaSi || muyCerca));
  btnNo.style.left = x + 'px';
  btnNo.style.top = y + 'px';
}

btnNo.addEventListener('mouseenter', escapar);
btnNo.addEventListener('pointerdown', escapar);
btnNo.addEventListener('touchstart', escapar, { passive: false });
btnNo.addEventListener('click', escapar);
btnNo.addEventListener('focus', () => { btnNo.blur(); escapar(); });

// En compu: huye cuando el mouse se acerca
document.addEventListener('mousemove', (e) => {
  if (!$('#screen-perdon').classList.contains('active')) return;
  const r = btnNo.getBoundingClientRect();
  const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
  if (dist < Math.max(r.width, r.height) * 0.9) escapar();
});

window.addEventListener('resize', () => {
  if (btnNo.classList.contains('suelto')) mover();
});

// ---------- ¡Sí! ----------
btnSi.addEventListener('click', () => {
  btnNo.remove();
  const resumen = $('#resumen-intentos');
  resumen.innerHTML =
    intentos === 0
      ? t(F.sinIntentos)
      : t(F.conIntentos, { intentos }).replace(/1 veces/, '1 vez');

  mostrar('#screen-si');
  confeti();
});

$('#btn-confeti').addEventListener('click', confeti);

// ---------- Confeti de emojis ----------
const canvas = $('#confetti');
const ctx = canvas.getContext('2d');
let particulas = [];
let animando = false;

function ajustarCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

function confeti() {
  const iconos = CONFIG.confeti;
  for (let i = 0; i < 120; i++) {
    particulas.push({
      x: innerWidth / 2 + (Math.random() - 0.5) * 80,
      y: innerHeight * 0.55,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 18 - 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      size: 16 + Math.random() * 18,
      icon: iconos[Math.floor(Math.random() * iconos.length)],
      vida: 0,
    });
  }
  if (!animando) { animando = true; requestAnimationFrame(dibujar); }
}

function dibujar() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particulas.forEach((p) => {
    p.vy += 0.45;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.vida++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.font = `${p.size}px serif`;
    ctx.fillText(p.icon, -p.size / 2, p.size / 2);
    ctx.restore();
  });
  particulas = particulas.filter((p) => p.y < innerHeight + 60);
  if (particulas.length) requestAnimationFrame(dibujar);
  else { animando = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}
