// Question 1
// Each number in stream A is 2^(its index)

// Each number in stream B is multiplied by (its index + 1)

// Question 2
/* function stream_pairs(s) {
  return is_null(s)
    ? null
    : stream_append(
        stream_map(sn => pair(head(s), sn), stream_tail(s)),
        stream_pairs(stream_tail(s))
      );
} */

// Part A
/* Test

let ints = list_to_stream(list(1, 2, 3, 4, 5));

function stream_pairs(s) {
  return is_null(s)
    ? null
    : stream_append(
        stream_map(sn => pair(head(s), sn), stream_tail(s)),
        stream_pairs(stream_tail(s))
      );
}

stream_pairs(ints);
 */
// Pairs:
[
  [1, 2],
  [
    [1, 3],
    [
      [1, 4],
      [[1, 5], [[2, 3], [[2, 4], [[2, 5], [[3, 4], [[3, 5], [[4, 5], null]]]]]]]
    ]
  ]
];

// Part B
// Creates a stream of pairs of elements of stream s where the element at the head of the pair has a lower index in s
// than the element at its tail.

// Part C
/* function stream_append(xs, ys) {
  return is_null(xs)
    ? ys
    : pair(head(xs), () => stream_append(stream_tail(xs), ys));
} 

const s2 = stream_pairs(integers);
*/
// maximum call stack exceeded

// Part D
/* function stream_append_pickle(xs, ys) {
  return is_null(xs)
    ? ys()
    : pair(head(xs), () => stream_append_pickle(stream_tail(xs), ys));
}

function stream_pairs2(s) {
  return is_null(s)
    ? null
    : stream_append_pickle(
        stream_map(sn => pair(head(s), sn), stream_tail(s)),
        () => stream_pairs2(stream_tail(s))
      );
}
const s2 = stream_pairs2(integers); */

// Arguments of a function will be evaluated first, so having an anonymous function declaration delays the evaluation
// until all elements of s have been processed

// Part E
// pair(1, 2), pair(1, 3), pair(1, 4) ......

function stream_append(xs, ys) {
  return is_null(xs())
    ? ys
    : pair(head(xs()), stream_append(ys, stream_tail(xs())));
}

// Question 2
const alt_ones = pair(1, () => pair(-1, () => alt_ones));

const zeros = pair(0, () => zeros);

function fun_to_series(fun) {
  return stream_map(fun, non_neg_integers);
}

// Question 3
return fun_to_series(x => 1);

return fun_to_series(x => x + 1);

// Question 4
function mul_series(s1, s2) {
  return pair(head(s1) * head(s2), () =>
    add_series(scale_stream(head(s2), stream_tail(s1)), mul_series(s1, stream_tail(s2))));
}
