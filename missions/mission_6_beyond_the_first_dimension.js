// Question 1
/*
Recursion!
*/
// feel free to add helper functions!

function fractal(level, operator, curve) {
  // your solution goes here
  return level === 0 ? curve : operator(fractal(level - 1, operator, curve));
}

function levicize(curve) {
  const scaled_curve = scale(math_sqrt(2) / 2)(curve);
  return connect_rigidly(
    rotate_around_origin(math_PI / 4)(scaled_curve),
    translate(0.5, 0.5)(rotate_around_origin(-math_PI / 4)(scaled_curve))
  );
}

// test
draw_connected_full_view_proportional(10000)(fractal(11, levicize, unit_line));

// Question 2
/*
Use the invert function!
*/
// copy your fractal function here
function fractal(level, operator, curve) {
  // your solution goes here
  return level === 0 ? curve : operator(fractal(level - 1, operator, curve));
}

function invert(curve) {
  return t => curve(1 - t);
}

function dragonize(curve) {
  // your answer here
  return put_in_standard_position(
    connect_ends(invert(rotate_around_origin(-math_PI / 2)(curve)), curve)
  );
}

// Test
draw_connected_full_view_proportional(10000)(fractal(11, dragonize, unit_line));

// Question 3
/*
Copy code from the instructions!
*/
function kochize(curve) {
  const up_60 = rotate_around_origin(math_PI / 3);
  const down_60 = rotate_around_origin(-math_PI / 3);
  return put_in_standard_position(
    connect_ends(
      curve,
      connect_ends(up_60(curve), connect_ends(down_60(curve), curve))
    )
  );
}

// copy your fractal function here
function fractal(level, operator, curve) {
  // your solution goes here
  return level === 0 ? curve : operator(fractal(level - 1, operator, curve));
}

function snowflake(n) {
  // your solution goes here
  const one_third = fractal(n, kochize, unit_line);
  const left = rotate_around_origin((2 * math_PI) / 3)(one_third);
  const right = rotate_around_origin((2 * -math_PI) / 3)(one_third);

  return connect_ends(left, connect_ends(one_third, right));
}

// Test
draw_connected_full_view_proportional(10000)(snowflake(5));
