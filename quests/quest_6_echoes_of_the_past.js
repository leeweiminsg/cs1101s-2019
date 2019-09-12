// Question 1
/* Note: Note that due to the Sound Property, get_wave(backward(s))(0) evaluates to 0 for any Sound s. */
function backward(sound) {
  // your solution goes here
  return make_sound(
    t => get_wave(sound)(get_duration(sound) - t),
    get_duration(sound)
  );
}

init_record(); // step 1

const my_voice = record_for(2, 0.2); // step 2

play(backward(my_voice())); // step 3 in REPL

// Question 2
function repeat(n, sound) {
  // your solution goes here
  return make_sound(
    t => get_wave(sound)(t % get_duration(sound)),
    get_duration(sound) * n
  );
}

const my_sound = consecutively(list(sine_sound(400, 1), sine_sound(800, 1)));
const my_repeated = repeat(3, my_sound);
play(my_repeated);

// Question 3
function fast_forward(n, sound) {
  // your solution goes here
  return make_sound(t => get_wave(sound)(n * t), get_duration(sound) / n);
}

init_record(); // step 1

const my_voice = record_for(2, 0.2); // step 2

play(fast_forward(2, my_voice())); // step 3 in REPL

// Question 4
/* Test case: https://www.youtube.com/watch?v=KXts9lecWCI&feature=youtu.be */
function echo(n, d, sound) {
  // your solution goes here
  function echo_wave_helper(t, n, wave, count) {
    return count > n
      ? 0
      : (t > d * count ? (1 / math_pow(2, count)) * wave(t - d * count) : 0) +
          echo_wave_helper(t, n, wave, count + 1);
  }

  return make_sound(
    t => get_wave(sound)(t) + echo_wave_helper(t, n, get_wave(sound), 1),
    get_duration(sound) + n * d
  );
}

const test_sound = sine_sound(800, 0.2);
play(echo(2, 0.3, test_sound));

// Question 5
// Copy your functions backward, repeat,
// fast_forward and echo here
function backward(sound) {
  // your solution goes here
  return make_sound(
    t => get_wave(sound)(get_duration(sound) - t),
    get_duration(sound)
  );
}

function repeat(n, sound) {
  // your solution goes here
  return make_sound(
    t => get_wave(sound)(t % get_duration(sound)),
    get_duration(sound) * n
  );
}

function fast_forward(n, sound) {
  // your solution goes here
  return make_sound(t => get_wave(sound)(n * t), get_duration(sound) / n);
}

function echo(n, d, sound) {
  // your solution goes here
  function echo_wave_helper(t, n, wave, count) {
    return count > n
      ? 0
      : (t > d * count ? (1 / math_pow(2, count)) * wave(t - d * count) : 0) +
          echo_wave_helper(t, n, wave, count + 1);
  }

  return make_sound(
    t => get_wave(sound)(t) + echo_wave_helper(t, n, get_wave(sound), 1),
    get_duration(sound) + n * d
  );
}

function make_alien_jukebox(sound) {
  // your solution goes here
  const original_sound = sound;
  const backward_sound = backward(sound);
  const half_speed_sound = fast_forward(1 / 2, sound);
  const twice_speed_three_sound = repeat(3, fast_forward(2, sound));
  const backward_echo_delay_sound = echo(4, 0.3, backward(sound));

  const sound_list = list(
    original_sound,
    backward_sound,
    half_speed_sound,
    twice_speed_three_sound,
    backward_echo_delay_sound
  );

  return n => play(list_ref(sound_list, n));
}

// Test in REPL:

// init_record();

// const erksh_voice = record_for(1, 0.2);

// const j = make_alien_jukebox(erksh_voice());

// j(0);  // plays original recording

// j(1);  // plays it backward

// j(2);  // plays it at half speed

// j(3);  // plays it at double speed, three times in a row

// j(4);  // plays it backward with 4-times echo,
//     with 0.3 seconds echo delay
