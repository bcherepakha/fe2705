import Timer from './timerBrowserModule.js';

const timer1 = new Timer(document.querySelector('.firstTimer'));

new Timer(document.querySelector('.secondTimer'), true);
new Timer('.thirdTimer', true);

timer1.start(); //? this = timer1
