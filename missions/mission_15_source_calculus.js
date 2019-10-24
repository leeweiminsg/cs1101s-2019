// Question 1
function make_step_stream(n) {
  function helper(i) {
    return i > n ? pair(1, () => helper(2)) : pair(i, () => helper(i + 1));
  }

  return helper(1);
}

//Tests
const stream_123 = make_step_stream(3);
eval_stream(stream_123, 10);
const stream_1 = make_step_stream(1);
eval_stream(stream_1, 10);

// Question 2
function make_oscillating_stream(n) {
  function helper(is_increasing, i) {
    if (is_increasing) {
      if (i > n) {
        return pair(n - 1, () => helper(false, n - 2));
      } else {
        return pair(i, () => helper(is_increasing, i + 1));
      }
    } else {
      if (i < 1) {
        return helper(true, i + 2);
      } else {
        return pair(i, () => helper(is_increasing, i - 1));
      }
    }
  }

  function ones_stream() {
    return pair(1, ones_stream);
  }

  if (n === 1) {
    return ones_stream();
  } else {
    return helper(true, 1);
  }
}

// Tests
const osc_stream_123 = make_oscillating_stream(3);
eval_stream(osc_stream_123, 10);
const osc_stream_1 = make_oscillating_stream(1);
eval_stream(osc_stream_1, 10);

// Question 3
function make_flexible_step_stream(lst) {
  function helper(curr) {
    return is_null(curr)
      ? helper(lst)
      : pair(head(curr), () => helper(tail(curr)));
  }

  return helper(lst);
}

function make_flexible_oscillating_stream(lst) {
  let oscillation_unit_lst = append(lst, tail(reverse(tail(lst))));

  return make_flexible_step_stream(oscillation_unit_lst);
}

// Tests
// const flex_357_step_stream = make_flexible_step_stream(list(3,5,7));
// eval_stream(flex_357_step_stream, 10);
// Output should be the same as list(3, 5, 7, 3, 5, 7, 3, 5, 7, 3)

// const flex_1_step_stream = make_flexible_step_stream(list(1));
// eval_stream(flex_1_step_stream, 10);
// Output should be the same as list(1, 1, 1, 1, 1, 1, 1, 1, 1, 1)

// const flex_3579_osc_stream = make_flexible_oscillating_stream(list(3,5,7,9));
// eval_stream(flex_3579_osc_stream, 10);
// Output should be the same as list(3, 5, 7, 9, 7, 5, 3, 5, 7, 9)

// const flex_12_osc_stream = make_flexible_oscillating_stream(list(1,2));
// eval_stream(flex_12_osc_stream, 10);
// Output should be the same as list(1, 2, 1, 2, 1, 2, 1, 2, 1, 2)

// Question 4
// Task 4
function interleave(stream1, stream2) {
  // Your answer here
  function helper(i, curr1, curr2) {
    if (is_null(curr1)) {
      return curr2;
    } else if (is_null(curr2)) {
      return curr1;
    } else {
      if (i % 2 === 1) {
        return pair(head(curr1), () =>
          helper(i + 1, stream_tail(curr1), curr2)
        );
      } else {
        return pair(head(curr2), () =>
          helper(i + 1, curr1, stream_tail(curr2))
        );
      }
    }
  }

  return helper(1, stream1, stream2);
}

// Tests
// stream_constant(k) generates an infinite stream of k
function stream_constant(k) {
  return pair(k, () => stream_constant(k));
}

// add_streams sums up two given infinite stream
function add_streams(s1, s2) {
  return pair(head(s1) + head(s2), () =>
    add_streams(stream_tail(s1), stream_tail(s2))
  );
}

const odd_stream = pair(1, () => add_streams(stream_constant(2), odd_stream));

const even_stream = pair(2, () => add_streams(stream_constant(2), even_stream));

const integers = interleave(odd_stream, even_stream);
eval_stream(integers, 10);
// Output should be the same as list(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

const finite_test = interleave(
  list_to_stream(list("a", "b", "c")),
  stream_constant(1)
);
eval_stream(finite_test, 10);
// Output should be the same as list("a", 1, "b", 1, "c", 1, 1, 1, 1, 1)
