
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

// Same voice pool as SHARE_TEMPLATES, translated — picked at random on every
// share so re-drawing (or re-sharing) doesn't read identically twice.
const SHARE_TEMPLATES_ES = [
  (name, label) => `Salió ${name} — ${label}. Doce elecciones, sin contexto, y esto fue lo que apareció. Lee tu espíritu: ${SITE_URL}`,
  (name, label) => `Resulta que soy ${name}, al parecer. Doce elecciones a ciegas y una forma apareció de la nada. Descubre la tuya: ${SITE_URL}`,
  (name) => `${name}. Esa es la forma que doce elecciones sin explicación sacaron de mí. Mira cómo es la tuya: ${SITE_URL}`,
  (name, label) => `Sin contexto, sin explicación — solo doce elecciones. Sacaron ${name} (${label}). Pruébalo tú: ${SITE_URL}`,
  (name) => `Entré a ciegas, salí como ${name}. El patrón no miente. Encuentra el tuyo: ${SITE_URL}`,
  (name, label) => `${label}, resultó ser ${name}. No esperaba eso de doce preguntas de dos palabras. Tu turno: ${SITE_URL}`,
  (name) => `Al parecer soy ${name}. No sé qué dice eso de mí, pero aquí estamos: ${SITE_URL}`,
  (name) => `${name} — esa es mi lectura. Doce elecciones, cero contexto, curiosamente acertado. Prueba la tuya: ${SITE_URL}`,
  (name) => `No tengo nada que objetar. Ahora soy ${name}, supongo. Descubre el tuyo: ${SITE_URL}`,
  (name) => `Doce preguntas de dos palabras después, soy ${name}. Saca tus propias conclusiones: ${SITE_URL}`,
  (name) => `Dijeron elige una, doce veces, sin explicación. Me tocó ${name}. Mira qué te toca a ti: ${SITE_URL}`,
  (name) => `${name}. Incómodamente específico para algo sin ningún contexto. Pruébalo: ${SITE_URL}`,
  (name) => `No pensé que doce clics pudieran decirme algo. Al parecer soy ${name}. Tu turno: ${SITE_URL}`,
  (name, label) => `Lectura completa: ${name} (${label}). Tómatelo tan en serio como quieras. Descubre la tuya: ${SITE_URL}`,
  (name) => `Hice doce clics sin pensar y me dieron ${name}. Intenta no pensar tampoco: ${SITE_URL}`,
  (name) => `${name} — sacado, no elegido. Hay una diferencia y la sentí. Mira la tuya: ${SITE_URL}`,
  (name) => `Sin preguntas de cuestionario, sin contexto, solo doce elecciones. De alguna forma llegué a ${name}. Tu turno: ${SITE_URL}`,
  (name) => `Soy, según doce elecciones arbitrarias, ${name}. Curiosamente acertado. Pruébalo: ${SITE_URL}`,
  (name, label) => `${label}. En concreto, ${name}. Yo no elegí esto — lo hizo el patrón. Descubre la tuya: ${SITE_URL}`,
  (name) => `En algún punto entre el primer clic y el doceavo, me convertí en ${name}. Descubre en qué te conviertes tú: ${SITE_URL}`,
  (name) => `Esto es extremadamente acertado o una coincidencia muy convincente: ${name}. Mira la tuya: ${SITE_URL}`,
  (name) => `${name}, sacado de nada más que doce clics y lo que sea que hay debajo de mi razón. Tu turno: ${SITE_URL}`,
  (name) => `Doce elecciones, sin explicación, un resultado: ${name}. Inquietantemente específico. Pruébalo tú: ${SITE_URL}`,
  (name) => `Entré sin ninguna expectativa y salí como ${name}. Diez sobre diez, lo repetiría: ${SITE_URL}`,
  (name) => `${name} — no lo esperaba, pero es justo lo que dijo el patrón. Descubre tu propia forma: ${SITE_URL}`,
  (name) => `Cada elección se sintió al azar. El resultado no: ${name}. Mira qué dice el tuyo: ${SITE_URL}`,
  (name) => `Archivado bajo "cosas que no sabía sobre mí": ${name}. Tu turno de descubrirlo: ${SITE_URL}`,
  (name) => `${name}, al parecer, y no puedo llevarle del todo la contraria. Prueba tú la lectura: ${SITE_URL}`,
  (name) => `Doce clics en la oscuridad, una respuesta muy específica: ${name}. Descubre la tuya: ${SITE_URL}`,
  (name) => `No pedí nada y de todas formas me dieron ${name}. Tiene sentido. Tu turno: ${SITE_URL}`,
  (name) => `He encontrado mi espíritu — ${name}. Ahora, encuentra el tuyo: ${SITE_URL}`,
];

function shareCaption(result) {
  const el = ELEMENTS[result.element];
  const pool = currentLang === 'es' ? SHARE_TEMPLATES_ES : SHARE_TEMPLATES;
  const template = pool[Math.floor(Math.random() * pool.length)];
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
          btn.textContent = t('savedCaptionCopied');
          setTimeout(() => { btn.innerHTML = originalHTML; }, 1800);
        } catch (e) {}
        resolve();
      }, 'image/png');
    });
  });
}
