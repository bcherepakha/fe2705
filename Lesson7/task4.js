/**
 * Дан обьект с баллами за задание
*/
const grade = {
    Anton: getRandomBall(0, 90),
    Den: 90,
    Vladyslav: getRandomBall(),
    Oleksii: getRandomBall(40),
    Vadim: getRandomBall(40, 70),
    Maxim: getRandomBall(15, 80)
};

function getRandomBall(min = 0, max = 100) {
    return Math.round( min + Math.random() * (max - min) );
}

console.log(grade);

/** Требуется:
 1. Указать имя учащегося с максимальным количеством баллов
 2. Указать максимальный балл.
 3. Указать средний балл.
 4. Указать учащегося с баллом ближайшим к среднему.
 5. Перечислить учащихся с баллом ниже среднего.
 6. Перечислить учащихся занявших первые три места в порядке убывания рейтинга.
*/

// eslint-disable-next-line no-unused-vars
function getLeaderName(grade) {
    let leaderName;

    for (const userName in grade) {
        if (typeof leaderName === 'undefined' || grade[leaderName] < grade[userName]) {
            leaderName = userName;
        }
    }

    return leaderName;
}

// console.log( getLeaderName(grade) );

function getAverageScore(grade) {
    let sum = 0;
    let userCount = 0;

    for (const userName in grade) {
        userCount++;
        sum += grade[userName];
    }

    return sum / userCount;
}

console.log( getAverageScore(grade) );

const arr = [5, 7, 2, 8];

//* arr.length = 4

console.log( arr[0] ); // 5
console.log( arr[1] ); // 7
console.log( arr[3] ); // 8

function getUserNamesWithScoreLessThanAverage(grade) {
    const users = [];
    const averageScore = getAverageScore(grade);

    for (const userName in grade) {
        if (grade[userName] < averageScore) {
            // users[users.length] = userName;
            users.push(userName);
        }
    }

    return users;
}

console.log( getUserNamesWithScoreLessThanAverage(grade) );

function getWinners(grade) {
    const winners =[];
    const newGrade = {...grade};

    do {
        let winnerName = getLeaderName(newGrade);

        winners.push(winnerName);

        delete newGrade[winnerName];
    } while (winners.length !== 5);

    return winners;
}

console.log( getWinners(grade) );
