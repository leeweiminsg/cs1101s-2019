// Question 1
/*
Refer to stackn function definition in lecture L2
*/
function besiden(n, rune) {
  // your solution goes here
  return n === 1 ? rune : beside_frac(1 / n, rune, besiden(n - 1, rune));
}

// Test
show(besiden(7, heart));

// Question 2
/*
Refer to quilt function definition in brief B1
*/
// paste your besiden function from the
// previous question here

function carpet(n, m, rune) {
  // your solution goes here
  return stackn(n, besiden(m, rune));
}

function besiden(n, rune) {
  return n === 1 ? rune : beside_frac(1 / n, rune, besiden(n - 1, rune));
}

// test case:
show(carpet(7, 5, heart));

// Question 3
// insert your carpet function from
// from the previous question here
function carpet(n, m, rune) {
  return stackn(n, besiden(m, rune));
}

function besiden(n, rune) {
  return n === 1 ? rune : beside_frac(1 / n, rune, besiden(n - 1, rune));
}

show(carpet(10, 10, random_color(heart)));

/*

enter your answers here
(answer each question in one or two complete sentences)

1) Each evaluation returns a rune (a 10x10 patchwork carpet)
where all rune symbols are of the same randomly generated colour.

2) No, the evaluation does not assign a random color for each heart symbol.

3) Yes.

4) The evaluation of the carpet function argument "random_color(heart)" would
be delayed until it is required by a primitive operation. The random_color
function would be called for each heart in the carpet, so each heart would
be assigned a random color.
*/

// Question 4
/*
Use recursion to build each row, then recurse again to build the carpet
*/
// you may need helper functions

function randomly_colored_carpet(n, m, rune) {
  // your solution goes here
  return n === 0
    ? rune
    : stack_frac(
        1 / n,
        randomly_colored_row(m, rune),
        randomly_colored_carpet(n - 1, m, rune)
      );
}

function randomly_colored_row(m, rune) {
  return m === 1
    ? random_color(rune)
    : beside_frac(1 / m, random_color(rune), randomly_colored_row(m - 1, rune));
}

// test case
show(randomly_colored_carpet(10, 10, heart));
// should produce a carpet as shown in the title picture of this quest.
