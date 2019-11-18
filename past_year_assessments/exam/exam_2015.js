// Question 3A
let n = 5; // n is a positive integer number
function outer_loop(x) {
  function inner_loop(y) {
    if (y < x) {
      display("x: " + stringify(x) + ", y: " + stringify(y));
      return inner_loop(y + 1);
    } else {
    }
  } // inner_loop

  if (x < n) {
    inner_loop(0);
    return outer_loop(x * 2);
  } else {
  }
}

outer_loop(1);

// Question 3B
let n = 5; // n is a positive integer number
function double_loop(x, y) {
  if (x < n) {
    if (y < x) {
      display("x: " + stringify(x) + ", y: " + stringify(y));
      return double_loop(x, y + 1);
    } else {
      return double_loop(x * 2, 0);
    }
  } else {
  }
}
double_loop(1, 0);

// Question 4
function circular_right_shift(arr) {
  let height = array_length(arr);
  let width = array_length(arr[0]);
  let start = arr[height - 1][width - 1];

  for (let r = 0; r < height; r = r + 1) {
    for (let c = 0; c < width; c = c + 1) {
      let temp = arr[r][c];
      arr[r][c] = start;
      start = temp;
    }
  }

  return arr;
}

// Tests
let arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12]
];

circular_right_shift(arr);
// should return
/* [
  [12, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11]
]; */

// Question 5
function mutable_reverse(xs) {
  let others = tail(xs);
  set_tail(xs, null);

  function helper(curr, result) {
    if (is_null(curr)) {
      return result;
    } else {
      let others = tail(curr);
      set_tail(curr, result);

      return helper(others, curr);
    }
  }

  return helper(others, xs);
}

let as = list(1, 2, 3, 4, 5);
let bs = mutable_reverse(as);
bs; // equal to list(5, 4, 3, 2, 1).
as; // equal to list(1).

// Alternative
if (is_null(xs)) {
  return xs;
} else if (is_null(tail(xs))) {
  return xs;
} else {
  let temp = mutable_reverse(tail(xs));
  set_tail(tail(xs), xs);
  set_tail(xs, null);
  return temp;
}

// Question 7A
let t = pair(
  pair(2, () => pair(4, null)),
  () =>
    pair(
      pair(3, () => pair(5, null)),
      null
    )
);

// Tests
// head(head(t)); // returns 2.
// head(stream_tail(head(t))); // returns 4.
// head(head(stream_tail(t))); // returns 3.
// head(stream_tail(head(stream_tail(t)))); // returns 5.

// Question 7B
function bin_tream(num) {
  let e = () => null;
  let z = () => pair(bin_tream(num * 2), e);

  let y = () => pair(bin_tream(num + 1), z);

  return pair(num, y);
}

let b = bin_tream(1);

// Question 7C
function tree_to_tream(tree) {
  if (is_null(tree)) {
    return null;
  } else {
    let x = () => tree_to_tream(tail(tree));

    if (is_list(head(tree))) {
      return pair(tree_to_tream(head(tree)), x);
    } else {
      return pair(head(tree), x);
    }
  }
}

// Question 7D
function tream_map(f, t) {
  if (is_null(t)) {
    return null;
  } else if (is_pair(head(t))) {
    return pair(tream_map(f, head(t)), () => tream_map(f, stream_tail(t)));
  } else {
    return pair(f(head(t)), () => tream_map(f, stream_tail(t)));
  }
}
