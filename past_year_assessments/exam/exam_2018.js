// Question 2D
function replace_2(a, b, xs) {
  return accumulate((x, ys) => pair(x === a ? b : x, ys), null, xs);
}

// Question 3A
function insert_to_bottom(stack, new_elem) {
  if (is_empty(stack)) {
    push(stack, new_elem);
  } else {
    const elem = pop(stack);
    insert_to_bottom(stack, new_elem);
    push(stack, elem);
  }
}

// Tests
const S = make_stack();
push(S, 3);
push(S, 4);
insert_to_bottom(S, 9);
pop(S); // returns 4
pop(S); // returns 3
pop(S); // returns 9

// Question 3B
function reverse_stack(stack) {
  if (!is_empty(stack)) {
    const elem = pop(stack);
    reverse_stack(stack);
    insert_to_bottom(stack, elem);
  } else {
  }
}

// Tests
const S = make_stack();
push(S, 1);
push(S, 2);
push(S, 3);
reverse_stack(S);
pop(S); // returns 1
pop(S); // returns 2
pop(S); // returns 3

// 4
// Returns the largest 2^k (where k is an integer) that is less than
// or equal to x. x must be a positive integer.
function closest_two_power(x) {
  return math_pow(2, math_floor(math_log2(x)));
}

function min_tiles(L, W) {
  if (L === 0 || W === 0) {
    return 0;
  } else if (L === 1 && W === 1) {
    return 1;
  } else {
    let biggest_tile_length = math_min(
      closest_two_power(L),
      closest_two_power(W)
    );

    return (
      1 +
      min_tiles(L - biggest_tile_length, W) +
      min_tiles(biggest_tile_length, W - biggest_tile_length)
    );

    // Suggested solution
    const min_dim = L <= W ? L : W;
    const two_pow = closest_two_power(min_dim);
    return 1 + min_tiles(L - two_pow, W) + min_tiles(two_pow, W - two_pow);
  }
}

// 5B
function bubblesort_list(L) {
  const len = length(L);

  for (let i = len - 1; i >= 1; i = i - 1) {
    let p = L;
    for (let j = 0; j < i; j = j + 1) {
      if (head(p) > head(tail(p))) {
        const temp = head(p);
        set_head(p, head(tail(p)));
        set_head(tail(p), temp);
      } else {
      }
      p = tail(p);
    }
  }
}

// Tests
const LL = list(3, 5, 2, 4, 1);
bubblesort_list(LL);
LL; // should show [1, [2, [3, [4, [5, null]]]]]

// 5C1
function reorder1(A, T) {
  const N = array_length(A);
  const B = [];

  for (let i = 0; i < N; i = i + 1) {
    B[T[i]] = A[i];
  }

  // copy B to A
  for (let i = 0; i < N; i = i + 1) {
    A[i] = B[i];
  }
}

// 5C2
function swap(A, i, j) {
  const temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

function reorder2(A, T) {
  const N = array_length(A);

  for (let i = 0; i < N; i = i + 1) {
    if (T[i] !== i) {
      for (let j = i + 1; j < N; j = j + 1) {
        if (T[j] === i) {
          swap(A, i, j);
          swap(T, i, j);
        } else {
        }
      }
    } else {
    }
  }
}

// Suggested solution
for (let i = 0; i < N; i = i + 1) {
  while (T[i] !== i) {
    const sIdx = i;
    const tIdx = T[i];
    swap(T, sIdx, tIdx);
    swap(A, sIdx, tIdx);
  }
}

// 6A
4;

// 6B
function grid_to_string(grid) {
  return (
    "Current grid:\n" +
    grid[0][0] +
    grid[0][1] +
    grid[0][2] +
    "\n" +
    grid[1][0] +
    grid[1][1] +
    grid[1][2] +
    "\n" +
    grid[2][0] +
    grid[2][1] +
    grid[2][2] +
    "\n"
  );
}

// 6C
for (let r = 0; r < 3; r = r + 1) {
  for (let c = 0; c < 3; c = c + 1) {
    grid[r][c] = "_";
  }
}

// 6D
function replace_string(new_string, r, c, g, expected_string) {
  if (g[r][c] === expected_string) {
    g[r][c] = new_string;
    return true;
  } else {
    return false;
  }
}

// 6E
function play_tic_tac_toe() {
  const grid = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"]
  ];
  while (prompt("Do you want to play tic-tac-toe?") === "yes") {
    free_grid(grid);
    let current_player = "X"; // X always starts first
    while (current_player !== "GAME_OVER") {
      const r = parse_int(
        prompt(
          grid_to_string(grid) +
            "\nPlayer " +
            current_player +
            ": enter row (0-2): "
        ),
        10
      );
      const c = parse_int(
        prompt(
          grid_to_string(grid) +
            "\nPlayer " +
            current_player +
            ": enter col (0-2): "
        ),
        10
      );

      if (replace_string(current_player, r, c, grid, "_")) {
        if (check_winner(grid, current_player)) {
          prompt(
            grid_to_string(grid) + "\nPlayer " + current_player + " wins!"
          );
          current_player = "GAME_OVER";
        } else {
          current_player = current_player === "X" ? "O" : "X";
        }
      } else {
        prompt(
          grid_to_string(grid) +
            "(" +
            r +
            ", " +
            c +
            ") is not " +
            "an empty slot! Try again!"
        );
      }
    }
  }
  prompt("Hope you had a nice time playing tic-tac-toe!");
}

// 8A
// Recursive

// 8B
("1 1 1 2 1 3 1 4 1 ");

// 8C
function extend(bno) {
  function bso(s1, s2) {
    return pair(bno(head(s1), head(s2)), () =>
      bso(stream_tail(s1), stream_tail(s2))
    );
  }

  return bso;
}

// 8D
("1 1 1 2 1 3 1 4 2 ");

// 8D3
"1 1 1 1 1 1 ";

"1 2 3 4 5 6 ";

"1 2 4 7 11 16 ";

"1 2 4 8 15 26 ";

"1 2 4 8 16 31 ";

"1 2 4 8 16 32 ";