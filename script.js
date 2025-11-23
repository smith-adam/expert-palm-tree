const sightLevels = [
  {
    id: 'starter',
    label: 'Level 1: Starter',
    description: 'Short CVC words and the most common early sight words.',
    words: [
      'the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it',
      'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'i',
      'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word',
      'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said',
      'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if',
      'will', 'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so',
      'some', 'her', 'would', 'make', 'like', 'him', 'into', 'time', 'has', 'look',
      'two', 'more', 'write', 'go', 'see', 'number', 'no', 'way', 'could', 'people',
      'my', 'than', 'first', 'water', 'been', 'call', 'who', 'oil', 'now', 'find',
      'long', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part', 'over',
    ],
  },
  {
    id: 'builder',
    label: 'Level 2: Builder',
    description: 'Longer high-frequency words to stretch confidence.',
    words: [
      'new', 'sound', 'take', 'only', 'little', 'work', 'know', 'place', 'year', 'live',
      'me', 'back', 'give', 'most', 'very', 'after', 'thing', 'our', 'just', 'name',
      'good', 'sentence', 'man', 'think', 'say', 'great', 'where', 'help', 'through', 'much',
      'before', 'line', 'right', 'too', 'mean', 'old', 'any', 'same', 'tell', 'boy',
      'follow', 'came', 'want', 'show', 'also', 'around', 'farm', 'three', 'small', 'set',
      'put', 'end', 'does', 'another', 'well', 'large', 'must', 'big', 'even', 'such',
      'because', 'turn', 'here', 'why', 'ask', 'went', 'men', 'read', 'need', 'land',
      'different', 'home', 'us', 'move', 'try', 'kind', 'hand', 'picture', 'again', 'change',
      'off', 'play', 'spell', 'air', 'away', 'animal', 'house', 'point', 'page', 'letter',
      'mother', 'answer', 'found', 'study', 'still', 'learn', 'should', 'america', 'world', 'high',
    ],
  },
  {
    id: 'expert',
    label: 'Level 3: Heroic',
    description: 'Full 300-word bank with tricky blends and longer words.',
    words: [
      'every', 'near', 'add', 'food', 'between', 'own', 'below', 'country', 'plant', 'last',
      'school', 'father', 'keep', 'tree', 'never', 'start', 'city', 'earth', 'eye', 'light',
      'thought', 'head', 'under', 'story', 'saw', 'left', "don't", 'few', 'while', 'along',
      'might', 'close', 'something', 'seem', 'next', 'hard', 'open', 'example', 'begin', 'life',
      'always', 'those', 'both', 'paper', 'together', 'got', 'group', 'often', 'run', 'important',
      'until', 'children', 'side', 'feet', 'car', 'mile', 'night', 'walk', 'white', 'sea',
      'began', 'grow', 'took', 'river', 'four', 'carry', 'state', 'once', 'book', 'hear',
      'stop', 'without', 'second', 'late', 'miss', 'idea', 'enough', 'eat', 'face', 'watch',
      'far', 'indian', 'real', 'almost', 'let', 'above', 'girl', 'sometimes', 'mountain', 'cut',
      'young', 'talk', 'soon', 'list', 'song', 'being', 'leave', 'family', "it's", 'afternoon',
    ],
  },
];

const themes = {
  spidey: {
    label: 'Spidey',
    alias: 'Peter Parker',
    emoji: '🕷️',
    line: 'Spidey sense tingling—aim your letters and swing!',
    primary: '#ff3b30',
    accent: '#53d6ff',
    bg: '#0f172a',
    panel: '#152347',
  },
  ghosty: {
    label: 'Ghosty',
    alias: 'Ghost-Spider',
    emoji: '🕸️',
    line: 'Ghosty glides in soft purple glow. Tap, tap, tap!',
    primary: '#f472b6',
    accent: '#a5f3fc',
    bg: '#121124',
    panel: '#1c1b2d',
  },
  spin: {
    label: 'Spin',
    alias: 'Miles Morales',
    emoji: '🕶️',
    line: 'Spin flips into action—keep your letter rhythm!',
    primary: '#f97316',
    accent: '#22d3ee',
    bg: '#0a0f1c',
    panel: '#0f172a',
  },
  hulk: {
    label: 'Hulk',
    alias: 'Stronger Letters',
    emoji: '💪',
    line: 'Hulk smash spelling! Smash in the right order.',
    primary: '#22c55e',
    accent: '#a855f7',
    bg: '#0b1720',
    panel: '#10212a',
  },
};

const letterTray = document.querySelector('.letter-tray');
const wordTrack = document.querySelector('#word-track');
const wordBadges = document.querySelector('#word-badges');
const messageEl = document.querySelector('#message');
const hearButton = document.querySelector('#hear-word');
const nextButton = document.querySelector('#next-word');
const themeSelect = document.querySelector('#theme-select');
const levelSelect = document.querySelector('#level-select');
const webProgress = document.querySelector('#web-progress');
const heroLine = document.querySelector('#hero-line');
const heroRoster = document.querySelector('#hero-roster');

let currentIndex = 0;
let progress = 0;
let currentWord = '';
let activeTiles = [];
let activeStrands = [];
let activeLevel = sightLevels[0];
let words = buildWordObjects(activeLevel);

function buildWordObjects(level) {
  return level.words.map((text, index) => ({
    text,
    hint: `${level.label} sight word ${index + 1}`,
  }));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomLetters(count, exclude) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').filter((l) => !exclude.includes(l));
  shuffle(alphabet);
  return alphabet.slice(0, count);
}

function buildWordBadges() {
  wordBadges.innerHTML = '';
  const levelBadge = document.createElement('div');
  levelBadge.className = 'badge badge--level';
  levelBadge.innerHTML = `
    <strong>${activeLevel.label}</strong>
    <small>${activeLevel.words.length} words • ${activeLevel.description}</small>
  `;
  wordBadges.appendChild(levelBadge);

  activeLevel.words.forEach((word, i) => {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = `${i + 1}. ${word}`;
    wordBadges.appendChild(badge);
  });
}

function renderRoster() {
  if (!heroRoster) return;
  heroRoster.innerHTML = '';
  Object.entries(themes).forEach(([name, hero]) => {
    const chip = document.createElement('button');
    chip.className = 'hero-chip';
    chip.dataset.hero = name;
    chip.innerHTML = `
      <span class="hero-chip__icon">${hero.emoji}</span>
      <span>
        <span>${hero.label}</span>
        <small>${hero.alias}</small>
      </span>
    `;
    chip.addEventListener('click', () => {
      themeSelect.value = name;
      applyTheme(name);
    });
    heroRoster.appendChild(chip);
  });
}

function populateLevelSelect() {
  if (!levelSelect) return;
  levelSelect.innerHTML = '';
  sightLevels.forEach((level) => {
    const option = document.createElement('option');
    option.value = level.id;
    option.textContent = `${level.label} (${level.words.length})`;
    levelSelect.appendChild(option);
  });
  levelSelect.value = activeLevel.id;
}

function setLevel(levelId) {
  const chosen = sightLevels.find((level) => level.id === levelId);
  if (!chosen) return;
  activeLevel = chosen;
  words = buildWordObjects(activeLevel);
  currentIndex = 0;
  buildWordBadges();
  loadWord();
}

function clearState() {
  progress = 0;
  currentWord = '';
  activeTiles = [];
  activeStrands = [];
  webProgress.innerHTML = '';
  wordTrack.innerHTML = '';
  letterTray.innerHTML = '';
  messageEl.textContent = 'Click the letters to build the web!';
}

function fillProgressDots(word) {
  word.split('').forEach(() => {
    const dot = document.createElement('span');
    wordTrack.appendChild(dot);
  });
}

function addProgressStrands(length) {
  const rings = [120, 90, 60];
  for (let i = 0; i < length; i += 1) {
    const angle = (i / length) * Math.PI * 2 - Math.PI / 2;
    const radius = rings[i % rings.length];
    const x2 = 130 + radius * Math.cos(angle);
    const y2 = 130 + radius * Math.sin(angle);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '130');
    line.setAttribute('y1', '130');
    line.setAttribute('x2', x2.toFixed(1));
    line.setAttribute('y2', y2.toFixed(1));
    webProgress.appendChild(line);
  }
  activeStrands = Array.from(webProgress.querySelectorAll('line'));
}

function renderLetters(word) {
  const unique = word.split('');
  const distractors = randomLetters(3, unique);
  const tiles = shuffle([...word.split(''), ...distractors]);
  letterTray.innerHTML = '';
  tiles.forEach((letter, i) => {
    const tile = document.createElement('button');
    tile.className = 'letter';
    tile.textContent = letter;
    tile.dataset.index = i;
    tile.addEventListener('click', () => handleLetterClick(tile, letter));
    letterTray.appendChild(tile);
    activeTiles.push(tile);
  });
}

function setMessage(text, celebrate = false) {
  messageEl.textContent = text;
  messageEl.classList.toggle('celebrate', celebrate);
}

function updateWordTrack() {
  Array.from(wordTrack.children).forEach((dot, i) => {
    const filled = i < progress;
    dot.classList.toggle('filled', filled);
    dot.textContent = filled ? currentWord[i] : '';
  });
}

function playTone(type = 'good') {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = type === 'good' ? 880 : 220;
  gain.gain.value = 0.08;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.18);
}

function speakWord(word) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(word);
    utter.pitch = 1.1;
    utter.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function celebrate(word) {
  setMessage(`Great job! You built "${word}"!`, true);
  activeTiles.forEach((tile) => tile.disabled = true);
  const bubbles = document.createElement('div');
  bubbles.className = 'confetti';
  for (let i = 0; i < 16; i += 1) {
    const dot = document.createElement('span');
    dot.style.setProperty('--x', `${Math.random() * 100}%`);
    dot.style.setProperty('--delay', `${Math.random() * 0.6}s`);
    bubbles.appendChild(dot);
  }
  messageEl.appendChild(bubbles);
}

function handleLetterClick(tile, letter) {
  const word = words[currentIndex % words.length].text;
  const expected = word[progress];
  if (letter === expected) {
    tile.classList.add('correct');
    playTone('good');
    activeStrands[progress]?.classList.add('active');
    progress += 1;
    updateWordTrack();
    setMessage('Nice! Keep building.');
    if (progress === word.length) {
      setTimeout(() => {
        celebrate(word);
        playTone('good');
        playTone('good');
        setTimeout(nextWord, 1400);
      }, 200);
    }
  } else {
    tile.classList.add('wrong');
    tile.addEventListener('animationend', () => tile.classList.remove('wrong'), { once: true });
    playTone('bad');
    setMessage('Oops! Try the next letter sound.');
  }
}

function loadWord() {
  if (!words.length) return;
  clearState();
  currentWord = words[currentIndex % words.length].text;
  fillProgressDots(currentWord);
  addProgressStrands(currentWord.length);
  renderLetters(currentWord);
  speakWord(currentWord);
  setMessage(`Listen for "${currentWord}" in ${activeLevel.label}. Tap the first sound!`);
}

function nextWord() {
  currentIndex = (currentIndex + 1) % words.length;
  loadWord();
}

function applyTheme(name) {
  const theme = themes[name];
  if (!theme) return;
  document.documentElement.style.setProperty('--primary', theme.primary);
  document.documentElement.style.setProperty('--accent', theme.accent);
  document.documentElement.style.setProperty('--bg', theme.bg);
  document.documentElement.style.setProperty('--panel', theme.panel);
  document.body.dataset.hero = name;
  if (heroLine) heroLine.textContent = theme.line;
  heroRoster?.querySelectorAll('.hero-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.hero === name);
  });
}

hearButton.addEventListener('click', () => {
  if (!words.length) return;
  speakWord(words[currentIndex % words.length].text);
});
nextButton.addEventListener('click', nextWord);
themeSelect.addEventListener('change', (event) => applyTheme(event.target.value));
levelSelect.addEventListener('change', (event) => setLevel(event.target.value));

populateLevelSelect();
buildWordBadges();
renderRoster();
applyTheme('spidey');
loadWord();
