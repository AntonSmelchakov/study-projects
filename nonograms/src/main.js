import '../node_modules/modern-normalize/modern-normalize.css';
import './style.css';

const gameSettings = { difficulty: 5 };
const elemList = {};

function createBoxItems(num, itemClass, appendTarget) {
  let maxIter = itemClass === 'boxItem' ? num * num : num;
  for (let i = 0; i < maxIter; ++i) {
    let boxItem = document.createElement('div');
    boxItem.classList.add(itemClass);
    if (itemClass === 'boxItem') {
      let fiveCheck = (i + gameSettings.difficulty) % (gameSettings.difficulty * 5);
      if (i > 30 && fiveCheck >= 0 && fiveCheck < gameSettings.difficulty) {
        console.log(fiveCheck);
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
}

function chooseRiddle(riddles) {
  gameSettings.riddle = riddles.easy.smile;
  resetBoard();
}

function createMainPage() {
  elemList.main = document.createElement('main');
  elemList.main.classList.add('mainContainer');
  document.body.append(elemList.main);

  elemList.box = document.createElement('div');
  elemList.box.classList.add('box');
  elemList.box.style.grid = `repeat(${gameSettings.difficulty},1fr)/repeat(${gameSettings.difficulty},1fr)`;
  elemList.main.append(elemList.box);

  elemList.vHints = document.createElement('div');
  elemList.vHints.classList.add('vHints');
  elemList.vHints.style.grid = `repeat(1,1fr)/repeat(${gameSettings.difficulty},1fr)`;
  elemList.main.append(elemList.vHints);

  elemList.hHints = document.createElement('div');
  elemList.hHints.classList.add('hHints');
  elemList.hHints.style.grid = `repeat(${gameSettings.difficulty},1fr)/repeat(1,1fr)`;
  elemList.main.append(elemList.hHints);

  createBoxItems(gameSettings.difficulty, 'boxItem', elemList.box);
  createBoxItems(gameSettings.difficulty, 'vhItem', elemList.vHints);
  createBoxItems(gameSettings.difficulty, 'hhItem', elemList.hHints);

  elemList.box.addEventListener(
    'click',
    (element) => {
      let itemCL = element.target.classList;
      if (itemCL.contains('boxItem') && !itemCL.contains('ignored')) {
        itemCL.toggle('checked');
        let eId = element.target.id;
        let row = Math.floor(eId / gameSettings.difficulty);
        let column = eId % gameSettings.difficulty;
        gameSettings.workSpace[row][column] = gameSettings.workSpace[row][column] ? 0 : 1;
        let w = gameSettings.workSpace.toString();
        let r = gameSettings.riddle.toString();
        if (w === r) console.log('win');
      }
    },
    false,
  );

  elemList.box.addEventListener(
    'contextmenu',
    (element) => {
      element.preventDefault();
      let itemCL = element.target.classList;
      if (itemCL.contains('boxItem') && !itemCL.contains('checked')) itemCL.toggle('ignored');
    },
    false,
  );
}

function main() {
  createMainPage();
  chooseRiddle(riddles);
  console.log(gameSettings.workSpace);
}

const riddles = await fetch('./riddles.json').then((resp) => resp.json());
main();
