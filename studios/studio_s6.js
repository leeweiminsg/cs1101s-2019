// Question 1
function map_(f, xs) {
  return accumulate((x, ys) => pair(f(x), ys), null, xs);
}

// Question 2
// Defined recursively for elements
function remove_duplicates(xs) {
  return is_null(xs)
    ? null
    : pair(
        head(xs),
        remove_duplicates(filter(x => !equal(x, head(xs)), tail(xs)))
      );
}

// Question 3
// Implement remove_duplicates using accumulate
function remove_duplicates(xs) {
  return accumulate(
    (x, y) => pair(x, filter(item => !equal(item, x), y)),
    null,
    xs
  );
}

// Question 4
function makeup_amount(x, coins) {
  if (x === 0) {
    return list(null);
  } else if (x < 0 || is_null(coins)) {
    return null;
  } else {
    // Combinations that do not use the head coin.
    const combi_A = makeup_amount(x, tail(coins));
    // Combinations that do not use the head coin
    // for the remaining amount.
    const combi_B = makeup_amount(x - head(coins), tail(coins));
    // Combinations that use the head coin.
    const combi_C = map(m => pair(head(coins), m), combi_B);

    return append(combi_A, combi_C);
  }
}

makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50));

// Question 5
function accumulate_n(op, init, seqs) {
  return is_null(head(seqs))
    ? null
    : pair(
        accumulate(op, init, map(head, seqs)),
        accumulate_n(op, init, map(tail, seqs))
      );
}

const seqs = list(
  list(1, 2, 3),
  list(4, 5, 6),
  list(7, 8, 9),
  list(10, 11, 12)
);

accumulate_n((x, y) => x + y, 0, seqs);

// Question 6
// Implement accumulate for tree
function accumulate_tree(op, init, seq) {
  return accumulate(
    (x, y) => (is_list(x) ? op(accumulate_tree(op, init, x), y) : op(x, y)),
    init,
    seq
  );
}
