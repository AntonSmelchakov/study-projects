import styles from './index.module.css';
import { fillModal } from '../modal/script';

function createGiftPanel(obj, parent, level) {
    const newPanel = document.createElement('div');
    newPanel.classList.add(styles.panel);
    parent.append(newPanel);

    const newImage = document.createElement('img');
    newImage.classList.add(styles.newImage);

    const textContainer = document.createElement('div');
    textContainer.classList.add(styles.textContainer);

    newPanel.append(newImage, textContainer);

    const typeText = document.createElement('h4');
    typeText.textContent = obj.category;
    typeText.classList.add(styles.typeText);
    let type = obj.category;

    switch (type) {
        case 'For Harmony': typeText.classList.add(styles.harmony); newImage.src = level + '/img/gift-for-harmony.png'; break;
        case 'For Health': typeText.classList.add(styles.health); newImage.src = level + '/img/gift-for-health.png'; break;
        case 'For Work': typeText.classList.add(styles.work); newImage.src = level + '/img/gift-for-work.png'; break;
    }

    newPanel.addEventListener('click', () => {
        fillModal(obj, level);
        let shadow = document.querySelector('body>div');
        let body = document.querySelector('body');
        shadow.style.display = 'flex';
        body.style['overflow-y'] = 'hidden';
    })

    const nameText = document.createElement('h3');
    nameText.textContent = obj.name;

    textContainer.append(typeText, nameText);
}

export default createGiftPanel