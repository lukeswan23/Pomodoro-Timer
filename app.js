import TimerControl from "./modules/timer-control.js";
//import TimerDisplay from "./modules/timer-display.js";

TimerControl.init();

// const times = {
//   break: 5,
//   session: 25
// };

// const timer = number => {
//   let minutes = Math.floor(number / 60);
//   let seconds = number % 60;
//   return `${minutes}:${checkLess10(seconds)}`;
// };

// sessionEl.textContent = timer(times.session);

// const lengthButtonListen = () => {
//   pomoButtonsEl.addEventListener("click", function(event) {
//     if (event.target.id == "breakUp") {
//       times.break++;
//       breakLengthEl.textContent = times.break;
//     }
//     if (event.target.id == "breakDown") {
//       if (times.break <= 1) {
//         times.break = 1;
//       } else {
//         times.break--;
//         breakLengthEl.textContent = times.break;
//       }
//       console.log(times.break);
//     }
//     if (event.target.id == "sessionUp") {
//       times.session++;
//       sessionEl.textContent = times.session;
//       sessionEl.textContent = timer(times.session);
//     }
//     if (event.target.id == "sessionDown") {
//       times.session--;
//       sessionEl.textContent = times.session;
//       sessionEl.textContent = timer(times.session);
//     }
//   });
// };

// const controlButtonListen = () => {
//   configButtonsEl.addEventListener("click", function(event) {
//     console.log(event.target);
//     if (event.target.id == "start") {
//       timerControl("start");
//     }
//     if (event.target.id == "pause") {
//       //pause timer
//     }
//   });
// };

// const timerControl = buttonInput => {
//   if (buttonInput == "start") {
//     sessionSeconds = times.session * 60;
//     let timerCount = setInterval(function() {
//       sessionSeconds--;
//       //console.log(times.session);
//       sessionEl.textContent = timer(sessionSeconds);
//     }, 1000);
//   }
// };

// function checkLess10(timeUnit) {
//   if (timeUnit < 10) {
//     return "0" + timeUnit;
//   }
//   return timeUnit;
// }

// function getSeconds(time) {
//   sessionSeconds = times.session * 60;
// }

// lengthButtonListen();
// controlButtonListen();
