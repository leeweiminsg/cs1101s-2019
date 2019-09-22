// Question 1
function partition(xs, p) {
  // Your answer here
  return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
}

// Test
// const my_list = list(1, 2, 3, 4, 5, 6);
// partition(my_list, 4);

// Question 2
// Type your program in here!
function partition(xs, p) {
    // Your answer from Task 1
    return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
}

function quicksort(xs) {
    // Your answer here
    return is_null(xs)
            ? null
            : append(
                 quicksort(
                     head(
                         partition(tail(xs), head(xs)))),
                 pair(
                     head(xs),
                     quicksort(
                         tail(
                             partition(tail(xs), head(xs))))));
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);

// Question 3
// Theta(n)

// Question 4
// Theta(n^2)

// Question 5
// Theta(nlog(n))