// NOTE: Do not have to check arguments, assume inputs are correct

// Question 1
/*
4 options: 1, 2, 3, 4
each option can be "biggie-sized": 1 -> 5, 2 -> 6, 3 -> 7, 4 -> 8

for more experienced programmers: dictionary mapping has not been covered
use primitive operators since there is a mapping between regular and biggie-sized combo (biggie = regular + 4)
*/
function biggie_size(regular_combo) {
  return regular_combo + 4;
}

// Question 2
// do the reverse of biggie_size (regular = biggie - 4)
function unbiggie_size(biggie_combo) {
  return biggie_combo - 4;
}

// Question 3
/*
regular combo: 1 to 4 inclusive
biggie-sized combo: 5 to 8 inclusive

use conditional expression
*/
function is_biggie_size(combo) {
  return combo >= 5;
}

/* previous submission

combo <= 8 is redundant: see note at the top
? true : false is redundant as well: && returns a boolean

function is_biggie_size(combo) {
  return combo >= 5 && combo <= 8 ? true : false;
}
*/

// Question 4
/*
number of patties is equal to option number for regular combos

check whether combo is biggie-sized, and calculate accordingly
use conditionals
*/
function combo_price(combo) {
  const patty_price = 1.17;
  const biggie_size_charge = 0.5;
  return is_biggie_size(combo)
    ? patty_price * unbiggie_size(combo) + biggie_size_charge
    : patty_price * combo;
}

// Question 5
function empty_order() {
  return 0;
}

// Question 6
function add_to_order(order, combo) {
  return order * 10 + combo;
}

/* previous submission

convert digits to strings, concat and convert back

function add_to_order(order, combo) {
  return parse_int(stringify(order) + stringify(combo), 10);
}
*/

// Question 7
function last_combo(order) {
  return order % 10;
}

// Question 8
function other_combos(order) {
  return math_trunc(order / 10);
}
