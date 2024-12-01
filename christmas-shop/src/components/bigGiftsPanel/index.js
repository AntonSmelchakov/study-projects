import styles from './index.module.css';
import createGiftPanel from '../giftPanel';
import shuffle from '../utilities/shuffle';

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

    const allPanels = shuffle(gifts);
    const workPanels = allPanels.filter(x => x['category'] === "For Work");
    const healthPanels = allPanels.filter(x => x['category'] === "For Health");
    const harmonyPanels = allPanels.filter(x => x['category'] === "For Harmony");

    for (let i = 0; i < 4; i += 1) {
        const tab = document.createElement('button');
        tab.classList.add(styles.tab);
        switch (i) {
            case 0: {
                tab.textContent = 'all';
                tab.classList.add(styles.activeTab);
                tab.onclick = () => {
                    panelContainer.innerHTML = '';
                    allPanels.forEach(x => createGiftPanel(x.category, x.name, panelContainer, '..'));
                    let activeTab = tabsPanel.querySelector(`.${styles.activeTab}`);
                    activeTab.classList.remove(styles.activeTab);
                    tab.classList.add(styles.activeTab);
                }
                break;
            }
            case 1: {
                tab.textContent = 'for work';
                tab.onclick = () => {
                    panelContainer.innerHTML = '';
                    workPanels.forEach(x => createGiftPanel(x.category, x.name, panelContainer, '..'));
                    let activeTab = tabsPanel.querySelector(`.${styles.activeTab}`);
                    activeTab.classList.remove(styles.activeTab);
                    tab.classList.add(styles.activeTab);
                }
                break;
            }
            case 2: {
                tab.textContent = 'for health';
                tab.onclick = () => {
                    panelContainer.innerHTML = '';
                    healthPanels.forEach(x => createGiftPanel(x.category, x.name, panelContainer, '..'));
                    let activeTab = tabsPanel.querySelector(`.${styles.activeTab}`);
                    activeTab.classList.remove(styles.activeTab);
                    tab.classList.add(styles.activeTab);
                }
                break;
            }
            case 3: {
                tab.textContent = 'for harmony';
                tab.onclick = () => {
                    panelContainer.innerHTML = '';
                    harmonyPanels.forEach(x => createGiftPanel(x.category, x.name, panelContainer, '..'));
                    let activeTab = tabsPanel.querySelector(`.${styles.activeTab}`);
                    activeTab.classList.remove(styles.activeTab);
                    tab.classList.add(styles.activeTab);
                }
                break;
            }
        }
        tabsPanel.append(tab);
    }

    containerGeneral.append(firstGeneralText, tabsPanel, panelContainer);


    allPanels.forEach(x => {
        createGiftPanel(x.category, x.name, panelContainer, '..')
    })

    if (className) {
        mainGiftsPanel.classList.add(className);
    }

    parent.append(mainGiftsPanel);

}

export default createMainGiftsPanel;