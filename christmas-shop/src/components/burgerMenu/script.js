import styles from './style.module.css'
import * as burgerFuncs from '../burger/script.js'

function createBurgerMenu(isClosed) {
    const module = document.createElement('ul');
    module.classList.add(styles.list)
    const header = document.querySelector('header');
    header.append(module);
    const mainMenu = document.querySelector('header ul');
    module.innerHTML = mainMenu.innerHTML;

    const burger = document.querySelector('.burger');
    const bars = document.querySelectorAll('.burgerBar');
    const body = document.querySelector('body');

    const clickArr = module.querySelectorAll('li');

    clickArr.forEach(x => {
        x.addEventListener('click', () => {
            bars[0].style['animation-play-state'] = 'running';
            bars[1].style['animation-play-state'] = 'running';
            module.classList.remove(styles.open);
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

    let docWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        docWidth = window.innerWidth;
        if (module.classList.contains(styles.open) && docWidth > 768) {
            bars[0].style['animation-play-state'] = 'running';
            bars[1].style['animation-play-state'] = 'running';
            module.classList.remove(styles.open);
            body.style['overflow-y'] = 'scroll';
            isClosed = !isClosed;
        }
    })

    bars[0].onanimationiteration = () => {
        bars[0].style['animation-play-state'] = 'paused'
        bars[1].style['animation-play-state'] = 'paused'
    }


}

export default createBurgerMenu;
