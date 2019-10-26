// Question 1
// 0, 1, 2, 3;
// 0, 1, 2, 3, 4, 5;

// Question 2
function list_to_inf_streamxs(xs) {
  function helper(ys) {
    if (is_null(ys)) {
      return helper(xs);
    } else {
      return pair(head(ys), () => helper(tail(ys)));
    }

    return is_null(xs) ? null : helper(xs);
  }
}

// Question 3
function partial_sum(s) {
  return pair(head(s), () => add_streams(stream_tail(s), partial_sums(s)));
}

// Function works for infinite and finite length streams, but not for empty streams
