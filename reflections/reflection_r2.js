/*
Recursive function vs recursive/iterative processes: see pg 47 of SCIPjs
*/

/* 
Source style guide: https://sicp.comp.nus.edu.sg/source/source_styleguide.pdf

A programming style is a set of rules for writing code. It helps other programmers understand the code,
reducing the chances of introducing bugs.

This reflection covers section 1.2.1 and 1.2.2 of SCIPjs
*/

// Question 1
/*
Recursive function, due to deferred multiplication operation: n * fact(n - 1).
See substituter in source academy.
*/

// Question 2
/*
Use substitution model and applicative order reduction.
See Fig 1.3 SCIPjs

9 steps
*/
fact(5);
5 * fact(4);
5 * (4 * fact(3));
5 * (4 * (3 * fact(2)));
5 * (4 * (3 * (2 * fact(1))));
5 * (4 * (3 * (2 * 1)));
5 * (4 * (3 * 2));
5 * (4 * 6);
5 * 24;
120;
/*
TODO: Ask what does question mean by steps: substituter steps or substitution model

Substituter shows 30 steps.

Prof Henz: depends on how you count, doesn't matter
*/

// Question 3
/*
4 deferred multiplication operations, so 4 function calls?
*/

/*
TODO: Ask what does question mean by space
*/

// Question 4
/*
process is iterative if recursive call is function's last operation

Prof Henz: To transfrom from recursive to iterative, add a helper function and include state in helper

function fact(n) {
  return helper(n, 1);
}

function helper(n, product) {
  return (n === 0)
    ? product
    : helper(n - 1, product * n);
}
*/

function fact(n) {
  return fact_iter(1, 1, n);
}

function fact_iter(product, counter, max_count) {
  return counter > max_count
    ? product
    : fact_iter(product * counter, counter + 1, max_count);
}

// Question 5
/*
Again use substitution model
See Fig 1.4 SCIPjs

7 steps
*/

fact(5);
fact_iter(1, 1, 5);
fact_iter(1, 2, 5);
fact_iter(2, 3, 5);
fact_iter(6, 4, 5);
fact_iter(24, 5, 5);
fact_iter(120, 5, 5);
120;

// Question 6
/*
No deferred operations
Constant space
*/

// Question 7
/*
Recursive function, due to deferred addition operation: fib(n - 1) + fib(n - 2)
See substituter
*/

// Question 8
/*
Again, use substitution model
6 steps
*/
fib(5);
f(5, 2, 0, 1);
f(5, 3, 1, 1);
f(5, 4, 1, 2);
f(5, 5, 2, 3);
f(5, 6, 3, 5);
5;

// Question 9
/*
No deferred operations
Constant space
*/
