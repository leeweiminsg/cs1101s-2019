// Question 1
// feel free to add helper functions

function pixels_to_rune(pixels) {
  // your solution here
  function boolean_to_rune(boolean) {
    return boolean ? square : blank;
  }

  let n = array_length(pixels);
  let initial_row = boolean_to_rune(pixels[0][0]);
  let accum = null;

  for (let c = 1; c < n; c = c + 1) {
    initial_row = beside_frac(
      1 - 1 / (c + 1),
      initial_row,
      boolean_to_rune(pixels[0][c])
    );
  }

  accum = initial_row;

  for (let r = 1; r < n; r = r + 1) {
    let curr_row = boolean_to_rune(pixels[r][0]);

    for (let c = 1; c < n; c = c + 1) {
      curr_row = beside_frac(
        1 - 1 / (c + 1),
        curr_row,
        boolean_to_rune(pixels[r][c])
      );
    }

    accum = stack_frac(1 - 1 / (r + 1), accum, curr_row);
  }

  return accum;
}

// testing
const t = true;
const f = false;
const my_pixels = [
  [f, t, t, f, f, f, t, t, f, f],
  [t, t, t, t, f, t, t, t, t, f],
  [t, t, t, t, t, t, t, t, t, f],
  [f, t, t, t, t, t, t, t, f, f],
  [f, f, t, t, t, t, t, f, f, f],
  [f, f, f, t, t, t, f, f, f, f],
  [f, f, f, f, t, f, f, f, f, f],
  [t, t, t, f, f, f, t, t, t, f],
  [t, f, t, f, f, f, t, f, t, f],
  [t, t, t, f, f, f, t, t, t, f]
];

show(pixels_to_rune(my_pixels));

// Question 2
// your solution from Question 1
function pixels_to_rune(pixels) {
  function boolean_to_rune(boolean) {
    return boolean ? square : blank;
  }

  let n = array_length(pixels);
  let initial_row = boolean_to_rune(pixels[0][0]);
  let accum = null;

  for (let c = 1; c < n; c = c + 1) {
    initial_row = beside_frac(
      1 - 1 / (c + 1),
      initial_row,
      boolean_to_rune(pixels[0][c])
    );
  }

  accum = initial_row;

  for (let r = 1; r < n; r = r + 1) {
    let curr_row = boolean_to_rune(pixels[r][0]);

    for (let c = 1; c < n; c = c + 1) {
      curr_row = beside_frac(
        1 - 1 / (c + 1),
        curr_row,
        boolean_to_rune(pixels[r][c])
      );
    }

    accum = stack_frac(1 - 1 / (r + 1), accum, curr_row);
  }

  return accum;
}

// resolution is the number of runes to
// place in each row and column
const RESOLUTION = 200;

// initialize a 2D array of pixels (booleans)
// all initially false (white)

function initialize_pixels(size) {
  let M = [];

  for (let r = 0; r < size; r = r + 1) {
    M[r] = [];
    for (let c = 0; c < size; c = c + 1) {
      M[r][c] = false;
    }
  }

  return M;
}

function curve_to_rune(n, curve) {
  let pixels = initialize_pixels(RESOLUTION);

  for (let t = 0; t <= 1; t = t + 1 / n) {
    let point = curve(t);

    let point_x = math_floor(math_abs(x_of(point) * RESOLUTION));
    let point_y = math_floor(math_abs(y_of(point) * RESOLUTION));

    point_x = point_x === RESOLUTION ? RESOLUTION - 1 : point_x;

    point_y = point_y === RESOLUTION ? RESOLUTION - 1 : point_y;

    pixels[RESOLUTION - 1 - point_y][point_x] = true;
  }

  return pixels_to_rune(pixels);
}

// our Curves library

function make_point(x, y) {
  return [x, y];
}

function x_of(pt) {
  return pt[0];
}

function y_of(pt) {
  return pt[1];
}

function unit_circle(t) {
  return make_point(math_sin(2 * math_PI * t), math_cos(2 * math_PI * t));
}

function draw_points_on(n) {
  return curve => show(curve_to_rune(n, curve));
}

// testing
draw_points_on(1000)(unit_circle);

// Question 3
// from Question 1

function pixels_to_rune(pixels) {
  function boolean_to_rune(boolean) {
    return boolean ? square : blank;
  }

  let n = array_length(pixels);
  let initial_row = boolean_to_rune(pixels[0][0]);
  let accum = null;

  for (let c = 1; c < n; c = c + 1) {
    initial_row = beside_frac(
      1 - 1 / (c + 1),
      initial_row,
      boolean_to_rune(pixels[0][c])
    );
  }

  accum = initial_row;

  for (let r = 1; r < n; r = r + 1) {
    let curr_row = boolean_to_rune(pixels[r][0]);

    for (let c = 1; c < n; c = c + 1) {
      curr_row = beside_frac(
        1 - 1 / (c + 1),
        curr_row,
        boolean_to_rune(pixels[r][c])
      );
    }

    accum = stack_frac(1 - 1 / (r + 1), accum, curr_row);
  }

  return accum;
}

// our Curves library

function make_point(x, y) {
  return [x, y];
}

function x_of(pt) {
  return pt[0];
}

function y_of(pt) {
  return pt[1];
}

function unit_circle(t) {
  return make_point(math_sin(2 * math_PI * t), math_cos(2 * math_PI * t));
}

// resolution is the number of runes to
// place in each row and column
const RESOLUTION = 200;

function initialize_pixels(size) {
  let M = [];

  for (let r = 0; r < size; r = r + 1) {
    M[r] = [];
    for (let c = 0; c < size; c = c + 1) {
      M[r][c] = false;
    }
  }

  return M;
}

function draw_points_squeezed_to_window(n) {
  // your solution goes here;
  // feel free to use helper functions
  function draw_curve(curve) {
    let pixels = initialize_pixels(RESOLUTION);

    for (let t = 0; t <= 1; t = t + 1 / n) {
      let point = curve(t);

      let point_x = math_floor(
        math_floor(x_of(point) * RESOLUTION + RESOLUTION) / 2
      );
      let point_y = math_floor(
        math_floor(y_of(point) * RESOLUTION + RESOLUTION) / 2
      );

      point_x = point_x >= RESOLUTION ? RESOLUTION - 1 : point_x;

      point_y = point_y >= RESOLUTION ? RESOLUTION - 1 : point_y;

      pixels[RESOLUTION - 1 - point_y][point_x] = true;
    }

    return show(pixels_to_rune(pixels));
  }

  return draw_curve;
}

draw_points_squeezed_to_window(1000)(unit_circle);
// should produce the given image
