//!!to dos
//timer function comment
import Audio from "../modules/audio.js";

const TimerControl = (_ => {
  //state
  const times = {
    break: 5,
    breakSeconds: 3, //300 for 5
    session: 25,
    sessionSeconds: 3, //1500 for 25
    currentState: "session" //can be session or break, used for timer stop functions
  };

  //cache DOM
  const pomoButtonsEl = document.querySelector(".pomo__lengths");
  const breakLengthEl = document.querySelector("#breakLength");
  const sessionLengthEl = document.querySelector("#sessionLength");
  const sessionEl = document.querySelector("#timer");
  const configButtonsEl = document.querySelector(".pomo__controls");
  const timerTitleEl = document.querySelector("#timerTitle");

  const init = _ => {
    listeners();
    render();
  };

  const listeners = _ => {
    pomoButtonsEl.addEventListener("click", function(event) {
      if (timeControls.active == false) {
        //if either timer is active then config buttons cannot be used
        if (event.target.id == "breakUp") {
          times.break++;
          times.breakSeconds = timeFunctions.getSeconds(times.break);
        }
        if (event.target.id == "breakDown") {
          if (times.break <= 1) {
            times.break = 1;
          } else {
            times.break--;
            times.breakSeconds = timeFunctions.getSeconds(times.break);
          }
          console.log(times.break);
        }
        if (event.target.id == "sessionUp") {
          times.session++;
          times.sessionSeconds = timeFunctions.getSeconds(times.session);
        }
        if (event.target.id == "sessionDown") {
          if (times.session <= 1) {
            times.session = 1;
          } else {
            times.session--;
            times.sessionSeconds = timeFunctions.getSeconds(times.session);
          }
        }
        breakLengthEl.textContent = times.break;
        sessionLengthEl.textContent = times.session;
        render();
      }
    });

    configButtonsEl.addEventListener("click", function(event) {
      console.log(event.target);
      if (event.target.id == "start") {
        timeControls.timerControl("start");
      } else if (event.target.id == "pause") {
        timeControls.timerControl("pause");
      } else if (event.target.id == "reset") {
        timeControls.timerControl("reset");
      }
    });
  };

  const render = _ => {
    console.log("break: " + times.breakSeconds);
    console.log("session: " + times.sessionSeconds);
    if (times.currentState == "session") {
      timerTitleEl.textContent = "Session";
      sessionEl.textContent = timeFunctions.timer(times.sessionSeconds);
    } else if (times.currentState == "break") {
      timerTitleEl.textContent = "Break";
      sessionEl.textContent = timeFunctions.timer(times.breakSeconds);
    }
  };

  const timeControls = {
    timerCount: null,
    breakCount: null, //intialize timerCount to be used as the return ID for the stop function
    timerActive: false, //on off switch for case of hitting start button a second time, pause the timer instead. 0 = not active, 1 = active
    breakActive: false,
    active: false, //if either timer is running this will be true, used for locking config buttons

    timer() {
      this.timerCount = setInterval(function() {
        times.sessionSeconds--;
        if (times.sessionSeconds == -1) {
          //-1 to display 00:00 on the timer
          //alert("break reached");
          timeControls.timerStop();
          timeControls.breakActive = true;
          times.currentState = "break";
          times.breakSeconds = timeFunctions.getSeconds(times.break);
          Audio.init();
          timeControls.break();

          //!!!NEED TO RENDER THE CASE OF TIMER ENDING ABD BREAK STARTING, IT NEEDS TO LOOP BACK AND FORTH BETWEEN SESSION TIMER AND BREAK
          //timer will end
          //break function will run which will run the timer again
        }
        render();
      }, 1000);
    },
    break() {
      this.breakCount = setInterval(function() {
        times.breakSeconds--;
        if (times.breakSeconds == -1) {
          //-1 to display 00:00 on the timer
          //alert("break end");
          timeControls.breakStop();
          timeControls.breakActive = false;
          times.currentState = "session";
          times.sessionSeconds = timeFunctions.getSeconds(times.session);
          Audio.init();

          timeControls.timer(); //timer needs to possibly take IN the value of session seconds, same as break maybe? ALSO NEED TO HANDLE PAUSING FUNCTIONALITY WHEN BREAK TIMER IS RUNNING
        }
        render();
      }, 1000);
    },
    timerStop() {
      clearInterval(this.timerCount);
    },
    breakStop() {
      clearInterval(this.breakCount);
    },
    timerReset() {
      times.session = 25;
      times.sessionSeconds = timeFunctions.getSeconds(times.session);
      times.break = 5;
      times.breakSeconds = timeFunctions.getSeconds(times.break);

      this.timerStop();
      this.breakStop();
      render();
    },
    timerControl(buttonInput) {
      if (times.currentState == "session") {
        if (buttonInput == "start") {
          if (this.timerActive == false) {
            this.timer();
            this.timerActive = true;
            this.active = true;
          } else if (this.timerActive == true) {
            this.timerStop();
            this.timerActive = false;
            this.active = false;
          }
        }
        if (buttonInput == "pause") {
          if (this.timerActive == true) {
            this.timerStop();
            this.timerActive = false;
            this.active = false;
          } else if (this.timerActive == false) {
            this.timer();
            this.timerActive = true;
            this.active = true;
          }
        }
      }
      if (times.currentState == "break") {
        if (buttonInput == "start") {
          if (this.breakActive == false) {
            this.break();
            this.breakActive = true;
            this.active = true;
          } else if (this.breakActive == true) {
            this.breakStop();
            this.breakActive = false;
            this.active = false;
          }
        }
        if (buttonInput == "pause") {
          if (this.breakActive == true) {
            this.breakStop();
            this.breakActive = false;
            this.active = false;
          } else if (this.breakActive == false) {
            this.break();
            this.breakActive = true;
            this.active = true;
          }
        }
      }

      if (buttonInput == "reset") {
        times.currentState = "session";

        this.timerReset();
      }
    }
  };

  //hit button
  //check if break or session is adtive
  //if break is active, pause it

  //if session is active pause it

  const timeFunctions = {
    getSeconds(minutes) {
      return minutes * 60;
    },

    checkLess10(timeUnit) {
      if (timeUnit < 10) {
        return "0" + timeUnit;
      }
      return timeUnit;
    },

    timer(number) {
      let minutes = Math.floor(number / 60);
      let seconds = number % 60;
      return `${this.checkLess10(minutes)}:${this.checkLess10(seconds)}`;
    }
  };

  return {
    init
  };
})();

export default TimerControl;

// breakLengthEl.textContent = times.break;
// sessionLengthEl.textContent = times.sessionLength;
// sessionEl.textContent = times.session;
