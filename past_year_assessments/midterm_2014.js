// Question 1
// Part A
cond_a ? do_y() : do_x();

// Part B
cond_a ? do_x() : cond_b ? do_x() : do_y();

// Part C
cond_a ? (cond_b ? do_x() : do_y()) : do_y();

// Question 2
// Part A
/* function myfunc(a, b, c) {
return a * b + c;
} */

function myfunc(a) {
  b => c => a * b + c;
}

// Part B
myfunc(3)(2)(1);

// Question 3
// Part A
6;

// Part B
8;

// Part C
26;

// Part D
20;

// Question 4
// Part B
function BST_min(bst) {
  return is_null(bst)
    ? Infinity
    : is_null(head(tail(bst)))
    ? head(bst)
    : BST_min(head(tail(bst)));
}

// Part C
function BST_find(x, bst) {
  return is_null(bst)
    ? false
    : x === head(bst)
    ? true
    : x > head(bst)
    ? BST_find(x, tail(tail(bst)))
    : BST_find(x, head(head(tail(bst))));
}

// Theta(log(n))

// Part D
function BST_to_list(bst) {
  if (is_null(bst)) {
    return null;
  } else {
    const entry = head(bst);
    const left_tree = head(tail(bst));
    const right_tree = head(tail(tail(bst)));

    return append(BST_to_list(left_tree), BST_to_list(pair(entry, right_tree)));
  }
}

// Theta(nlog(n))

// Question 5
// Part A
function find_ranks(lst) {
  return map(x => length(filter(y => y <= x, lst)), lst);
}

// Theta(n^2)

// Part B
function rank_sort(lst) {
  const ranks = find_ranks(lst);

  return map(rank => get_num(lst, ranks), enum_list(1, length(lst)));
}

// Theta(n^2)

// Question 6
// Part A
function number_to_digits(n) {
  return n === 0 ? null : pair(n % 10, number_to_digits(math_floor(n / 10)));
}

// Part B
function triplets(digits) {
  if (is_null(digits)) {
    return null;
  } else if (length(digits) == 2) {
    return list(list(head(digits), head(tail(digits)), 0));
  } else if (length(digits) == 1) {
    return list(list(head(digits), 0, 0));
  } else {
    append(
      list(
        list(
          head(triplets(digits)),
          head(tail(triplets(digits))),
          head(tail(tail(triplets(digits))))
        )
      ),
      triplets(tail(tail(tail(digits))))
    );
  }
}

// Suggested solution (edited)
function triplets(digits) {
  return is_null(digits)
    ? null
    : is_null(tail(digits))
    ? list(list(head(digits), 0, 0))
    : is_null(tail(tail(digits)))
    ? list(list(head(digits), head(tail(digits)), 0))
    : pair(
        list(head(digits), head(tail(digits)), head(tail(tail(digits)))),
        triplets(tail(tail(tail(digits))))
      );
}

// Part C
function triplets_to_english(triplets) {
  if (is_null(triplets)) {
    return "";
  } else {
    return head(
      accumulate(
        (triplet, word_and_position) =>
          pair(
            head(word_and_position) +
              triplet_to_english(
                list_ref(2, triplet),
                list_ref(1, triplet),
                list_ref(0, triplet)
              ) +
              power_of_thousand(tail(word_and_position)),
            tail(word_and_position) - 1
          ),
        pair("", length(triplets) - 1),
        triplets
      )
    );
  }
}

// Suggested solution
function triplets_to_english(triplets) {
  function ts2english(ts, p) {
    return is_null(ts)
      ? ""
      : ts2english(tail(ts), p + 1) +
          " " +
          triplet_to_english(
            head(tail(tail(head(ts)))),
            head(tail(head(ts))),
            head(head(ts))
          ) +
          " " +
          power_of_thousand(p);
  }
  return ts2english(triplets, 0);
}

// Part D
function number_to_english(n) {
  const digits = number_to_digits(n);
  const triplets = triplets(digits);
  return triplets_to_english(triplets);
}
