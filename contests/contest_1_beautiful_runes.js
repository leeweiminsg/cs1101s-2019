// My contest entry
function two_d_contest_LEE_WEI_MIN() {
  function heart_carpet(rune, count) {
    return beside_frac(
      1 / count,
      heart_carpet_left_right(rune, count),
      beside_frac(
        1 - 1 / (count - 1),
        stack_frac(
          1 / count,
          heart_carpet_top_bottom(rune, count - 2),
          stack_frac(
            1 - 1 / (count - 1),
            heart_carpet_centre(rune),
            heart_carpet_top_bottom(rune, count - 2)
          )
        ),
        heart_carpet_left_right(rune, count)
      )
    );
  }

  function heart_carpet_centre(rune) {
    return stack(
      beside(
        quarter_turn_right(random_color(rune)),
        repeat_pattern(2, quarter_turn_right, random_color(rune))
      ),
      beside(
        random_color(rune),
        repeat_pattern(3, quarter_turn_right, random_color(rune))
      )
    );
  }

  function heart_carpet_top_bottom(rune, count) {
    return count === 1
      ? random_color(rune)
      : beside_frac(
          1 / count,
          random_color(rune),
          heart_carpet_top_bottom(random_color(rune), count - 1)
        );
  }

  function heart_carpet_left_right(rune, count) {
    return stackn(count, random_color(rune));
  }

  return heart_carpet(heart, 10);
}

show(two_d_contest_LEE_WEI_MIN());
