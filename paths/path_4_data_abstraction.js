// Question 1
/*
Refer to Lecture L4 slide 17 (equality of rationals)

Piazza: 
The make_rat here uses the gcd as mentioned in the lecture.
When dealing with an abstraction, there are things you need to not care about. Don't expect that every implementation does what you think it does.
In this case, - 1/3 === 1/-3. Both are valid representations. Your solution should not assume which form it is in.
*/

/* You must use only the supplied functions
- `make_rat`
- `numer`
- `denom`
- `add_rat`
- `sub_rat`
- `mul_rat`
- `div_rat`
- `equal_rat`
- `gcd` */

// Given two rationals rat1, rat2
// Returns true if rat1 <= rat2
function lte(rat1, rat2) {
  // YOUR SOLUTION HERE
  return numer(rat1) / denom(rat1) <= numer(rat2) / denom(rat2);
}

lte(make_rat(-1, 1), make_rat(-1, 2));

// Question 2
// The function lte has been predefined for you.
function gte(x, y) {
  // YOUR SOLUTION HERE
  return !lte(x, y - 1);
}

function eq(x, y) {
  // YOUR SOLUTION HERE
  return !lte(x, y - 1) && lte(x, y);
}

function lt(x, y) {
  // YOUR SOLUTION HERE
  return lte(x, y - 1);
}

function gt(x, y) {
  // YOUR SOLUTION HERE
  return !lte(x, y);
}

// Question 3
/*
Use the data visualizer!
*/
// For each of the following, write expressions which extract the value of x
// For example, suppose const s0 = pair(1, x);
// Then e0 = tail(s0);

// a) `const s1 = pair(0, pair(x, 1));`
const e1 = head(tail(s1)); // EDIT THIS

// b) `const s2 = pair(0, list(x));`
const e2 = head(tail(s2)); // EDIT THIS

// c) `const s3 = list(0, list(1, x)));`
const e3 = head(tail(head(tail(s3)))); // EDIT THIS

// d) `const s4 = pair(list(1, 2), pair(3, x));`
const e4 = tail(tail(s4)); // EDIT THIS

// e) `const s5 = pair(0, pair( pair(1, pair(x, null)), null));`
const e5 = head(tail(head(tail(s5)))); // EDIT THIS

// The expressions s1, ... s5 have been defined for you.
// You cannot define them, for they contain... a secret ;)

// Question 4
/*
Another case of recursion!
*/
/* For reference:
function length(xs) {
  return is_null(xs) ? 0 : 1 + length(tail(xs));
}
*/

// Given a list of numbers xs, returns the sum of all numbers in xs.
function sum(xs) {
  // YOUR SOLUTION HERE
  return is_null(xs) ? 0 : head(xs) + sum(tail(xs));
}
