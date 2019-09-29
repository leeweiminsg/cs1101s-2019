// My contest entry
function sounds_contest_LEE_WEI_MIN() {
  function create_sine_sound(frequency) {
    return sine_sound(frequency, 10);
  }

  const prime_num_frequencies = list(
    79,
    83,
    89,
    97,
    101,
    103,
    107,
    109,
    113,
    127,
    131,
    137,
    139,
    149
  );

  const prime_sine_waves = map(create_sine_sound, prime_num_frequencies);

  return simultaneously(
    append(prime_sine_waves, list(sine_sound(300, 10), silence_sound(0.1)))
  );
}

// Test your sound here:
// Delete or comment out the following line before submission
//play(sounds_contest_LEE_WEI_MIN());
