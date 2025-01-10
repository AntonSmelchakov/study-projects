import '../node_modules/modern-normalize/modern-normalize.css';
import './style.css';

let gameParams = { diff: 'easy', roundCount: 1, repeatUsed: false, sequence: [] };

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
    repeatBtn.classList.add('repeatBtn', 'inactive');
    playSequence(gameParams.sequence, true);
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
  roundPanel.textContent = 'Round 1';

  const result = document.createElement('div');
  result.classList.add('result');

  const virtualKB = document.createElement('div');
  virtualKB.classList.add('virtualKB');

  main.append(roundPanel, result, virtualKB);
}

function createItem(text, isKb) {
  const item = document.createElement('div');
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

async function animationEnd(item, lockRepeat) {
  return new Promise((resolve) => (item.onanimationiteration = resolve));
}

async function playSequence(seq, lockRepeat) {
  let res = [];
  let i = 0;
  document.body.classList.add('inactive');

  while (i < seq.length) {
    let item = document.getElementById(seq[i]);
    console.log(item);
    item.style['animation-play-state'] = 'running';
    await animationEnd(item);
    item.style['animation-play-state'] = 'paused';
    ++i;
  }
  const repeatBtn = document.querySelector('.repeatBtn');
  if (lockRepeat) repeatBtn.classList.add('inactive');
  else repeatBtn.classList.remove('inactive');
  document.body.classList.remove('inactive');
}

function mainGameFlow() {
  const startBtn = document.querySelector('.startBtn');
  const roundPanel = document.querySelector('.roundPanel');
  const repeatBtn = document.querySelector('.repeatBtn');

  startBtn.addEventListener('click', () => {
    repeatBtn.classList.add('inactive');
    gameParams.sequence = generateSequence(gameParams.diff, gameParams.roundCount);
    console.log(gameParams.sequence);
    roundPanel.textContent = `Round ${gameParams.roundCount}`;
    playSequence(gameParams.sequence, false);
    gameParams.roundCount += 1;
  });
}

createHeader();
createMain();
generateKB(gameParams.diff);
mainGameFlow();
