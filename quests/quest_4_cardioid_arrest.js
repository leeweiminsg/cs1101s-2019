// Question 1
/*
connect_results function definition:
const connect_results =
    (n, f) =>
        draw_connected_full_view(n)
        (t => unit_circle(f(math_round(t * n)) / n));

Parameters:
n: number of points is n + 1 consecutive integers representing each point's order (0, 1, 2, ..., n)
f is a function which transforms the integers

Refer to example in instructions to infer the pattern
*/
const connect_results = (n, f) =>
  draw_connected_full_view(n)(t => unit_circle(f(math_round(t * n)) / n));

const star =
  // your answer goes here
  (n, step) => connect_results(n, k => step * k);

star(11, 4);

// Question 2
/*
Follow pattern in later question!
*/
const connect_results = (n, f) =>
  draw_connected_full_view(n)(t => unit_circle(f(math_round(t * n)) / n));

const wheel =
  // your answer goes here
  n =>
    connect_results(n * 3, k => {
      const v = math_round((k - 1) / 3);
      return k % 3 === 1 ? (v + n / 2) * 3 : v * 3;
    });

wheel(100);

// Question 3
/*
Follow pattern!
*/
const connect_results = (n, f) =>
  draw_connected_full_view(n)(t => unit_circle(f(math_round(t * n)) / n));

const connect_laps = (n, g) =>
  connect_results(n * 3, k => {
    const v = math_round((k - 1) / 3);
    return k % 3 === 1 ? g(v) * 3 : v * 3;
  });

const draw_times_table =
  // your answer goes here
  (n, m) => connect_laps(n, k => k * m);

//draw_times_table(100, 2);      // m = 2: cardioid: 1 lobe
//draw_times_table(100, 3);      // m = 3: nephroid: 2 lobes
//draw_times_table(100, 4);      // m = 4: 3 lobes...

//draw_times_table(397, 200);    // m = (n + 3) / 2: cardioid
//draw_times_table(500, 252);    // m = (n + 4) / 2: nephroid
//draw_times_table(501, 253);    // m = (n + 5) / 2: 3 lobes...

//draw_times_table(500, 168);    // m = (n + 4) / 3: cardioid
//draw_times_table(295, 100);    // m = (n + 5) / 3: nephroid
//draw_times_table(594, 200);    // m = (n + 6) / 3: 3 lobes...

//draw_times_table(395, 100);    // m = (n + 5) / 4: cardioid
//draw_times_table(494, 100);    // m = (n + 6) / 5: cardioid
//draw_times_table(593, 100);    // m = (n + 7) / 6: cardioid...

// also nice:
//draw_times_table(400, 201);    // m = n / 2 + 1 (/4,/8,/16)
//draw_times_table(200, 99);     // m = (n / 2) - 1: square pattern
