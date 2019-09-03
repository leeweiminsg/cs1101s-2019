// Question 1
/*
Reflect curve about y-axis, so negate x value
*/
function reflect_through_y_axis(curve) {
  // your program here
  return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}

// for testing
function s_generator(pt) {
  // return function
  return t =>
    t < 0.5
      ? make_point(
          0.25 * -math_sin(2 * math_PI * 0.75 * 2 * (0.5 - t)) + x_of(pt),
          0.25 * -math_cos(2 * math_PI * 0.75 * 2 * (0.5 - t)) + y_of(pt) + 0.25
        )
      : make_point(
          0.25 * math_sin((2 * math_PI * 0.75 * (t - 0.5)) / 0.5) + x_of(pt),
          0.25 * math_cos((2 * math_PI * 0.75 * (t - 0.5)) / 0.5) +
            y_of(pt) -
            0.25
        );
}

const my_s = s_generator(make_point(0, 0));

draw_connected_squeezed_to_window(200)(reflect_through_y_axis(my_s));

// Question 2
/*
Function should return a curve c' that has the same Points that c, but that starts and ends at the same point

Piazza: "You can think about it this way. S curve is drawn top down and then re-traced the other way round so you start and end at the same point for the new "closed" curve:)"

Curve c is drawn with twice the distance, which explains the (t < 1/2)
When drawing the curve from its end back to its starting point, you subtract the resulting t from 1 (domain of t is [0, 1])
*/
function close(curve) {
  // your program here
  return t => (t <= 1 / 2 ? curve(2 * t) : curve(1 - (2 * t - 1)));
}

// Test
function s_generator(pt) {
  // return function
  return t =>
    t < 0.5
      ? make_point(
          0.25 * -math_sin(2 * math_PI * 0.75 * 2 * (0.5 - t)) + x_of(pt),
          0.25 * -math_cos(2 * math_PI * 0.75 * 2 * (0.5 - t)) + y_of(pt) + 0.25
        )
      : make_point(
          0.25 * math_sin((2 * math_PI * 0.75 * (t - 0.5)) / 0.5) + x_of(pt),
          0.25 * math_cos((2 * math_PI * 0.75 * (t - 0.5)) / 0.5) +
            y_of(pt) -
            0.25
        );
}

function reflect_through_y_axis(curve) {
  // your program here
  return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}

const my_s_curve = s_generator(make_point(0, 0));

// reflecting the s-curve
draw_connected_squeezed_to_window(200)(
  connect_ends(close(my_s_curve), reflect_through_y_axis(my_s_curve))
);
