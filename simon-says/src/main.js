import '../node_modules/modern-normalize/modern-normalize.css';
import './style.css';

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

function createItem(text) {
  const item = document.createElement('div');
  item.classList.add('item');
  item.textContent = text;
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
    virtualKB.append(createItem(x));
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
  return new Promise((resolve) => (item.animationEnd = resolve));
}

async function animateItem(style) {}

function playSequence(seq) {}

function mainGameFlow() {
  let roundCount = 1;
  let diff = document.querySelector('select').value;
  let sequence = [];

  const difficultySelect = document.querySelector('select');
  difficultySelect.addEventListener('click', () => {
    diff = document.querySelector('select').value;
  });

  const startBtn = document.querySelector('.startBtn');
  const roundPanel = document.querySelector('.roundPanel');

  startBtn.addEventListener('click', () => {
    sequence = generateSequence(diff, roundCount);
    roundPanel.textContent = `Round ${roundCount}`;
    console.log(sequence);
    ++roundCount;
  });
}

createHeader();
createMain();
generateKB(document.querySelector('select').value);
mainGameFlow();
