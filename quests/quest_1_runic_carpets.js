// Question 1
/*
Centre pattern always has four runes
Each rune is rotated one-quarter to the right, starting from the bottom left corner

After creating the centre pattern using persian_centre(), we append the top and bottom edges before the left and right edges
The left and right edges contain {count} runes,
while the top and bottom ones contain {count - 2} runes (we exclude both corners of each edge)

Each edge occupies 1 / count of length / width of the rune, while the centre pattern occupies the rest

Refer to stackn function definition on lecture L2
*/
function persian(rune, count) {
  // your answer here
  return beside_frac(
    1 / count,
    persian_left_right(rune, count),
    beside_frac(
      1 - 1 / (count - 1),
      stack_frac(
        1 / count,
        persian_top_bottom(rune, count - 2),
        stack_frac(
          1 - 1 / (count - 1),
          persian_centre(rune),
          persian_top_bottom(rune, count - 2)
        )
      ),
      persian_left_right(rune, count)
    )
  );
}

// Form centre pattern
function persian_centre(rune) {
  return stack(
    beside(
      quarter_turn_right(rune),
      repeat_pattern(2, quarter_turn_right, rune)
    ),
    beside(rune, repeat_pattern(3, quarter_turn_right, rune))
  );
}

// Form top and bottom edges, without the two corner edges at each end
function persian_top_bottom(rune, count) {
  return count === 1
    ? rune
    : beside_frac(1 / count, rune, persian_top_bottom(rune, count - 1));
}

// Form left and right edges, including the corners
function persian_left_right(rune, count) {
  return stackn(count, rune);
}

// Test
show(persian(make_cross(rcross), 5));
