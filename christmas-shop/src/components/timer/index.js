import styles from './index.module.css';

function createTimer() {
    const generalContainer = document.createElement('div');
    generalContainer.classList.add(styles.generalContainer);

    const now = new Date();
    const newYear = Date.UTC(2025, 0, 0, 0, 0, 0);
    let count = now.getTime();
    let timeLeft = (newYear - count) / 1000;
    console.log(timeLeft)
    let secondsVal = Math.trunc(timeLeft % 60);
    let minutesVal = Math.trunc((timeLeft / 60) % 60);
    let hoursVal = Math.trunc((timeLeft / (60 * 60)) % 24);
    let daysVal = Math.trunc(timeLeft / (60 * 60 * 24));

    for (let i = 0; i < 4; i += 1) {
        const valueContainer = document.createElement('div');
        valueContainer.classList.add(styles.valueContainer);
        generalContainer.append(valueContainer);

        const numValue = document.createElement('p');
        numValue.classList.add(styles.numValue);
        const textValue = document.createElement('p');
        textValue.classList.add(styles.textValue);

        valueContainer.append(numValue, textValue);

        switch (i) {
            case 0: {
                numValue.textContent = daysVal;
                textValue.textContent = 'days';
                const separator = document.createElement('div');
                separator.classList.add(styles.separator);
                generalContainer.append(separator);
                numValue.classList.add('days')
                break;
            }
            case 1: {
                numValue.textContent = hoursVal;
                textValue.textContent = 'hours';
                const separator = document.createElement('div');
                separator.classList.add(styles.separator);
                generalContainer.append(separator);
                numValue.classList.add('hours')
                break;
            }
            case 2: {
                numValue.textContent = minutesVal;
                textValue.textContent = 'minutes';
                const separator = document.createElement('div');
                separator.classList.add(styles.separator);
                generalContainer.append(separator);
                numValue.classList.add('minutes')
                break;
            }
            case 3: {
                numValue.textContent = secondsVal;
                textValue.textContent = 'seconds';
                numValue.classList.add('seconds')
                break;
            }
        }
    }


    const seconds = generalContainer.querySelector('.seconds');
    const minutes = generalContainer.querySelector('.minutes');
    const hours = generalContainer.querySelector('.hours');
    const days = generalContainer.querySelector('.days');


    setInterval(() => {
        count += 1000;
        timeLeft = (newYear - count) / 1000;
        console.log(timeLeft % 60);
        seconds.textContent = Math.trunc(timeLeft % 60);
        minutes.textContent = Math.trunc((timeLeft / 60) % 60);
        hours.textContent = Math.trunc((timeLeft / (60 * 60)) % 24);
        days.textContent = Math.trunc(timeLeft / (60 * 60 * 24));
    }, 1000)

    return generalContainer;
}

export default createTimer;