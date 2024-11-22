import './node_modules/modern-normalize/modern-normalize.css'
import './style.css'
import createGreetPanel from './src/components/greetPanel/'
import createAboutPanel from './src/components/aboutPanel';
import createSliderPanel from './src/components/sliderPanel';
import createBestPanel from './src/components/bestPanel';

const gifts = await fetch('../../json/gifts.json').then(resp => resp.json());

const main = document.querySelector('main');

createGreetPanel({ className: 'greetPage', parent: main });
createAboutPanel({ className: 'aboutPanel', parent: main });
createSliderPanel({ className: 'sliderPanel', parent: main });
createBestPanel({ className: 'bestPanel', parent: main, gifts: gifts });