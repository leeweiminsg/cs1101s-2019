// My contest entry
function three_d_contest_LEE_WEI_MIN() {
  function cone(n, rune) {
    // your answer here
    return n === 1
      ? rune
      : overlay_frac(
          1 - 1 / n,
          cone(n - 1, scale(1 - 1 / n, quarter_turn_right(rune))),
          turn_upside_down(rune)
        );
  }

  return cone(100, heart);
}

// testing:
anaglyph(three_d_contest_LEE_WEI_MIN());
