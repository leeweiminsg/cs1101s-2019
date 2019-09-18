// Question 1
// Produces a list of integers [a, b]
// assuming a, b are integers.
function enum_list(a, b) {
  // YOUR SOLUTION HERE
  return a > b ? null : pair(a, enum_list(a + 1, b));
}

// Question 2
// Produces a list of integers [a, b]
// assuming a, b are integers.
function enum_list(a, b) {
  // YOUR SOLUTION HERE
  return build_list(b - a + 1, n => n + a);
}

// Question 3
/* Refer to SCIPjs for implementation of prime */
function prime_only(xs) {
  function smallest_divisor(n) {
    return find_divisor(n, 2);
  }
  function find_divisor(n, test_divisor) {
    return square(test_divisor) > n
      ? n
      : divides(test_divisor, n)
      ? test_divisor
      : find_divisor(n, test_divisor + 1);
  }
  function divides(a, b) {
    return b % a === 0;
  }
  function square(x) {
    return x * x;
  }
  function is_prime(n) {
    return n === smallest_divisor(n);
  }

  return filter(n => is_prime(n) && n !== 1, xs);
}

function odd_only(xs) {
  return filter(n => n % 2 === 1, xs);
}

// Question 4
const display = custom_display;

function traverse(xs) {
  if (xs === null) {
    return display(null);
  } else {
    display(head(xs));
    return traverse(tail(xs));
  }
}

// Question 5
const display = custom_display;

function traverse(tree) {
  if (is_null(tree)) {
    return display(null);
  } else if (is_list(tree)) {
    traverse(head(tree));
    traverse(tail(tree));
  } else {
    return display(tree);
  }
}

// Question 6
function flatten(xs) {
  if (is_null(xs)) {
    return null;
  } else if (is_list(head(xs))) {
    return append(flatten(head(xs)), flatten(tail(xs)));
  } else {
    return pair(head(xs), flatten(tail(xs)));
  }
}
