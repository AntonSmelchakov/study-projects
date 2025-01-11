import style from './style.module.css';

export default function createHeader() {
  const header = document.createElement('header');
  document.body.append(header);
  header.classList.add(style.header);

  /* repeatBtn start */
  const repeatBtn = document.createElement('button');
  repeatBtn.classList.add(style.repeatBtn, style.button);
  repeatBtn.textContent = 'Repeat the sequence';
  /* repeatBtn end */
  /* startBtn start */
  const startBtn = document.createElement('button');
  startBtn.classList.add(style.startBtn, style.button);
  startBtn.textContent = 'Start';
  /* startBtn end */
  /*  difficultySelect start*/
  const difficultySelect = document.createElement('select');
  difficultySelect.classList.add(style.difficultySelect);
  const diffArray = ['easy', 'normal', 'hard'];
  for (let i = 0; i < diffArray.length; ++i) {
    let option = document.createElement('option');
    difficultySelect.append(option);
    option.classList.add(style.option);
    option.textContent = diffArray[i];
    option.value = diffArray[i];
  }
  /* difficultySelect end */

  header.append(repeatBtn, startBtn, difficultySelect);
}
