// Question 1
const alternating_ones = pair(1, () => pair(-1, () => alternating_ones));

// Question 2
function make_alternating_stream(stream) {
  return is_null(stream)
    ? null
    : is_null(stream_tail(stream))
    ? stream
    : pair(head(stream), () =>
        pair(-1 * head(stream_tail(stream)), () =>
          make_alternating_stream(stream_tail(stream_tail(stream)))
        )
      );
}

function ones_stream() {
  return pair(1, ones_stream);
}

const ones = ones_stream();

// Question 3
function sum_stream(stream) {
  function helper(stream, sum) {
    return is_null(stream)
      ? null
      : pair(sum + head(stream), () =>
          helper(stream_tail(stream), sum + head(stream))
        );
  }
  return helper(stream, 0);
}

// Question 4
function append_streams(s1, s2) {
  if (is_null(s1)) {
    return s2;
  } else {
    return pair(head(s1), () => append_streams(stream_tail(s1), s2));
  }
}

// DO NOT EDIT
const ones = pair(1, () => ones);

// Question 5
function odd_stream(stream) {
  return stream_filter(x => x % 2 === 1, stream);
}

// DO NOT EDIT
const integers = integers_from(1);

// Question 6
function every_k_stream(stream, k) {
  function helper(stream, n) {
    if (n === k) {
      return pair(head(stream), () => helper(stream_tail(stream), 1));
    } else {
      return helper(stream_tail(stream), n + 1);
    }
  }
  return helper(stream, k);
}

// DO NOT EDIT
const integers = integers_from(1);
