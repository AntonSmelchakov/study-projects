import styles from './style.module.css'
import * as burgerFuncs from '../burger/script.js'

let isClosed = true;

function createBurgerMenu() {
    const module = document.createElement('ul');
    module.classList.add(styles.list)
    const header = document.querySelector('header');
    header.append(module);
    const mainMenu = document.querySelector('header ul');
    module.innerHTML = mainMenu.innerHTML;

    const burger = document.querySelector('.burger');
    const body = document.querySelector('body');

    const clickArr = module.querySelectorAll('a');

    clickArr.forEach(x => {
        burgerFuncs.burgerAnimationInit(x);
        x.addEventListener('click', () => {
            module.classList.remove(styles.open)
            body.style['overflow-y'] = 'scroll';
            isClosed = !isClosed;
        });
    })

    burger.addEventListener('click', () => {
        if (isClosed) {
            module.classList.add(styles.open);
            body.style['overflow-y'] = 'hidden'
        }
        else {
            module.classList.remove(styles.open);
            body.style['overflow-y'] = 'scroll';
        }
        isClosed = !isClosed;
    })


}

export { createBurgerMenu, isClosed };
