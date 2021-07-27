const MONTH_LABELS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'July',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export class Calendar {
    constructor(rootEl, monthLabels = [...MONTH_LABELS]) {
        //? this = {}
        //? this.__proto__ = Calendar.prototype

        this.monthLabels = monthLabels;

        const currentDay = new Date();

        this.rootEl = rootEl;
        this.prevBtn = rootEl.querySelector('.calendar__change-month--prev');
        this.nextBtn = rootEl.querySelector('.calendar__change-month--next');
        this.titleEl = rootEl.querySelector('.calendar__title');
        this.daysList = rootEl.querySelector('.calendar__days');

        this.state = this.getMonthState(currentDay.getFullYear(), currentDay.getMonth());

        this.render();

        this.prevBtn.addEventListener('click', this.prevMonth.bind(this));
        this.nextBtn.addEventListener('click', this.nextMonth.bind(this));

        //? return this;
    }

    createDay(year, month, day) {
        const d = new Date(year, month, day, 12, 0, 0, 0);

        return d;
    }

    getMonthState(year, month) {
        const firstDayInMonth = this.createDay(year, month, 1);
        const lastDayInMonth = this.createDay(year, month+1, 0);
        const firstDayWeekIdx = firstDayInMonth.getDay();
        // const firstDayShift = firstDayWeekIdx === 0 ? 6 : firstDayWeekIdx - 1;
        const firstDayShift = (firstDayWeekIdx + 6) % 7;
        const nearestMonday = this.createDay(year, month, 1 - firstDayShift);
        const lastDayWeekIdx = lastDayInMonth.getDay();
        const lastDayShift = (7 - lastDayWeekIdx) % 7;
        const nearseSunday = this.createDay(year, month+1, lastDayShift);
        const days = [];

        for (
            const currentDay = new Date(nearestMonday);
            currentDay <= nearseSunday;
            currentDay.setDate(currentDay.getDate() + 1)
        ) {
            days.push( new Date(currentDay) );
        }

        return {
            days,
            month: firstDayInMonth.getMonth(),
            year: firstDayInMonth.getFullYear()
        };
    }

    setMonth(month, year) {
        this.state = this.getMonthState(year, month);
        this.render();
    }

    nextMonth() {
        this.setMonth(this.state.month + 1, this.state.year);
    }

    prevMonth() {
        this.setMonth(this.state.month - 1, this.state.year);
    }

    createDayLink(day) {
        const rootEl = document.createElement('li');
        const l = document.createElement('a');

        rootEl.append(l);
        rootEl.className = 'calendar__day';

        if (day.getMonth() !== this.state.month) {
            rootEl.classList.add('calendar__day--not-in-month');
        }

        l.href = `?day=${day.toJSON().split('T')[0]}`;
        l.innerText = day.getDate();
        l.setAttribute('aria-label', day.toDateString());

        return rootEl;
    }

    render() {
        const { month, year, days } = this.state;

        this.daysList.innerText = '';
        this.titleEl.innerText = `${this.monthLabels[month]} ${year}`;

        // console.log(
        // days.map(this.createDayLink.bind(this))
        // days.map(day => this.createDayLink(day))
        // days.map(this.createDayLink, this)
        // );

        // this.daysList.append.apply(
        //     this.daysList,
        //     days.map(day => this.createDayLink(day))
        // );

        this.daysList.append(...days.map(day => this.createDayLink(day)));
    }
}
