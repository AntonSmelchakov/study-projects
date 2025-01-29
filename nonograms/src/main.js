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
    if (itemClass === 'boxItem') {
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
  elemList.message.textContent = `Congratulations! You won in ${elemList.timer.textContent}!`;
  soundList.win.play();
}

function chooseRiddle(riddle) {
  gameSettings.riddle = riddle;
  elemList.box.style.grid = `repeat(${gameSettings.difficulty},1fr)/repeat(${gameSettings.difficulty},1fr)`;
  elemList.vHints.style.grid = `repeat(${1},1fr)/repeat(${gameSettings.difficulty},1fr)`;
  elemList.hHints.style.grid = `repeat(${gameSettings.difficulty},1fr)/repeat(${1},1fr)`;
  resetBoard();
  elemList.vHints.innerHTML = '';
  elemList.hHints.innerHTML = '';
  createBoxItems(gameSettings.difficulty, 'vhItem', elemList.vHints);
  createBoxItems(gameSettings.difficulty, 'hhItem', elemList.hHints);
  formHints();
  elemList.box.classList.remove('inactive');
  elemList.timer.textContent = '00:00';
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
  createComponent('timer', 'p', 'button', elemList.botPanel);
  elemList.timer.textContent = '00:00';

  createComponent('shadow', 'div', ['shadow', 'hidden'], document.body);
  createComponent('messageBox', 'div', 'messageBox', elemList.shadow);
  createComponent('closeBtn', 'button', 'closeBtn', elemList.messageBox);
  createComponent('message', 'p', 'message', elemList.messageBox);
  elemList.closeBtn.textContent = 'close';

  elemList.closeBtn.addEventListener('click', () => {
    elemList.shadow.classList.add('hidden');
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
    resetBoard();
  });

  item = createComponent('saveBtn', 'button', 'button', '');
  item.innerHTML = 'Save<br> Game';
  elemList.leftPanel.append(item);
  item.addEventListener('click', () => {
    if (gameSettings.savedGame) {
      item.innerHTML = 'Save<br> Game';
      gameSettings.workSpace = JSON.parse(localStorage.getItem('savedGame'));
      let arr = gameSettings.workSpace.flat();
      arr.forEach((x, i) => {
        if (x === 1) document.getElementById(i).classList.add('checked');
      });
      elemList.timer.textContent = JSON.parse(localStorage.getItem('timer'));
      timerOnOff(true);
      gameSettings.savedGame = false;
    } else {
      localStorage.setItem('savedGame', JSON.stringify(gameSettings.workSpace));
      localStorage.setItem('timer', JSON.stringify(elemList.timer.textContent));
    }
  });

  createComponent('riddleSelect', 'div', 'riddleSelect', elemList.main);
  let closeBtn = elemList.closeBtn.cloneNode();
  closeBtn.addEventListener('click', () => (elemList.riddleSelect.style.right = '-100%'));
  closeBtn.textContent = 'Close';
  elemList.riddleSelect.append(closeBtn);
  let title = document.createElement('h2');
  title.textContent = 'Choose the riddle you want to solve';
  elemList.riddleSelect.append(title);
  createComponent('riddleGrid', 'div', 'riddleGrid', elemList.riddleSelect, [1, 3]);
  let riddleKeys = Object.keys(riddles);
  riddleKeys.forEach((e) => {
    let diffContainer = createComponent('', 'div', 'diffContainer', '');
    let title = createComponent('', 'p', '', '');
    title.textContent = e;
    diffContainer.append(title);
    let diffKeys = Object.keys(riddles[e]);
    diffKeys.forEach((x) => {
      let button = createComponent('', 'button', 'button', '');
      button.textContent = riddles[e][x].name;
      diffContainer.append(button);
      button.addEventListener('click', () => {
        let chosenRiddle = riddles[e][x];
        gameSettings.difficulty = chosenRiddle.data.length;
        chooseRiddle(chosenRiddle.data);
        elemList.riddleSelect.style.right = '-100%';
      });
    });
    elemList.riddleGrid.append(diffContainer);
  });

  elemList.box.addEventListener(
    'click',
    (element) => {
      let itemCL = element.target.classList;
      if (itemCL.contains('boxItem') && !itemCL.contains('ignored')) {
        if (!gameSettings.timerOn) timerOnOff(true);
        if (!itemCL.contains('checked')) soundList.checked.play();
        else soundList.empty.play();
        itemCL.toggle('checked');
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
      if (itemCL.contains('boxItem') && !itemCL.contains('checked')) {
        if (!gameSettings.timerOn) timerOnOff(true);
        if (!itemCL.contains('ignored')) soundList.ignored.play();
        else soundList.empty.play();
        itemCL.toggle('ignored');
      }
    },
    false,
  );
}

async function main() {
  createMainPage();
  resetBoard();
  if (localStorage.key('savedGame')) {
    gameSettings.savedGame = true;
    elemList.saveBtn.innerHTML = 'Continue<br>last game';
  }
  initSounds();
}

const riddles = await fetch('./riddles.json').then((resp) => resp.json());
main();
