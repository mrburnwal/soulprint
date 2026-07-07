
const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

function resizeField() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
resizeField();
window.addEventListener('resize', resizeField);

// Soft violet glow behind the constellation on the intro/game/processing
// screens only. Turned off (setAtmosphere(false)) the instant reveal() runs,
// so the result screen's canvas is untouched — same pixels as before.
let atmosphereOn = true;
function setAtmosphere(on) { atmosphereOn = on; }

function paintAtmosphere() {
  const w = window.innerWidth, h = window.innerHeight;
  const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.65);
  grad.addColorStop(0, 'rgba(107,66,200,0.16)');
  grad.addColorStop(1, 'rgba(10,8,18,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function clearField() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  if (atmosphereOn) paintAtmosphere();
}
clearField();

function drawField(nodes, colorRGB, bold) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  if (atmosphereOn) paintAtmosphere();
  drawConstellation(ctx, nodes, colorRGB || NEUTRAL, { bold: bold || 1 });
}

function animateFieldColor(nodes, targetRGB, duration) {
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    drawField(nodes, lerpColor(NEUTRAL, targetRGB, eased));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// A stylized two-beat heartbeat curve (lub-dub) used to pulse the field's glow
// while the result is "processing" — purely a pacing/feel device, no data in it.
function heartbeatIntensity(t) {
  const lub = Math.exp(-Math.pow(t - 100, 2) / (2 * 75 * 75));
  const dub = Math.exp(-Math.pow(t - 330, 2) / (2 * 85 * 85)) * 0.55;
  return 1 + 0.4 * lub + 0.4 * dub;
}

function blinkStructure(nodes, beats, onDone) {
  const cycleLen = 950;
  const totalDuration = cycleLen * beats;
  const start = performance.now();
  const caption = document.getElementById('processing-caption');

  document.getElementById('choices').style.opacity = 0;
  document.getElementById('round-counter').style.opacity = 0;
  caption.innerHTML = PROCESSING_PHRASES[0] + '<span class="dots"></span>';
  caption.style.opacity = 1;

  let lastBeatIndex = -1;

  function frame(now) {
    const elapsed = now - start;
    if (elapsed >= totalDuration) {
      drawField(nodes, NEUTRAL, 1);
      caption.style.opacity = 0;
      onDone();
      return;
    }
    const beatIndex = Math.floor(elapsed / cycleLen);
    if (beatIndex !== lastBeatIndex) {
      lastBeatIndex = beatIndex;
      const phrase = PROCESSING_PHRASES[beatIndex % PROCESSING_PHRASES.length];
      caption.innerHTML = phrase + '<span class="dots"></span>';
    }
    const t = elapsed % cycleLen;
    const intensity = heartbeatIntensity(t);
    drawField(nodes, NEUTRAL, intensity);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
