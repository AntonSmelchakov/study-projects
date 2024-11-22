import styles from './index.module.css';

function createAboutPanel({ className, parent }) {

    const aboutPanel = document.createElement('article');

    const containerGeneral = document.createElement('div');

    const textContainer = document.createElement('div');

    const imageOne = document.createElement('img');

    const first = document.createElement('p');
    const second = document.createElement('h2');
    const third = document.createElement('p');

    first.textContent = 'About';
    second.textContent = 'Unleash your inner superhero!';
    third.textContent = 'This New Year marks the beginning of your journey to inner harmony and new strengths. We offer unique gifts that will help you improve your life.';

    imageOne.src = '../../img/santa.png';

    aboutPanel.classList.add(styles.container);
    textContainer.classList.add(styles.textContainer);
    containerGeneral.classList.add(styles.containerGeneral);
    first.className = styles.fancyText;
    third.className = styles.normalText;

    textContainer.append(first, second, third);
    containerGeneral.append(textContainer, imageOne)
    aboutPanel.append(containerGeneral);

    if (className) {
        aboutPanel.classList.add(className);
    }

    parent.append(aboutPanel);
}

export default createAboutPanel;