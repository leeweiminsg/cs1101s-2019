// Question 1
/*
flip_vert flips the picture about its vertical axis,
before turning it upside down (rotating clockwise by 180 degrees)
*/
function flip_vert(picture) {
  return turn_upside_down(flip_horiz(picture));
}
// example usage
show(flip_vert(sail));

// Question 2
function mosaic(r1, r2, r3, r4) {
  // your answer here
  return stack(beside(r4, r1), beside(r3, r2));
}

// Test
show(mosaic(rcross, sail, corner, nova));

// Question 3
function mosaic(r1, r2, r3, r4) {
  // your answer from the previous question here
  return stack(beside(r4, r1), beside(r3, r2));
}

function upside_down_mosaic(r1, r2, r3, r4) {
  // your answer here
  return turn_upside_down(mosaic(r1, r2, r3, r4));
}

// Test
show(upside_down_mosaic(rcross, sail, corner, nova));

//Question 4
function mosaic(r1, r2, r3, r4) {
  // your answer from the previous question here
  return stack(beside(r4, r1), beside(r3, r2));
}

function transform_mosaic(r1, r2, r3, r4, transform) {
  // your answer here
  return transform(mosaic(r1, r2, r3, r4));
}

// Test
show(transform_mosaic(rcross, sail, corner, nova, make_cross));
