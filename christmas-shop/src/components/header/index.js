import styles from './index.module.css';

function createHeaderPanel() {

    const headerPanel = document.querySelector('header');
    headerPanel.classList.add(styles.container);

    const logoContainer = document.createElement('div');
    logoContainer.className = styles.logoContainer;
    headerPanel.append(logoContainer);

    const first = document.createElement('h2');
    first.textContent = 'Ready to start your journey to a better version of yourself?';
    /*     first.className = styles.fancyText; */
    const second = createButton({ text: 'explore magical gifts', link: './gifts/gifts.html' });
    /*    second.className = styles.blackButton */
    const third = document.createElement('p')
    third.textContent = 'The New Year is Coming Soon...';
    third.className = styles.fancyText;

    logoContainer.append(first, second, third, createTimer());
}

export default createHeaderPanel;