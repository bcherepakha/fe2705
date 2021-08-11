const a = {
    items: [true, false, true, false, true, false],
    size: 6,
    get completed() {
        return this.items.filter(item => item).length;
    }
};

Object.defineProperty(a, 'size', {
    configurable: true,
    enumerable: true,
    get() {
        return this.items.length;
    }
});

//? Object.keys, Object.values, Object.entries
for (const key in a) {
    console.log(key);
}

console.log('size', a.size);
console.log('completed', a.completed);

a.items.push(false); //? size: 7

console.log('size', a.size);
console.log('completed', a.completed);

a.items.push(true); //? size: 8, completed 4

console.log('size', a.size);
console.log('completed', a.completed);
