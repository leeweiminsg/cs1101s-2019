// Question 2
// Part A
const x = list(pair(1, 2), pair(3, 4));

// Part B
const x = pair(null, pair(null, pair(null, 5)));

// Question 3
// Part A
function hoo(f, g, h, x) {
  return f(x) ? 100 : g(x) ? (h(x) ? 100 : 50) : 50;
}

// Part B
// Iterative process, no deferred operations

// Question 4
// Part A
function get_sublist(start, end, L) {
  function helper(pos, ys) {
    if (pos < start) {
      return helper(pos + 1, tail(ys));
    } else if (pos <= end) {
      return pair(head(ys), helper(pos + 1, tail(ys)));
    } else {
      return null;
    }
  }
  return helper(0, L);
}

// Part B
function get_sublist(start, end, L) {
  function helper(pos, ys, result) {
    if (pos < start) {
      return helper(pos + 1, tail(ys), result);
    } else if (pos <= end) {
      return helper(pos + 1, tail(ys), pair(head(ys), result));
    } else {
      return reverse(result);
    }
  }

  return helper(0, L, null);
}

// Question 5
// Part A
function is_subset(S, T) {
  if (is_null(S)) {
    return true;
  } else if (is_null(T)) {
    return false;
  } else if (head(S) < head(T)) {
    return false;
  } else if (head(S) === head(T)) {
    return is_subset(tail(S), tail(T));
  } else {
    return is_subset(S, tail(T));
  }
}

// Part B
function super_merge(L) {
  return accumulate(merge, null, L);
}

// Question 6
// Part A
function make_active_list(L) {
  const len = length(L);
  return pos => (pos < 0 || pos >= len ? null : list(list_ref(L, pos)));
}

// Part B
function map_active_list(op, act_list) {
  return pos => map(op, act_list(pos));
}

// Question 7
// Part A
function negate_bst(bst) {
  return is_empty_binary_tree(bst)
    ? make_empty_binary_tree()
    : make_binary_tree_node(
        negate_bst(
          right_subtree_of(bst),
          -1 * value_of(bst),
          negate_bst(left_subtree_of(bst))
        )
      );
}

// Part B
function accumulate_bst(op, initial, bst) {
  if is_empty_binary_tree(bst) {
    return initial;
  } else {
    const s = accumulate_bst(op, initial, right_subtree_of(bst));
    const t = op(value_of(bst), s);

    return accumulate_bst(op, t, left_subtree_of(bst));
  }
}

// Question 8
// Part A
function insertions(x, ys) {
  return map(k => append(take(ys, k), pair(x, drop(ys, k))),
            enum_list(0, length(ys)));
}

// Part B
function permutations(xs) {
  if (is_null(xs)) {
    return list(null);
  } else {
    const s = permutations(tail(xs));
    const t = map(ys => insertions(head(xs), ys), s);
    return accumulate(append, null, t);
  }
}