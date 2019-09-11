// Question 1
function noise_sound(duration) {
  const wave = t => math_random() * 2 - 1;
  return make_sound(wave, duration);
}

function cut_sound(sound, duration) {
  /* your answer here */
  return make_sound(get_wave(sound), duration);
}

// testing
play(cut_sound(noise_sound(2), 1));

// Question 2
function sine_sound(freq, duration) {
  /* your answer here */
  const wave = t => math_sin(2 * math_PI * freq * t);
  return make_sound(wave, duration);
}

play(sine_sound(500, 1));

// Question 3
/*
List of sounds are a list of pairs ending with a null

Take note:
The make_sound constructor ensures that all Sounds have the following property:

(get_wave(sound))(get_duration(sound) + t) === 0
for any number t ≥ 0, regardless what the original wave of the sound returns for t. The wave will simply return 0 when the duration is up. This Sound property will make your tasks a lot easier.

Piazza:
You can create piecewise defined functions like t => (t === 0)? 1 : 2

Your consecutively function returns a sound, which requires a wave and a duration. So the sound player will feed values of t between 0 to the duration into your wave function. Hence you have all the space within your wave function to figure out how to process the t value given, and return the correct amplitude.
*/

// copy your own sine_sound function from the previous question here
function sine_sound(freq, duration) {
  const wave = t => math_sin(2 * math_PI * freq * t);
  return make_sound(wave, duration);
}

function consecutively(list_of_sounds) {
  /* your answer here */
  function consecutively_duration_helper(list_of_sounds) {
    return is_null(list_of_sounds)
      ? 0
      : tail(head(list_of_sounds)) +
          consecutively_duration_helper(tail(list_of_sounds));
  }

  function consecutively_wave_helper_2(t, list_of_sounds, duration) {
    return is_null(list_of_sounds)
      ? 0
      : t < duration + tail(head(list_of_sounds))
      ? head(head(list_of_sounds))(t - duration)
      : consecutively_wave_helper_2(
          t,
          tail(list_of_sounds),
          duration + tail(head(list_of_sounds))
        );
  }

  function consecutively_wave_helper(list_of_sounds, duration) {
    return t => consecutively_wave_helper_2(t, list_of_sounds, duration);
  }

  return make_sound(
    consecutively_wave_helper(list_of_sounds, 0),
    consecutively_duration_helper(list_of_sounds)
  );
}

const my_sine_1 = sine_sound(500, 1);
const my_sine_2 = sine_sound(700, 3);

// Play test sound
play(consecutively(list(my_sine_1, my_sine_2)));

// Question 4

// copy your own sine_sound and consecutively functions
// from the previous questions here
function sine_sound(freq, duration) {
  const wave = t => math_sin(2 * math_PI * freq * t);
  return make_sound(wave, duration);
}

function consecutively(list_of_sounds) {
  function consecutively_duration_helper(list_of_sounds) {
    return is_null(list_of_sounds)
      ? 0
      : tail(head(list_of_sounds)) +
          consecutively_duration_helper(tail(list_of_sounds));
  }

  function consecutively_wave_helper_2(t, list_of_sounds, duration) {
    return is_null(list_of_sounds)
      ? 0
      : t < duration + tail(head(list_of_sounds))
      ? head(head(list_of_sounds))(t - duration)
      : consecutively_wave_helper_2(
          t,
          tail(list_of_sounds),
          duration + tail(head(list_of_sounds))
        );
  }

  function consecutively_wave_helper(list_of_sounds, duration) {
    return t => consecutively_wave_helper_2(t, list_of_sounds, duration);
  }

  return make_sound(
    consecutively_wave_helper(list_of_sounds, 0),
    consecutively_duration_helper(list_of_sounds)
  );
}

// Create dot, dash and pause sounds first
const dot_sound = sine_sound(800, 0.125);
const dash_sound = sine_sound(800, 0.125 * 3);
const dot_pause = silence_sound(0.125);
const dash_pause = silence_sound(0.125 * 3);

// Create sounds for each letter
const S_sound = consecutively(
  list(dot_sound, dot_pause, dot_sound, dot_pause, dot_sound)
);
const O_sound = consecutively(
  list(dash_sound, dot_pause, dash_sound, dot_pause, dash_sound)
);

// Build the signal out of letter sounds and pauses
const distress_signal = consecutively(
  list(S_sound, dash_pause, O_sound, dash_pause, S_sound)
);

// Play distress signal
play(distress_signal);
