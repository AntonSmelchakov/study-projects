

function burgerFunc() {
    const bars = document.querySelectorAll('.burgerBar');
    const burger = document.querySelector('.burger');
    burger.onclick = () => {
        bars[0].style['animation-play-state'] = 'running'
        bars[1].style['animation-play-state'] = 'running'
    }
    bars[0].onanimationiteration = () => {
        console.log('fuck')
        bars[0].style['animation-play-state'] = 'paused'
        bars[1].style['animation-play-state'] = 'paused'
    }
}

export default burgerFunc