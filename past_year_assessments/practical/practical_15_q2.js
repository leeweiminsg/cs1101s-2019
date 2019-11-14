// Question 2A
function make_first_line(words, page_width) {
  function iter(line, next_words) {
    if (is_null(next_words)) {
      return pair(line, null);
    } else {
      let next_word = head(next_words);
      if (length(line) + length(next_word) + 1 > page_width) {
        return pair(line, next_words);
      } else {
        return iter(line + " " + next_word, tail(next_words));
      }
    }
  }
  return iter(head(words), tail(words));
}

// Question 2B
function make_lines(words, page_width) {
  if (is_null(words)) {
    return null;
  } else {
    let line = make_first_line(words, page_width);
    return pair(head(line), make_lines(tail(line), page_width));
  }

// Question 2C
  function tail_n_times(xs, n) {
  if (is_null(xs)) {
    return xs;
  } else if (n <= 0) {
    return xs;
  } else {
    return tail_n_times(tail(xs), n - 1);
  }
}

function copy_list_n_items(xs, n) {
  if (is_null(xs)) {
    return xs;
  } else if (n <= 0) {
    return null;
  } else {
    return pair(head(xs), copy_list_n_items(tail(xs), n - 1));
  }
}

function make_pages(lines, page_height) {
  if (is_null(lines)) {
    return null;
  } else {
    let page = copy_list_n_items(lines, page_height);
    return pair(
      page,
      make_pages(tail_n_times(lines, page_height), page_height)
    );
  }
}

// Question 2D
function page_format(words, page_width, page_height) {
  let lines = make_lines(words, page_width);
  let pages = make_pages(lines, page_height);
  return pages;
}