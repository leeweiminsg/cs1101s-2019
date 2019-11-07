// Question 1
function filter(pred, xs) {
  function helper(xs, acc) {
    return is_null(xs)
      ? xs
      : pred(head(xs))
      ? helper(tail(xs), pair(head(xs), acc))
      : filter(tail(xs), acc);
  }

  return helper(reverse(xs), null);
}

// Question 2
function circular_right_shift(arr) {
  let height = array_length(arr);
  let width = array_length(arr[0]);
  let prev = arr[height - 1][width - 1];

  for (let r = 0; r < height; r = r + 1) {
    for (let c = 0; c < width; c = c + 1) {
      let temp = arr[r][c];
      arr[r][c] = prev;
      prev = temp;
    }
  }

  return arr;
}

// Test
let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];

circular_right_shift(arr);

// Expected
/* [[12, 1, 2],
[ 3, 4, 5],
[ 6, 7, 8],
[ 9, 10, 11] ] */

// Question 3
function build_slow_stream(n, k) {
  return k > n
    ? build_slow_stream(n + 1, 1)
    : pair(n, () => build_slow_stream(n, k + 1));
}

const make_slow = build_slow_stream(0, null);
