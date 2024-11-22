import styles from './index.module.css';
import createButton from '../button';

function createGreetPanel({ className, parent }) {

    const greetPanel = document.createElement('article');

    const textContainer = document.createElement('div');

    const first = document.createElement('p');
    const second = document.createElement('h2');
    const third = createButton({ text: 'explore magical gifts', link: './gifts/gifts.html' });
    const fourth = document.createElement('p')

    first.textContent = 'Merry Christmas';
    second.textContent = 'Gift yourself the magic of new possibilities';
    fourth.textContent = 'and Happy New Year';

    if (className) {
        greetPanel.classList.add(className)
    }

    greetPanel.classList.add(styles.container);
    textContainer.className = styles.textContainer;
    first.className = styles.fancyText;
    second.className = styles.bigText;
    fourth.className = 'fancyText'
    textContainer.append(first, second, third, fourth);
    greetPanel.append(textContainer);

    parent.append(greetPanel);
}

export default createGreetPanel;