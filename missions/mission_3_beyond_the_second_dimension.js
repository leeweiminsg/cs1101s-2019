// Question 1
/*
Reuse the mosaic function, using blanks to create each layer
Recursively overlay each layer
*/
function steps(r1, r2, r3, r4) {
  // your answer here
  return overlay(
    overlay(
      mosaic(blank, blank, blank, nova),
      mosaic(blank, blank, corner, blank)
    ),
    overlay(
      mosaic(blank, sail, blank, blank),
      mosaic(rcross, blank, blank, blank)
    )
  );
}

function mosaic(r1, r2, r3, r4) {
  return stack(beside(r4, r1), beside(r3, r2));
}

// Test
show(steps(rcross, sail, corner, nova));

// Question 2
/*
Refer to Source documentation
*/

// steps(r1, r2, r3, r4) -> {Rune}
/*
Makes a 3D-Rune from four given runes (r1, r2, r3, r4),
where each rune is evenly spaced out vertically,
and arranged in a 2 x 2 square starting from the top right corner.
From rune r1 to rune r4, each rune is stacked on top of the next,
with rune r1 at the topmost layer.
*/
/*
Name	Type	Description
r1	    Rune	given Rune
r2	    Rune	given Rune
r3	    Rune	given Rune
r4	    Rune	given Rune
*/
/*
Returns:
resulting Rune

Type:
Rune
*/

// Question 3
/*
Use recursion
Refer to stackn function definition in lecture L2
*/
function cone(n, rune) {
  // your answer here
  return n === 1
    ? rune
    : overlay_frac(1 - 1 / n, cone(n - 1, scale(1 - 1 / n, rune)), rune);
}

// Test
show(cone(4, circle));
