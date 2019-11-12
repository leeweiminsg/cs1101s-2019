// Question 1A
// Produces a list of all items along the n-th diagonal.
// n is an integer
// direction can be either "up" or "down"

function make_diagonal(n, direction) {
  // YOUR SOLUTION HERE
  let diagonal = null;
  let total = n + 1;

  for (let i = 1; i <= n; i = i + 1) {
    diagonal =
      direction === "up"
        ? pair(pair(i, total - i), diagonal)
        : pair(pair(total - i, i), diagonal);
  }

  return diagonal;
}

// Question 1B
// The following functions are predeclared:
// make_diagonal

// Produces a list of all items along the n-th diagonal.
// n is an integer
// direction can be either "up" or "down"

/*
function make_diagonal(n, direction) {
    // PREDECLARED
}
*/

// Produces a list of items in the first n diagonals
// in the orderstated in the first diagram.

function diagonalize(n) {
  // YOUR SOLUTION HERE
  let diagonal = null;

  for (let i = 1; i <= n; i = i + 1) {
    diagonal = append(diagonal, make_diagonal(i, i % 2 === 0 ? "up" : "down"));
  }

  return diagonal;
}

// Question 1C
// The following functions are predeclared:
// make_diagonal

// Produces a list of all items along the n-th diagonal.
// n is an integer
// direction can be either "up" or "down"

/*
function make_diagonal(n, direction) {
    // PREDECLARED
}
*/

// Produces a list of items in the first n diagonals
// in the orderstated in the first diagram.

function diagonalize_stream() {
  // YOUR SOLUTION HERE
  function helper(diagonal, n) {
    return is_null(diagonal)
      ? helper(make_diagonal(n + 1, (n + 1) % 2 === 0 ? "up" : "down"), n + 1)
      : pair(head(diagonal), () => helper(tail(diagonal), n));
  }

  return helper(null, 0);
}
