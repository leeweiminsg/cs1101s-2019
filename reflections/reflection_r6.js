// Question 1
/* 
function insert_cmp(x, xs, cmp) {
  return is_null(xs)
    ? list(x)
    : cmp(x, head(xs))
    ? pair(x, xs)
    : pair(head(xs), insert_cmp(x, tail(xs), cmp));
}
function insertion_sort_cmp(xs, cmp) {
  return is_null(xs)
    ? xs
    : insert_cmp(head(xs), insertion_sort_cmp(tail(xs), cmp), cmp);
}

const xs = list(6, 3, 8, 5, 1, 9, 6, 4, 2, 7); */

// Part A
// Result: list(1, 2, 3, 4, 5, 6, 6, 7, 8, 9)
insertion_sort_cmp(xs, (x, y) => x <= y);

// Part B
// Result: list(9, 8, 7, 6, 6, 5, 4, 3, 2, 1)
insertion_sort_cmp(xs, (x, y) => x >= y);

// Part C
// Result: list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6)
insertion_sort_cmp(xs, (x, y) => false);

// Part D
// Result: list(2, 4, 6, 6, 8, 9, 7, 5, 3, 1)
(x, y) =>
  even(x) && !even(y)
    ? true
    : even(x) && even(y)
    ? x > y
    : !even(x) && !even(y)
    ? x > y
    : false;

// Question 2
// half, rounded downwards
function middle(n) {
  // ...
}
// put the first n elements of xs into a list
function take(xs, n) {
  // ...
}
// drop the first n elements from the list and return the rest
function drop(xs, n) {
  // ...
}
// merge two sorted lists into one sorted list
/* function merge(xs, ys) {
  if (is_null(xs)) {
    return ys;
  } else if (is_null(ys)) {
    return xs;
  } else {
    const x = head(xs);
    const y = head(ys);
    return x < y ? pair(x, merge(tail(xs), ys)) : pair(y, merge(xs, tail(ys)));
  }
}
function merge_sort(xs) {
  if (is_null(xs) || is_null(tail(xs))) {
    return xs;
  } else {
    const mid = middle(length(xs));
    return merge(merge_sort(take(xs, mid)), merge_sort(drop(xs, mid)));
  }
} */

// Time complexity of merge function is O(n)

// Time complexity of merge function is O(nlog(n))
