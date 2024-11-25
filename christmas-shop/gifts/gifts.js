import '../node_modules/modern-normalize/modern-normalize.css'
import '../style.css'
import './gifts.css'
import createMainGiftsPanel from '../src/components/bigGiftsPanel';

const gifts = await fetch('../json/gifts.json').then(resp => resp.json());

const main = document.querySelector('main');

createMainGiftsPanel({ className: 'bigGiftsPanel', parent: main, gifts: gifts });