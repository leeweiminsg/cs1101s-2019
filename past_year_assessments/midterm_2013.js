// Question 1
function equal_boolean(x, y) {
  return x ? y : y ? x : true;
}

// Question 2
function plus(x, y) {
  if (is_number(x) && is_number(y)) {
    add_ieee_754(x, y);
  } else if (is_string(x) || is_string(y)) {
    return concatenate(to_string(x), to_string(y));
  } else {
    return "error: wrong types";
  }
}

// Suggested solution
function plus(x, y) {
  return is_number(x) && is_number(y)
    ? add_ieee_754(x, y)
    : is_string(x) || is_string(y)
    ? concatenate(to_string(x), to_string(y))
    : "error: wrong types";
}

// Question 3
function tetrate(b, n) {
  return n === 1 ? b : power(b, tetrate(b, n - 1));
}

// O(n * ^(n -1)b)

// Question 4
// Part A
0;

// Part B
1;

// Part C
2;

// Part D
2;

// Part E
4;

// Part F
4;

// Part G
8;

// Part H
16;

// Part I
64;

// Part J
256;

// Part I
65536;

// Question 5
// Part A
function make_pairs(xs, ys) {
  return is_null(xs)
    ? null
    : pair(pair(head(xs), head(ys)), make_pairs(tail(xs), tail(ys)));
}

// Suggested solution
function make_pairs(xs, ys) {
  return is_empty_list(xs) || is_empty_list(ys)
    ? null
    : pair(pair(head(xs), head(ys)), make_pairs(tail(xs), tail(ys)));
}

// Theta(n)

// Recursive

// Part B
function zip(f, xs, ys) {
  return is_null(xs)
    ? null
    : pair(f(head(xs), head(ys)), zip(f, tail(xs), tail(ys)));
}

// Question 6
function filter(pred, xs) {
  return accumulate(
    (x, filtered) => (pred(x) ? pair(x, filtered) : filtered),
    null,
    xs
  );
}

// Question 7
// Part A
function make_queen(row, col) {
  return pair(row, col);
}

function row(queen) {
  return head(queen);
}

function column(queen) {
  return tail(queen);
}

// Suggested solution
var make_queen = pair;
var row = head;
var column = tail;

// Part B
function attack_each_other_diagonally(q1, q2) {
  return math_abs(row(q1) - row(q2)) === math_abs(column(q1) - column(q2));
}

// Part C
function attack_any_diagonally(q1, qs) {
  return accumulate(
    (queen, can_attack) =>
      can_attack || attack_each_other_diagonally(q1, queen),
    false,
    qs
  );
}

// Theta(n)

// Part D
function attack_diagonally(qs) {
  const can_attack = map(
    queen => attack_any_diagonally(queen, remove(queen, qs)),
    qs
  );

  return accumulate(
    (can_attack, can_attack_so_far) => can_attack_so_far || can_attack,
    false,
    can_attack
  );
}

// Suggested solution
function attack_diagonally(qs) {
  return is_null(qs)
    ? false
    : attack_any_diagonally(head(qs), tail(qs)) || attack_diagonally(tail(qs));
}

// Theta(n^2)

// Part E
function queens(n) {
  const ordered = enum_list(1, n);
  const perms = permutations(ordered);
  return map(perm => zip(make_queen, ordered, perm), perms);
}

// Theta(nq)

// Part F
function solutions(n) {
  return filter(queen => !attack_diagonally(queen), queens(n));
}
