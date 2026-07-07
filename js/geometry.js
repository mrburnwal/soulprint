
// Turns a sequence of binary choices into node positions on a phyllotactic
// (golden-angle) spiral. Each choice nudges the angle left or right and adds a
// small deterministic jitter, so the same sequence always draws the same shape.
function computeNodes(seq) {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const nodes = [];
  for (let i = 0; i < seq.length; i++) {
    const prng = hashString(seq.slice(0, i + 1).join(''));
    const jitterAngle = (prng() - 0.5) * 0.5;
    const jitterDist = (prng() - 0.5) * 18;
    const lean = seq[i] === 0 ? -0.32 : 0.32;
    const angle = i * GOLDEN_ANGLE + lean + jitterAngle;
    const dist = 26 + i * 20 + jitterDist;
    nodes.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist
    });
  }
  return nodes;
}

function fitNodesToBox(nodes, cx, cy, boxSize) {
  const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const w = maxX - minX, h = maxY - minY;
  const scale = boxSize / Math.max(w, h, 1);
  const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2;
  return nodes.map(n => ({ x: cx + (n.x - midX) * scale, y: cy + (n.y - midY) * scale }));
}

function lerpColor(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t)
  };
}
