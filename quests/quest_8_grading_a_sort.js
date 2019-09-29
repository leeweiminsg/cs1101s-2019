// Question 1
/* Describe your solution here, including
its order of growth.

You will get full marks marks only for
a solution that has an order of growth
O(n²) and that does not have an order
of growth Θ(n²). */

/*
Describe your solution here, including
its order of growth.

You will get full marks marks only for
a solution that has an order of growth
O(n²) and that does not have an order
of growth Θ(n²).

I will sort the list using merge sort.
During the merging of the two sorted "sub-lists",
compare the head of each "sub-list".
If the elements are out of order
(the head of the second "sub-list" is less than that of the first),
add the length of the remainder of the first "sub-list" to the
current number of out of order pairs. 
Else, continue with the merging.

Return the merged "sub-lists" and their total number of out of order pairs
as a pair for further processing.

Since each comparison and increment of the number of out
of order pairs runs in constant time,
and merge sort has an order of growth of O(n²) and Θ(nlog(n)),
the order of growth of my solution is also O(n²) and Θ(nlog(n)).
*/

// Question 2
function graderVer1(arr) {
  // your solution here
  function middle(n) {
    return math_floor(n / 2);
  }

  function take(xs, n) {
    if (n === 0) {
      return null;
    } else {
      return pair(head(xs), take(tail(xs), n - 1));
    }
  }

  function drop(xs, n) {
    if (n === 0) {
      return xs;
    } else {
      return drop(tail(xs), n - 1);
    }
  }

  function merge(xs_and_count, ys_and_count) {
    const xs = head(xs_and_count);
    const ys = head(ys_and_count);
    const xs_inversions = tail(xs_and_count);
    const ys_inversions = tail(ys_and_count);

    const inversions = tail(xs_and_count) + tail(ys_and_count);

    function merge_helper(
      xs,
      ys,
      merged_list,
      xs_remaining,
      ys_remaining,
      total_inversions
    ) {
      if (is_null(xs)) {
        const merged = append(merged_list, ys);
        return pair(merged, total_inversions);
      } else if (is_null(ys)) {
        const merged = append(merged_list, xs);
        return pair(merged, total_inversions);
      } else {
        const x = head(xs);
        const y = head(ys);

        if (x < y) {
          return merge_helper(
            tail(xs),
            ys,
            append(merged_list, list(x)),
            xs_remaining - 1,
            ys_remaining,
            total_inversions
          );
        } else {
          return merge_helper(
            xs,
            tail(ys),
            append(merged_list, list(y)),
            xs_remaining,
            ys_remaining - 1,
            total_inversions + xs_remaining
          );
        }
      }
    }

    if (is_null(xs)) {
      return ys_and_count;
    } else if (is_null(ys)) {
      return xs_and_count;
    } else {
      const sorted_list_and_count = merge_helper(
        xs,
        ys,
        null,
        length(xs),
        length(ys),
        inversions
      );
      const sorted_list = head(sorted_list_and_count);
      const total_inversions = tail(sorted_list_and_count);

      return pair(sorted_list, total_inversions);
    }
  }

  function merge_sort_count(xs_and_count) {
    const xs = head(xs_and_count);
    const inversions = tail(xs_and_count);
    if (is_null(xs) || is_null(tail(xs))) {
      return pair(xs, 0);
    } else {
      const mid = middle(length(xs));
      const list_and_count = merge(
        merge_sort_count(pair(take(xs, mid), 0)),
        merge_sort_count(pair(drop(xs, mid), 0))
      );
      return list_and_count;
    }
  }

  return tail(merge_sort_count(pair(arr, 0)));
}

// Question 3
/* 
Brute force solution

For the first number in the triple, loop through each element in the list.
For the second number, loop through each number which is to the right
of the first number in the original list.
For the third number, loop through each number which is to the right
of the second number in the original list.

Increment the number of out of order triples by 1 when the numbers are
strictly decreasing (from the first to the third number in the triple).
Else, return 0.

*/

// Question 4
function graderVer2(arr) {
  // your solution here
  function first_num(arr) {
    return is_null(arr)
      ? 0
      : second_num(head(arr), tail(arr)) + first_num(tail(arr));
  }

  function second_num(x, arr) {
    return is_null(arr)
      ? 0
      : head(arr) < x
      ? third_num(x, head(arr), tail(arr)) + second_num(x, tail(arr))
      : second_num(x, tail(arr));
  }

  function third_num(x, y, arr) {
    return is_null(arr)
      ? 0
      : head(arr) < y
      ? 1 + third_num(x, y, tail(arr))
      : third_num(x, y, tail(arr));
  }

  return first_num(arr);
}

// test your program!
graderVer2(list(5, 2, 3, 1, 4)); // should return 2
