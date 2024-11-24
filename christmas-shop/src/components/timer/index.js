import styles from './index.module.css';

function createTimer() {

    const generalContainer = document.createElement('div');
    generalContainer.classList.add(styles.generalContainer);

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
                numValue.textContent = '42';
                textValue.textContent = 'days';
                const separator = document.createElement('div');
                separator.classList.add(styles.separator);
                generalContainer.append(separator);
                break;
            }
            case 1: {
                numValue.textContent = '42';
                textValue.textContent = 'hours';
                const separator = document.createElement('div');
                separator.classList.add(styles.separator);
                generalContainer.append(separator);
                break;
            }
            case 2: {
                numValue.textContent = '42';
                textValue.textContent = 'minutes';
                const separator = document.createElement('div');
                separator.classList.add(styles.separator);
                generalContainer.append(separator);
                break;
            }
            case 3: {
                numValue.textContent = '42';
                textValue.textContent = 'seconds';
                break;
            }
        }
    }


    return generalContainer;
}

export default createTimer;