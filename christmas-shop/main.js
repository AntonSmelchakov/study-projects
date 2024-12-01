import './node_modules/modern-normalize/modern-normalize.css'
import './style.css'
import createGreetPanel from './src/components/greetPanel/'
import createAboutPanel from './src/components/aboutPanel';
import createSliderPanel from './src/components/sliderPanel';
import createBestPanel from './src/components/bestPanel';
import createTimerPanel from './src/components/timerPanel';
import burgerFunc from './src/components/burger/script';
import createBurgerMenu from './src/components/burgerMenu/script';

const gifts = await fetch('./json/gifts.json').then(resp => resp.json());
let isClosed = true; let docWidth = window.innerWidth;

const main = document.querySelector('main');

burgerFunc();
createBurgerMenu(isClosed);
createGreetPanel();
createAboutPanel();
createSliderPanel();
createBestPanel(gifts);
createTimerPanel();