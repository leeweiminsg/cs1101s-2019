// Question 1A

function weighted_sum(digits, weights) {
  if (is_null(digits)) {
    return 0;
  } else {
    return (
      head(digits) * head(weights) + weighted_sum(tail(digits), tail(weights))
    );
  }
}

// Question 1B
function discard_element(xs, pos) {
  function helper(ys, pos_count) {
    if (is_null(ys)) {
      return null;
    } else {
      if (pos_count === pos) {
        return helper(tail(ys), pos_count + 1);
      } else {
        return pair(head(ys), helper(tail(ys), pos_count + 1));
      }
    }
  }
  return helper(xs, 0);
}

// Question 1C
function conv_first_char(x) {
  if (x === "u") {
    return "U";
  } else if (x === "a") {
    return "A";
  } else {
  }
}

let U_digit_weights = list(0, 1, 3, 1, 2, 7);
let A_digit_weights = list(1, 1, 1, 1, 1, 1, 1);

let check_digits = list(
  "Y",
  "X",
  "W",
  "U",
  "R",
  "N",
  "M",
  "L",
  "J",
  "H",
  "E",
  "A",
  "B"
);

function id_to_matric(id) {
  let new_id = pair(conv_first_char(head(id)), tail(id));
  let matric_type = head(new_id);
  let sum = 0;

  if (matric_type === "U") {
    new_id = discard_element(new_id, 3);
    sum = weighted_sum(tail(new_id), U_digit_weights);
  } else {
    sum = weighted_sum(tail(new_id), A_digit_weights);
  }

  let check_digit = list_ref(check_digits, sum % 13);
  return append(new_id, list(check_digit));
}

// Question 2A
