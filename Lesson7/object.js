/**
 * Напишите код, выполнив задание из каждого пункта отдельной строкой:

    1.  Создайте пустой объект user.
    2.  Добавьте свойство name со значением Alexander.
    3.  Добавьте свойство group со значением fe2402
    4.  Измените значение свойства name на Ilya.
    5.  Удалите свойство name из объекта.
    6.  Создайте копию обьекта user.
    7.  Проверьте, что созданный обьект не пустой.
    8.  Узнайте количество свойств в нем.
    9.  Измените в копии свойство name на Ivan.
    10. Сравните свойства этих двух обьектов и придумайте структуру данных для отображения их разницы.
*/

const user = {
    'group-name': 'fe2402',
    name: 'Alexander',
    1: 1,
    10: 10,
    '-10': -10
};
const propertyName = 'name';

console.log( user.name );
console.log( user['group-name'] );
console.log( user[propertyName] );
console.log( user.propertyName );
console.log( user[1] );

user.name = 'Igor';
user[1] = 100;

console.log( user.name );
console.log( user[1] );

delete user[1];

console.log( user[1] );

const user2 = {
    ...user,
    name: 'Ivan'
};

// for (const key in user) {
//     user2[key] = user[key];
// }

// user2.name = 'Ivan';

console.log(user2);
console.log(user);
