// Roughly a hundred named characters across the four elements, drawn from
// Greek philosophy, natural phenomena, tarot major arcana, and the zodiac —
// plus the eight original archetypes. classify.js decides which *element*
// a session belongs to (deterministic, from the shape of the choices);
// pickCharacter() below picks which named face of that element to show,
// at random, so replaying the exact same pattern can surface a different
// character each time.

const CHARACTERS = {
  earth: [
    { name: "The Root", desc: "You planted early and stayed. Your spirit isn't looking for another way through — it already knows this one holds." }, // original
    { name: "The Bedrock", desc: "You didn't just pick a side, you built on it, and everything after round one just confirmed what round one already knew. Your spirit doesn't reconsider. It settles until settling is indistinguishable from the ground itself." }, // original
    { name: "Taurus", desc: "Steady, sensory, unhurried. You'd rather build one thing that lasts than chase ten that won't." }, // zodiac
    { name: "Virgo", desc: "You notice what everyone else missed and quietly fix it before anyone says thank you." }, // zodiac
    { name: "Capricorn", desc: "Patient ambition. You're already three steps up the mountain while everyone else is still tying their boots." }, // zodiac
    { name: "The Empress", desc: "Abundance without hurry. You grow things — plans, people, gardens — by giving them room and time." }, // tarot
    { name: "The Hierophant", desc: "You trust what's been tested over what's merely new. Tradition isn't a cage to you; it's a foundation." }, // tarot
    { name: "The Hermit", desc: "You went looking for an answer and found it by walking away from everyone who had one." }, // tarot
    { name: "The Devil", desc: "You know exactly which chain you're in and you're still standing here. That's not weakness — that's a choice, repeated." }, // tarot
    { name: "The World", desc: "You're not looking for the next thing. You already closed the circle you were working on." }, // tarot
    { name: "The Stoic", desc: "You don't control what happens. You control what you do next — and that's always been enough." }, // philosophy
    { name: "The Cynic", desc: "You stripped away what you didn't need until only the true weight of things was left." }, // philosophy
    { name: "The Peripatetic", desc: "You think best on your feet, in motion, circling the same ground until the idea finally lands." }, // philosophy
    { name: "The Pythagorean", desc: "You see the hidden ratio behind things — the pattern under the noise that everyone else calls chaos." }, // philosophy
    { name: "The Eleatic", desc: "Underneath all the changing surfaces, you believe something solid never actually moved. You're looking for that thing." }, // philosophy
    { name: "The Socratic", desc: "You'd rather ask the one question that ruins a bad answer than pretend you already have a good one." }, // philosophy
    { name: "The Canyon", desc: "Carved slowly, by nothing violent — just time, repeated, in the same direction, for longer than anyone was watching." }, // nature
    { name: "The Boulder", desc: "Immovable, until it isn't. You hold your ground right up until the moment you decide not to." }, // nature
    { name: "The Mountain", desc: "Weather changes at your base every day. At your summit, it's the same season it's always been." }, // nature
    { name: "The Desert", desc: "Nothing wasted, nothing hurried. You've learned to survive on far less than people assume you need." }, // nature
    { name: "The Redwood", desc: "Old before anyone you know was born, and quietly planning to outlast them too." }, // nature
    { name: "The Clay", desc: "Shapeable under the right pressure, permanent under heat. You decide which one this moment calls for." }, // nature
    { name: "The Cliff", desc: "You are the line where soft ground gives up and something harder takes over." }, // nature
    { name: "The Plateau", desc: "You stopped climbing not because you ran out of will, but because this height was already enough." }, // nature
    { name: "The Quarry", desc: "Whatever's been taken from you left a shape behind — and the shape is still useful." }, // nature
    { name: "The Orchard", desc: "Nothing you're growing was meant to feed you this season. You planted it for a version of you that isn't here yet." }, // nature
  ],
  water: [
    { name: "The Current", desc: "You shifted with whatever was in front of you. Your spirit doesn't fight the shape of things — it flows around them and keeps going." }, // original
    { name: "The Tide", desc: "You reversed direction again and again and never once looked back at where you'd been. Your spirit doesn't hold a position — it holds a rhythm, and lets the rhythm decide." }, // original
    { name: "Cancer", desc: "You remember everything that mattered emotionally, and you protect it like it's still happening." }, // zodiac
    { name: "Scorpio", desc: "Calm on the surface by design. Whatever's actually moving in you happens several fathoms down." }, // zodiac
    { name: "Pisces", desc: "You dissolve the edges between yourself and whoever you're with. It's generous and it's a little dangerous." }, // zodiac
    { name: "The High Priestess", desc: "You know something you haven't said out loud yet. You're waiting to see if it needs to be." }, // tarot
    { name: "The Chariot", desc: "Two forces pulling in different directions, and you're the reason they're still moving the same way." }, // tarot
    { name: "Death", desc: "Not an ending you fear — an ending you've already made peace with, several endings ago." }, // tarot
    { name: "The Moon", desc: "You trust what you feel over what you can prove. So far, that's worked out more than it hasn't." }, // tarot
    { name: "The Hanged Man", desc: "You got still on purpose. Everything looks different once you stop trying to fix it by moving." }, // tarot
    { name: "The Heraclitean", desc: "You already know you won't step in the same river twice — so you stopped trying to hold onto the water." }, // philosophy
    { name: "The Orphic", desc: "You went down into the hard place to bring something back up, and you didn't come back unchanged." }, // philosophy
    { name: "The Protagorean", desc: "You don't think there's one truth sitting still waiting to be found. You think it moves depending on who's looking." }, // philosophy
    { name: "The Empedoclean", desc: "Love pulls things together, strife pulls them apart — and you've felt both forces working on you in the same week." }, // philosophy
    { name: "The Aporetic", desc: "You didn't resolve the question. You just got comfortable carrying it without an answer." }, // philosophy
    { name: "The Thalesian", desc: "You suspect that underneath everything solid, it's really all just water finding a shape to wear for a while." }, // philosophy
    { name: "The Glacier", desc: "Slow enough that no one sees you move. Undeniable once someone checks where the valley used to be." }, // nature
    { name: "The Monsoon", desc: "You arrive exactly on schedule and completely reshape the ground, and everyone acts surprised anyway." }, // nature
    { name: "The Estuary", desc: "You're the place where two different kinds of water agree, for a while, to become one kind." }, // nature
    { name: "The Whirlpool", desc: "Once something gets close enough to you, it stops moving in a straight line." }, // nature
    { name: "The Rainfall", desc: "Quiet, constant, and somehow the thing that actually changes what's growing underneath it." }, // nature
    { name: "The Reef", desc: "Built slowly out of a thousand small things holding onto each other. From above, it just looks like color." }, // nature
    { name: "The Delta", desc: "By the time you reach where you're going, you've already split yourself several ways to get there." }, // nature
    { name: "The Undertow", desc: "Calm at the surface. The part of you that actually decides where things end up is underneath, unseen." }, // nature
    { name: "The Spring", desc: "You come from somewhere deep and cold that nobody can see, and you never stop arriving." }, // nature
    { name: "The Lagoon", desc: "Separated from the open water by something thin, you kept your own weather anyway." }, // nature
  ],
  fire: [
    { name: "The Flame", desc: "You leaned forward before you were sure. Your spirit doesn't wait for certainty — it moves, and finds the certainty after." }, // original
    { name: "The Wildfire", desc: "Ten of twelve, sometimes eleven, all in the same direction — decisiveness this lopsided isn't a preference, it's a reflex. Your spirit already knows what it wants before the question finishes being asked." }, // original
    { name: "Aries", desc: "First through the door, every time, before anyone's finished asking if it's a good idea." }, // zodiac
    { name: "Leo", desc: "You don't perform for approval. You perform because the alternative is not performing, and that's unthinkable." }, // zodiac
    { name: "Sagittarius", desc: "You already have one foot out the door toward whatever's next, mid-conversation." }, // zodiac
    { name: "The Emperor", desc: "You built the structure because someone had to, and you weren't going to wait for permission." }, // tarot
    { name: "Strength", desc: "Not the loud kind. The kind that stays calm with its hand resting on something that could destroy it." }, // tarot
    { name: "Wheel of Fortune", desc: "You already know your luck is going to turn again. You've stopped taking either direction personally." }, // tarot
    { name: "Temperance", desc: "Two things that shouldn't mix, mixed carefully, by you, until they became something new that works." }, // tarot
    { name: "The Tower", desc: "Something you built on a bad foundation came down loudly. You're already clearing the site." }, // tarot
    { name: "The Sun", desc: "Unfiltered, a little too much for some rooms, and completely unwilling to apologize for the light." }, // tarot
    { name: "Judgement", desc: "You heard the call before anyone else did and you were already standing up when it arrived." }, // tarot
    { name: "The Epicurean", desc: "You've made peace with wanting things, as long as you're honest with yourself about which ones actually matter." }, // philosophy
    { name: "The Dionysian", desc: "You know the version of you that shows up after the third glass is also, somehow, the truest one." }, // philosophy
    { name: "The Promethean", desc: "You took something you weren't supposed to have because you'd already decided the rule was wrong." }, // philosophy
    { name: "The Cyrenaic", desc: "This exact moment is the only one you can prove is real, so you're not going to waste it." }, // philosophy
    { name: "The Agonist", desc: "You need something to push against. Without a worthy opponent, you'll invent one out of the nearest wall." }, // philosophy
    { name: "The Sybarite", desc: "You were built for more comfort than most people will admit to wanting, and you stopped apologizing for it." }, // philosophy
    { name: "The Ember", desc: "Quiet, low, and still capable of starting the whole thing over if anyone gets careless near you." }, // nature
    { name: "The Volcano", desc: "Calm for so long people forget what you're sitting on top of. You haven't forgotten." }, // nature
    { name: "The Spark", desc: "You're not the whole fire. You're the reason the fire exists at all." }, // nature
    { name: "The Supernova", desc: "Whatever you're about to do, you're going to do it at a scale that outlives the doing." }, // nature
    { name: "The Forge", desc: "Things get harder before they get better here, and you've made peace with running that kind of room." }, // nature
    { name: "The Bonfire", desc: "You gather what would've burned out alone and make it burn brighter, together, on purpose." }, // nature
    { name: "The Lightning", desc: "Gone before anyone can properly react to you. The damage — or the light — was already done." }, // nature
    { name: "The Meteor", desc: "You weren't built to last. You were built to be seen, once, at exactly the right angle." }, // nature
  ],
  air: [
    { name: "The Wind", desc: "You held both sides in the air the whole time. Your spirit isn't afraid of the in-between — it lives there." }, // original
    { name: "The Hollow", desc: "Nothing about this sequence resists being explained by chance — and that's the most honest reading there is. Your spirit didn't draw a shape today. It's the blank space the other three are drawn around." }, // original
    { name: "Gemini", desc: "You're already holding two versions of the answer and you haven't decided which one you believe yet." }, // zodiac
    { name: "Libra", desc: "You weigh both sides so carefully that sometimes the weighing becomes the whole decision." }, // zodiac
    { name: "Aquarius", desc: "You're loyal to the idea, not the group. If the idea moves, so do you — alone, if it comes to that." }, // zodiac
    { name: "The Fool", desc: "You started without knowing how it ends, which is the only honest way anyone actually starts anything." }, // tarot
    { name: "The Magician", desc: "You had everything you needed the whole time. You just hadn't decided yet what to point it at." }, // tarot
    { name: "The Lovers", desc: "A choice that looks romantic from a distance and, up close, is really just a choice." }, // tarot
    { name: "Justice", desc: "You want the scale to balance on its own merits, not because you pushed on one side of it." }, // tarot
    { name: "The Star", desc: "After everything fell apart, you're the quiet certainty that something is still worth aiming at." }, // tarot
    { name: "The Sophist", desc: "You can argue either side convincingly, which means people are never quite sure which one you actually believe." }, // philosophy
    { name: "The Platonist", desc: "You suspect the real version of this thing exists somewhere else, and what's in front of you is just its shadow." }, // philosophy
    { name: "The Dialectician", desc: "You don't trust an idea until it's survived being argued with. Yours usually do." }, // philosophy
    { name: "The Rhetorician", desc: "It's not what you said. It's the order you said it in, and you knew that before you opened your mouth." }, // philosophy
    { name: "The Academic", desc: "You'd rather spend one more year making sure you're right than one more day being confidently wrong." }, // philosophy
    { name: "The Skeptic", desc: "You didn't say no. You just noticed nobody had actually proven yes." }, // philosophy
    { name: "The Gale", desc: "You arrive before anyone's ready and leave before they've adjusted. That's not rudeness — that's just your speed." }, // nature
    { name: "The Cyclone", desc: "Calm at your center, chaos at your edges. Most people only ever meet one part of you." }, // nature
    { name: "The Mist", desc: "You're technically there. Nobody who's tried to hold onto you would agree." }, // nature
    { name: "The Echo", desc: "You're never the first voice in the room, but you're often the one people remember hearing." }, // nature
    { name: "The Breath", desc: "Nobody notices you until you stop. Then it's the only thing anyone notices." }, // nature
    { name: "The Zephyr", desc: "Gentle enough to miss, strong enough to change which way everything is leaning by the end of the day." }, // nature
    { name: "The Aurora", desc: "Rare, hard to explain, and gone by the time most people finish looking up." }, // nature
    { name: "The Horizon", desc: "Always exactly as far away as it was yesterday. You've stopped being bothered by that." }, // nature
    { name: "The Updraft", desc: "You lift things that thought they were done rising." }, // nature
    { name: "The Static", desc: "Nothing's touching and something's still building. You're the charge in the room before anyone names it." }, // nature
  ],
};

function pickCharacter(element, lang) {
  const pool = (lang === 'es' && typeof CHARACTERS_ES !== 'undefined' ? CHARACTERS_ES : CHARACTERS)[element];
  return pool[Math.floor(Math.random() * pool.length)];
}
