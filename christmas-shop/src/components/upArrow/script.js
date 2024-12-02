import createButton from "../button"
import styles from './styles.module.css'


export default function createUpButton(parent) {
    let distanceTop = visualViewport.pageTop;
    const header = document.querySelector('header');


    const svgBtn = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /><path d="M18 11L12 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 11L12 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>'
    const upBtn = createButton({ onClick: () => header.scrollIntoView(true), svg: svgBtn, className: styles.button });

    window.onscroll = () => {
        distanceTop = visualViewport.pageTop;
        distanceTop > 300 ? upBtn.style.visibility = 'visible' : upBtn.style.visibility = 'hidden';
    }


    parent.append(upBtn);
}
