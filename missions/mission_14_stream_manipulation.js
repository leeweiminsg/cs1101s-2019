// Question 1
function is_even(n) {
  return n % 2 === 0;
}

function stream_take(xs, n) {
  return build_stream(n, i => stream_ref(xs, i));
}

function stream_drop(xs, n) {
  return n === 0 ? xs : stream_drop(stream_tail(xs), n - 1);
}

const bounded_input = enum_stream(0, 10000);
const even_results = stream_filter(is_even, bounded_input);
const first_ten = stream_take(even_results, 10);
const next_ten = stream_take(stream_drop(even_results, 10), 10);

// For testing
display(eval_stream(first_ten, 10));
display(eval_stream(next_ten, 10));

// Question 2
function add(a, b) {
  return a + b;
}

function stream_sequence(op, initial, xs) {
  function helper(accum, curr) {
    return is_null(curr)
      ? null
      : pair(op(accum, head(curr)), () =>
          helper(op(accum, head(curr)), stream_tail(curr))
        );
  }

  return helper(initial, xs);
}

const integers = integers_from(1);
const even_integers = stream_map(n => n * 2, integers);
const squared_even_integers = stream_map(n => math_pow(n, 2), even_integers);
const sum_square = stream_sequence(add, 0, squared_even_integers);

// For testing
display(eval_stream(integers, 10));
display(eval_stream(even_integers, 10));
display(eval_stream(squared_even_integers, 10));
display(eval_stream(sum_square, 10));

// Question 3
let step_duration_stream = pair(1, () =>
  pair(2, () => pair(3, () => step_duration_stream))
);

const oscillating_cookie_stream = pair("Hbebuerq", () =>
  pair("Kgasnsa", () => oscillating_cookie_stream)
);

function stream_zip(xs, ys) {
  return pair(pair(head(xs), head(ys)), () =>
    stream_zip(stream_tail(xs), stream_tail(ys))
  );
}

// START OF BLOCK
// DO NOT EDIT THIS BLOCK
// [1, "Hbebuerq"], [2, "Kgasnsa"], [3, "Hbebuerq"], [1, "Kgasnsa"], ...
let simple_cookie_stream = stream_zip(
  step_duration_stream,
  oscillating_cookie_stream
);
let handle = null;

function update_cookie_stream() {
  const current_pair = head(simple_cookie_stream);
  const current_duration = head(current_pair);
  const current_cookie = tail(current_pair);
  display("Have a " + current_cookie + " cookie!");
  handle = set_timeout(() => {
    simple_cookie_stream = stream_tail(simple_cookie_stream);
    update_cookie_stream();
  }, current_duration * 1000);
}

function endScottieBot() {
  clear_all_timeout(handle);
}
// END OF BLOCK

// For testing
update_cookie_stream();

// End bot
endScottieBot();