// Question 2
function one(x) {
  return x + 1;
}

function two(x) {
  return x + 2;
}

// Question 2A
function function_to_number(f) {
  return f(0);
}

function number_to_function(n) {
  return x => x + n;
}

// Tests
function_to_number(one); // returns 1
function_to_number(number_to_function(3)); // returns 3

// Question 2B
function plus(f1, f2) {
  return x => f1(f2(x));
}

// Tests
function_to_number(plus(one, two)); // returns 3

// Question C
function times(f1, f2) {
  if (is_zero(f1) || is_zero(f2)) {
    return x => x;
  } else {
    return plus(f2, times(minus_one(f1), f2));
  }
}

// Question 3A
function is_power_of_two(n) {
  if (n === 1) {
    return true;
  } else if (n <= 0 || n % 2 === 1) {
    return false;
  } else {
    return is_power_of_two(n / 2);
  }
}

// Tests
is_power_of_two(15); // returns false
is_power_of_two(16); // returns true

// Question 3B
function number_of_teams_playing(n) {
  function find_next_highest_pow(pow) {
    if (math_pow(2, pow + 1) > n) {
      return pow;
    } else {
      return find_next_highest_pow(pow + 1);
    }
  }

  if (is_power_of_two(n)) {
    return n;
  } else {
    return math_pow(2, find_next_highest_pow(1));
  }
}

// Tests
number_of_teams_playing(15); // returns 8
number_of_teams_playing(16); // returns 16

// Question 3C
Theta(logn);

// Question 5
let xs = pair(1, () => xs);
let ys = pair(2, () => ys);
let zs = pair(3, () => zs);

// Question 5A
function merge(s1, s2) {
  if (is_null(s1)) {
    return s2;
  } else {
    return pair(head(s1), () => merge(s2, stream_tail(s1)));
  }
}

// Question 5B
function merge_streams(xs_lst) {
  if (is_null(xs_lst)) {
    return null;
  } else if (is_null(head(xs_lst))) {
    return merge_streams(tail(xs_lst));
  } else {
    return pair(head(head(xs_lst)), () =>
      merge_streams(append(tail(xs_lst), stream_tail(head(xs_lst))))
    );
  }
}

// Tests
merge_streams(list(xs, ys, zs));
