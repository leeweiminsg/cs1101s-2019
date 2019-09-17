// Question 1
const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
  /* your answer here */
  return noise_sound(duration);
}

function bass_drum(note, duration) {
  /* your answer here */
  function create_sine_sound(frequency) {
    return sine_sound(frequency, duration);
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

  return simultaneously(prime_sine_waves);
}

function mute(note, duration) {
  /* your answer here */
  return silence_sound(duration);
}

play(snare_drum(50, 2));
play(bass_drum(50, 2));
play(consecutively(list(snare_drum(50, 2), mute(0, 1), bass_drum(50, 2))));

// Question 2
/* Test: https://www.youtube.com/watch?v=BKHofEURK5A&feature=youtu.be */
function generate_list_of_note(letter_name, list_of_interval) {
  /* your answer here */
  const midi_base_note = letter_name_to_midi_note(letter_name);

  function generate_list_of_note_helper(list_of_interval, note_accum) {
    return is_null(list_of_interval)
      ? null
      : pair(
          head(list_of_interval) + note_accum,
          generate_list_of_note_helper(
            tail(list_of_interval),
            head(list_of_interval) + note_accum
          )
        );
  }

  return append(
    list(midi_base_note),
    generate_list_of_note_helper(list_of_interval, midi_base_note)
  );
}

const major_scale_interval = list(
  2,
  2,
  1,
  2,
  2,
  2,
  1,
  -1,
  -2,
  -2,
  -2,
  -1,
  -2,
  -2
);
const c_major_scale = generate_list_of_note("C4", major_scale_interval);

// display(c_major_scale);

function list_to_sound(list_of_midi_note, duration, instrument) {
  /* your answer here */
  function make_instrument_sound(midi_note) {
    return instrument(midi_note, duration);
  }

  return consecutively(map(make_instrument_sound, list_of_midi_note));
}

// const c_major_scale_sound = list_to_sound(c_major_scale, 0.4, cello);
// play(c_major_scale_sound);

const harmonic_minor_scale_interval = list(
  2,
  1,
  2,
  2,
  1,
  3,
  1,
  -1,
  -3,
  -1,
  -2,
  -2,
  -1,
  -2
);

const melodic_minor_scale_interval = list(
  2,
  1,
  2,
  2,
  2,
  2,
  1,
  -2,
  -2,
  -1,
  -2,
  -2,
  -1,
  -2
);

const c_harmonic_minor_scale = generate_list_of_note(
  "C4",
  harmonic_minor_scale_interval
);
// const c_harmonic_minor_scale_sound = list_to_sound(c_harmonic_minor_scale, 0.4, cello);
// play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = generate_list_of_note(
  "C4",
  melodic_minor_scale_interval
);
// const c_melodic_minor_scale_sound = list_to_sound(c_melodic_minor_scale, 0.4, cello);
// play(c_melodic_minor_scale_sound);

// Question 3
// copy your functions generate_list_of_note and list_to_sound
// from the previous Question here
function generate_list_of_note(letter_name, list_of_interval) {
  const midi_base_note = letter_name_to_midi_note(letter_name);

  function generate_list_of_note_helper(list_of_interval, note_accum) {
    return is_null(list_of_interval)
      ? null
      : pair(
          head(list_of_interval) + note_accum,
          generate_list_of_note_helper(
            tail(list_of_interval),
            head(list_of_interval) + note_accum
          )
        );
  }

  return append(
    list(midi_base_note),
    generate_list_of_note_helper(list_of_interval, midi_base_note)
  );
}

function list_to_sound(list_of_midi_note, duration, instrument) {
  function make_instrument_sound(midi_note) {
    return instrument(midi_note, duration);
  }

  return consecutively(map(make_instrument_sound, list_of_midi_note));
}

const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(3, 4, 5, 3, 4, 5);

function generate_arpeggio(letter_name, list_of_interval) {
  return generate_list_of_note(letter_name, list_of_interval);
}

function arpeggiator_up(arpeggio, duration_each, instrument) {
  /* your answer here */
  function arpeggiator_up_helper(arpeggio, duration_each, instrument, n) {
    return n > 3
      ? null
      : consecutively(
          construct_sub_arpeggiator_up(arpeggio, duration_each, instrument, 4),
          arpeggiator_up_helper(
            tail(arpeggio),
            duration_each,
            instrument,
            n + 1
          )
        );
  }

  function construct_sub_arpeggiator_up(
    arpeggio,
    duration_each,
    instrument,
    n
  ) {
    return n < 1
      ? null
      : pair(
          instrument(head(arpeggio), duration_each),
          construct_sub_arpeggiator_up(
            tail(arpeggio),
            duration_each,
            instrument,
            n - 1
          )
        );
  }

  return length(arpeggio) < 4
    ? silence_sound(0)
    : arpeggiator_up_helper(arpeggio, duration_each, instrument, 0);
}

// test
play(
  arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 0.1, cello)
);

// Question 4
function simplify_rhythm(rhythm) {
  /* your answer here */
  function simplify_pair_rhythm(rhythm, n) {
    return n === 0
      ? null
      : append(simplify_rhythm(rhythm), simplify_pair_rhythm(rhythm, n - 1));
  }

  return is_list(rhythm)
    ? is_number(head(rhythm))
      ? rhythm
      : accumulate((x, y) => append(simplify_rhythm(x), y), null, rhythm)
    : simplify_pair_rhythm(head(rhythm), tail(rhythm));
}

// test
const my_rhythm = pair(
  list(pair(list(1, 2, 0, 1), 2), list(1, 3, 0, 1, 3, 1, 0, 3)),
  3
);
simplify_rhythm(my_rhythm);

// Question 5
// paste your snare_drum, mute and simplify_rhythm
// from Questions 3 and 4 here
function simplify_rhythm(rhythm) {
  function simplify_pair_rhythm(rhythm, n) {
    return n === 0
      ? null
      : append(simplify_rhythm(rhythm), simplify_pair_rhythm(rhythm, n - 1));
  }

  return is_list(rhythm)
    ? is_number(head(rhythm))
      ? rhythm
      : accumulate((x, y) => append(simplify_rhythm(x), y), null, rhythm)
    : simplify_pair_rhythm(head(rhythm), tail(rhythm));
}

function snare_drum(note, duration) {
  return noise_sound(duration);
}

function bass_drum(note, duration) {
  function create_sine_sound(frequency) {
    return sine_sound(frequency, duration);
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

  return simultaneously(prime_sine_waves);
}

function mute(note, duration) {
  return silence_sound(duration);
}

function percussions(distance, list_of_sounds, rhythm) {
  /* your answer here */
  function percussions_helper(distance, list_of_sounds, start, stop) {
    return start === stop
      ? silence_sound(0)
      : simultaneously(
          list(
            consecutively(
              list(silence_sound(distance * start), head(list_of_sounds))
            ),
            percussions_helper(distance, tail(list_of_sounds), start + 1, stop)
          )
        );
  }

  const new_list_of_sounds = map(
    n => list_ref(list_of_sounds, n),
    simplify_rhythm(rhythm)
  );

  return percussions_helper(
    distance,
    new_list_of_sounds,
    0,
    length(new_list_of_sounds)
  );
}

// test
const my_mute_sound = mute(50, 0.7);
const my_snare_drum = snare_drum(50, 0.7);
const my_bass_drum = bass_drum(50, 0.7);
const my_bell = bell(72, 1);
play(
  percussions(
    0.5,
    list(my_mute_sound, my_snare_drum, my_bass_drum, my_bell),
    list(1, 2, 1, 0, 3, 1, 0)
  )
);
