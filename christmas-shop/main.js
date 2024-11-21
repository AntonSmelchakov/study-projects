import './node_modules/modern-normalize/modern-normalize.css'
import './style.css'
import createGreetPanel from './src/components/greetPanel/'
import createAboutPanel from './src/components/aboutPanel';

const main = document.querySelector('main');

createGreetPanel({ className: 'greetPage', parent: main });
createAboutPanel({ className: 'aboutPanel', parent: main });
