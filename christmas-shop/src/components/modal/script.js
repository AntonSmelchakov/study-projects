import style from './style.module.css'

export function fillModal(obj, level) {
  const modal = document.querySelector(`.modal`);
  const newImage = modal.querySelector('img');
  const typeText = modal.querySelector('h4');
  const giftName = modal.querySelector('h3');
  const description = modal.querySelector('p');
  const statFields = modal.querySelectorAll(`.${style.stats} div`);

  const type = obj.category;
  switch (type) {
    case 'For Harmony': typeText.classList.add(style.harmony); newImage.src = level + '/img/gift-for-harmony.png'; break;
    case 'For Health': typeText.classList.add(style.health); newImage.src = level + '/img/gift-for-health.png'; break;
    case 'For Work': typeText.classList.add(style.work); newImage.src = level + '/img/gift-for-work.png'; break;
  }

  typeText.textContent = type;
  giftName.textContent = obj.name;
  description.textContent = obj.description;
  const statVals = Object.values(obj.superpowers);
  const snowflake = `<img src="${level}/img/snowflake.svg" alt="red snowflake">`;
  for (let i = 0; i < 4; i += 1) {
    statFields[i].innerHTML = `<span>${statVals[i]}</span>${snowflake.repeat(+statVals[i] / 100)}`;
  }
}

export default function createModal(parent) {
  const model = document.createElement('div')
  parent.append(model);
  model.outerHTML = `
    <div class="${style.shadow}">
        <div class="modal ${style.mainContainer}">
          <button class="${style.closeBtn}">
            <span class="${style.bar}"></span>
            <span class="${style.bar}"></span>
          </button>
          <img class="${style.newImage}"src="" alt="">
          <div>
            <h4></h4>
            <h3></h3>
            <p></p>
            <h5>adds superpowers to:</h5>
            <div class="${style.stats}">
                <p>Live</p>
                <p>Create</p>
                <p>Love</p>
                <p>Dream</p>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
          </div>
        </div>
    </div>
    `;

  const closeBtn = document.querySelector('.modal button');
  const shadow = document.querySelector(`.${style.shadow}`)
  let body = document.body;
  closeBtn.onclick = () => {
    body.style['overflow-y'] = 'scroll';
    shadow.style.display = 'none';
  }

  shadow.onclick = (x) => {
    if (x.target === x.currentTarget) {
      body.style['overflow-y'] = 'scroll';
      shadow.style.display = 'none';
    }
  }



}