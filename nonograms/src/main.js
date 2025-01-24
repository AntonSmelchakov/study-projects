import '../node_modules/modern-normalize/modern-normalize.css';
import './style.css';

const gameSettings = { difficulty: 15 };
const elemList = {};

function createBoxItems(num) {
  for (let i = 0; i < num * num; ++i) {
    let boxItem = document.createElement('div');
    boxItem.classList.add('boxItem');
    let fiveCheck = (i + gameSettings.difficulty) % (gameSettings.difficulty * 5);
    console.log(fiveCheck);
    if (i > 30 && fiveCheck >= 0 && fiveCheck < gameSettings.difficulty) {
      console.log(fiveCheck);
      boxItem.classList.add('bottomBorder');
    }
    elemList.box.append(boxItem);
  }
}

/* REWRITE TO SINGLE FUNC */
function createHintItems(num, isVertical) {
  for (let i = 0; i < num * num; ++i) {
    let hintItem = document.createElement('div');
    if (isVertical) hintItem.classList.add('vHintItem');
    else hintItem.classList.add('hHintItem');
    elemList.box.append(boxItem);
  }
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
  elemList.main.append(elemList.vHints);

  elemList.hHints = document.createElement('div');
  elemList.hHints.classList.add('hHints');
  elemList.main.append(elemList.hHints);

  createBoxItems(gameSettings.difficulty);
}

function main() {
  createMainPage();
}

main();
