export function burgerAnimationInit(elem) {
    const bars = document.querySelectorAll('.burgerBar');
    elem.addEventListener('click', () => {
        bars[0].style['animation-play-state'] = 'running'
        bars[1].style['animation-play-state'] = 'running'
    })
    return bars;
}

function burgerFunc() {
    const burger = document.querySelector('.burger');
    const bars = burgerAnimationInit(burger)
    bars[0].onanimationiteration = () => {
        bars[0].style['animation-play-state'] = 'paused'
        bars[1].style['animation-play-state'] = 'paused'
    }
}

export default burgerFunc;
