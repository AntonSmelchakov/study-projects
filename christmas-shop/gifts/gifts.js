import '../node_modules/modern-normalize/modern-normalize.css'
import '../style.css'
import './gifts.css'
import createMainGiftsPanel from '../src/components/bigGiftsPanel';
import burgerFunc from '../src/components/burger/script';
import createBurgerMenu from '../src/components/burgerMenu/script';
import createUpButton from '../src/components/upArrow/script';
import createModal from '../src/components/modal/script';

const gifts = await fetch('../json/gifts.json').then(resp => resp.json());
const isClosed = true;

const main = document.querySelector('main');
const body = document.querySelector('body')

burgerFunc();
createBurgerMenu(isClosed);
createMainGiftsPanel({ className: 'bigGiftsPanel', parent: main, gifts: gifts });
createUpButton(body);
createModal(body);