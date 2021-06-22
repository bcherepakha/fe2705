//* 1. Проверить является ли число круглым
//* 2. Получить у пользователя два числа и узнать остаток от деления первого на второе
//* 3. Получить у пользователя строку и узнать ее длину
//* 4. Получить у пользователя два числа и назвать наибольшее
//* 5. Получить у пользователя число и сказать входит ли оно в диаппазон от 30 до 50
//* 6. Для доступа на сайт нужно ввести логин и пароль.
//*    На сайте зарегистрировано четыре пользователя с паролями.
//*    Получите у пользователя логин и пароль и скажите имеет ли он доступ на сайт

const user1 = 'user1';
const password1 = 'qwerty';
const user2 = 'user2';
const password2 = 'q2erty';

function isCorrectUser(login, passwd) {
    //* === => 10
    //* && => 6
    //* || => 5
    //* false && true || false && false
    //* false || false
    //* false
    if ((login === user1 && passwd === password1) || (login === user2 && passwd === password2)) {
        return true;
    }

    return false;
}

isCorrectUser('user3', 'qwerty');

function numInRange(num, min, max) {
    // if (num >= min && num <= max) {
    //     return true;
    // }

    // return false;
    return num >= min && num <= max;
}

function getMax(n1, n2) {
    if (n1 > n2) {
        return n1;
    }

    return n2;
}

function isInteger(num) {
    return num % 1 === 0;
}

console.log( isInteger(1), isInteger(2), isInteger(8), isInteger(5.4) );

function isRound(num) {
    if (typeof num === 'number') {
        //* нам пришло число
        return num % 10 === 0;
    } else {
        //* нам пришло не число
        return false;
    }
}

const num5round = isRound(5);
const num8round = isRound(8);
const num12round = isRound(12);
const num20round = isRound(20);

console.log( 'num5round', num5round );
console.log( 'num8round', num8round );
console.log( 'num12round', num12round );
console.log( 'num20round', num20round );
console.log( 'hello', isRound('hello') );

function getMod(n1, n2) {
    return n1 % n2;
}

console.log( 'getMod', getMod(5, 3) === 2 );
console.log( 'getMod', getMod(5, 4) === 1 );
console.log( 'getMod', getMod(5, 5) === 0 );
console.log( 'getMod', getMod(5.5, 5) === 0.5 );

console.log( 1 + 3  === 4);
console.log( 6 / 2  === 3);
console.log( 2 * 4  === 8);
console.log( 7 - 3  === 4);
console.log( 3 ** 3 === 27);
console.log( 5 % 2  === 1);
console.log( Math.pow(3, 4) === 3 ** 4 );
console.log( -3 );


//* && (AND, булевое умножение)
console.log( true && true === true );
console.log( false && true === false );
console.log( true && false === false );
console.log( false && false === false );
console.log( true && true && false && true );

//* || (OR, булевым сложением)
console.log( true || true === true );
console.log( false || true === true );
console.log( true || false === true );
console.log( false || false === false );

function getStrLength( str ) {
    return str.length;
}

console.log( 'hello'.length, getStrLength('hello') );
