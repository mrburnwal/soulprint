const TOTAL = 12;
const GOLDEN_ANGLE = 137.508 * Math.PI / 180;

// Neutral gold — the field's resting color before a spirit has been read.
const NEUTRAL = { r: 232, g: 179, b: 77 };

const ELEMENTS = {
  earth: { symbol: "🜃", label: "Earth spirit", color: { r: 140, g: 193, b: 82 } },
  water: { symbol: "🜄", label: "Water spirit", color: { r: 79, g: 209, b: 197 } },
  fire:  { symbol: "🜂", label: "Fire spirit",  color: { r: 255, g: 107, b: 74 } },
  air:   { symbol: "🜁", label: "Air spirit",   color: { r: 177, g: 138, b: 240 } }
};

// Mean/std of longest-streak, direction-switch, and lean metrics across a large
// sample of random 12-choice sequences. classify() z-scores against these so a
// result reflects how unusual a session's shape actually is, not just its raw count.
const NULL_STATS = {
  longest: { mean: 3.918, std: 1.424 },
  switches: { mean: 5.502, std: 1.662 },
  lean: { mean: 0.2248, std: 0.1805 }
};

const SITE_URL = 'https://yoursoulprint.onrender.com';

const PROCESSING_PHRASES = ["connecting soul", "reading the thread", "listening to the shape"];
