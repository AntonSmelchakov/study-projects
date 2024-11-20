import './node_modules/modern-normalize/modern-normalize.css'
import './style.css'
import createGreetPanel from './src/components/greetPanel/'

const main = document.querySelector('main');

createGreetPanel({ className: 'greetPage', parent: main });
