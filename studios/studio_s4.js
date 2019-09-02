// Question 1
/*
Refer to SCIPjs Ex. 1.2
*/
function pascal(row, column) {
  if (column === 1 || column === row) {
    return 1;
  } else {
    return pascal(row - 1, column - 1) + pascal(row - 1, column);
  }
}

// Question 2
/*
Recursive process due to presence of deferred addition operation

Refer to tree diagram:
https://sicp.comp.nus.edu.sg/chapters/13#p2
as well as
https://sicp.comp.nus.edu.sg/chapters/14#ex_1.14
*/

// Question 3
/*
Function definitions:
function thrice(f) {
    return compose(compose(f, f), f);
}

function repeated(f, n) {
    return n === 0
    ? x => x
    : compose(f, repeated(f, n - 1));
}

Use substitution model- replace f with thrice:
thrice(thrice) -> compose(compose(thrice, thrice), thrice)

((thrice(thrice))(f))(0) will call function f 27 times with input 0

n must be 27 for (repeated(f,n))(0) to return the same value
*/

// Part A
/*
((thrice(thrice))(add1))(6)

33

the add1 function is composed 27 times
argument is 6
6 + 27 = 33
*/

// Part B
/*
((thrice(thrice))(x => x))(compose)

returns the compose function, since x => x returns the input
*/

// Part C
/*
((thrice(thrice))(square))(1)

1 squared 27 times is 1!
*/

// Part D
/*
((thrice(thrice))(square))(2)

2^2^27
*/
