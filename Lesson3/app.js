import { Calendar } from '../Lesson9/calendar.js';

const calendar = new Calendar(
    document.querySelector('.calendar'),
    [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ]);

console.log( calendar );
