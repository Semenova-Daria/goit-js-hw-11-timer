
// Для подсчета значений используй следующие
// готовые формулы, где time - разница между
// targetDate и текущей датой.

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);


class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.intervalId = null;
}

    getRefs() {
        const container = document.querySelector(this.selector);
        const days = container.querySelector('[data-value="days"]');
        const hours = container.querySelector('[data-value="hours"]');
        const mins = container.querySelector('[data-value="mins"]');
        const secs = container.querySelector('[data-value="secs"]');
        const startBtn = container.querySelector('.start');
        const stopBtn = container.querySelector('.stop');

        return { container, days, hours, mins, secs, startBtn, stopBtn };
    }

    updateTimer({ container, days, hours, mins, secs }) {
        const time = this.targetDate - Date.now();
        
        if (time < 0) {
            this.stop(container);
            return
        }
        days.textContent = Math.floor(time / (1000 * 60 * 60 * 24)).toString().padStart(2,'0');
        hours.textContent = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2,'0');
        mins.textContent = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2,'0');
        secs.textContent = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2,'0');
    }

    start() {
        // console.log("start");
        this.intervalId = setInterval(() => {
        this.updateTimer(this.getRefs())
        }, 1000)
    }

    stop(container) {
        // console.log("stop");
        clearInterval(this.intervalId);
            container.innerHTML = `<h1>Time is over</h1>`
            
    }

    // addListeners({ startBtn, stopBtn }) {
    //     startBtn.addEventListener('click', this.start.bind(this));
    //     stopBtn.addEventListener('click', this.stop.bind(this))
    // }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('Aug 19, 2021 3:53:10'),
});

timer.start();

