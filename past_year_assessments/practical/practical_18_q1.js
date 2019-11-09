// Question 1
// QUESTION 1

// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.

//===============================================================
// These functions are provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===============================================================
// Tests whether arrays A and B are structurally equal.
function equal_array(A, B) {
  if (!is_array(A) || !is_array(B)) {
    return false;
  } else if (array_length(A) !== array_length(B)) {
    return false;
  } else {
    let is_equal = true;
    const len = array_length(A);
    for (let i = 0; is_equal && i < len; i = i + 1) {
      if (is_array(A[i]) || is_array(B[i])) {
        is_equal = equal_array(A[i], B[i]);
      } else {
        is_equal = equal(A[i], B[i]);
      }
    }
    return is_equal;
  }
}
// NOTE: This is NOT the actual assert function used
//       in the actual Practical Assessment.
function assert(test_name, test_func, truth, dependence) {
  const result = test_func();
  const is_equal = is_array(truth)
    ? equal_array(result, truth)
    : equal(result, truth);
  if (is_equal) {
    display(test_name + ": PASSED");
  } else {
    display(test_name + ": FAILED <<<");
  }
}
//===============================================================

//===============================================================
// TASK 1A
//===============================================================
function make_big_int_from_number(num) {
  // WRITE HERE.
  function iter(n, accum) {
    let r = n % 10;
    let q = math_floor(n / 10);

    if (q === 0) {
      return pair(r, accum);
    } else {
      return iter(q, pair(r, accum));
    }
  }

  return reverse(iter(num, null));
}

// TASK 1A TESTS
assert("1A_1", () => make_big_int_from_number(0), list(0), []);
assert("1A_2", () => make_big_int_from_number(5), list(5), []);
assert("1A_3", () => make_big_int_from_number(10), list(0, 1), []);
assert("1A_4", () => make_big_int_from_number(1234), list(4, 3, 2, 1), []);
assert(
  "1A_5",
  () => make_big_int_from_number(9876543210),
  list(0, 1, 2, 3, 4, 5, 6, 7, 8, 9),
  []
);

//===============================================================
// TASK 1B
//===============================================================
function big_int_to_string(bint) {
  // WRITE HERE.
  if (is_null(bint)) {
    return "";
  } else {
    return big_int_to_string(tail(bint)) + stringify(head(bint));
  }
}

// TASK 1B TESTS
assert("1B_1", () => big_int_to_string(list(0)), "0", []);
assert("1B_2", () => big_int_to_string(list(5)), "5", []);
assert("1B_3", () => big_int_to_string(list(0, 1)), "10", []);
assert("1B_4", () => big_int_to_string(list(4, 3, 2, 1)), "1234", []);
assert(
  "1B_5",
  () => big_int_to_string(list(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)),
  "9876543210",
  []
);
assert(
  "1B_6",
  () =>
    big_int_to_string(
      list(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    ),
  "9876543210987654321",
  []
);

//===============================================================
// TASK 1C
//===============================================================
function big_int_add(bintX, bintY) {
  // You may modify the given partial implementation,
  // or remove it and write your own.
  function add(x, y, carry) {
    if (is_null(x) && is_null(y)) {
      return carry === 0 ? null : pair(carry, null);
    } else {
      // WRITE HERE.
      let lsu_x = is_null(x) ? 0 : head(x);
      let lsu_y = is_null(y) ? 0 : head(y);
      let lsu_sum = lsu_x + lsu_y + carry;
      let n = lsu_sum % 10;
      carry = math_floor(lsu_sum / 10);

      return pair(
        n,
        add(is_null(x) ? x : tail(x), is_null(y) ? y : tail(y), carry)
      );
    }
  }

  return add(bintX, bintY, 0);
}

// TASK 1C TESTS
assert("1C_1", () => big_int_add(list(0), list(3, 2, 1)), list(3, 2, 1), [
  "make_big_int_from_number"
]);
assert("1C_2", () => big_int_add(list(5, 6, 7), list(0)), list(5, 6, 7), [
  "make_big_int_from_number"
]);
assert(
  "1C_3",
  () => big_int_add(list(4, 3, 2, 1), list(5, 4, 3, 2)),
  list(9, 7, 5, 3),
  ["make_big_int_from_number"]
);
assert("1C_4", () => big_int_add(list(7, 8, 9), list(5, 6)), list(2, 5, 0, 1), [
  "make_big_int_from_number"
]);
assert("1C_5", () => big_int_add(list(5, 6), list(7, 8, 9)), list(2, 5, 0, 1), [
  "make_big_int_from_number"
]);
assert(
  "1C_6",
  () =>
    big_int_add(
      list(9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9),
      list(5)
    ),
  list(4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  ["make_big_int_from_number"]
);

//===============================================================
// TASK 1D
//===============================================================
function big_int_mult_by_digit(bint, digit) {
  // WRITE HERE.
  if (digit === 0) {
    return list(0);
  } else {
    return big_int_add(bint, big_int_mult_by_digit(bint, digit - 1));
  }
}

// TASK 1D TESTS
assert("1D_1", () => big_int_mult_by_digit(list(0), 5), list(0), [
  "make_big_int_from_number",
  "big_int_add"
]);
assert("1D_2", () => big_int_mult_by_digit(list(7, 4, 3), 0), list(0), [
  "make_big_int_from_number",
  "big_int_add"
]);
assert(
  "1D_3",
  () => big_int_mult_by_digit(list(7, 4, 3), 5),
  list(5, 3, 7, 1),
  ["make_big_int_from_number", "big_int_add"]
);
assert(
  "1D_4",
  () =>
    big_int_mult_by_digit(
      list(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9),
      3
    ),
  list(3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 2),
  ["make_big_int_from_number", "big_int_add"]
);

//===============================================================
// TASK 1E
//===============================================================
function big_int_mult_by_10_pow_n(bint, n) {
  // WRITE HERE.
  return equal(bint, list(0)) || n === 0
    ? bint
    : pair(0, big_int_mult_by_10_pow_n(bint, n - 1));
}

// TASK 1E TESTS
assert("1E_1", () => big_int_mult_by_10_pow_n(list(0), 5), list(0), [
  "make_big_int_from_number",
  "big_int_add",
  "big_int_mult_by_digit"
]);
assert(
  "1E_2",
  () => big_int_mult_by_10_pow_n(list(7, 4, 3), 0),
  list(7, 4, 3),
  ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]
);
assert(
  "1E_3",
  () => big_int_mult_by_10_pow_n(list(7, 4, 3), 3),
  list(0, 0, 0, 7, 4, 3),
  ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]
);
assert(
  "1E_4",
  () => big_int_mult_by_10_pow_n(list(5, 8, 3, 1), 20),
  list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 8, 3, 1),
  ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]
);

//===============================================================
// TASK 1F
//===============================================================
function big_int_mult(bintX, bintY) {
  // WRITE HERE.
  function iter(y, n, accum) {
    if (is_null(y)) {
      return accum;
    } else {
      let d = head(y);
      let mult_d = big_int_mult_by_digit(bintX, d);
      let mult_d_pow = big_int_mult_by_10_pow_n(mult_d, n);
      return iter(tail(y), n + 1, big_int_add(accum, mult_d_pow));
    }
  }

  if (equal(bintX, list(0)) || equal(bintY, list(0))) {
    return list(0);
  } else {
    return iter(bintY, 0, list(0));
  }
}

// TASK 1F TESTS
assert("1F_1", () => big_int_mult(list(0), list(0)), list(0), [
  "make_big_int_from_number",
  "big_int_add",
  "big_int_mult_by_digit",
  "big_int_mult_by_10_pow_n"
]);
assert("1F_2", () => big_int_mult(list(0), list(3, 2, 1)), list(0), [
  "make_big_int_from_number",
  "big_int_add",
  "big_int_mult_by_digit",
  "big_int_mult_by_10_pow_n"
]);
assert("1F_3", () => big_int_mult(list(3, 2, 1), list(0)), list(0), [
  "make_big_int_from_number",
  "big_int_add",
  "big_int_mult_by_digit",
  "big_int_mult_by_10_pow_n"
]);
assert("1F_4", () => big_int_mult(list(3, 2, 1), list(1)), list(3, 2, 1), [
  "make_big_int_from_number",
  "big_int_add",
  "big_int_mult_by_digit",
  "big_int_mult_by_10_pow_n"
]);
assert("1F_5", () => big_int_mult(list(9), list(6)), list(4, 5), [
  "make_big_int_from_number",
  "big_int_add",
  "big_int_mult_by_digit",
  "big_int_mult_by_10_pow_n"
]);
assert(
  "1F_6",
  () => big_int_mult(list(7, 8, 9), list(5, 6)),
  list(5, 5, 1, 4, 6),
  [
    "make_big_int_from_number",
    "big_int_add",
    "big_int_mult_by_digit",
    "big_int_mult_by_10_pow_n"
  ]
);
assert(
  "1F_7",
  () =>
    big_int_mult(
      list(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
      list(7, 8, 9)
    ),
  list(7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9),
  [
    "make_big_int_from_number",
    "big_int_add",
    "big_int_mult_by_digit",
    "big_int_mult_by_10_pow_n"
  ]
);

//===============================================================
