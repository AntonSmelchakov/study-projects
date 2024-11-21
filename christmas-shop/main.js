import './node_modules/modern-normalize/modern-normalize.css'
import './style.css'
import createGreetPanel from './src/components/greetPanel/'
import createAboutPanel from './src/components/aboutPanel';
import createSliderPanel from './src/components/sliderPanel';

const main = document.querySelector('main');

createGreetPanel({ className: 'greetPage', parent: main });
createAboutPanel({ className: 'aboutPanel', parent: main });
createSliderPanel({ className: 'sliderPanel', parent: main });