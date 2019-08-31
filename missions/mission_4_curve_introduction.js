// Question 1
// Part 1
// unit_line_at : (Number) -> Curve

// Part 2
/*
y has domain [0, 1]
Multiply it with length to transform its range to [0, length]
Add the y-coordinate of pt (y_pt) to further transform its range to [y_pt, y_pt + length]
*/
function vertical_line(pt, length) {
  return y => make_point(x_of(pt), y * length + y_of(pt));
}

// Part 3
// vertical_line : (Point, Number) -> Curve

// Part 4
draw_connected(200)(vertical_line(make_point(0.5, 0.5), 0.5));

// Question 2
/*
Multiply t by 0.75 to make it three-quarters of the original value
Negate both x and y-coordinates to flip the circle horizontally and vertically
*/
function three_quarters(pt) {
  // return a curve
  return t =>
    make_point(
      -math_sin(2 * math_PI * 0.75 * t) + x_of(pt),
      -math_cos(2 * math_PI * 0.75 * t) + y_of(pt)
    );
}

// Test
draw_connected_squeezed_to_window(200)(three_quarters(make_point(0.5, 0.25)));

// Question 3
/*
Break problem into two separate parts
Transform the circle for each separate part
Make sure the curve is drawn in one single direction!
*/
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

// Test
draw_connected_squeezed_to_window(200)(s_generator(make_point(0.5, 0.25)));
