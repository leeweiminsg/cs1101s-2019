// Question 2
function my_sum(n) {
  return n === 0 ? 0 : my_sum(n - 1) + n * (n + 1);
}

// Question 3
/*
recursive process

O(n) for both
*/

// Question 4
// Refer to SCIPjs
/*
(x, y) => x + y
1
x => x + 1
n
*/

// Question 5
// Refer to SCIPjs
function sum(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), result + term(a));
  }
  return iter(a, 0);
}

// Question 6
/*
a) x, f, g, y, h
b) x: constant declaration, f, h: function declaration, g, y: paramter declaration
c) 12
d) x + 2
*/
