// Question 1
/*
Halve the amplitude and translate curve c1 up by 0.5
*/
const test_curve = t => make_point(t, 0.5 + math_sin(4 * (math_PI * t)) / 2);

function stack(c1, c2) {
  // your program here
  return t => {
    if (t <= 0.5) {
      return translate(0, 0.5)(scale_x_y(1, 0.5)(c1))(2 * t);
    } else {
      return scale_x_y(1, 0.5)(c2)(2 * t - 1);
    }
  };
}

// Test
draw_points_on(10000)(stack(test_curve, test_curve));

// Question 2
const test_curve = t => make_point(t, 0.5 + math_sin(4 * (math_PI * t)) / 2);

function stack_frac(frac, c1, c2) {
  // your program here
  return t => {
    if (t <= frac) {
      return translate(0, 1 - frac)(scale_x_y(1, frac)(c1))((1 / frac) * t);
    } else {
      return scale_x_y(1, 1 - frac)(c2)((1 / frac) * t - 1);
    }
  };
}

// Test
draw_points_on(10000)(
  stack_frac(1 / 5, test_curve, stack_frac(1 / 2, test_curve, test_curve))
);
