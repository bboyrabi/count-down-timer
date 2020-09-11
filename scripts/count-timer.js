'use strict';

class CountDownTimer {

    constructor(elementId, endDate, dayDigits = 2, lang = 'ja') {
        this._init();
        this.lang = this.languages[lang] ? this.languages[lang] : this.languages['ja'];
        this._render(elementId);
        this.endDate = typeof endDate === 'string' ? new Date(endDate) : endDate;
        this.dayDigits = dayDigits;
    }

    _init() {
        this.ctdElementId = 'tw-' + generateUuid();
        this.languages = {
            ja: {
                remaining: '残り',
                day: '日',
                hour: '時',
                minute: '分',
                second: '秒',
            }
        };
    }

    start() {
        this._cowntDownTimer();
    }

    _render(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="timer-content d-flex flex-center">
                    <div>${this.lang.remaining}</div>
                    <div class="d-flex flex-vertical flex-1">
                        <div id="${this.ctdElementId}" class="d-flex t-display timer">
                            ${this._makeTimesElements()}
                        </div>
                        <div class="d-flex t-display">
                            <div>${this.lang.day}</div>
                            <div>${this.lang.hour}</div>
                            <div>${this.lang.minute}</div>
                            <div>${this.lang.second}</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            console.error('404: Element is not found.');
        }
    }

    _makeTimesElements(day, hour, minute, second) {
        return `
            <div>${this.addZero(day ? day : 0, this.dayDigits)}</div>
            <div>${this.addZero(hour ? hour : 0)}</div>
            <div>${this.addZero(minute ? minute : 0)}</div>
            <div>${this.addZero(second ? second : 0)}</div>
        `;
    }

    _cowntDownTimer() {

        const ctdElement = document.getElementById(this.ctdElementId);

        let period = this.endDate - new Date();
        if (0 <= period) {
            const day = Math.floor(period / (1000 * 60 * 60 * 24));
            period -= (day * (1000 * 60 * 60 * 24));
            const hour = Math.floor(period / (1000 * 60 * 60));
            period -= (hour * (1000 * 60 * 60));
            const minute = Math.floor(period / (1000 * 60));
            period -= (minute * (1000 * 60));
            const second = Math.floor(period / 1000);
            ctdElement.innerHTML = this._makeTimesElements(day, hour, minute, second);

            setTimeout(() => {
                this._cowntDownTimer();
            }, 10);
        } else {
            ctdElement.innerHTML = this._makeTimesElements();
        }
    }

    /**
     * Adjust the number of digits.
     * If there are not enough digits in the argument "number", 
     * add 0 at the beginning.
     * 
     * @param {string | number} number 
     * @param {string | number} digits Default is 2.
     */
    addZero(number = 0, digits = 2) {
        return ('0' + number).slice(-digits);
    }
}

function generateUuid() {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    let chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case 'x':
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case 'y':
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join('');
}