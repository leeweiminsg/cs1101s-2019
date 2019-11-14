// Question 3A
function is_prefix_of(sub, seq) {
  if (is_null(sub)) {
    return true;
  } else if (is_null(seq)) {
    return false;
  } else {
    return head(sub) === head(seq) && is_prefix_of(tail(sub), tail(seq));
  }
}

// Question 3B
function tail_n_times(xs, n) {
  if (is_null(xs)) {
    return xs;
  } else if (n <= 0) {
    return xs;
  } else {
    return tail_n_times(tail(xs), n - 1);
  }
}

function sublist_replace(new_sub, old_sub, seq) {
  if (is_null(seq)) {
    return null;
  } else if (!is_prefix_of(old_sub, seq)) {
    return pair(head(seq), sublist_replace(new_sub, old_sub, tail(seq)));
  } else {
    let old_sub_len = length(old_sub);
    return append(
      new_sub,
      sublist_replace(new_sub, old_sub, tail_n_times(seq, old_sub_len))
    );
  }
}

// Question 4A
function is_subseq_at(sub, seq, start_pos) {
  let i = 0;
  let j = start_pos;
  while (i < array_length(sub) && j < array_length(seq)) {
    if (sub[i] !== seq[j]) {
      return false;
    } else {
      i = i + 1;
      j = j + 1;
    }
  }
  return i === array_length(sub);
}

// Question 4B
function copy_array(src_arr, src_start_pos, dest_arr, dest_start_pos, k) {
  for (let i = 0; i < k; i = i + 1) {
    dest_arr[i + dest_start_pos] = src_arr[i + src_start_pos];
  }
}

function subarray_replace(new_sub, old_sub, seq) {
  for (let i = 0; i < array_length(seq); i = i + 1) {
    if (is_subseq_at(old_sub, seq, i)) {
      copy_array(new_sub, 0, seq, i, array_length(new_sub));
      i = i + array_length(new_sub) - 1;
    } else {
    }
  }
}
