/* NOTE: https://www.audiocheck.net/audiocheck_dtmf.php to check sounds */

// Question 1
// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive
function get_dtmf_frequencies(number) {
  // your solution goes here
  const rows = list(697, 770, 852, 941);
  const cols = list(1209, 1336, 1477, 1633);

  const dtmf_coordinates = list(
    pair(3, 1),
    pair(0, 0),
    pair(0, 1),
    pair(0, 2),
    pair(1, 0),
    pair(1, 1),
    pair(1, 2),
    pair(2, 0),
    pair(2, 1),
    pair(2, 2),
    pair(3, 0),
    pair(3, 2),
    pair(0, 3),
    pair(1, 3),
    pair(2, 3),
    pair(3, 3)
  );

  const dtmf_coordinate = list_ref(dtmf_coordinates, number);

  return pair(
    list_ref(rows, head(dtmf_coordinate)),
    list_ref(cols, tail(dtmf_coordinate))
  );
}

// Test
get_dtmf_frequencies(0);

// Question 2
// Task 2

// copy your function get_dtmf_frequencies here
function get_dtmf_frequencies(number) {
  const rows = list(697, 770, 852, 941);
  const cols = list(1209, 1336, 1477, 1633);

  const dtmf_coordinates = list(
    pair(3, 1),
    pair(0, 0),
    pair(0, 1),
    pair(0, 2),
    pair(1, 0),
    pair(1, 1),
    pair(1, 2),
    pair(2, 0),
    pair(2, 1),
    pair(2, 2),
    pair(3, 0),
    pair(3, 2),
    pair(0, 3),
    pair(1, 3),
    pair(2, 3),
    pair(3, 3)
  );

  const dtmf_coordinate = list_ref(dtmf_coordinates, number);

  return pair(
    list_ref(rows, head(dtmf_coordinate)),
    list_ref(cols, tail(dtmf_coordinate))
  );
}

function make_dtmf_tone(frequency_pair) {
  // your solution goes here
  const sine1_sound = sine_sound(head(frequency_pair), 0.5);
  const sine2_sound = sine_sound(tail(frequency_pair), 0.5);

  return simultaneously(list(sine1_sound, sine2_sound));
}

// Test
play(make_dtmf_tone(get_dtmf_frequencies(0)));

// Question 3

// Task 3

// copy your functions get_dtmf_frequencies
// and make_dtmf_tone here
function get_dtmf_frequencies(number) {
  const rows = list(697, 770, 852, 941);
  const cols = list(1209, 1336, 1477, 1633);

  const dtmf_coordinates = list(
    pair(3, 1),
    pair(0, 0),
    pair(0, 1),
    pair(0, 2),
    pair(1, 0),
    pair(1, 1),
    pair(1, 2),
    pair(2, 0),
    pair(2, 1),
    pair(2, 2),
    pair(3, 0),
    pair(3, 2),
    pair(0, 3),
    pair(1, 3),
    pair(2, 3),
    pair(3, 3)
  );

  const dtmf_coordinate = list_ref(dtmf_coordinates, number);

  return pair(
    list_ref(rows, head(dtmf_coordinate)),
    list_ref(cols, tail(dtmf_coordinate))
  );
}

function make_dtmf_tone(frequency_pair) {
  const sine1_sound = sine_sound(head(frequency_pair), 0.5);
  const sine2_sound = sine_sound(tail(frequency_pair), 0.5);

  return simultaneously(list(sine1_sound, sine2_sound));
}

function dial(list_of_digits) {
  // your solution goes here
  function make_dial_tone(digit) {
    return consecutively(
      list(make_dtmf_tone(get_dtmf_frequencies(digit)), silence_sound(0.1))
    );
  }

  return consecutively(map(make_dial_tone, list_of_digits));
}

// Test
play(dial(list(6, 2, 3, 5, 8, 5, 7, 7)));

// Question 4
// copy your functions get_dtmf_frequencies,
// make_dtmf_tone and dial here
function get_dtmf_frequencies(number) {
  const rows = list(697, 770, 852, 941);
  const cols = list(1209, 1336, 1477, 1633);

  const dtmf_coordinates = list(
    pair(3, 1),
    pair(0, 0),
    pair(0, 1),
    pair(0, 2),
    pair(1, 0),
    pair(1, 1),
    pair(1, 2),
    pair(2, 0),
    pair(2, 1),
    pair(2, 2),
    pair(3, 0),
    pair(3, 2),
    pair(0, 3),
    pair(1, 3),
    pair(2, 3),
    pair(3, 3)
  );

  const dtmf_coordinate = list_ref(dtmf_coordinates, number);

  return pair(
    list_ref(rows, head(dtmf_coordinate)),
    list_ref(cols, tail(dtmf_coordinate))
  );
}

function make_dtmf_tone(frequency_pair) {
  const sine1_sound = sine_sound(head(frequency_pair), 0.5);
  const sine2_sound = sine_sound(tail(frequency_pair), 0.5);

  return simultaneously(list(sine1_sound, sine2_sound));
}

function dial(list_of_digits) {
  const list_of_digits_hex = append(list_of_digits, list(11));

  function make_dial_tone(digit) {
    return consecutively(
      list(make_dtmf_tone(get_dtmf_frequencies(digit)), silence_sound(0.1))
    );
  }

  return consecutively(map(make_dial_tone, list_of_digits_hex));
}

function dial_all(list_of_numbers) {
  // your solution goes here
  const dark_side_number = list(1, 8, 0, 0, 5, 2, 1, 1, 9, 8, 0);

  function is_dark_side_number(number) {
    return !equal(number, dark_side_number);
  }

  function accumulate_sounds(current_sound, accumulated_sounds) {
    return consecutively(list(current_sound, accumulated_sounds));
  }

  return accumulate(
    accumulate_sounds,
    silence_sound(0),
    map(dial, filter(is_dark_side_number, list_of_numbers))
  );
}

play(
  dial_all(
    list(
      list(1, 8, 0, 0, 5, 2, 1, 1, 9, 8, 0), // not played!!!
      list(6, 2, 3, 5, 8, 5, 7, 7),
      list(0, 0, 8, 6, 1, 3, 7, 7, 0, 9, 5, 0, 0, 6, 1)
    )
  )
);
