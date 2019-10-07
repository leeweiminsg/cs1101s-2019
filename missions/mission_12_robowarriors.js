// Question 1
const motorA = ev3_motorA();
const motorB = ev3_motorB();

ev3_runForDistance(motorA, 210, 100);
ev3_runForDistance(motorB, 210, 100);

// Question 2
const motorA = ev3_motorA();
const motorB = ev3_motorB();

ev3_runForDistance(motorA, -220, 100);
ev3_runForDistance(motorB, 220, 100);

// Question 3
const motorA = ev3_motorA();
const motorB = ev3_motorB();
const color = ev3_colorSensor();

function run(a) {
  if (a === 5) {
    ev3_stop(motorA);
    ev3_stop(motorB);
  } else if (ev3_reflectedLightIntensity(color) > 30) {
    ev3_runForDistance(motorA, 30, 200);
    ev3_runForDistance(motorB, 30, 200);
    run(a);
  } else {
    ev3_pause(1500);
    ev3_runForDistance(motorA, -200, 200);
    ev3_runForDistance(motorB, -200, 200);
    ev3_pause(1500);
    ev3_runForDistance(motorA, -170, 100);
    ev3_runForDistance(motorB, 170, 100);
    ev3_pause(1500);
    run(a + 1);
  }
}

run(0);

// Question 4
const motorA = ev3_motorA();
const motorB = ev3_motorB();
const color = ev3_colorSensor();

function run() {
  if (ev3_reflectedLightIntensity(color) > 20) {
    ev3_pause(500);
    ev3_runForDistance(motorB, 100, 300);
  } else {
    ev3_pause(500);
    ev3_runForDistance(motorA, 100, 300);
  }
  ev3_pause(1500);
  ev3_runForDistance(motorB, -20, 75);
  ev3_runForDistance(motorA, -20, 75);
  return run();
}

run();
