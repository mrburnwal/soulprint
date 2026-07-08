
// A big pool of caption voices — picked at random on every share, same as the
// character itself, so re-drawing (or re-sharing) doesn't read identically twice.
const SHARE_TEMPLATES = [
  (name, label) => `I drew ${name} — ${label}. Twelve choices, no context, and this is what came out. Read your spirit: ${SITE_URL}`,
  (name, label) => `Turns out I'm ${name}, apparently. Twelve blind choices and a shape appeared out of nowhere. Draw yours: ${SITE_URL}`,
  (name) => `${name}. That's the shape twelve unexplained choices drew out of me. See what yours looks like: ${SITE_URL}`,
  (name, label) => `No context, no explanation — just twelve choices. They drew ${name} (${label}). Try it yourself: ${SITE_URL}`,
  (name) => `Went in blind, came out as ${name}. The pattern doesn't lie. Find your own: ${SITE_URL}`,
  (name, label) => `${label}, reading as ${name}. Didn't expect that from twelve two-word questions. Your turn: ${SITE_URL}`,
  (name) => `Apparently I'm ${name}. No idea what that says about me, but here we are: ${SITE_URL}`,
  (name) => `${name} — that's my reading. Twelve choices, zero context, oddly accurate. Try yours: ${SITE_URL}`,
  (name) => `I have no notes on this. I'm ${name} now, I guess. Draw your own: ${SITE_URL}`,
  (name) => `Twelve two-word questions later, I'm ${name}. Make of that what you will: ${SITE_URL}`,
  (name) => `They said pick one, twelve times, no explanation. I got ${name}. See what you get: ${SITE_URL}`,
  (name) => `${name}. Uncomfortably specific for something with no context at all. Try it: ${SITE_URL}`,
  (name) => `Didn't think twelve clicks could tell me anything. Apparently I'm ${name}. Your turn: ${SITE_URL}`,
  (name, label) => `Reading complete: ${name} (${label}). Take it as seriously as you want. Draw yours: ${SITE_URL}`,
  (name) => `I clicked twelve times without thinking and got handed ${name}. Try not to think either: ${SITE_URL}`,
  (name) => `${name} — drawn, not chosen. There's a difference and I felt it. See yours: ${SITE_URL}`,
  (name) => `No quiz questions, no context, just twelve picks. Somehow landed on ${name}. Your turn: ${SITE_URL}`,
  (name) => `I am, according to twelve arbitrary choices, ${name}. Oddly on brand. Try it: ${SITE_URL}`,
  (name, label) => `${label}. Specifically ${name}. I didn't pick this — the pattern did. Draw yours: ${SITE_URL}`,
  (name) => `Somewhere between the first click and the twelfth, I became ${name}. Find out what you become: ${SITE_URL}`,
  (name) => `This is either extremely accurate or a very convincing coincidence: ${name}. Check yours: ${SITE_URL}`,
  (name) => `${name}, drawn from nothing but twelve clicks and whatever's underneath my reasoning. Your turn: ${SITE_URL}`,
  (name) => `Twelve choices, no explanation, one result: ${name}. Unsettlingly specific. Try it yourself: ${SITE_URL}`,
  (name) => `I went in with zero expectations and came out as ${name}. Ten out of ten, would be unsettled again: ${SITE_URL}`,
  (name) => `${name} — not what I expected, exactly what the pattern said. Draw your own shape: ${SITE_URL}`,
  (name) => `Every choice felt random. The result didn't: ${name}. See what yours says: ${SITE_URL}`,
  (name) => `Filed under "things I didn't know about myself": ${name}. Your turn to find out: ${SITE_URL}`,
  (name) => `${name}, apparently, and I can't entirely argue with it. Try the reading yourself: ${SITE_URL}`,
  (name) => `Twelve clicks in the dark, one very specific answer: ${name}. Draw yours: ${SITE_URL}`,
  (name) => `I asked for nothing and got ${name} anyway. That tracks. Your turn: ${SITE_URL}`,
  (name) => `I have found my soul spirit — ${name}. Now, find yours: ${SITE_URL}`
];

function shareCaption(result) {
  const el = ELEMENTS[result.element];
  const template = SHARE_TEMPLATES[Math.floor(Math.random() * SHARE_TEMPLATES.length)];
  return template(result.name, el.label);
}

function saveCardImage(choices, result) {
  return document.fonts.ready.then(() => {
    const card = buildCard(choices, result);
    const link = document.createElement('a');
    link.download = 'soulprint-' + result.element + '.png';
    link.href = card.toDataURL('image/png');
    link.click();
  });
}

function shareCardImage(choices, result, btn) {
  return document.fonts.ready.then(() => {
    const card = buildCard(choices, result);
    return new Promise(resolve => {
      card.toBlob(async (blob) => {
        const file = new File([blob], 'soulprint-' + result.element + '.png', { type: 'image/png' });
        const text = shareCaption(result);
        const originalHTML = btn.innerHTML;

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: 'Soulprint', text });
            resolve();
            return;
          } catch (err) {
            if (err && err.name === 'AbortError') { resolve(); return; }
          }
        }

        const link = document.createElement('a');
        link.download = file.name;
        link.href = URL.createObjectURL(blob);
        link.click();
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Saved — caption copied';
          setTimeout(() => { btn.innerHTML = originalHTML; }, 1800);
        } catch (e) {}
        resolve();
      }, 'image/png');
    });
  });
}
