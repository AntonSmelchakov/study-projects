import styles from './index.module.css';
import createButton from '../button';
import createTimer from '../timer';

function createTimerPanel({ className, parent }) {

    const timerPanel = document.createElement('article');
    if (className) timerPanel.classList.add(className)
    timerPanel.classList.add(styles.container);
    parent.append(timerPanel);

    const generalContainer = document.createElement('div');
    generalContainer.className = styles.generalContainer;
    timerPanel.append(generalContainer);

    const first = document.createElement('h2');
    first.textContent = 'Ready to start your journey to a better version of yourself?';
    /*     first.className = styles.fancyText; */
    const second = createButton({ text: 'explore magical gifts', link: './gifts/gifts.html' });
    /*    second.className = styles.blackButton */
    const third = document.createElement('p')
    third.textContent = 'The New Year is Coming Soon...';
    third.className = styles.fancyText;

    generalContainer.append(first, second, third, createTimer());

}

export default createTimerPanel;