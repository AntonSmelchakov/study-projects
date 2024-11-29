import '../node_modules/modern-normalize/modern-normalize.css'
import '../style.css'
import './gifts.css'
import createMainGiftsPanel from '../src/components/bigGiftsPanel';
import burgerFunc from '../src/components/burger/script';
import { createBurgerMenu, isClosed } from '../src/components/burgerMenu/script';

const gifts = await fetch('../json/gifts.json').then(resp => resp.json());

const main = document.querySelector('main');

burgerFunc();
createBurgerMenu();
createMainGiftsPanel({ className: 'bigGiftsPanel', parent: main, gifts: gifts });