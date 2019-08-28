// Question 1
const DONT_CARE = undefined;
// Ignore this, do not edit.

// When thinking about base cases,
// do the simplest thing possible
// and leave the hard work to the computer

function choose(n, r) {
  if (n < 0 || r < 0) {
    // Change this condition
    return 0;
  } else if (r === 0) {
    // Change this condition
    return 1;
  } else {
    // DO NOT EDIT
    return DONT_CARE;
  }
}

// Question 2
// Suppose you need to choose R items from N items.
// Consider the first item.
// - We can either choose it, or not choose it.

// If we choose the first item:
// - How many more items must we choose?
const CHOOSE_FIRST_ITEM = choose(N - 1, R - 1); // Edit arguments only.
// Example: choose(N + 4, R - 7);

// If we don't choose the first item:
// - How many more items must we choose?
const NOT_CHOOSE_FIRST_ITEM = choose(N - 1, R); // Edit arguments only.

// Express your answers in terms of choose, N and R.
// They have been pre-defined.

// Question 3
function choose(n, r) {
  if (n < 0 || r < 0) {
    return 0;
  } else if (r === 0) {
    return 1;
  } else {
    // Inductive case goes here
    return choose(n - 1, r - 1) + choose(n - 1, r); // YOUR SOLUTION HERE
  }
}

// Question 4
// Sums the first n odd natural numbers.
function sum_odd(n) {
  // YOUR SOLUTION HERE
  return sum(x => 2 * (x - 1) + 1, 1, x => x + 1, n);
}

// Question 5
// Sums the first n odd numbers less than or equal to n
function sum_odd_lte(n) {
  // YOUR SOLUTION HERE
  return sum(x => 2 * (x - 1) + 1, 1, x => x + 1, (n + 1) / 2);
}

// Question 6
function accumulate(combiner, term, a, next, b, base) {
  // YOUR SOLUTION HERE
  return a > b
    ? base
    : combiner(term(a), accumulate(combiner, term, next(a), next, b, base));
}

// Usage examples:

// function sum(term, a, next, b) {
//   return accumulate( (x, y) => x + y, term, a, next, b, 0);
// }

// function product(term, a, next, b) {
//   return accumulate( (x, y) => x * y, term, a, next, b, 1);
// }

// function fact(n) {
//     return product(x => x, 1, x => x + 1, n);
// }

// These are the actual test cases.
