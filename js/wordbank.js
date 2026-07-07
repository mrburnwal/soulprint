
// Used only if words.json fails to load (offline, blocked fetch, etc.) so the
// game still runs — see README for why this is a static file, not an API.
const FALLBACK_WORD_BANK = [
  ["Hold", "Release"], ["Near", "Far"], ["Trust", "Doubt"], ["Rise", "Fall"], ["Open", "Close"],
  ["Push", "Stop"], ["Light", "Shadow"], ["Bend", "Break"], ["Keep", "Give"], ["Wait", "Go"],
  ["Reach", "Retreat"], ["Yes", "No"], ["Begin", "End"], ["Ask", "Tell"], ["Follow", "Lead"]
];

async function loadWordBank() {
  try {
    const res = await fetch('./words.json');
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    if (Array.isArray(data) && data.length >= 12) return data;
    return FALLBACK_WORD_BANK;
  } catch {
    return FALLBACK_WORD_BANK;
  }
}

function drawPairs(wordBank, count) {
  return shuffled(wordBank).slice(0, count);
}
