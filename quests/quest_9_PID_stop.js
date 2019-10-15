const motorA = ev3_motorA();
const motorB = ev3_motorB();
const color = ev3_colorSensor();
const kp = 0.6 * 10; // change to 1
const ki = (1.2 * 10) / 50;
const kd = (3 * 10 * 50) / 200;
const goal_color = 20;

function run(last_value, i, d) {
  const cur = goal_color - ev3_reflectedLightIntensity(color);

  const cur_i = i + cur;
  const cur_d = cur - last_value;

  const speed = math_floor(cur * kp + cur_i * ki + cur_d * kd);

  if (500 + speed > 0) {
    ev3_runForDistance(motorA, 100, 500 + speed);
  } else {
    ev3_runForDistance(motorA, -100, -(350 + speed));
  }

  if (350 - speed > 0) {
    ev3_runForDistance(motorB, 100, 350 - speed);
  } else {
    ev3_runForDistance(motorB, -100, speed - 350);
  }

  ev3_pause(10);
  return run(cur, cur_i, cur_d);
}

run(goal_color - ev3_reflectedLightIntensity(color), 0, 0);
