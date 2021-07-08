'use strict';
//* Init var, function
//* hoisting
//* Complete

function makeCounter() {
    let c = 0;

    return function () {
        c++;

        return c;
    };
}

const counter = makeCounter(); //* LE = { c: 2, f: function, this: undefined | window | global, arguments }
const counter2 = makeCounter(); //* LE3 = { c: 1, f: function }

console.log( counter() ); //* LE1 = { } => 1
console.log( counter() ); //* LE2 = { } => 2
console.log( counter() ); // 3
console.log( counter() ); // 4
console.log( counter2() ); //* LE3 = { } => 1

const o = {
    make() {
        console.log('make', this, arguments);
    }
};

o.make(1, 2, 3, 4, 5);

const oo = {
    name: 'oo',
    o: o
};

oo.o.make(1, 2); //* this = oo.o

const m = oo.o.make;

console.log( typeof m ); //* function

m(3, 4); //* this = undefined

function g(callback) {
    //* this = undefined
    callback.call(this, 8);
}

g.call({ name: 'vasya' }, o.make ); //* this = { name: 'vasya' }

o.make.call(9, 1, 2, 3, 4, 5); //* this = 9, arguments = [1,2,3,4,5]
o.make.call({ name: 'a' }, 12); //* this = { name: 'a' }, arguments = [12]

o.make.apply({ name: 'apply'}, [12, 4]);

function d(context, callback) {
    return function() {
        return callback.apply(context, arguments);
    };
}

const create = d({ name: 'create' }, o.make);
//* LE = { context: { name: 'create' }, callback: o.make, f }

create(1, 2, 3, 4, 5); //* LE2 = { this: undefined, arguments: [1, 2, 3, 4, 5] }
//* 'make', { name: 'create' }, [1, 2, 3, 4, 5]

const build = d({ name: 'build' }, create);
//* LE = { context: { name: 'build' }, callback: create, f1 }

build(1, 3, 7);
//* 'make', this, arguments
//* LE = {  }
//* create.apply({ name: 'build' }, [1, 3, 7])
//* LE = { this: { name: 'build' }, arguments: [1, 3, 7] }
//* make.apply({ name: 'create' }, [1, 3, 7]);

const create2 = o.make.bind({ name: 'create2' }, 1, 2, 3);
const build2 = create2.bind({ name: 'build2' }, 6, 7);

create2(4, 5);

//* make.apply({ name: 'create2' }, [1, 2, 3, 4, 5])

build2(8, 9);
//* create2.apply({ name: 'build2' }, [6, 7, 8, 9])
//* make.apply({ name: 'create2' }, [1, 2, 3, 6, 7, 8, 9]);
