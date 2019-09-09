// Question 1
/*
Use Source Academy
*/
// Part 1
[[1, [2, [[3, null], null]]], [[4, [5, null]], [[6, 7], null]]]

2019-09-07-14-08-09.png

// Part 2
[1, [2, [3, [[4, null], null]]]]

2019-09-07-15-08-16.png

// Part 3
[1, [2, [3, [[4, [5, null]], null]]]]

2019-09-07-15-14-29.png

// Question 2
/*
Reverse function definition

function reverse(lst) {
    return is_null(lst)
    ? null
    : pair(reverse(tail(lst)), head(lst));
}
*/

[[[[null, 4], 3], 2], 1]

2019-09-07-15-19-13.png

// Question 3
// Part A
const lst = list(7, list(6, 5, 4), 3, list(2, 1));

head(tail(head(tail(tail(tail(lst))))));

// Part B
const lst = list(list(7), list(6, 5, 4), list(3, 2), 1);

head(tail(tail(tail(lst))));

// Part C
const lst = list(7, list(6), list(5, list(4)), list(3, list(2, list(1))));

head(head(tail(head(tail(head(tail(tail(tail(lst)))))))));

// Part D
const lst = list(7, list(list(6, 5), list(4), 3, 2), list(list(1)));

head(head(head(tail(tail(lst)))));

// Question 4
/*
List is 0-indexed, also called rank in the question 
*/
function every_second(items) {
    function every_second_helper(items, n) {
        if (n >= length(items)) {
            return null;
        } else {
            return pair(list_ref(items, n), every_second_helper(items, n + 2));
        }
    }
    
    return every_second_helper(items, 1);
}

// Test
every_second(list("a", "x", "b", "y", "c", "z", "d"));
// Value: ["x", ["y", ["z", null]]]

// Question 5
function sums(nums) {
  function every_second_helper(items, n) {
        if (n >= length(items)) {
            return 0;
        } else {
            return list_ref(items, n) + every_second_helper(items, n + 2);
        }
    }
    
    return list(every_second_helper(nums, 0), every_second_helper(nums, 1));
}

sums(list(1, 2, 3, 4, 5));