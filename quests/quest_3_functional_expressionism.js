// Question 1
/*
increment_repeater funcntion takes in a repeater function as its sole argument
Eg. const thrice = increment_repeater(twice);
The new function then takes in the function to be repeated
Eg. const warn = thrice(display);
This returns another function which takes in an arbitrary value
Eg. warn("ALERT");

To increment the application of the function f, we input the original result of the function call "repeater(f)(x)" into f
*/
const increment_repeater = repeater => f => x => f(repeater(f)(x)); // complete the function definition

const twice = f => x => f(f(x));
const thrice = increment_repeater(twice);
const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
warn("ALERT"); // should display "ALERT" 3 times
const bigwarn = fourtimes(display);
bigwarn("A L E R T"); // should display "A L E R T" 4 times.
// (the REPL will display a fifth
// "A L E R T" as the value returned
// by bigwarn)

// Question 2
/*
The pair function takes in two arguments (x and y) and returns a function
This function takes in an arbitrary function
and returns the result of the function call which x and y as its arguments

So for the head function, we input a function as an argument to p which takes in x and y and returns the first value x
"(x, y) => x"

For the tail function, we return the second value y instead
"(x, y) => y"
*/
const pair = (x, y) => f => f(x, y);

const head = p => p((x, y) => x); // complete the function definition
const tail = p => p((x, y) => y); // complete the function definition

head(pair(1, 2)) === 1; // should return true
tail(pair(1, 2)) === 2; // should return true

// Question 3
// Use substituter to display the number of steps for each value of n
/*

enter your answer here; no explanation required
The runtime of decrement_repeater(repeater) is Theta(n).
*/

// Question 4
/*
For increment_repeater and add_repeaters, refer to logic for question 1
*/
const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x + 1)(0);

const increment_repeater = repeater => f => x => f(repeater, repeater(f)(x));

const add_repeaters = (repeater1, repeater2) => f => x =>
  repeater2(f)(repeater1(f)(x));

to_int(add_repeaters(two_repeater, three_repeater)); // should return 5

// Question 5
/*
Refer to logic for question 4, but start incrementing from x - 2, this means you'll increment to x - 1
*/
const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, get_x) => get_x() + 1)(0);

const decrement_repeater = repeater => f => x =>
  f(repeater, () => repeater(f)(x - 2));

to_int(decrement_repeater(three_repeater)); // should return 2
