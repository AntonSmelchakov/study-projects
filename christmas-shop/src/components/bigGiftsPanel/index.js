import styles from './index.module.css';
import createGiftPanel from '../giftPanel';

function createMainGiftsPanel({ className, parent, gifts }) {

    const mainGiftsPanel = document.createElement('article');
    mainGiftsPanel.classList.add(styles.container);

    const containerGeneral = document.createElement('div');
    containerGeneral.classList.add(styles.containerGeneral);
    mainGiftsPanel.append(containerGeneral);

    const tabsPanel = document.createElement('div');
    tabsPanel.className = styles.tabsPanel;


    const firstGeneralText = document.createElement('h2');
    firstGeneralText.textContent = 'Achieve health, harmony, and inner strength';
    firstGeneralText.className = styles.bigText;

    const panelContainer = document.createElement('div');
    panelContainer.classList.add(styles.panelContainer);

    for (let i = 0; i < 4; i += 1) {
        const tab = document.createElement('button');
        tab.classList.add(styles.tab);
        switch (i) {
            case 0: tab.textContent = 'all'; break;
            case 1: tab.textContent = 'for work'; break;
            case 2: tab.textContent = 'for health'; break;
            case 3: tab.textContent = 'for harmony'; break;
        }
        tabsPanel.append(tab);
    }

    containerGeneral.append(firstGeneralText, tabsPanel, panelContainer);

    const newPanels = gifts.slice(0, 12);

    newPanels.forEach(x => {
        createGiftPanel(x.category, x.name, panelContainer, '../')
    })

    if (className) {
        mainGiftsPanel.classList.add(className);
    }

    parent.append(mainGiftsPanel);

}

export default createMainGiftsPanel;