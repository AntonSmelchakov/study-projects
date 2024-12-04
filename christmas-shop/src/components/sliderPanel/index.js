import styles from './index.module.css';
import createButton from '../button';

function createSliderPanel() {

    const sliderPanel = document.querySelector('#sliderPanel');
    const containerGeneral = document.createElement('div');
    const sliderContainer = document.createElement('div');
    const buttonContainer = document.createElement('div');

    const firstGeneralText = document.createElement('p');
    const secondGeneralText = document.createElement('h2');

    const svgLeftArrow = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M13.5 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>'
    const svgRightArrow = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7H13.5M13.5 7L7.5 1M13.5 7L7.5 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>'

    const btnLeft = createButton({ className: 'button', svg: svgLeftArrow });
    const btnRight = createButton({ className: 'button', svg: svgRightArrow });

    firstGeneralText.textContent = 'Become Happier!';
    secondGeneralText.textContent = 'in the new 2025';

    const textArr = ['live', 'create', 'love', 'dream'];

    const imgSrcArr = [
        './img/snowman.png',
        './img/christmas-trees.png',
        './img/christmas-tree-ball.png',
        './img/fairytale-house.png'
    ];

    for (let i = 0; i < 4; i += 1) {
        let sliderText = document.createElement('p');
        sliderText.textContent = textArr[i];
        sliderText.className = styles.sliderText;
        let sliderImage = document.createElement('img');
        sliderImage.src = imgSrcArr[i];
        sliderImage.className = styles.sliderImage;
        sliderImage.alt = imgSrcArr[i].slice(10, -4);
        sliderContainer.append(sliderText, sliderImage);
    }

    sliderPanel.classList.add(styles.container);
    containerGeneral.classList.add(styles.containerGeneral);
    firstGeneralText.className = styles.fancyText;
    sliderContainer.classList.add(styles.sliderContainer);
    buttonContainer.classList.add(styles.buttonContainer);
    btnLeft.classList.add(styles.buttonSlider, styles.inactiveButton);
    btnRight.classList.add(styles.buttonSlider);

    buttonContainer.append(btnLeft, btnRight);
    containerGeneral.append(firstGeneralText, secondGeneralText, sliderContainer, buttonContainer);
    sliderPanel.append(containerGeneral);

    let docWidth = window.innerWidth;
    let sliderPosition = 0;
    let sliderMovementsNum = 0;
    let paddingOffset = 0
    if (docWidth > 768) {
        sliderMovementsNum = 3;
        paddingOffset = 83;
    }
    else {
        sliderMovementsNum = 6;
        paddingOffset = 8;
    }
    let elemWidth = parseInt(window.getComputedStyle(sliderPanel).getPropertyValue('width'));
    let endOfSliderVal = (sliderContainer.offsetWidth + paddingOffset * 2) - elemWidth;
    let slideVal = Math.ceil(endOfSliderVal / sliderMovementsNum);

    window.addEventListener('resize', () => {
        docWidth = window.innerWidth;
        if (docWidth > 768) {
            sliderMovementsNum = 3;
            paddingOffset = 83;
        }
        else {
            sliderMovementsNum = 6;
            paddingOffset = 8;
        }
        sliderPosition = 0;
        elemWidth = parseInt(window.getComputedStyle(sliderPanel).getPropertyValue('width'));
        endOfSliderVal = (sliderContainer.offsetWidth + paddingOffset * 2) - elemWidth;
        slideVal = Math.ceil(endOfSliderVal / sliderMovementsNum);
        sliderContainer.style.left = `0px`
        btnLeft.classList.add(styles.inactiveButton);
        btnRight.classList.remove(styles.inactiveButton);
    })

    btnRight.onclick = () => {
        sliderPosition += slideVal;
        sliderContainer.style.left = `${-sliderPosition}px`;
        if (sliderPosition > 0) btnLeft.classList.remove(styles.inactiveButton);
        if (sliderPosition >= endOfSliderVal) btnRight.classList.add(styles.inactiveButton);
    }

    btnLeft.onclick = () => {
        sliderPosition -= slideVal;
        sliderContainer.style.left = `${-sliderPosition}px`;
        console.log(sliderPosition, endOfSliderVal)
        if (sliderPosition < endOfSliderVal) btnRight.classList.remove(styles.inactiveButton);
        if (sliderPosition <= 0) btnLeft.classList.add(styles.inactiveButton);
    }
}

export default createSliderPanel;