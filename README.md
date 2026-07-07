# Soulprint

A solo, two-minute suspense game. Twelve choices, no context — the pattern of your
answers deterministically draws a constellation, which is revealed as one of four
elemental archetypes (Earth / Water / Fire / Air).

## Look & feel

A persistent header (logo mark + "Soulprint" wordmark) and footer (copyright +
Disclaimer link) sit fixed above the canvas on every screen, styled in
`css/style.css` under `#site-header` / `#site-footer`. The intro and game
screens use a violet accent (`--accent*` custom properties) instead of the old
flat gold, plus a soft violet vignette painted behind the constellation
(`paintAtmosphere()` in `js/field.js`). None of this touches the reveal
screen: `setAtmosphere(false)` runs as the first line of `reveal()` in
`js/app.js`, and every reveal-screen CSS rule (`#reveal-*`, `.ghost`,
`.reveal-actions`) is untouched from the original design.

The footer's "Disclaimer" button opens `#disclaimer-overlay`, a modal (not a
separate route, since this is a single static page) explaining that results
are generated from click patterns for entertainment only, aren't a
psychological or scientific assessment, and that nothing is collected or
stored.

## Project structure

The game used to live entirely in one `index.html`. It's now split by
responsibility — markup, styling, and each layer of game logic get their own
file — so any one piece (the classification model, the card renderer, the
share copy) can be read or changed without scrolling through the rest.

```
soulprint-site/
├── index.html          markup shell only — screens, buttons, canvas element
├── css/
│   └── style.css        all visual styling
├── js/
│   ├── constants.js      tunable numbers: element colors, elemental
│   │                     archetypes' base metadata, calibration stats, site URL
│   ├── random.js         seeded PRNG (hashString) + array shuffle
│   ├── wordbank.js       fetches words.json, falls back if it can't
│   ├── geometry.js       choice sequence → spiral node positions, color lerp
│   ├── constellation.js  low-level canvas renderer for a node/line shape
│   ├── field.js          the live full-screen canvas: draw, animate, "processing" pulse
│   ├── classify.js       turns 12 choices into one of 4 elements (deterministic)
│   ├── characters.js     ~104 named characters (26 per element) + random picker
│   ├── card.js           renders the shareable result card to an offscreen canvas
│   ├── share.js          caption copy + save/share button behavior
│   └── app.js            wires it all together: screens, round flow, event listeners
├── words.json           311 word-pair prompts, fetched at runtime
├── og-image.png          1200×630 link-preview image (Open Graph / Twitter Card)
├── _headers             CDN cache rules (Netlify format — see note below)
└── README.md            this file
```

`app.js` is the only file that touches DOM event listeners and screen
transitions — it's the "controller." `classify.js` doesn't know about the DOM,
`card.js` doesn't know about game flow, `constellation.js` doesn't know it's
ever drawn on a share card vs. the live field. That's deliberate: each file
can be read or swapped independently even though they all still run in one
shared global scope (see below).

Each file is loaded with a plain `<script src="...">` tag, in dependency order,
listed at the bottom of `index.html` — the same approach the original single
file used, just spread across files instead of one `<script>` block. This is
intentional, not an oversight: `<script type="module">` would let each file
declare its own scope with `import`/`export`, but browsers refuse to load ES
modules at all over the `file://` protocol (CORS), which would break the game
the instant someone opens `index.html` by double-clicking it instead of
serving it. Plain scripts have no such restriction, so double-clicking still
works exactly like it did before the split — the one thing that still won't
load over `file://` is `words.json` itself (see below), same as before.

## Why there's no backend or database

The word pairs are static, read-only content (~10KB of JSON). That kind of data is
served most efficiently — and most scalably — as a plain file behind a CDN, not
through a database:

- A CDN caches `words.json` at edge locations worldwide. Serving it to 10 people or
  10 million people costs the same, because nothing is computed per request.
- A database (or any backend server) would add a network round-trip and a process
  that can get overloaded under real concurrent traffic — the opposite of what you
  want for content that never changes per-user.
- All game logic (shape generation, archetype classification, card rendering) runs
  **client-side in the browser**, so the server never does any work per player
  beyond handing back static files. This is what makes "1000s of simultaneous
  players" trivial: it's the same problem as serving a static image to that many
  people.

**When you would actually want a database:** if you start writing data — e.g.
logging which archetype each session drew (for analytics or a public "spirit
distribution" stat), building a leaderboard, or letting a non-technical person
edit `words.json` through an admin UI instead of a code change. That's a small
serverless function + a lightweight store (Cloudflare KV, Supabase, or a Postgres
instance via Neon/Supabase), not a full app server — happy to build that layer
when/if you need it.

## Deploy it (pick one)

### Option A — Netlify Drop (fastest, zero setup)
1. Go to https://app.netlify.com/drop
2. Drag the `soulprint-site` folder onto the page
3. You get a live URL immediately (e.g. `random-name.netlify.app`)
4. The `_headers` file is picked up automatically — no config needed
5. Optional: claim a custom domain in Site settings → Domain management

### Option B — Vercel (good if you want git-based deploys later)
1. Install the CLI: `npm i -g vercel`
2. From inside `soulprint-site/`, run: `vercel`
3. Follow the prompts (first deploy takes ~1 minute)
4. Note: Vercel uses its own header config format (`vercel.json`) instead of
   `_headers` — ask me to generate one if you deploy here instead of Netlify

### Option C — Cloudflare Pages
1. Push this folder to a GitHub repo
2. Connect the repo at https://dash.cloudflare.com/ → Workers & Pages → Create
3. Build command: none. Output directory: `/`
4. Cloudflare's CDN is one of the largest in the world — good default if you expect
   spiky, high-concurrency traffic (e.g. a link shared widely on social media)

## Before you go live

- Open `js/constants.js`, find `SITE_URL`, and replace `your-site-url-here.com`
  with your real deployed URL (used in every share caption — see `js/share.js`).
- Do the same in `index.html`'s `<head>`: three `your-site-url-here.com`
  placeholders in the Open Graph / Twitter Card meta tags (`og:url`,
  `og:image`, `twitter:image`). Without this, pasting the link into Discord,
  X, WhatsApp, iMessage, or Slack won't show a preview card at all — it'll
  just be a bare link.
- **Double-clicking `index.html` still works** for a quick look (all `js/*.js`
  files load fine over `file://`), but **test the real thing over `https://`**
  before sharing it — browsers block `fetch()` of local JSON over `file://`, so
  `words.json` won't load and you'll silently see the 15-pair fallback bank
  (`FALLBACK_WORD_BANK` in `js/wordbank.js`) instead of the full 311. Any of the
  three deploy options above serve `words.json` correctly.
- If you swap `words.json` for a longer list later, no code changes are needed —
  the game reads whatever's in the file at load time.

## Result model

Two separate decisions happen at reveal, split across two files on purpose:

1. **Which element (deterministic).** `js/classify.js` scores a session
   against three shape metrics — longest streak in one direction, number of
   direction switches, and overall lean — each z-scored against precomputed
   stats from a large sample of random 12-choice sequences (`NULL_STATS` in
   `js/constants.js`). The strongest signal wins: earth / water / fire, or air
   if none of the three stand out (z < 0.35). This part is unchanged from the
   original design — the same twelve choices always land on the same element,
   which is also what decides the constellation's color and the reveal
   screen's accent.

2. **Which character represents it (random).** `js/characters.js` holds a
   pool of about 104 named characters, roughly 26 per element, pulled from
   Greek philosophy (The Stoic, The Sophist, The Heraclitean...), tarot major
   arcana (The Hermit, The Tower, The Moon...), the zodiac (Taurus, Scorpio,
   Aquarius...), and natural phenomena (The Glacier, The Wildfire, The
   Aurora...), plus the eight original archetypes. `pickCharacter(element)`
   picks one at random with `Math.random()` every time you reach the reveal
   screen — replaying the exact same twelve choices can surface a different
   character, on purpose, even though it'll always be the same element.

Share captions (`js/share.js`, ~30 phrasings) are picked the same way — a
fresh random one each time you hit Share, rather than tied to the choice
pattern.

To add more characters later: open `js/characters.js` and push a
`{ name, desc }` object onto the array for whichever element it fits — no
other file needs to change.

## Growth mechanics

- **Open Graph / Twitter Card** (`og-image.png` + meta tags in `index.html`).
  Previously, pasting the game's URL into any chat app or social platform
  showed a bare link with no preview. Now it unfurls with a branded image,
  title, and description — this is pure free distribution that was
  previously being thrown away. Remember to update the three URL placeholders
  before going live (see "Before you go live" above).

A per-device "collection" mechanic (discovered characters tracked in
`localStorage`) was tried and removed — because which *element* you land on
is deterministic from your click pattern, most people got stuck seeing a
narrow slice of the 104 characters, which made a "104 to discover" promise
feel broken rather than compelling. Whatever replaces it should reward
*returning*, not *variety*, since variety isn't really in the player's
control here.

## Ad placements

Four placeholder ad slots, styled as dashed boxes labeled "Advertisement" so
they're obviously not broken content — drop a real ad network tag (Google
AdSense, etc.) into each one in place of the label text:

| Slot | Size | Shows on |
|---|---|---|
| `#ad-top-intro` | 728×60 (leaderboard-ish, `min(728px, 92vw)` wide) | intro screen only |
| `#ad-top-reveal` | same | reveal screen only |
| `#ad-left` / `#ad-right` | 200×600 (1:3 skyscraper) | game (word-choosing) screen only |

`showScreen()` in `js/app.js` toggles all four slots alongside the `.layer`
screens: the top bars appear only on their respective intro/reveal screen,
and the two side skyscrapers appear only on the game screen (they sit in the
empty space beside the centered choice words, and that's the screen where
someone spends the most time, round after round). A media query in
`css/style.css` (`@media (max-width: 1180px)`) hides the side skyscrapers
below that viewport width regardless of screen, so they never overlap the
game on tablets/phones.

**CSS gotcha to remember:** the shared `.hidden { display: none }` utility
class only wins a specificity tie if it's declared *after* whatever else sets
`display` on that element (or if you add an explicit `.the-other-class.hidden`
override). This bit both `#disclaimer-overlay` and `.ad-slot` during
development — same fix both times: `#disclaimer-overlay.hidden` /
`.ad-slot.hidden { display: none; }`.
