// Question 1G
function n_of_n_stream() {
  function helper(n, k) {
    if (k > n) {
      return helper(n + 1, 1);
    } else {
      return pair(n, () => helper(n, k + 1));
    }
  }

  return helper(1, 1);
}

// Tests
eval_stream(n_of_n_stream(), 11);

// Question 1H
function table_to_snake_list(table, height, width) {
  let result = null;

  for (let r = 0; r < height; r = r + 1) {
    for (let c = 0; c < width; c = c + 1) {
      if (r % 2 === 0) {
        result = pair(table[r][c], result);
      } else {
        result = pair(table[r][width - 1 - c], result);
      }
    }
  }

  return reverse(result);
}

// Tests
let table = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12]
];
table_to_snake_list(table, 4, 3);
// Equal to list(1, 2, 3, 6, 5, 4, 7, 8, 9, 12, 11, 10).

// Question 2A
function mergeA(xs, ys) {
  if (is_null(xs) && is_null(ys)) {
    return null;
  } else if (is_null(xs)) {
    return pair(head(ys), mergeA(xs, tail(ys)));
  } else if (is_null(ys)) {
    return pair(head(xs), mergeA(tail(xs), ys));
  } else {
    return head(xs) <= head(ys)
      ? pair(head(xs), mergeA(tail(xs), ys))
      : pair(head(ys), mergeA(xs, tail(ys)));
  }
}

let xs = list(1, 3, 7, 9);
let ys = list(2, 3, 5, 6, 11);
equal(mergeA(xs, ys), list(1, 2, 3, 3, 5, 6, 7, 9, 11));

// Question 2B
function mergeB(xs, ys) {
  if (is_null(xs) && is_null(ys)) {
    return null;
  } else if (is_null(xs)) {
    set_tail(ys, mergeB(xs, tail(ys)));
    return ys;
  } else if (is_null(ys)) {
    set_tail(xs, mergeB(tail(xs), ys));
    return xs;
  } else if (head(xs) <= head(ys)) {
    set_tail(xs, mergeB(tail(xs), ys));
    return xs;
  } else {
    set_tail(ys, mergeB(xs, tail(ys)));
    return ys;
  }
}

// Question 2C
function mergeC(xs, xs_len, ys, ys_len) {
  let result = [];
  let result_len = xs_len + ys_len;
  let xs_curr = 0;
  let ys_curr = 0;

  for (let i = 0; i < result_len; i = i + 1) {
    if (xs_curr === xs_len || xs[xs_curr] > ys[ys_curr]) {
      result[i] = ys[ys_curr];
      ys_curr = ys_curr + 1;
    } else {
      result[i] = xs[xs_curr];
      xs_curr = xs_curr + 1;
    }
  }

  return result;
}

// Tests
let xs = [1, 3, 7, 9];
let ys = [2, 3, 5, 6, 11];
mergeC(xs, 4, ys, 5); // Equivalent to [1, 2, 3, 3, 5, 6, 7, 9, 11]

// Question 3A
function are_equal_sets(set1, set2) {
  if (length(set1) !== length(set2)) {
    return false;
  } else {
    let result = set2;

    function update(x) {
      result = filter(y => !equal(x, y), result);
    }

    map(update, set1);

    return is_null(result);
  }
}

// Tests
let set1 = list(6, 3, 5, 8);
let set2 = list(8, 3, 5, 6);

are_equal_sets(set1, set2); // should return true

// Question 3B
function powerset(set) {
  if (is_null(set)) {
    return list(null);
  } else {
    let subsets = powerset(tail(set));
    let subsets_with_head = map(subset => pair(head(set), subset), subsets);

    return append(subsets, subsets_with_head);
  }
}

let set = list(3, 5, 6);
powerset(set); // should return {{3, 5, 6}, {3, 5}, {3, 6}, {5, 6}, {3}, {5}, {6}, {}}.

// Question 4A
function make_circular_copy(xs) {
  function copy_list(xs) {
    if (is_null(xs)) {
      return null;
    } else {
      return pair(head(xs), copy_list(tail(xs)));
    }
  }

  function set_null_to_start(xs, start) {
    if (is_null(xs)) {
      return null;
    } else if (is_null(tail(xs))) {
      set_tail(xs, start);
      return start;
    } else {
      return set_null_to_start(tail(xs), start);
    }
  }

  if (is_null(xs)) {
    return null;
  } else {
    let xs_copy = copy_list(xs);

    return set_null_to_start(xs_copy, xs_copy);
  }
}

// Tests
list_ref(make_circular_copy(list(1, 2, 3)), 4);
// should return 2

// Question 4B
function make_linear(xs) {
  let start = xs;

  function set_tail_to_null(xs) {
    if (is_null(xs)) {
      return null;
    } else if (equal(head(start), head(tail(xs)))) {
      set_tail(xs, null);
      return undefined;
    } else {
      return set_tail_to_null(tail(xs));
    }
  }

  return set_tail_to_null(xs);
}

// Tests
let ys = make_circular_copy(list(1, 2, 3));
make_linear(ys);
equal(list(1, 2, 3), ys); // returns true for any list xs
