
// Client-side language detection + switching. No geo-IP lookup (that would
// require a network call and contradicts the "nothing is sent anywhere"
// promise in the disclaimer) — instead this reads the browser's own language
// preference, which is the standard privacy-friendly signal for a static site.
const LANG_STORAGE_KEY = 'soulprint-lang';

const UI_STRINGS = {
  en: {
    introEyebrow: "a solo experiment",
    introSub: "Twelve choices. No context for any of them.<br>Something older than your reasoning is doing the choosing — and it's about to be drawn.",
    beginButton: "Begin",
    drawAgainButton: "Draw again",
    saveImageButton: "Save image",
    shareButton: "Share",
    disclaimerButton: "Disclaimer",
    disclaimerEyebrow: "before you take this seriously",
    disclaimerHeading: "This is a game",
    disclaimerP1: "Soulprint is a solo entertainment project, not a psychological, medical, or scientific instrument. The \"spirit\" you're shown is generated deterministically from the pattern of twelve arbitrary clicks — there's no hidden test and no correct answers.",
    disclaimerP2: "Nothing you do here is collected, stored, or sent anywhere. The whole game runs in your browser; closing the tab erases it completely.",
    disclaimerP3: "Treat your result exactly as seriously as a coin flip dressed up in nice typography — which is to say, not very. That's the point.",
    closeButton: "Close",
    adLabel: "Advertisement",
    savedCaptionCopied: "Saved — caption copied",
  },
  es: {
    introEyebrow: "un experimento solitario",
    introSub: "Doce elecciones. Sin contexto para ninguna de ellas.<br>Algo más antiguo que tu razón está eligiendo — y está a punto de revelarse.",
    beginButton: "Empezar",
    drawAgainButton: "Volver a intentar",
    saveImageButton: "Guardar imagen",
    shareButton: "Compartir",
    disclaimerButton: "Aviso legal",
    disclaimerEyebrow: "antes de tomarte esto en serio",
    disclaimerHeading: "Esto es un juego",
    disclaimerP1: "Soulprint es un proyecto de entretenimiento personal, no un instrumento psicológico, médico ni científico. El \"espíritu\" que se te muestra se genera de forma determinista a partir del patrón de doce clics arbitrarios — no hay ninguna prueba oculta ni respuestas correctas.",
    disclaimerP2: "Nada de lo que hagas aquí se recopila, almacena ni se envía a ningún sitio. Todo el juego se ejecuta en tu navegador; al cerrar la pestaña se borra por completo.",
    disclaimerP3: "Toma tu resultado tan en serio como una moneda al aire vestida con buena tipografía — es decir, no mucho. Esa es la idea.",
    closeButton: "Cerrar",
    adLabel: "Publicidad",
    savedCaptionCopied: "Guardado — texto copiado",
  },
};

const ELEMENT_LABELS = {
  en: { earth: "Earth spirit", water: "Water spirit", fire: "Fire spirit", air: "Air spirit" },
  es: { earth: "Espíritu de tierra", water: "Espíritu de agua", fire: "Espíritu de fuego", air: "Espíritu de aire" },
};

const PROCESSING_PHRASES_BY_LANG = {
  en: ["connecting soul", "reading the thread", "listening to the shape"],
  es: ["conectando con el alma", "leyendo el hilo", "escuchando la forma"],
};

function detectInitialLang() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved === 'en' || saved === 'es') return saved;
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
  return langs.some(l => l.toLowerCase().startsWith('es')) ? 'es' : 'en';
}

let currentLang = detectInitialLang();

function t(key) {
  return (UI_STRINGS[currentLang] && UI_STRINGS[currentLang][key]) || UI_STRINGS.en[key] || key;
}

function applyElementLabels(lang) {
  Object.keys(ELEMENTS).forEach(key => {
    ELEMENTS[key].label = ELEMENT_LABELS[lang][key];
  });
}

function applyProcessingPhrases(lang) {
  PROCESSING_PHRASES.length = 0;
  PROCESSING_PHRASES.push(...PROCESSING_PHRASES_BY_LANG[lang]);
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === currentLang);
  });
}

async function switchLanguage(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyElementLabels(lang);
  applyProcessingPhrases(lang);
  applyStaticTranslations();

  const bank = await loadWordBank(lang);
  WORD_BANK = bank;

  // If a round is currently on screen, re-draw the remaining (not-yet-seen)
  // pairs in the new language. Word content never affects scoring — classify()
  // only looks at choice indices — so swapping mid-session is safe.
  const gameScreen = document.getElementById('screen-game');
  if (typeof PAIRS !== 'undefined' && PAIRS.length && typeof round !== 'undefined' &&
      round < PAIRS.length && !gameScreen.classList.contains('hidden')) {
    const remaining = drawPairs(WORD_BANK, PAIRS.length - round);
    PAIRS = PAIRS.slice(0, round).concat(remaining);
    renderRound();
  }
}

applyElementLabels(currentLang);
applyProcessingPhrases(currentLang);
applyStaticTranslations();

document.querySelectorAll('[data-lang-btn]').forEach(btn => {
  btn.addEventListener('click', () => switchLanguage(btn.getAttribute('data-lang-btn')));
});
