
let WORD_BANK = [];
let PAIRS = [];
let choices = [];
let round = 0;
let lastResult = null;

const wordBankReady = loadWordBank().then(bank => { WORD_BANK = bank; });

function showScreen(id) {
  document.querySelectorAll('.layer').forEach(el => el.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  document.getElementById('ad-top-intro').classList.toggle('hidden', id !== 'screen-intro');
  document.getElementById('ad-top-reveal').classList.toggle('hidden', id !== 'screen-reveal');
  document.getElementById('ad-left').classList.toggle('hidden', id !== 'screen-game');
  document.getElementById('ad-right').classList.toggle('hidden', id !== 'screen-game');
}

function renderRound() {
  const [a, b] = PAIRS[round];
  document.getElementById('choice-left').textContent = a;
  document.getElementById('choice-right').textContent = b;
  const rn = String(round + 1).padStart(2, '0');
  const tot = String(TOTAL).padStart(2, '0');
  document.getElementById('round-counter').textContent = `${rn} — ${tot}`;
}

function startGame() {
  choices = []; round = 0;
  PAIRS = drawPairs(WORD_BANK, TOTAL);
  document.getElementById('choices').style.opacity = 1;
  document.getElementById('round-counter').style.opacity = 1;
  setAtmosphere(true);
  clearField();
  showScreen('screen-game');
  renderRound();
}

function pick(idx) {
  choices.push(idx);
  const nodes = computeNodes(choices);
  drawField(nodes);
  round++;
  if (round >= TOTAL) {
    setTimeout(() => {
      const finalNodes = computeNodes(choices);
      blinkStructure(finalNodes, 3, reveal);
    }, 400);
  } else {
    renderRound();
  }
}

function reveal() {
  setAtmosphere(false);
  showScreen('screen-reveal');
  const element = classify(choices);
  const character = pickCharacter(element);
  const result = { element, name: character.name, desc: character.desc };
  lastResult = result;
  const el = ELEMENTS[result.element];
  const hex = `rgb(${el.color.r},${el.color.g},${el.color.b})`;

  const nameEl = document.getElementById('reveal-name');
  const elEl = document.getElementById('reveal-element');
  nameEl.textContent = result.name;
  nameEl.style.color = hex;
  elEl.textContent = `${el.symbol}  ${el.label}`;
  elEl.style.color = hex;
  document.getElementById('reveal-desc').textContent = result.desc;
  document.getElementById('screen-reveal').classList.add('reveal-visible');

  const nodes = computeNodes(choices);
  animateFieldColor(nodes, el.color, 1400);
}

document.getElementById('btn-begin').addEventListener('click', async () => {
  await wordBankReady;
  startGame();
});

document.getElementById('choice-left').addEventListener('click', () => pick(0));
document.getElementById('choice-right').addEventListener('click', () => pick(1));

document.getElementById('btn-again').addEventListener('click', () => {
  document.getElementById('screen-reveal').classList.remove('reveal-visible');
  startGame();
});

document.getElementById('btn-save').addEventListener('click', () => {
  saveCardImage(choices, lastResult);
});

document.getElementById('btn-share').addEventListener('click', (e) => {
  shareCardImage(choices, lastResult, e.currentTarget);
});

const disclaimerOverlay = document.getElementById('disclaimer-overlay');
document.getElementById('btn-disclaimer').addEventListener('click', () => {
  disclaimerOverlay.classList.remove('hidden');
});
document.getElementById('btn-disclaimer-close').addEventListener('click', () => {
  disclaimerOverlay.classList.add('hidden');
});
disclaimerOverlay.addEventListener('click', (e) => {
  if (e.target === disclaimerOverlay) disclaimerOverlay.classList.add('hidden');
});
