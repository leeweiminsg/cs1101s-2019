// Question 1
function stream_starts_with(stream_1, stream_2) {
  if (is_null(stream_1) || is_null(stream_2)) {
    return is_null(stream_1) && is_null(stream_2) ? true : is_null(stream_2);
  } else {
    return head(stream_1) === head(stream_2)
      ? stream_starts_with(stream_tail(stream_1), stream_tail(stream_2))
      : false;
  }
}

// Tests
let stream_1 = list_to_stream(list(1, 2, 3, 4, 5));
let stream_2 = list_to_stream(list(1, 2, 3));

stream_starts_with(stream_1, stream_2);

// Question 2
function stream_starts_with(stream_1, stream_2) {
  // Your answer from previous task
  if (is_null(stream_1) || is_null(stream_2)) {
    return is_null(stream_1) && is_null(stream_2) ? true : is_null(stream_2);
  } else {
    return head(stream_1) === head(stream_2)
      ? stream_starts_with(stream_tail(stream_1), stream_tail(stream_2))
      : false;
  }
}

function stream_contains(stream, sub_stream) {
  if (is_null(stream)) {
    return false;
  } else if (stream_starts_with(stream, sub_stream)) {
    return true;
  } else {
    return stream_contains(stream_tail(stream), sub_stream);
  }
}

// Tests
let stream_1 = list_to_stream(list(1, 2, 3, 4, 5));
let stream_2 = list_to_stream(list(2, 3, 4));

stream_contains(stream_1, stream_2);

// Question 3
function make_park_miller(n) {
  function helper(i, prev) {
    if (i === 0) {
      return pair(10, () => helper(i + 1, 10));
    } else {
      let curr = (10 * prev) % 17;

      return pair(curr, i === n - 1 ? null : () => helper(i + 1, curr));
    }
  }

  return helper(0, null);
}

function stream_starts_with(stream_1, stream_2) {
  // Your answer from previous task
  if (is_null(stream_1) || is_null(stream_2)) {
    return is_null(stream_1) && is_null(stream_2) ? true : is_null(stream_2);
  } else {
    return head(stream_1) === head(stream_2)
      ? stream_starts_with(stream_tail(stream_1), stream_tail(stream_2))
      : false;
  }
}

function stream_contains(stream, sub_stream) {
  if (is_null(stream)) {
    return false;
  } else if (stream_starts_with(stream, sub_stream)) {
    return true;
  } else {
    return stream_contains(stream_tail(stream), sub_stream);
  }
}

// Tests
stream_contains(make_park_miller(50), list_to_stream(list(4, 6, 9, 5)));
