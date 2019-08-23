// Question 1
/*
Notice that each column has a width half of its left neighbour, and twice the number of stacked symbols

I defined a helper function with a counter
*/
function fractal(pic, n) {
  // your answer here
  return fractal_helper(pic, n, 1);
}

function fractal_helper(pic, n, counter) {
  return counter === n
    ? pic
    : beside(pic, fractal_helper(stack(pic, pic), n, counter + 1));
}

// Test
show(fractal(make_cross(rcross), 5));

// Question 2
function hook(frac) {
  // your answer here
  return stack(square, beside_frac(1 - frac, blank, square));
}

// Test
show(hook(1 / 5));

// Question 3
/*
First, refer to the case where depth is 1. The "hook" in this case is hook(thickness / 2). The thickness = hook's width / blank square width.
For each recursive call, we turn the rune to one quarter to the right before stacking a hook on top.
*/
function spiral(thickness, depth) {
  // your answer here
  return depth === 0
    ? blank
    : stack_frac(
        thickness,
        hook(thickness / 2),
        quarter_turn_right(spiral(thickness, depth - 1))
      );
}

// copy your hook function from Question 2 here if required
function hook(frac) {
  // your answer here
  return stack(square, beside_frac(1 - frac, blank, square));
}

// Test
show(spiral(1 / 5, 0));
