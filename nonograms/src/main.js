import '../node_modules/modern-normalize/modern-normalize.css';
import './style.css';

const gameSettings = { difficulty: 5, timerOn: false, savedGame: false };
const elemList = {};
const soundList = {};

function createBoxItems(num, itemClass, appendTarget) {
  let maxIter = itemClass === 'boxItem' ? num * num : num;
  for (let i = 0; i < maxIter; ++i) {
    let boxItem = document.createElement('div');
    boxItem.classList.add(itemClass);
    if (appendTarget === elemList.box) {
      let fiveCheck = (i + gameSettings.difficulty) % (gameSettings.difficulty * 5);
      if (i > 30 && fiveCheck >= 0 && fiveCheck < gameSettings.difficulty) {
        boxItem.classList.add('bottomBorder');
      }
      boxItem.id = i;
    }
    appendTarget.append(boxItem);
  }
}

function resetBoard() {
  gameSettings.workSpace = [];
  for (let i = 0; i < gameSettings.difficulty; ++i) {
    gameSettings.workSpace.push([]);
    for (let j = 0; j < gameSettings.difficulty; ++j) {
      gameSettings.workSpace[i].push(0);
    }
  }
  elemList.box.innerHTML = '';
  createBoxItems(gameSettings.difficulty, 'boxItem', elemList.box);
}

function formHints() {
  let vHints = document.querySelectorAll('.vhItem');
  let hHints = document.querySelectorAll('.hhItem');
  for (let i = 0; i < gameSettings.difficulty; ++i) {
    let vCount = 0;
    let hCount = 0;
    /*     createBoxItems(gameSettings.difficulty, 'boxItem', vHints[i]);
    createBoxItems(gameSettings.difficulty, 'boxItem', hHints[i]); */
    for (let j = 0; j < gameSettings.difficulty; ++j) {
      if (gameSettings.riddle[j][i] === 1) {
        vCount += 1;
        if (j === gameSettings.difficulty - 1) vHints[i].innerHTML += `${vCount}<br>`;
      } else {
        if (vCount > 0) vHints[i].innerHTML += `${vCount}<br>`;
        vCount = 0;
      }
      if (gameSettings.riddle[i][j] === 1) {
        hCount += 1;
        if (j === gameSettings.difficulty - 1) hHints[i].innerHTML += `${hCount} `;
      } else {
        if (hCount > 0) hHints[i].innerHTML += `${hCount} `;
        hCount = 0;
      }
    }
  }
}

function winHandler() {
  timerOnOff(false);
  elemList.box.classList.add('inactive');
  elemList.shadow.classList.remove('hidden');
  elemList.messageBox.classList.remove('hidden');
  elemList.message.textContent = `Congratulations! You won in ${elemList.timer.textContent}!`;
  if (gameSettings.soundOn) soundList.win.play();
  let lbObject = Object.assign({}, gameSettings.chosenRiddle);
  lbObject.time = gameSettings.time;
  lbObject.timeString = `${elemList.timer.textContent}`;
  gameSettings.leaderboard.push(lbObject);
  if (gameSettings.leaderboard.length > 5) gameSettings.leaderboard.shift();
  localStorage.setItem('leaderboard', JSON.stringify(gameSettings.leaderboard));
  fillLeaderboard();
}

function chooseRiddle(riddle, clearBoard) {
  gameSettings.riddle = riddle.data;
  elemList.box.style.grid = `repeat(${gameSettings.difficulty},1fr)/repeat(${gameSettings.difficulty},1fr)`;
  elemList.vHints.style.grid = `repeat(${1},1fr)/repeat(${gameSettings.difficulty},1fr)`;
  elemList.hHints.style.grid = `repeat(${gameSettings.difficulty},1fr)/repeat(${1},1fr)`;
  if (clearBoard) {
    resetBoard();
    elemList.timer.textContent = '00:00';
    timerOnOff(false);
  }
  elemList.description.textContent = gameSettings.chosenRiddle.description;
  elemList.vHints.innerHTML = '';
  elemList.hHints.innerHTML = '';
  createBoxItems(gameSettings.difficulty, 'vhItem', elemList.vHints);
  createBoxItems(gameSettings.difficulty, 'hhItem', elemList.hHints);
  formHints();
  elemList.box.classList.remove('inactive');
}

function createComponent(varName, tag, compClass, appendTarget, gridParams) {
  let item = document.createElement(tag);
  if (compClass !== '' && typeof compClass === 'string') item.classList.add(compClass);
  if (compClass !== '' && typeof compClass === 'object') item.classList.add(...compClass);
  if (gridParams) {
    item.style.grid = `repeat(${gridParams[0]},1fr)/repeat(${gridParams[1]},1fr)`;
  }
  if (varName !== '') elemList[varName] = item;
  if (appendTarget !== '') appendTarget.append(elemList[varName]);
  return item;
}

function timerOnOff(isOn) {
  let str = elemList.timer.textContent;
  let count = +str.slice(0, 2) * 60 + +str.slice(3);
  if (isOn) {
    gameSettings.timerOn = true;
    gameSettings.timerId = setInterval(() => {
      count += 1;
      let seconds = Math.trunc(count % 60);
      let minutes = Math.trunc((count / 60) % 60);
      elemList.timer.textContent =
        `${minutes}`.padStart(2, '0') + ':' + `${seconds}`.padStart(2, '0');
      gameSettings.time = count;
    }, 1000);
  } else {
    gameSettings.timerOn = false;
    clearInterval(gameSettings.timerId);
  }
}

function initSounds() {
  const sounds = [
    { type: 'checked', path: './sounds/checked.wav' },
    { type: 'ignored', path: './sounds/ignored.wav' },
    { type: 'empty', path: './sounds/empty.wav' },
    { type: 'win', path: './sounds/win.wav' },
  ];
  sounds.forEach((x) => {
    soundList[x.type] = new Audio(x.path);
  });
}

function createMainPage() {
  createComponent('main', 'main', 'mainContainer', document.body);
  createComponent('topPanel', 'div', 'topPanel', elemList.main);

  createComponent('box', 'div', 'box', elemList.main, [
    gameSettings.difficulty,
    gameSettings.difficulty,
  ]);
  createComponent('vHints', 'div', 'vHints', elemList.main, [1, gameSettings.difficulty]);
  createComponent('hHints', 'div', 'hHints', elemList.main, [gameSettings.difficulty, 1]);

  createComponent('botPanel', 'div', 'botPanel', elemList.main);
  createComponent('timer', 'p', 'div', elemList.botPanel);
  elemList.timer.textContent = '00:00';
  createComponent('description', 'p', '', elemList.botPanel);
  elemList.description.textContent = 'Choose a riddle or just pop these bad boys';

  createComponent('shadow', 'div', ['shadow', 'hidden'], document.body);
  createComponent('messageBox', 'div', ['messageBox', 'hidden'], elemList.main);
  createComponent('closeBtn', 'button', 'closeBtn', elemList.messageBox);
  createComponent('message', 'p', 'message', elemList.messageBox);

  elemList.closeBtn.addEventListener('click', () => {
    elemList.shadow.classList.add('hidden');
    elemList.messageBox.classList.add('hidden');
  });

  createComponent('leftPanel', 'div', 'leftPanel', elemList.main);
  let item = createComponent('', 'button', 'button', '');
  item.innerHTML = 'Choose<br> The Riddle';
  elemList.leftPanel.append(item);
  item.addEventListener('click', () => {
    elemList.riddleSelect.style.right = '0%';
  });

  item = createComponent('', 'button', 'button', '');
  item.innerHTML = 'Reset<br> Board';
  elemList.leftPanel.append(item);
  item.addEventListener('click', () => {
    chooseRiddle(gameSettings.chosenRiddle, true);
  });

  item = createComponent('saveBtn', 'button', 'button', '');
  item.innerHTML = 'Save<br> Game';
  elemList.leftPanel.append(item);
  item.addEventListener('click', () => {
    localStorage.setItem('savedGame', JSON.stringify(gameSettings.workSpace));
    localStorage.setItem('timer', JSON.stringify(elemList.timer.textContent));
    localStorage.setItem('riddle', JSON.stringify(gameSettings.chosenRiddle));
    gameSettings.savedGame = true;
  });

  item = createComponent('loadBtn', 'button', 'button', '');
  item.innerHTML = 'Continue<br>saved game';
  elemList.leftPanel.append(item);
  item.addEventListener('click', () => {
    gameSettings.chosenRiddle = JSON.parse(localStorage.getItem('riddle'));
    gameSettings.difficulty = gameSettings.chosenRiddle.data.length;
    chooseRiddle(gameSettings.chosenRiddle, true);
    gameSettings.workSpace = JSON.parse(localStorage.getItem('savedGame'));
    elemList.timer.textContent = JSON.parse(localStorage.getItem('timer'));
    let arr = gameSettings.workSpace.flat();
    arr.forEach((x, i) => {
      if (x === 1) document.getElementById(i).classList.add('checked');
    });
    timerOnOff(true);
    gameSettings.savedGame = false;
  });

  createComponent('riddleSelect', 'div', 'riddleSelect', elemList.main);
  let closeBtn = elemList.closeBtn.cloneNode();
  closeBtn.addEventListener('click', () => (elemList.riddleSelect.style.right = '-100%'));
  elemList.riddleSelect.append(closeBtn);
  let title = document.createElement('h2');
  title.textContent = 'Choose the riddle you want to solve';
  elemList.riddleSelect.append(title);
  createComponent('riddleGrid', 'div', 'riddleGrid', elemList.riddleSelect, [1, 3]);
  let diffs = ['easy', 'medium', 'hard'];
  for (const diff of diffs) {
    createComponent(diff, 'div', 'diffContainer', elemList.riddleGrid);
    let title = document.createElement('p');
    title.textContent = diff;
    elemList[diff].append(title);
  }
  for (const elem of riddles) {
    let button = createComponent('', 'button', 'button', '');
    button.textContent = elem.name;
    button.addEventListener('click', () => {
      gameSettings.chosenRiddle = elem;
      gameSettings.difficulty = gameSettings.chosenRiddle.data.length;
      chooseRiddle(gameSettings.chosenRiddle, true);
      elemList.riddleSelect.style.right = '-100%';
    });
    elemList[elem.difficulty].append(button);
  }
  let button = createComponent('', 'button', 'button', '');
  button.textContent = 'Random game';
  button.addEventListener('click', () => {
    let randomIndex = Math.floor(Math.random() * (riddles.length + 1));
    gameSettings.chosenRiddle = riddles[randomIndex];
    gameSettings.difficulty = gameSettings.chosenRiddle.data.length;
    chooseRiddle(gameSettings.chosenRiddle, true);
    elemList.riddleSelect.style.right = '-100%';
  });
  elemList.riddleSelect.append(button);

  createComponent('leaderboard', 'div', ['leaderboard', 'hidden'], elemList.main);
  title = createComponent('', 'p', '', '');
  title.textContent = 'Leaderboard';
  elemList.leaderboard.append(title);
  createComponent('leaderboardGrid', 'div', 'leaderboardGrid', elemList.leaderboard);
  gameSettings.leaderboard = [];

  button = createComponent('', 'button', 'button', '');
  button.textContent = 'Leaderboard';
  button.addEventListener('click', () => {
    elemList.leaderboard.classList.remove('hidden');
    elemList.shadow.classList.remove('hidden');
  });
  elemList.leftPanel.append(button);

  closeBtn = elemList.closeBtn.cloneNode();
  closeBtn.addEventListener('click', () => {
    elemList.leaderboard.classList.add('hidden');
    elemList.shadow.classList.add('hidden');
  });
  elemList.leaderboard.append(closeBtn);

  button = createComponent('', 'button', 'button', '');
  button.textContent = 'Solution';
  button.addEventListener('click', () => {
    resetBoard();
    elemList.timer.textContent = '00:00';
    timerOnOff(false);
    elemList.box.classList.add('inactive');
    let arr = gameSettings.riddle.flat();
    arr.forEach((x, i) => {
      if (x === 1) {
        let item = document.getElementById(i);
        item.classList.add('checked');
      }
    });
  });
  elemList.leftPanel.append(button);

  button = createComponent('', 'button', 'button', '');
  gameSettings.theme = 'light';
  document.body.style = '--theme: light';
  button.innerHTML = 'Switch<br>color theme';
  button.addEventListener('click', () => {
    if (gameSettings.theme === 'light') {
      document.body.style = '--theme: dark';
      gameSettings.theme = 'dark';
    } else {
      document.body.style = '--theme: light';
      gameSettings.theme = 'light';
    }
  });
  elemList.leftPanel.append(button);
  button = createComponent('', 'button', 'button', '');
  gameSettings.soundOn = true;
  button.innerHTML = 'Sound on';
  button.addEventListener('click', () => {
    if (gameSettings.soundOn) {
      button.innerHTML = 'Sound off';
      gameSettings.soundOn = false;
    } else {
      button.innerHTML = 'Sound on';
      gameSettings.soundOn = true;
    }
  });
  elemList.leftPanel.append(button);

  elemList.box.addEventListener(
    'click',
    (element) => {
      let itemCL = element.target.classList;
      if (itemCL.contains('boxItem')) {
        if (!gameSettings.timerOn) timerOnOff(true);
        if (!itemCL.contains('checked') && gameSettings.soundOn) soundList.checked.play();
        else if (gameSettings.soundOn) soundList.empty.play();
        itemCL.toggle('checked');
        itemCL.remove('ignored');
        let eId = element.target.id;
        let row = Math.floor(eId / gameSettings.difficulty);
        let column = eId % gameSettings.difficulty;
        gameSettings.workSpace[row][column] = gameSettings.workSpace[row][column] ? 0 : 1;
        let w = gameSettings.workSpace.toString();
        let r = gameSettings.riddle.toString();
        if (w === r) winHandler();
      }
    },
    false,
  );

  elemList.box.addEventListener(
    'contextmenu',
    (element) => {
      element.preventDefault();
      let itemCL = element.target.classList;
      if (itemCL.contains('boxItem')) {
        if (!gameSettings.timerOn) timerOnOff(true);
        if (!itemCL.contains('ignored') && gameSettings.soundOn) soundList.ignored.play();
        else if (gameSettings.soundOn) soundList.empty.play();
        itemCL.remove('checked');
        itemCL.toggle('ignored');
        let eId = element.target.id;
        let row = Math.floor(eId / gameSettings.difficulty);
        let column = eId % gameSettings.difficulty;
        gameSettings.workSpace[row][column] = 0;
        let w = gameSettings.workSpace.toString();
        let r = gameSettings.riddle.toString();
        if (w === r) winHandler();
      }
    },
    false,
  );
}

function fillLeaderboard() {
  elemList.leaderboardGrid.replaceChildren();
  let arr = gameSettings.leaderboard.map((x) => x);
  arr.sort((a, b) => a.time - b.time);
  for (const e of arr) {
    let item = document.createElement('p');
    item.textContent = `${e.name} - ${e.difficulty} - ${e.timeString}`;
    elemList.leaderboardGrid.append(item);
  }
}

async function main() {
  createMainPage();
  resetBoard();
  if (localStorage['savedGame']) {
    gameSettings.savedGame = true;
  }
  if (localStorage['leaderboard']) {
    gameSettings.leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    fillLeaderboard();
  }
  initSounds();
  gameSettings.chosenRiddle = riddles[0];
  chooseRiddle(gameSettings.chosenRiddle, true);
}

const riddles = await fetch('./riddles.json').then((resp) => resp.json());
main();
