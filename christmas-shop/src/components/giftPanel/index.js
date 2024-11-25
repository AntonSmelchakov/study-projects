import styles from './index.module.css';

function createGiftPanel(type, name, parent) {
    const newPanel = document.createElement('div');
    newPanel.classList.add(styles.panel);
    parent.append(newPanel);

    const newImage = document.createElement('img');
    newImage.classList.add(styles.newImage);

    const textContainer = document.createElement('div');
    textContainer.classList.add(styles.textContainer);

    newPanel.append(newImage, textContainer);

    const typeText = document.createElement('h4');
    typeText.textContent = type;
    typeText.classList.add(styles.typeText);

    switch (type) {
        case 'For Harmony': typeText.classList.add(styles.harmony); newImage.src = './img/gift-for-harmony.png'; break;
        case 'For Health': typeText.classList.add(styles.health); newImage.src = './img/gift-for-health.png'; break;
        case 'For Work': typeText.classList.add(styles.work); newImage.src = './img/gift-for-work.png'; break;
    }

    const nameText = document.createElement('h3');
    nameText.textContent = name;

    textContainer.append(typeText, nameText);
}

export default createGiftPanel