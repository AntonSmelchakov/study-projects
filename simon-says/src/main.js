import '../node_modules/modern-normalize/modern-normalize.css';
import './style.css';

let gameParams = {
  diff: 'easy',
  roundCount: 0,
  isNoActiveGame: true,
  sequence: [],
  isMistakeOne: false,
  roundWon: false,
};
let elementList = {};

function clearHtml(clearTarget) {
  console.log(clearTarget.firstChild);
  while (clearTarget.firstChild) {
    clearTarget.lastChild.remove();
  }
}

function createHeader() {
  const header = document.createElement('header');
  document.body.append(header);

  /* repeatBtn start */
  const repeatBtn = document.createElement('button');
  repeatBtn.textContent = 'Repeat the sequence';
  repeatBtn.classList.add('repeatBtn', 'inactive');
  repeatBtn.addEventListener('click', () => {
    if (gameParams.roundWon) {
      gameParams.roundCount += 1;
      gameParams.sequence = generateSequence(gameParams.diff, gameParams.roundCount);
      repeatBtn.textContent = 'Repeat the sequence';
      elementList.roundPanel.textContent = `Round ${gameParams.roundCount}`;
      clearHtml(elementList.result);
      playSequence(gameParams.sequence, false);
      gameParams.isMistakeOne = false;
    } else {
      repeatBtn.classList.add('repeatBtn', 'inactive');
      playSequence(gameParams.sequence, true);
    }
  });
  /* repeatBtn end */
  /* startBtn start */
  const startBtn = document.createElement('button');
  startBtn.textContent = 'Start';
  startBtn.classList.add('startBtn');
  /* startBtn end */
  /*  difficultySelect start*/
  const difficultySelect = document.createElement('select');
  const diffArray = ['easy', 'normal', 'hard'];
  for (let i = 0; i < diffArray.length; ++i) {
    let option = document.createElement('option');
    difficultySelect.append(option);
    option.classList.add('option');
    option.textContent = diffArray[i];
    option.value = diffArray[i];
  }
  difficultySelect.addEventListener('input', () => {
    const virtualKB = document.querySelector('.virtualKB');
    gameParams.diff = difficultySelect.value;
    clearHtml(virtualKB);
    generateKB(difficultySelect.value);
  });
  /* difficultySelect end */

  header.append(repeatBtn, startBtn, difficultySelect);
}

function createMain() {
  const main = document.createElement('main');
  document.body.append(main);

  const roundPanel = document.createElement('div');
  roundPanel.classList.add('roundPanel');
  roundPanel.textContent = `Select difficulty setting and press "Start"`;

  const result = document.createElement('div');
  result.classList.add('result');

  const virtualKB = document.createElement('div');
  virtualKB.classList.add('virtualKB');

  virtualKB.addEventListener(
    'click',
    (element) => {
      let item = element.target;
      if (item.classList.contains('item')) pressRegister(item);
    },
    false,
  );

  main.append(roundPanel, result, virtualKB);
}

async function pressRegister(item) {
  let i = document.querySelectorAll('.itemResult').length;
  if (item.textContent === gameParams.sequence[i]) {
    item.style['animation-name'] = 'itemReactionGood';
    item.style['animation-play-state'] = 'running';
    keysEnabled(false);
    await animationEnd(item);
    let newEntry = createItem(item.textContent, false);
    keysEnabled(true);
    elementList.result.append(newEntry);
    if (++i === gameParams.sequence.length) resultHandler(true);
  } else {
    item.style['animation-name'] = 'itemReactionBad';
    item.style['animation-play-state'] = 'running';
    keysEnabled(false);
    resultHandler(false);
    await animationEnd(item);
    clearHtml(elementList.result);
    keysEnabled(true);
  }
}

async function keyPressHandler(ev) {
  let key = document.getElementById(ev.key);
  if (key) {
    pressRegister(key);
  }
}

function createItem(text, isKb) {
  const item = document.createElement('div');
  item.addEventListener(
    'animationiteration',
    () => (item.style['animation-play-state'] = 'paused'),
  );
  item.textContent = text;
  if (isKb) {
    item.id = text;
    item.classList.add('item');
  } else {
    item.classList.add('itemResult');
  }
  return item;
}

function generateDiffArray(diff) {
  let abs = [...'abcdefghijklmnopqrstuvwxyz'];
  let numArr = [...'0123456789'];
  let res = [];
  if (diff === 'easy') res = numArr;
  else if (diff === 'normal') res = abs;
  else res = numArr.concat(abs);
  return res;
}

function generateKB(diff) {
  let res = generateDiffArray(diff);
  const virtualKB = document.querySelector('.virtualKB');
  res.forEach((x) => {
    virtualKB.append(createItem(x, true));
  });
}

function generateSequence(diff, roundCount) {
  let symbolArr = generateDiffArray(diff);
  let res = [];
  for (let i = 0; i < roundCount * 2; ++i) {
    let randomNum = Math.floor(Math.random() * symbolArr.length);
    res.push(symbolArr[randomNum]);
  }
  return res;
}

async function animationEnd(item) {
  return new Promise((resolve) => (item.onanimationiteration = resolve));
}

async function playSequence(seq, lockRepeat) {
  console.log(gameParams.sequence);
  let i = 0;
  document.body.classList.add('inactive');
  keysEnabled(false);

  while (i < seq.length) {
    let item = document.getElementById(seq[i]);
    console.log(item);
    item.style['animation-name'] = 'itemReactionGood';
    item.style['animation-play-state'] = 'running';
    await animationEnd(item);
    ++i;
  }
  if (lockRepeat) elementList.repeatBtn.classList.add('inactive');
  else elementList.repeatBtn.classList.remove('inactive');
  document.body.classList.remove('inactive');
  keysEnabled(true);
  elementList.virtualKB.classList.remove('inactive');
}

function keysEnabled(enable) {
  if (enable) window.addEventListener('keydown', keyPressHandler);
  else window.removeEventListener('keydown', keyPressHandler);
}

function resultHandler(isRight) {
  if (isRight) {
    if (gameParams.roundCount === 5) {
      elementList.roundPanel.textContent = '!!!YOU WON!!! \n take a walk as a reward';
      elementList.repeatBtn.classList.add('inactive');
    } else {
      elementList.roundPanel.textContent =
        'Great job! When ready for the next round press "Next round"';
      elementList.repeatBtn.textContent = 'Next';
    }
    keysEnabled(false);
    elementList.virtualKB.classList.add('inactive');
    gameParams.roundWon = true;
  } else {
    if (gameParams.isMistakeOne) newGameInit();
    else {
      gameParams.isMistakeOne = true;
      elementList.roundPanel.textContent = `${elementList.roundPanel.textContent} \n Watch out! One more mistake and you'll have to start over!`;
    }
  }
}

function newGameInit() {
  elementList.virtualKB.classList.add('inactive');
  elementList.difficultySelect.classList.remove('inactive');
  keysEnabled(false);
  gameParams.roundCount = 0;
  gameParams.isNoActiveGame = true;
  gameParams.isMistakeOne = false;
  elementList.startBtn.textContent = 'Start';
  elementList.roundPanel.textContent = `Select difficulty setting and press "Start"`;
  elementList.repeatBtn.textContent = 'Repeat the sequence';
}

function generateElementList() {
  elementList.startBtn = document.querySelector('.startBtn');
  elementList.roundPanel = document.querySelector('.roundPanel');
  elementList.repeatBtn = document.querySelector('.repeatBtn');
  elementList.difficultySelect = document.querySelector('select');
  elementList.virtualKB = document.querySelector('.virtualKB');
  elementList.result = document.querySelector('.result');
}

function mainGameFlow() {
  elementList.startBtn.addEventListener('click', () => {
    if (gameParams.isNoActiveGame) {
      elementList.startBtn.textContent = 'New Game';
      elementList.repeatBtn.classList.add('inactive');
      elementList.difficultySelect.classList.add('inactive');
      gameParams.roundCount += 1;
      gameParams.sequence = generateSequence(gameParams.diff, gameParams.roundCount);
      elementList.roundPanel.textContent = `Round ${gameParams.roundCount}`;
      playSequence(gameParams.sequence, false);
      elementList.virtualKB.classList.remove('inactive');
      gameParams.isNoActiveGame = false;
    } else {
      newGameInit();
    }
    console.log(gameParams.sequence);
  });
}

createHeader();
createMain();
generateKB(gameParams.diff);
generateElementList();
mainGameFlow();
