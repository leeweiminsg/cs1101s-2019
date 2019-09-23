// Question 2

// Part A
// 64

// Question 3
/* From pdf: (Background: This question assumes the use of the 2017 version of the Source language.
In that language, an empty list is represented as a [], and each evaluation of [] creates a
value with an unique identity, i.e. [] === [] evaluates to false. The pre-declared function
is_empty_list(xs) returns true if and only if xs is a [].) */

// Part A
// filter(is_even , []) === filter(is_even , []);

//false

/* const my_even_list = pair(2, []);
filter(is_even , my_even_list ) === filter(is_even , my_even_list ); */

//false

/* const my_odd_list = pair(3, []);
filter(is_even , my_odd_list) === filter(is_even , my_odd_list ); */

//true

/* filter(is_even , pair(3, [])) === filter(is_even , pair(3, [])); */

//false

// Part B
// filter_2(is_even , []) === filter_2(is_even , []);

//false

/* const my_even_list = pair(2, []);
filter_2(is_even , my_even_list ) ===
filter_2(is_even , my_even_list ); */

//false

/* const my_odd_list = pair(3, []);
filter_2(is_even , my_odd_list) ===
filter_2(is_even , my_odd_list ); */

//false

/* filter_2(is_even , pair(3, [])) ===
filter_2(is_even , pair(3, []));
8 */

//false

// Part C
/* filter_2(is_even , pair(3, [])) ===
filter_2(is_even , pair(3, []));
8 */

//true

/* const my_even_list = pair(2, []);
filter_3(is_even , my_even_list ) ===
filter_3(is_even , my_even_list ); */

//false

/* const my_odd_list = pair(3, []);
filter_3(is_even , my_odd_list) ===
filter_3(is_even , my_odd_list ); */

//true

/* filter_3(is_even , pair(3, [])) ===
filter_3(is_even , pair(3, [])); */

//true

// Question 4
function find_min(xs) {
  function find_min_helper(xs, removed, min) {
    return is_null(xs)
      ? pair(min, removed)
      : head(xs) < min
      ? find_min_helper(tail(xs), pair(min, removed), head(xs))
      : find_min_helper(tail(xs), pair(head(xs), removed), min);
  }

  return find_min_helper(tail(xs), null, head(xs));
}

// Question 5
function take_drop(xs, k) {
  function take_drop_helper(remaining, first_k, k) {
    return k === 0
      ? pair(first_k, remaining)
      : take_drop_helper(
          tail(remaining),
          pair(head(remaining), first_k),
          k - 1
        );
  }

  return take_drop_helper(xs, null, k);
}

// Question 6
function solvable(xs, n) {
  function solvable_helper(n, i) {
    if (n === 0 || i < 0 || i > length(xs) - 1) {
      return false;
    } else if (i === length(xs) - 1) {
      return true;
    } else {
      const focus = list_ref(xs, i);
      const move_left_solvable = solvable_helper(n - 1, i - focus);
      const move_right_solvable = solvable_helper(n - 1, i + focus);

      return move_left_solvable || move_right_solvable;
    }
  }

  return solvable_helper(n, 0);
}

// Question 7
(f => f(f))(
  // the essence of recursion
  make_factorial => n =>
    n === 0 ? 1 : n * make_factorial(make_factorial)(n - 1)
)(5);
