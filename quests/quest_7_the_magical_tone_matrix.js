// Question 1

// copy generate_list_of_note from Mission "Musical Diversions"

function generate_list_of_note(letter_name, list_of_interval) {
  // from Mission "Musical Diversions"
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

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function repeat_list_of_interval(n, list_of_interval, accum_list_of_interval) {
  return n === 0
    ? accum_list_of_interval
    : repeat_list_of_interval(
        n - 1,
        list_of_interval,
        append(list_of_interval, accum_list_of_interval)
      );
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
  const repeated_list_of_interval = repeat_list_of_interval(
    n,
    list_of_interval,
    null
  );
  const list_of_notes = generate_list_of_note(note, repeated_list_of_interval);
  const list_of_sounds = map(note => instrument(note, duration), list_of_notes);
  return list_of_sounds;
}

play(
  consecutively(repeated_scale("C4", pentatonic_list_of_interval, 2, 1, cello))
);

// Question 2
function play_matrix(distance, list_of_sounds) {
  /* your answer here */
  function matrix_to_columns(matrix) {
    return is_null(head(matrix))
      ? null
      : pair(map(head, matrix), matrix_to_columns(map(tail, matrix)));
  }

  function column_accumulate_sound(column_list, sound) {
    return accumulate(
      (bool, accum_sound) =>
        bool ? simultaneously(list(sound, accum_sound)) : accum_sound,
      silence_sound(0),
      column_list
    );
  }

  function column_sounds(column_lists, list_of_sounds) {
    return is_null(column_lists)
      ? null
      : pair(
          column_accumulate_sound(head(column_lists), head(list_of_sounds)),
          column_sounds(tail(column_lists), tail(list_of_sounds))
        );
  }

  function play_all_column_sounds(
    column_sounds_list,
    distance,
    original_column_sounds_list
  ) {
    if (is_null(column_sounds_list)) {
      play_all_column_sounds(
        original_column_sounds_list,
        distance,
        original_column_sounds_list
      );
    } else {
      set_timeout(() => {
        play_concurrently(head(column_sounds_list));
        play_all_column_sounds(
          tail(column_sounds_list),
          distance,
          original_column_sounds_list
        );
      }, distance * 1000);
    }
  }

  const matrix = get_matrix();
  const column_lists = matrix_to_columns(matrix);
  const column_sounds_list = column_sounds(column_lists, list_of_sounds);

  return play_all_column_sounds(
    column_sounds_list,
    distance,
    column_sounds_list
  );
}

function stop_matrix() {
  /* your answer here */
  return clear_all_timeout();
}

// copy your solution of Question 1 here
function generate_list_of_note(letter_name, list_of_interval) {
  // from Mission "Musical Diversions"
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

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function repeat_list_of_interval(n, list_of_interval, accum_list_of_interval) {
  return n === 0
    ? accum_list_of_interval
    : repeat_list_of_interval(
        n - 1,
        list_of_interval,
        append(list_of_interval, accum_list_of_interval)
      );
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
  const repeated_list_of_interval = repeat_list_of_interval(
    n,
    list_of_interval,
    null
  );
  const list_of_notes = generate_list_of_note(note, repeated_list_of_interval);
  const list_of_sounds = map(note => instrument(note, duration), list_of_notes);
  return list_of_sounds;
}

const sounds = repeated_scale("C4", pentatonic_list_of_interval, 3, 0.2, cello);

play_matrix(0.5, sounds);
