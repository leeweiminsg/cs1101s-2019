// Question 1A

function make_2D_zero_array(rows, cols) {
  let arr = [];
  for (let r = 0; r < rows; r = r + 1) {
    arr[r] = [];
    for (let c = 0; c < cols; c = c + 1) {
      arr[r][c] = 0;
    }
  }
  return arr;
}

// Question 1B

function num_of_live_neighbours(game, n, r, c) {
  let live_count = 0;
  for (let dr = -1; dr <= 1; dr = dr + 1) {
    for (let dc = -1; dc <= 1; dc = dc + 1) {
      live_count = live_count + game[(r + dr + n) % n][(c + dc + n) % n];
    }
  }
  return live_count - game[r][c];
}

// Question 1C

function next_generation(game, n) {
  let next = make_2D_zero_array(n, n);
  for (let y = 0; y < n; y = y + 1) {
    for (let x = 0; x < n; x = x + 1) {
      let live_neighbours = num_of_live_neighbours(game, n, y, x);

      if (game[y][x] === 1) {
        if (live_neighbours < 2 || live_neighbours > 3) {
          next[y][x] = 0;
        } else {
          next[y][x] = 1;
        }
      } else if (live_neighbours === 3) {
        next[y][x] = 1;
      } else {
        next[y][x] = 0;
      }
    }
  }
  return next;
}

//////////////////////////////////////////////////////////////////////////////

// For testing equality of two floating-point numbers,
// using an epsilon tolerance.
function fequal(num1, num2, epsilon) {
  return Math.abs(num1 - num2) < epsilon;
}

let EPS = 0.000001;

// For testing equality of two 1D arrays.
function array_1D_equal(as, bs) {
  if (as.length !== bs.length) {
    return false;
  } else {
    for (let i = 0; i < as.length; i = i + 1) {
      if (!equal(as[i], bs[i])) {
        return false;
      } else {
      }
    }
    return true;
  }
}

// For testing equality of two 2D arrays.
function array_2D_equal(as, bs) {
  if (as.length !== bs.length) {
    return false;
  } else {
    for (let i = 0; i < as.length; i = i + 1) {
      if (!array_1D_equal(as[i], bs[i])) {
        return false;
      } else {
      }
    }
    return true;
  }
}

//===========================================================
// REMOVE THIS FUNCTION DEFINITION WHEN INSTALLING THE PE.
//===========================================================
function assert(f, test_name, fnames) {
  display(test_name + ": " + (f() ? "PASS" : "FAIL"));
}
//===========================================================

//
// Test Cases for Q1A
//

assert(
  function() {
    let arr = [[0, 0, 0]];
    return array_2D_equal(make_2D_zero_array(1, 3), arr);
  },
  "Q1AT1",
  ["make_2D_zero_array"]
);

assert(
  function() {
    let arr = [[0], [0], [0]];
    return array_2D_equal(make_2D_zero_array(3, 1), arr);
  },
  "Q1AT2",
  ["make_2D_zero_array"]
);

assert(
  function() {
    let arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
    return array_2D_equal(make_2D_zero_array(4, 3), arr);
  },
  "Q1AT3",
  ["make_2D_zero_array"]
);

//
// Test Cases for Q1B
//

assert(
  function() {
    let game = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 1], [0, 0, 0, 1]];
    return equal(num_of_live_neighbours(game, 4, 2, 2), 3);
  },
  "Q1BT1",
  ["num_of_live_neighbours"]
);

assert(
  function() {
    let game = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 1], [0, 0, 0, 1]];
    return equal(num_of_live_neighbours(game, 4, 1, 0), 2);
  },
  "Q1BT2",
  ["num_of_live_neighbours"]
);

assert(
  function() {
    let game = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 1], [0, 0, 0, 1]];
    return equal(num_of_live_neighbours(game, 4, 3, 3), 2);
  },
  "Q1BT3",
  ["num_of_live_neighbours"]
);

assert(
  function() {
    let game = [[0, 0, 0, 0], [0, 0, 0, 1], [1, 0, 1, 0], [0, 0, 0, 1]];
    return equal(num_of_live_neighbours(game, 4, 2, 3), 4);
  },
  "Q1BT4",
  ["num_of_live_neighbours"]
);

assert(
  function() {
    let game = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 1, 0], [0, 0, 0, 1]];
    return equal(num_of_live_neighbours(game, 4, 0, 1), 0);
  },
  "Q1BT5",
  ["num_of_live_neighbours"]
);

//
// Test Cases for Q1C
//

assert(
  function() {
    let game = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 1], [0, 0, 0, 1]];
    let ans = [[0, 0, 0, 0], [0, 0, 1, 0], [1, 0, 1, 1], [0, 0, 1, 1]];
    return array_2D_equal(next_generation(game, 4), ans);
  },
  "Q1CT1",
  ["next_generation"]
);

assert(
  function() {
    let game = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0]
    ];
    let ans = [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0]
    ];
    return array_2D_equal(next_generation(game, 5), ans);
  },
  "Q1CT2",
  ["next_generation"]
);
