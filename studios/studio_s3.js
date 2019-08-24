// Question 1
/*
k1 = 3
k2 = 5
n0 = 10
*/

// Question 2
/*
Big-O notation: f(n) has an order of growth of O(g(n)) if there exist k, n0 s.t.: f(n) <= k g(n); for n > n0
10n log n <= 2n^2 for n > 5

Claim is true
*/

// Question 3
/*
r3(n) = n^3
n^3 <= 5 * 2^n for n > 0

Claim is true
*/

// Question 4
/*
a) n^2
b) n
c) 3^n
*/

// Question 5
/*
Input different values of n and measure time required for function to return value

g1 = n

Count number of function calls using the substitution model

g2 = n
*/

// Question 6
/*
function factorial(n) {
    return fact_iter(1, 1, n);
}
function fact_iter(product, counter, max_count) {
    return counter > max_count
           ? product
           : fact_iter(counter * product, 
                       counter + 1, 
                       max_count);
}

Time consumption: Theta(n)
Space consumption: Theta(1)
*/

// Question 7
/*
Calculates b to the power of e

Recursive process - due to deferred multiplication operation

Running time: Theta(n)
Space consumption: Theta(n)
*/

// Question 8
/*
Calculates b to the power of e - a more optimised version of the power function
If e is even, multiples b by itself

Iterative if argument of e is even, else it is recursive (note first deferred operation
before e becomes even in the next recursive call)

Runtime: Theta(log2 e)
*/
