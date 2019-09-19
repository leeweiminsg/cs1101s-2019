// Question 1
// put the first n elements of xs into a list
function take(xs, n) {
  // YOUR SOLUTION HERE
  function take_helper(xs, start, stop) {
    return start === stop
      ? null
      : pair(list_ref(xs, start), take_helper(xs, start + 1, stop));
  }

  return take_helper(xs, 0, n);
}

// drop first n elements from list, return rest
function drop(xs, n) {
  // YOUR SOLUTION HERE
  return n === 0 ? xs : drop(tail(xs), n - 1);
}

// Question 2
// given a non-empty list xs, returns the smallest item in xs
function smallest(xs) {
  // YOUR SOLUTION HERE
  return accumulate((x, y) => (x < y ? x : y), null, xs);
}

// Question 2
// given a non-empty list xs, returns the smallest item in xs
function smallest(xs) {
  // YOUR SOLUTION HERE
  return accumulate((x, y) => (x < y ? x : y), head(xs), xs);
}

// Question 3
// Removes the first instance of x from xs
function remove(x, xs) {
  // YOUR SOLUTION HERE
  function remove_helper(x, xs, xs_accum) {
    return is_null(xs)
      ? xs_accum
      : equal(head(xs), x)
      ? append(xs_accum, tail(xs))
      : remove_helper(x, tail(xs), append(xs_accum, list(head(xs))));
  }

  return remove_helper(x, xs, null);
}

// Question 4
function selection_sort(xs) {
  if (is_null(xs)) {
    return xs;
  } else {
    return pair(smallest(xs), selection_sort(remove(smallest(xs), xs)));
  }
}

// Question 5
// ----- DO NOT CHANGE -----
const good_enough = 0.0000001;

// Produces a function such that f(x) = x^k - b
// A root for f(x) also satisfies x^k = b.
function make_root_finder(k, b) {
  function f(x) {
    // x^k - b = 0
    return math_pow(x, k) - b;
  }
  return f;
}

// --- END DO NOT CHANGE ---

function midpoint(a, b) {
  return (a + b) / 2; // Subtask 1.
}

function find_root(f, a, b) {
  if (b - a < good_enough) {
    return a;
  } else {
    const c = midpoint(a, b);
    // Subtask 2: Complete this portion.
    // You need to examine the value f(c)
    return f(c) > 0 ? find_root(f, a, c) : find_root(f, c, b);
  }
}

// For example:
// find_root(make_root_finder(2, 3), 0, 100);
