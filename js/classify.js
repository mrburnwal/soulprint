
// Decides which of the four elements a session belongs to, from the shape of
// its twelve choices — longest streak in one direction (favors earth),
// number of direction switches (favors water), and overall lean (favors
// fire), each z-scored against NULL_STATS. A weak signal on all three reads
// as air. This part stays deterministic: the same twelve choices always land
// on the same element. Which *named character* represents that element is
// then chosen at random by pickCharacter() in js/characters.js.
function classify(seq) {
  const countA = seq.filter(c => c === 0).length;
  const countB = TOTAL - countA;
  let longest = 1, current = 1;
  for (let i = 1; i < seq.length; i++) {
    if (seq[i] === seq[i - 1]) { current++; longest = Math.max(longest, current); }
    else current = 1;
  }
  let switches = 0;
  for (let i = 1; i < seq.length; i++) if (seq[i] !== seq[i - 1]) switches++;
  const leanRatio = Math.abs(countA - countB) / TOTAL;

  const zRoot = (longest - NULL_STATS.longest.mean) / NULL_STATS.longest.std;
  const zCurrent = (switches - NULL_STATS.switches.mean) / NULL_STATS.switches.std;
  const zFlame = (leanRatio - NULL_STATS.lean.mean) / NULL_STATS.lean.std;

  const scores = { earth: zRoot, water: zCurrent, fire: zFlame };
  const [topElement, topZ] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

  return topZ < 0.35 ? "air" : topElement;
}
