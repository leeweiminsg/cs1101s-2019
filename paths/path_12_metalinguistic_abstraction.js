// Question 1
function is_tagged_list(stmt, the_tag) {
  return is_pair(stmt) && head(stmt) === the_tag;
}

function is_application(stmt) {
  return is_tagged_list(stmt, "application");
}

function is_name(stmt) {
  return is_tagged_list(stmt, "name");
}

// name also has line number, which we ignore.
// line number can be used for debugging features.
// e.g. to tell the user where the error is.
function name_of_name(stmt) {
  return head(tail(stmt));
}

function operator(stmt) {
  return head(tail(stmt));
}
function operands(stmt) {
  return head(tail(tail(stmt)));
}

function pretty_print(stmt) {
  function handle_application(stmt) {
    let curr_operator = " " + name_of_name(operator(stmt)) + " ";
    let curr_operands = operands(stmt);
    let first_operand = pretty_print(head(curr_operands));
    let second_operand = pretty_print(head(tail(curr_operands)));

    return "(" + first_operand + curr_operator + second_operand + ")";
  }
  if (is_number(stmt)) {
    return stringify(stmt);
  } else if (is_application(stmt)) {
    return handle_application(stmt);
  } else {
    error("Unknown expression type in evaluate: " + stringify(stmt));
  }
}

pretty_print(parse("1 + 2;"));

// Question 2
function is_tagged_list(stmt, the_tag) {
  return is_pair(stmt) && head(stmt) === the_tag;
}

function is_application(stmt) {
  return is_tagged_list(stmt, "application");
}

function is_name(stmt) {
  return is_tagged_list(stmt, "name");
}

// name also has line number, which we ignore.
// line number can be used for debugging features.
// e.g. to tell the user where the error is.
function name_of_name(stmt) {
  return head(tail(stmt));
}

function operator(stmt) {
  return head(tail(stmt));
}
function operands(stmt) {
  return head(tail(tail(stmt)));
}

function evaluate(stmt) {
  function handle_application(stmt) {
    // MODIFY THIS FUNCTION
    const op = name_of_name(operator(stmt));

    const lhs = evaluate(head(operands(stmt)));
    const rhs = evaluate(head(tail(operands(stmt))));

    return op === "+"
      ? lhs + rhs
      : op === "-"
      ? lhs - rhs
      : op === "*"
      ? lhs * rhs
      : op === "/"
      ? lhs / rhs
      : null;
  }
  if (is_number(stmt)) {
    return stmt;
  } else if (is_application(stmt)) {
    return handle_application(stmt);
  } else {
    error("Unknown expression type in evaluate: " + stringify(stmt));
  }
}

// Question 3
function is_tagged_list(stmt, the_tag) {
  return is_pair(stmt) && head(stmt) === the_tag;
}

function is_application(stmt) {
  return is_tagged_list(stmt, "application");
}

function is_name(stmt) {
  return is_tagged_list(stmt, "name");
}

// name also has line number, which we ignore.
// line number can be used for debugging features.
// e.g. to tell the user where the error is.
function name_of_name(stmt) {
  return head(tail(stmt));
}

function operator(stmt) {
  return head(tail(stmt));
}
function operands(stmt) {
  return head(tail(tail(stmt)));
}

function is_array_expression(stmt) {
  return is_tagged_list(stmt, "array_expression");
}

// Given an array expression, should convert it to an array.
// Can assume that the arrays only contain numbers.
function handle_array_expression(stmt) {
  let xs = operator(stmt);
  display(xs);

  if (is_null(xs)) {
    return [];
  } else {
    let arr = [];
    let i = 0;

    while (!is_null(xs)) {
      arr[i] = head(xs);

      i = i + 1;
      xs = tail(xs);
    }

    return arr;
  }
}

function evaluate(stmt) {
  function handle_application(stmt) {
    const op = name_of_name(operator(stmt));
    const lhs = head(operands(stmt));
    const rhs = head(tail(operands(stmt)));
    return op === "+"
      ? evaluate(lhs) + evaluate(rhs)
      : op === "-"
      ? evaluate(lhs) - evaluate(rhs)
      : op === "*"
      ? evaluate(lhs) * evaluate(rhs)
      : op === "/"
      ? evaluate(lhs) / evaluate(rhs)
      : error("Unknown op type" + stringify(op));
  }
  if (is_number(stmt)) {
    return stmt;
  } else if (is_application(stmt)) {
    return handle_application(stmt);
  } else if (is_array_expression(stmt)) {
    return handle_array_expression(stmt);
  } else {
    error("Unknown expression type in evaluate: " + stringify(stmt));
  }
}

// Question 4
function is_tagged_list(stmt, the_tag) {
  return is_pair(stmt) && head(stmt) === the_tag;
}

function is_application(stmt) {
  return is_tagged_list(stmt, "application");
}

function is_name(stmt) {
  return is_tagged_list(stmt, "name");
}

// name also has line number, which we ignore.
// line number can be used for debugging features.
// e.g. to tell the user where the error is.
function name_of_name(stmt) {
  return head(tail(stmt));
}

function operator(stmt) {
  return head(tail(stmt));
}
function operands(stmt) {
  return head(tail(tail(stmt)));
}

function is_array_expression(stmt) {
  return is_tagged_list(stmt, "array_expression");
}

// Given an array expression, should convert it to an array.
// Can assume that the arrays only contain numbers.
function handle_array_expression(stmt) {
  function list_to_array(xs) {
    const arr = [];
    let i = 0;
    function helper(xs) {
      if (is_null(xs)) {
        return arr;
      } else {
        arr[i] = head(xs);
        i = i + 1;
        return helper(tail(xs));
      }
    }
    return helper(xs);
  }
  return list_to_array(head(tail(stmt)));
}

// COMPLETE THE HELPER FUNCTIONS

// Given two vectors, returns the dot product.
function dot(A, B) {
  let result = 0;

  for (let i = 0; i < array_length(A); i = i + 1) {
    result = result + A[i] * B[i];
  }

  return result;
}

// Returns a new vector which is A scaled by c.
function scale(c, A) {
  for (let i = 0; i < array_length(A); i = i + 1) {
    A[i] = A[i] * c;
  }

  return A;
}

// Given two vectors, returns the sum of them.
function add(A, B) {
  let result = [];

  for (let i = 0; i < array_length(A); i = i + 1) {
    result[i] = A[i] + B[i];
  }

  return result;
}

function evaluate(stmt) {
  function handle_application(stmt) {
    const op = name_of_name(operator(stmt));
    const lhs = head(operands(stmt));
    const rhs = head(tail(operands(stmt)));

    if (is_number(evaluate(lhs)) && is_number(evaluate(rhs))) {
      return op === "+"
        ? evaluate(lhs) + evaluate(rhs)
        : op === "-"
        ? evaluate(lhs) - evaluate(rhs)
        : op === "*"
        ? evaluate(lhs) * evaluate(rhs)
        : op === "/"
        ? evaluate(lhs) / evaluate(rhs)
        : error("Unknown op type" + stringify(op));
    } else if (is_number(evaluate(lhs)) && is_array(evaluate(rhs))) {
      return op === "*"
        ? scale(evaluate(lhs), evaluate(rhs))
        : error("Unknown op type" + stringify(op));
    } else if (is_array(evaluate(lhs)) && is_array(evaluate(rhs))) {
      return op === "+"
        ? add(evaluate(lhs), evaluate(rhs))
        : op === "-"
        ? add(evaluate(lhs), scale(-1, evaluate(rhs)))
        : op === "*"
        ? dot(evaluate(lhs), evaluate(rhs))
        : error("Unknown op type" + stringify(op));
    } else {
    }
  }
  if (is_number(stmt)) {
    return stmt;
  } else if (is_application(stmt)) {
    return handle_application(stmt);
  } else if (is_array_expression(stmt)) {
    return handle_array_expression(stmt);
  } else {
    error("Unknown expression type in evaluate: " + stringify(stmt));
  }
}
