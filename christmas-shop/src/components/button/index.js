import styles from './index.module.css';

function createButton({ text, onClick, link, className }) {
    const button = document.createElement('button');

    if (onClick) {
        button.onClick = onClick;
    }

    if (className) {
        button.classList.add(className);
    }

    if (link) {
        const buttonLink = document.createElement('a');
        buttonLink.href = link;
        buttonLink.textContent = text;
        button.append(buttonLink);
    }

    button.classList.add(styles.button);

    return button;
}

export default createButton;