
// Used only if words.json / words.es.json fail to load (offline, blocked
// fetch, etc.) so the game still runs — see README for why this is a static
// file, not an API.
const FALLBACK_WORD_BANK = [
  ["Hold", "Release"], ["Near", "Far"], ["Trust", "Doubt"], ["Rise", "Fall"], ["Open", "Close"],
  ["Push", "Stop"], ["Light", "Shadow"], ["Bend", "Break"], ["Keep", "Give"], ["Wait", "Go"],
  ["Reach", "Retreat"], ["Yes", "No"], ["Begin", "End"], ["Ask", "Tell"], ["Follow", "Lead"]
];

const FALLBACK_WORD_BANK_ES = [
  ["Sostener", "Soltar"], ["Cerca", "Lejos"], ["Confiar", "Dudar"], ["Subir", "Caer"], ["Abrir", "Cerrar"],
  ["Empujar", "Detener"], ["Luz", "Sombra"], ["Doblar", "Romper"], ["Guardar", "Dar"], ["Esperar", "Ir"],
  ["Alcanzar", "Retroceder"], ["Sí", "No"], ["Empezar", "Terminar"], ["Preguntar", "Decir"], ["Seguir", "Guiar"]
];

async function loadWordBank(lang) {
  const path = lang === 'es' ? './words.es.json' : './words.json';
  const fallback = lang === 'es' ? FALLBACK_WORD_BANK_ES : FALLBACK_WORD_BANK;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    if (Array.isArray(data) && data.length >= 12) return data;
    return fallback;
  } catch {
    return fallback;
  }
}

function drawPairs(wordBank, count) {
  return shuffled(wordBank).slice(0, count);
}
