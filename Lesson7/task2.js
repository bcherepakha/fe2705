// В ваш подъезд вьехали новые жильцы, которые привезли с собой тараканов.
// Насекомые в поисках еды ползут по вентиляционной шахте.
// За час они поднимаются на 1м, но сразу после этого теряют равновесие и скатываются вниз на 0.5м
// Вопрос: сколько времени у вас есть на покупку ловушек для тараканов, если расстояние от вас до соседей 5м.

// (*) Напишите функцию, которая будет решать эту задачу в общем виде, для любых (speed, slowdown, mine),
// где mine - это высота шахты, speed - скорость таракана за час, slowdown - расстояние падения из-за усталости

function getTimeForInterceptCockroaches(mine = 5, speed = 1, slowdown = .5) {
    let position = 0;
    let time = 0;

    //* mine = .9
    //* speed = 1
    //* slowdown = .5
    //* position = 1
    //* time = .9
    for (; position < mine; ) {
        position += speed;
        time++;

        if (position < mine) {
            position -= slowdown;
        } else {
            time -= (position - mine) / speed;
        }
    }

    // position === mine
    return time;
}

console.log( getTimeForInterceptCockroaches(.9, 1, .5) ); // .9
console.log( getTimeForInterceptCockroaches(2, 1, .5) );  // 3
console.log( getTimeForInterceptCockroaches(4, 1, .5) );  // 7
console.log( getTimeForInterceptCockroaches(5, 1, .5) );
