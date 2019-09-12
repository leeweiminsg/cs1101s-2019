// Question 1
// true
// false
// true
// true
// true
// true
// false
// false
// true

// Question 2
function square_list(xs) {
  return is_null(xs) ? null : pair(head(xs) * head(xs), square_list(tail(xs)));
}

// Type: square_list : list of Numbers -> list of Numbers

// Question 3
function shallow_copy(xs) {
  return is_null(xs) ? null : pair(head(xs), shallow_copy(tail(xs)));
}

// Question 4
function count_data_items(tree) {
  return is_null(tree)
    ? 0
    : (is_list(head(tree)) ? count_data_items(head(tree)) : head(tree)) +
        count_data_items(tail(tree));
}
