import styles from './index.module.css';

function createButton({ text, onClick, link, className, image, svg }) {
    const button = document.createElement('button');

    if (onClick) {
        button.addEventListener('click', onClick);
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

    if (image) {
        const img = document.createElement('img');
        img.src = image;
        button.append(image);
    }

    if (svg) {
        button.innerHTML = `${button.innerHTML}${svg}`;
    }

    button.classList.add(styles.button);

    return button;
}

export default createButton;