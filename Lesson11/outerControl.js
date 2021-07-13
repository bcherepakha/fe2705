/* global Slider */
const slider1 = new Slider('.slider.fade', true, 'fade', 3000);

// slider1.show(3);
// slider1.next();

console.log( slider1 ); // ?

const slider2 = new Slider('.slider.slide', false, 'slide', 0);

console.log( slider2 ); // ?

slider2.render(); // ?

// TODO: add controls for sliders
