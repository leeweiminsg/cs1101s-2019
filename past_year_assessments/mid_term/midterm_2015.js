// Question 1
// Part A
const start = pair(1, pair(pair(3, pair(null, 4)), 2));

// Part B
const null_pair = pair(null, null);
const pair_2 = pair(null_pair, null_pair);
const start = pair(pair_2, pair_2);

// Part C
// Not possible (referencing before initialization)

// Question 2
// Part A
function shares(xs, p) {
  return is_null(xs) ? false : xs === p || shares(tail(xs), p);
}

// Part B
function is_list_of_numbers(x) {
  return is_null(x)
    ? true
    : is_pair(x)
    ? is_number(head(x)) && is_list_of_numbers(tail(x))
    : false;
}

// Part C
function is_tree_of_numbers(x) {
  return (
    is_list(x) &&
    accumulate(
      (item, is_tree_of_numbers) =>
        is_tree_of_numbers && (is_number(item) || is_tree_of_numbers(item)),
      true,
      x
    )
  );
}

// Part D
function my_filter(pred, xs) {
  return accumulate(
    (x, filtered) => (pred(x) ? pair(x, filtered) : filtered),
    null,
    xs
  );
}

// Question 3
// Part A
function make_image(rows, columns, func) {
  return build_list(rows, row =>
    build_list(columns, column => func(row, column))
  );
}

// Part B
function flip_image_vertically(image) {
  return reverse(image);
}

// Part C
function flip_image_horizontally(image) {
  return map(reverse, image);
}

// Part D
function rotate_image_180(image) {
  return flip_image_horizontally(flip_image_vertically(image));
}

// Question 4
// Part A
// No, No

// Part B
// No, No

// Part C
// Yes, No

// Part D
// Yes, No

// Part E
// Yes, No

// Part F
// Yes, Yes

// Question 5
// Part A
function are_permutation(xs1, xs2) {
  return is_null(xs1) || is_null(xs2)
    ? xs1 === xs2
    : length(xs1) !== length(xs2)
    ? false
    : are_permutation(
        filter(x => !equal(x, head(xs1))),
        filter(x => !equal(x, head(xs2)))
      );
}

// Theta(m^2 + n^2)

// Part B
function combinations(xs, k) {
  const all_combis = accumulate(
    (x, combis) => append(combis, map(combi => pair(x, combi), combis)),
    list(null),
    xs
  );

  return filter(combi => length(combi) === k, all_combis);
}

// Suggested solution (edited)
function combinations(xs, k) {
  if (k === 0) {
    return list(null);
  } else if (is_null(xs)) {
    return null;
  } else {
    const combi_1 = combinations(tail(xs), k - 1);
    const combi_2 = combinations(tail(xs), k);
    const has_x = map(combi => pair(head(xs), combi), combi_1);

    return append(combi_2, has_x);
  }
}
