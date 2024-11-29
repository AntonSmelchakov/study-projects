import styles from './index.module.css';
import createGiftPanel from '../giftPanel';

function createBestPanel(gifts) {

    const bestPanel = document.querySelector('#bestPanel');
    bestPanel.classList.add(styles.container);

    const containerGeneral = document.createElement('div');
    containerGeneral.classList.add(styles.containerGeneral);
    bestPanel.append(containerGeneral);

    const firstGeneralText = document.createElement('p');
    firstGeneralText.className = styles.fancyText;
    firstGeneralText.textContent = 'Best Gifts';


    const secondGeneralText = document.createElement('h2');
    secondGeneralText.textContent = 'especially for you';

    const panelContainer = document.createElement('div');
    panelContainer.classList.add(styles.panelContainer);

    containerGeneral.append(firstGeneralText, secondGeneralText, panelContainer);

    const newPanels = gifts.slice(0, 4);

    newPanels.forEach(x => {
        createGiftPanel(x.category, x.name, panelContainer, '.')
    })

}

export default createBestPanel;