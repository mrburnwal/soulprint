
function roundRectPath(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function wrapLines(c, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  words.forEach(word => {
    const test = line ? line + ' ' + word : word;
    if (c.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

// Renders the shareable result card (constellation + name + description) onto
// an off-screen canvas. Used by both "Save image" and "Share" in share.js.
function buildCard(choices, result) {
  const W = 1000, H = 1250, R = 56;
  const card = document.createElement('canvas');
  card.width = W; card.height = H;
  const c = card.getContext('2d');

  roundRectPath(c, 0, 0, W, H, R);
  c.clip();

  c.fillStyle = '#0A0812';
  c.fillRect(0, 0, W, H);

  const el = ELEMENTS[result.element];
  const glow = c.createRadialGradient(W / 2, H * 0.4, 30, W / 2, H * 0.4, W * 0.65);
  glow.addColorStop(0, `rgba(${el.color.r},${el.color.g},${el.color.b},0.20)`);
  glow.addColorStop(1, 'rgba(10,8,18,0)');
  c.fillStyle = glow;
  c.fillRect(0, 0, W, H);

  const nodes = fitNodesToBox(computeNodes(choices), W / 2, H * 0.4, 520);
  drawConstellation(c, nodes, el.color, {
    bold: 1, lineWidth: 2.2, nodeRadius: 6, lastRadius: 11, glowLast: 34, glowDim: 12,
    lineAlpha: 0.5, dimAlpha: 0.75
  });

  c.textAlign = 'center';
  c.fillStyle = `rgb(${el.color.r},${el.color.g},${el.color.b})`;
  c.font = '500 26px "JetBrains Mono", monospace';
  c.fillText(`${el.symbol}   ${el.label}`, W / 2, H * 0.665);

  c.font = '600 76px Fraunces, serif';
  c.fillText(result.name, W / 2, H * 0.745);

  c.font = '400 26px Inter, sans-serif';
  c.fillStyle = '#B7B0C4';
  const lines = wrapLines(c, result.desc, W - 220);
  let ty = H * 0.80;
  lines.forEach(line => { c.fillText(line, W / 2, ty); ty += 38; });

  c.font = '500 18px "JetBrains Mono", monospace';
  c.fillStyle = '#5A5468';
  c.fillText('SOULPRINT', W / 2, H - 64);

  return card;
}
