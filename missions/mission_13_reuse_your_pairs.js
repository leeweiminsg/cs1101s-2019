// Question 1
function d_split_list(xs) {
  const xs_length = length(xs);
  let first_half_length = 0;
  let second_half = null;
  let curr = xs;

  first_half_length =
    xs_length % 2 === 0 ? xs_length / 2 : math_floor(xs_length / 2) + 1;

  let i = 0;
  while (i < first_half_length - 1) {
    curr = tail(curr);
    i = i + 1;
  }

  second_half = tail(curr);
  set_tail(curr, null);

  return pair(xs, second_half);
}

// TEST:
// const my_list1 = list(1, 2, 3, 4, 5, 6);
// const my_list2 = list(5, 4, 3, 2, 1);
// d_split_list(my_list1);
// d_split_list(my_list2);

// equal(d_split_list(list(1,2,3,4,5)), pair(list(1,2,3), list(4,5)));

// Question 2
function d_merge(xs, ys) {
  if (is_null(xs) || is_null(ys)) {
    return is_null(xs) && is_null(ys) ? null : is_null(xs) ? ys : xs;
  } else if (is_null(tail(xs)) || is_null(tail(xs))) {
    if (is_null(tail(xs))) {
      set_tail(xs, ys);

      return xs;
    } else {
      set_tail(ys, xs);

      return ys;
    }
  } else {
    let curr_xs = xs;
    let curr_ys = ys;
    let aux = [];
    let aux_i = 0;

    let curr = xs;
    while (!is_null(tail(curr))) {
      curr = tail(curr);
    }

    set_tail(curr, ys);

    while (tail(curr_xs) !== ys && !is_null(curr_ys)) {
      if (head(curr_xs) <= head(curr_ys)) {
        aux[aux_i] = head(curr_xs);
        curr_xs = tail(curr_xs);
      } else {
        aux[aux_i] = head(curr_ys);
        curr_ys = tail(curr_ys);
      }

      aux_i = aux_i + 1;
    }

    if (is_null(curr_ys)) {
      while (curr_xs !== ys) {
        aux[aux_i] = head(curr_xs);

        aux_i = aux_i + 1;
        curr_xs = tail(curr_xs);
      }
    } else {
      while (!is_null(curr_ys)) {
        aux[aux_i] = head(curr_ys);

        aux_i = aux_i + 1;
        curr_ys = tail(curr_ys);
      }
    }

    curr = xs;
    for (let i = 0; i < array_length(aux); i = i + 1) {
      set_head(curr, aux[i]);
      curr = tail(curr);
    }

    return xs;
  }
}

// Question 3
// Copy-and-paste your d_split_list function for Task 1 here.
function d_split_list(xs) {
  const xs_length = length(xs);
  let first_half_length = 0;
  let second_half = null;
  let curr = xs;

  first_half_length =
    xs_length % 2 === 0 ? xs_length / 2 : math_floor(xs_length / 2) + 1;

  let i = 0;
  while (i < first_half_length - 1) {
    curr = tail(curr);
    i = i + 1;
  }

  second_half = tail(curr);
  set_tail(curr, null);

  return pair(xs, second_half);
}

// Copy-and-paste your d_merge function for Task 2 here.
function d_merge(xs, ys) {
  if (is_null(xs) || is_null(ys)) {
    return is_null(xs) && is_null(ys) ? null : is_null(xs) ? ys : xs;
  } else {
    let curr_xs = xs;
    let curr_ys = ys;
    let aux = [];
    let aux_i = 0;

    let curr = xs;
    while (!is_null(tail(curr))) {
      curr = tail(curr);
    }

    set_tail(curr, ys);

    while (curr_xs !== ys && !is_null(curr_ys)) {
      if (head(curr_xs) <= head(curr_ys)) {
        aux[aux_i] = head(curr_xs);
        curr_xs = tail(curr_xs);
      } else {
        aux[aux_i] = head(curr_ys);
        curr_ys = tail(curr_ys);
      }

      aux_i = aux_i + 1;
    }

    if (is_null(curr_ys)) {
      while (curr_xs !== ys) {
        aux[aux_i] = head(curr_xs);

        aux_i = aux_i + 1;
        curr_xs = tail(curr_xs);
      }
    } else {
      while (!is_null(curr_ys)) {
        aux[aux_i] = head(curr_ys);

        aux_i = aux_i + 1;
        curr_ys = tail(curr_ys);
      }
    }

    curr = xs;
    for (let i = 0; i < array_length(aux); i = i + 1) {
      set_head(curr, aux[i]);
      curr = tail(curr);
    }

    return xs;
  }
}

function d_merge_sort(xs) {
  // Your answer here
  if (is_null(xs) || is_null(tail(xs))) {
    return xs;
  } else {
    const split_lists = d_split_list(xs);
    const left_half = head(split_lists);
    const right_half = tail(split_lists);

    const merged_ls = d_merge(
      d_merge_sort(left_half),
      d_merge_sort(right_half)
    );

    return merged_ls;
  }
}

// TEST:
// const my_list = list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6);
// d_merge_sort(my_list);

// equal(d_merge_sort(list(7,2,4,6,9,1,5,8,3,6)), list(1,2,3,4,5,6,6,7,8,9));
