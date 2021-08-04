const circle = document.querySelector('.circle');

function move(top, left) {
    return new Promise(function (resolve) {
        circle.style.top = `${top}%`;
        circle.style.left = `${left}%`;

        circle.addEventListener('transitionend', () => {
            setTimeout(resolve, 0);
        }, { once: true });
    });
}

move(20, 20)
    .then(() => move(20, 80))
    .then(() => move(80, 80))
    .then(() => move(80, 20))
    .then(() => move(50, 50))
    .catch((err) => console.log(err));
