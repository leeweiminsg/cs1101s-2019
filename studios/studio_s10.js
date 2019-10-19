// Question 2
/* function bubblesort_array(A) {
  const len = array_length(A);
  for (let i = len - 1; i >= 1; i = i - 1) {
    for (let j = 0; j < i; j = j + 1) {
      if (A[j] > A[j + 1]) {
        const temp = A[j];
        A[j] = A[j + 1];
        A[j + 1] = temp;
      } else {
      }
    }
  }
} */

// Part A
// Theta(n^2)

// Part B
function bubblesort_list(L) {
  const len = length(L);
  let curr = null;

  for (let i = len - 1; i >= 1; i = i - 1) {
    curr = L;

    for (let j = 0; j < i; j = j + 1) {
      if (head(curr) > head(tail(curr))) {
        const temp = head(curr);
        set_head(curr, head(tail(curr)));
        set_head(tail(curr), temp);
      } else {
      }

      curr = tail(curr);
    }
  }

  return L;
}

const LL = list(3, 5, 2, 4, 1);
bubblesort_list(LL);

// Question 3
// Part A
function make_2D_zero_array(rows, cols) {
  let AA = [];

  function make_rows(r) {
    if (r === rows) {
      return AA;
    } else {
      AA[r] = [];
      make_cols(0, AA[r]);

      return make_rows(r + 1);
    }
  }

  function make_cols(c, row) {
    if (c === cols) {
      return AA;
    } else {
      row[c] = 0;

      return make_cols(c + 1, row);
    }
  }

  return make_rows(0);
}

// Part B
function num_of_live_neighbours(game, n, r, c) {
  let A_r = [r - 1, r, r + 1];
  let A_c = [c - 1, c, c + 1];
  let neighbours = 0;

  function convert(i) {
    return i < 0 || i > n - 1 ? (i + n) % n : i;
  }

  for (let i = 0; i < n; i = i + 1) {
    A_r[i] = convert(A_r[i]);
    A_c[i] = convert(A_c[i]);
  }

  for (let i = 0; i < 3; i = i + 1) {
    for (let j = 0; j < 3; j = j + 1) {
      neighbours = neighbours + game[A_r[i]][A_c[j]];
    }
  }

  return neighbours - game[r][c];
}

// Test
/* 
let game = [[2, 3, 4],
            [5, 6, 7],
            [8, 9, 10]];
num_of_live_neighbours(game, 3, 0, 0);
*/

// Part C
function next_generation(game, n) {
  const next = make_2D_zero_array(n, n);

  for (let r = 0; r < 3; r = r + 1) {
    for (let c = 0; c < 3; c = c + 1) {
      let curr = game[r][c];
      let neighbours = num_of_live_neighbours(game, n, r, c);

      if (curr === 1) {
        if (neighbours < 2 || neighbours > 3) {
          next[r][c] = 0;
        } else {
          next[r][c] = 1;
        }
      } else if (neighbours === 3) {
        next[r][c] = 1;
      } else {
        next[r][c] = 0;
      }
    }
  }

  return next;
}

// Question 4
const mem = [];

function read(n, k) {
  return mem[n] === undefined ? undefined : mem[n][k];
}

function write(n, k, value) {
  if (mem[n] === undefined) {
    mem[n] = [];
  } else {
  }
  mem[n][k] = value;
}

function cc(amount, kinds_of_coins) {
  if (read(amount, kinds_of_coins) !== undefined) {
    return read(amount, kinds_of_coins);
  } else {
    const result =
      amount === 0
        ? 1
        : amount < 0 || kinds_of_coins === 0
        ? 0
        : cc(amount, kinds_of_coins - 1) +
          cc(amount - first_denomination(kinds_of_coins), kinds_of_coins);

    write(amount, kinds_of_coins, result);

    return result;
  }
}

function first_denomination(kinds_of_coins) {
  return kinds_of_coins === 1
    ? 5
    : kinds_of_coins === 2
    ? 10
    : kinds_of_coins === 3
    ? 20
    : kinds_of_coins === 4
    ? 50
    : kinds_of_coins === 5
    ? 100
    : 0;
}

// Time and space complexity: Theta(amount)
