/* global Slider */
const slider1 = new Slider('.slider.fade', true, 'fade', 3000);

// slider1.show(3);
// slider1.next();

console.log( slider1 ); // ?

const slider2 = new Slider('.slider.slide', false, 'slide', 0);

console.log( slider2 ); // ?

slider2.render(); // ?

const slider3 = new Slider('.slider.circle', true, 'circle', 0);

console.log(slider3);

// TODO: add controls for sliders
function addOuterControls(selector, slider) {
    const controls = Array.prototype.reduce.call(
        document.querySelectorAll(`${selector} button`),
        function reducer(result, btn) {
            const text = btn.innerText;

            result[text] = btn;

            return result;
        },
        {}
    );

    controls.Next.addEventListener('click', slider.next.bind(slider));
    controls.Prev.addEventListener('click', slider.prev.bind(slider));
    controls.Run.addEventListener('click', slider.play.bind(slider));
    controls.Pause.addEventListener('click', slider.pause.bind(slider));
}

addOuterControls('.conrols--first', slider1);
addOuterControls('.conrols--second', slider2);
