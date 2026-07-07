// Draws a node-and-line constellation onto any 2D canvas context — shared by
// the full-screen live field (field.js) and the static share card (card.js), so
// the two never drift into looking like different renderers.
function drawConstellation(targetCtx, nodes, colorRGB, opts) {
  const c = colorRGB;
  const o = opts || {};
  const b = o.bold || 1;
  const lineW = (o.lineWidth || 1.1) * Math.min(b, 1.35);
  const nodeR = o.nodeRadius || 3.2;
  const lastR = o.lastRadius || 6;
  const glowBase = o.glowLast || 18;
  const glowDim = o.glowDim || 6;
  const lineAlpha = Math.min(0.55, (o.lineAlpha || 0.32) * b);
  const dimAlpha = Math.min(0.8, (o.dimAlpha || 0.55) * b);

  const solid = `rgb(${c.r},${c.g},${c.b})`;
  const line = `rgba(${c.r},${c.g},${c.b},${lineAlpha})`;
  const dim = `rgba(${c.r},${c.g},${c.b},${dimAlpha})`;

  targetCtx.lineJoin = 'round';
  targetCtx.lineCap = 'round';
  targetCtx.strokeStyle = line;
  targetCtx.lineWidth = lineW;
  targetCtx.beginPath();
  nodes.forEach((n, i) => { i === 0 ? targetCtx.moveTo(n.x, n.y) : targetCtx.lineTo(n.x, n.y); });
  targetCtx.stroke();

  nodes.forEach((n, i) => {
    const isLast = i === nodes.length - 1;
    const r = (isLast ? lastR : nodeR) * (1 + (b - 1) * 0.25);
    targetCtx.beginPath();
    targetCtx.arc(n.x, n.y, r, 0, Math.PI * 2);
    targetCtx.fillStyle = isLast ? solid : dim;
    targetCtx.shadowColor = solid;
    targetCtx.shadowBlur = (isLast ? glowBase : glowDim) * Math.min(b, 1.4);
    targetCtx.fill();
  });
  targetCtx.shadowBlur = 0;
}
