// Question 1
/* 
a) [1, 2]
b) [1, [3, [5, null]]]
c) [[[3, 2], [1, 0]], null]
d) [0, [1, [2, null]]]
*/

// Question 2
// Part a
list(1, 2, 3);

// Part b
pair(1, pair(2, 3));

// Part c
pair(list(1, 2), list(list(3, 4), list(5, 6)));

// Question 3
// Part a
head(tail(tail(tail(lst))));

// Part b
head(tail(tail(head(tail(lst)))));

// Part c
head(head(tail(head(tail(head(tail(lst)))))));

// Part d
head(head(head(tail(tail(head(head(head(tail(lst)))))))));
