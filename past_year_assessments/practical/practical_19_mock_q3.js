// ================ TASK 3A ================

function array_to_list(A) {
  // YOUR SOLUTION HERE
  let xs = null;

  function helper(x) {
    if (is_array(x)) {
      if (array_length(x) === 0) {
        return null;
      } else {
        xs = pair(helper(x), xs);
      }
    } else {
      xs = pair(x, xs);
    }
  }

  for (let i = 0; i < array_length(A); i = i + 1) {
    helper(A[i]);
  }

  return reverse(xs);
}

// Question 3B
// The following functions are predeclared:
// array_to_list

function is_self_evaluating(expr) {
  return is_number(expr) || is_boolean(expr);
}

function evaluate(expr, frame) {
  if (is_self_evaluating(expr)) {
    return expr;
  } else if (is_variable(expr)) {
    return lookup_name_value(expr, frame);
  } else if (is_let_expr(expr)) {
    return eval_let(expr, frame);
  } else if (is_if_expr(expr)) {
    return eval_if_expr(expr, frame);
  } else if (is_fn_defn(expr)) {
    return eval_fn_defn(expr, frame);
  } else if (is_fn_expr(expr)) {
    const literal_function_expr = eval_fn_parameters(expr, frame);
    return apply(literal_function_expr);
  } else {
    return error("Unknown expression: " + stringify(expr));
  }
}

// Multiple statements are only possible if
// They are define statements.
// The last statement is the return value.
// This is true both in program and function definitions.
function eval_stmts(stmts, env) {
  const list_stmts = reverse(stmts);
  const rv_expr = head(list_stmts);
  const defns = reverse(tail(list_stmts));
  const new_env = extend_environment(null, null, env);
  const fn_objs = map(defn => eval_fn_defn(defn, new_env), defns);
  for_each(fobj => insert_into_frame(get_name(fobj), fobj, new_env), fn_objs);
  return evaluate(rv_expr, new_env);
}

function evaluate_program(stmts) {
  return eval_stmts(array_to_list(stmts), make_global_frame());
}

// ================ AST DEFINITIONS ================
function is_variable(expr) {
  return is_string(expr);
}

//Format: [let*, [[var, expr]], expr]
function is_let_expr(expr) {
  return is_array(expr) && expr[0] === "let*";
}

//Format: [if cond true-branch false-branch]
function is_if_expr(expr) {
  return is_array(expr) && expr[0] === "if";
}

//Format: [define [fname a1 a2 ... an] ... fn-defn ... body]
function is_fn_defn(expr) {
  return is_array(expr) && expr[0] === "define";
}

//Format: [fn a1 a2 ... an]
function is_fn_expr(expr) {
  return is_array(expr);
}

// ================ TASK 3A ================

/*function array_to_list(A) {
    // PREDECLARED
}*/

// ============== ENVIRONMENT FRAMES ===============

const the_empty_environment = null;

// frames are pairs with a list of names as head
// an a list of pairs as tail (values). Each value
// pair has the proper value as head and a flag
// as tail, which indicates whether assignment
// is allowed for the corresponding name

function make_frame(names, values) {
  return pair(names, values);
}
function frame_names(frame) {
  return head(frame);
}
function frame_values(frame) {
  return tail(frame);
}

// The first frame in an environment is the
// "innermost" frame. The tail operation
// takes you to the "enclosing" environment

function first_frame(env) {
  return head(env);
}
function enclosing_environment(env) {
  return tail(env);
}
function enclose_by(frame, env) {
  return pair(frame, env);
}
function is_empty_environment(env) {
  return is_null(env);
}

// name lookup proceeds from the innermost
// frame and continues to look in enclosing
// environments until the name is found

function lookup_name_value(name, env) {
  function env_loop(env) {
    function scan(names, vals) {
      return is_null(names)
        ? env_loop(enclosing_environment(env))
        : name === head(names)
        ? head(vals)
        : scan(tail(names), tail(vals));
    }
    if (is_empty_environment(env)) {
      error(name, "Unbound name: ");
    } else {
      const frame = first_frame(env);
      const value = scan(frame_names(frame), frame_values(frame));
      return value;
    }
  }
  return env_loop(env);
}

// Hack which allows insertion of new values into existing frame
function insert_into_frame(name, value, env) {
  const frame = first_frame(env);
  set_head(frame, pair(name, head(frame))); // name
  set_tail(frame, pair(value, tail(frame))); // name
}

function extend_environment(names, vals, base_env) {
  if (length(names) === length(vals)) {
    return enclose_by(make_frame(names, vals), base_env);
  } else if (length(names) < length(vals)) {
    error(
      "Too many arguments supplied: " +
        stringify(names) +
        ", " +
        stringify(vals)
    );
  } else {
    error(
      "Too few arguments supplied: " + stringify(names) + ", " + stringify(vals)
    );
  }
}

// ================ TASK 3B ================
const primitive_functions = list(
  list("display", display),
  list("not", x => !x),
  // YOUR SOLUTION HERE
  list("=", (a, b) => a === b),
  list("+", (a, b) => a + b),
  list("-", (a, b) => a - b),
  list("*", (a, b) => a * b)
);

function make_global_frame() {
  const primitive_function_names = map(f => head(f), primitive_functions);
  const primitive_function_values = map(
    f => head(tail(f)),
    primitive_functions
  );
  return extend_environment(
    primitive_function_names,
    primitive_function_values,
    the_empty_environment
  );
}

// ... other functions omitted ...

// Question 3C
// The following functions are predeclared:
// array_to_list

function is_self_evaluating(expr) {
  return is_number(expr) || is_boolean(expr);
}

function evaluate(expr, frame) {
  if (is_self_evaluating(expr)) {
    return expr;
  } else if (is_variable(expr)) {
    return lookup_name_value(expr, frame);
  } else if (is_let_expr(expr)) {
    return eval_let(expr, frame);
  } else if (is_if_expr(expr)) {
    return eval_if_expr(expr, frame);
  } else if (is_fn_defn(expr)) {
    return eval_fn_defn(expr, frame);
  } else if (is_fn_expr(expr)) {
    const literal_function_expr = eval_fn_parameters(expr, frame);
    return apply(literal_function_expr);
  } else {
    return error("Unknown expression: " + stringify(expr));
  }
}

_export("evaluate", evaluate); // DO NOT EDIT

// Multiple statements are only possible if
// They are define statements.
// The last statement is the return value.
// This is true both in program and function definitions.
function eval_stmts(stmts, env) {
  const list_stmts = reverse(stmts);
  const rv_expr = head(list_stmts);
  const defns = reverse(tail(list_stmts));
  const new_env = extend_environment(null, null, env);
  const fn_objs = map(defn => eval_fn_defn(defn, new_env), defns);
  for_each(fobj => insert_into_frame(get_name(fobj), fobj, new_env), fn_objs);
  return evaluate(rv_expr, new_env);
}

function evaluate_program(stmts) {
  return eval_stmts(array_to_list(stmts), make_global_frame());
}

// ================ AST DEFINITIONS ================
function is_variable(expr) {
  return is_string(expr);
}

//Format: [let*, [[var, expr]], expr]
function is_let_expr(expr) {
  return is_array(expr) && expr[0] === "let*";
}

//Format: [if cond true-branch false-branch]
function is_if_expr(expr) {
  return is_array(expr) && expr[0] === "if";
}

//Format: [define [fname a1 a2 ... an] ... fn-defn ... body]
function is_fn_defn(expr) {
  return is_array(expr) && expr[0] === "define";
}

//Format: [fn a1 a2 ... an]
function is_fn_expr(expr) {
  return is_array(expr);
}

// ================ TASK 3A ================

/*function array_to_list(A) {
    // PREDECLARED
}*/

// ============== ENVIRONMENT FRAMES ===============

const the_empty_environment = null;

// frames are pairs with a list of names as head
// an a list of pairs as tail (values). Each value
// pair has the proper value as head and a flag
// as tail, which indicates whether assignment
// is allowed for the corresponding name

function make_frame(names, values) {
  return pair(names, values);
}
function frame_names(frame) {
  return head(frame);
}
function frame_values(frame) {
  return tail(frame);
}

// The first frame in an environment is the
// "innermost" frame. The tail operation
// takes you to the "enclosing" environment

function first_frame(env) {
  return head(env);
}
function enclosing_environment(env) {
  return tail(env);
}
function enclose_by(frame, env) {
  return pair(frame, env);
}
function is_empty_environment(env) {
  return is_null(env);
}

// name lookup proceeds from the innermost
// frame and continues to look in enclosing
// environments until the name is found

function lookup_name_value(name, env) {
  function env_loop(env) {
    function scan(names, vals) {
      return is_null(names)
        ? env_loop(enclosing_environment(env))
        : name === head(names)
        ? head(vals)
        : scan(tail(names), tail(vals));
    }
    if (is_empty_environment(env)) {
      error(name, "Unbound name: ");
    } else {
      const frame = first_frame(env);
      const value = scan(frame_names(frame), frame_values(frame));
      return value;
    }
  }
  return env_loop(env);
}

// Hack which allows insertion of new values into existing frame
function insert_into_frame(name, value, env) {
  const frame = first_frame(env);
  set_head(frame, pair(name, head(frame))); // name
  set_tail(frame, pair(value, tail(frame))); // name
}

function extend_environment(names, vals, base_env) {
  if (length(names) === length(vals)) {
    return enclose_by(make_frame(names, vals), base_env);
  } else if (length(names) < length(vals)) {
    error(
      "Too many arguments supplied: " +
        stringify(names) +
        ", " +
        stringify(vals)
    );
  } else {
    error(
      "Too few arguments supplied: " + stringify(names) + ", " + stringify(vals)
    );
  }
}

// ================ TASK 3B ================

/*const primitive_functions = list(
    // PREDECLARED
    );*/

function make_global_frame() {
  const primitive_function_names = map(f => head(f), primitive_functions);
  const primitive_function_values = map(
    f => head(tail(f)),
    primitive_functions
  );
  return extend_environment(
    primitive_function_names,
    primitive_function_values,
    the_empty_environment
  );
}

// ... other functions omitted ...

// ================= LET EXPRESSION ================
// ==================== Example ====================
//Format: [let*, [[id, val-expr] ... ], expr]

// Evaluates all the [[id1, expr1], [id2, expr2], ...]
// name-bindings.
// Each name binding is available for subsequent
// bindings to use
// Finally, the expr is evaluated in the newest frame
// Yes this generates an excessive number of frames

function eval_let(expr, frame) {
  const defns = array_to_list(expr[1]);
  const nexpr = expr[2];
  function extend(decl, frame) {
    const name = decl[0];
    const value = evaluate(decl[1], frame);
    return extend_environment(list(name), list(value), frame);
  }
  const newframe = accumulate(extend, frame, reverse(defns));
  return evaluate(nexpr, newframe);
}

// ================ TASK 3C ================

function eval_if_expr(expr, frame) {
  // YOUR SOLUTION HERE
  return evaluate(expr[1], frame)
    ? evaluate(expr[2], frame)
    : evaluate(expr[3], frame);
}

// Note: apply from the next part is predeclared
// This allows you to test (if (= 1 0) 1 0)

// Question 3D
// The following functions are predeclared:
// array_to_list
// eval_if_expr

function is_self_evaluating(expr) {
  return is_number(expr) || is_boolean(expr);
}

function evaluate(expr, frame) {
  if (is_self_evaluating(expr)) {
    return expr;
  } else if (is_variable(expr)) {
    return lookup_name_value(expr, frame);
  } else if (is_let_expr(expr)) {
    return eval_let(expr, frame);
  } else if (is_if_expr(expr)) {
    return eval_if_expr(expr, frame);
  } else if (is_fn_defn(expr)) {
    return eval_fn_defn(expr, frame);
  } else if (is_fn_expr(expr)) {
    const literal_function_expr = eval_fn_parameters(expr, frame);
    return apply(literal_function_expr);
  } else {
    return error("Unknown expression: " + stringify(expr));
  }
}

_export("evaluate", evaluate); // DO NOT EDIT

// Multiple statements are only possible if
// They are define statements.
// The last statement is the return value.
// This is true both in program and function definitions.
function eval_stmts(stmts, env) {
  const list_stmts = reverse(stmts);
  const rv_expr = head(list_stmts);
  const defns = reverse(tail(list_stmts));
  const new_env = extend_environment(null, null, env);
  const fn_objs = map(defn => eval_fn_defn(defn, new_env), defns);
  for_each(fobj => insert_into_frame(get_name(fobj), fobj, new_env), fn_objs);
  return evaluate(rv_expr, new_env);
}

function evaluate_program(stmts) {
  return eval_stmts(array_to_list(stmts), make_global_frame());
}

// ================ AST DEFINITIONS ================
function is_variable(expr) {
  return is_string(expr);
}

//Format: [let*, [[var, expr]], expr]
function is_let_expr(expr) {
  return is_array(expr) && expr[0] === "let*";
}

//Format: [if cond true-branch false-branch]
function is_if_expr(expr) {
  return is_array(expr) && expr[0] === "if";
}

//Format: [define [fname a1 a2 ... an] ... fn-defn ... body]
function is_fn_defn(expr) {
  return is_array(expr) && expr[0] === "define";
}

//Format: [fn a1 a2 ... an]
function is_fn_expr(expr) {
  return is_array(expr);
}

// ================ TASK 3A ================

/*function array_to_list(A) {
    // PREDECLARED
}*/

// ============== ENVIRONMENT FRAMES ===============

const the_empty_environment = null;

// frames are pairs with a list of names as head
// an a list of pairs as tail (values). Each value
// pair has the proper value as head and a flag
// as tail, which indicates whether assignment
// is allowed for the corresponding name

function make_frame(names, values) {
  return pair(names, values);
}
function frame_names(frame) {
  return head(frame);
}
function frame_values(frame) {
  return tail(frame);
}

// The first frame in an environment is the
// "innermost" frame. The tail operation
// takes you to the "enclosing" environment

function first_frame(env) {
  return head(env);
}
function enclosing_environment(env) {
  return tail(env);
}
function enclose_by(frame, env) {
  return pair(frame, env);
}
function is_empty_environment(env) {
  return is_null(env);
}

// name lookup proceeds from the innermost
// frame and continues to look in enclosing
// environments until the name is found

function lookup_name_value(name, env) {
  function env_loop(env) {
    function scan(names, vals) {
      return is_null(names)
        ? env_loop(enclosing_environment(env))
        : name === head(names)
        ? head(vals)
        : scan(tail(names), tail(vals));
    }
    if (is_empty_environment(env)) {
      error(name, "Unbound name: ");
    } else {
      const frame = first_frame(env);
      const value = scan(frame_names(frame), frame_values(frame));
      return value;
    }
  }
  return env_loop(env);
}

// Hack which allows insertion of new values into existing frame
function insert_into_frame(name, value, env) {
  const frame = first_frame(env);
  set_head(frame, pair(name, head(frame))); // name
  set_tail(frame, pair(value, tail(frame))); // name
}

function extend_environment(names, vals, base_env) {
  if (length(names) === length(vals)) {
    return enclose_by(make_frame(names, vals), base_env);
  } else if (length(names) < length(vals)) {
    error(
      "Too many arguments supplied: " +
        stringify(names) +
        ", " +
        stringify(vals)
    );
  } else {
    error(
      "Too few arguments supplied: " + stringify(names) + ", " + stringify(vals)
    );
  }
}

// ================ TASK 3B ================

/*const primitive_functions = list(
    // PREDECLARED
    );*/

function make_global_frame() {
  const primitive_function_names = map(f => head(f), primitive_functions);
  const primitive_function_values = map(
    f => head(tail(f)),
    primitive_functions
  );
  return extend_environment(
    primitive_function_names,
    primitive_function_values,
    the_empty_environment
  );
}

// ... other functions omitted ...

// ================= LET EXPRESSION ================
// ==================== Example ====================
//Format: [let*, [[id, val-expr] ... ], expr]

// Evaluates all the [[id1, expr1], [id2, expr2], ...]
// name-bindings.
// Each name binding is available for subsequent
// bindings to use
// Finally, the expr is evaluated in the newest frame
// Yes this generates an excessive number of frames

function eval_let(expr, frame) {
  const defns = array_to_list(expr[1]);
  const nexpr = expr[2];
  function extend(decl, frame) {
    const name = decl[0];
    const value = evaluate(decl[1], frame);
    return extend_environment(list(name), list(value), frame);
  }
  const newframe = accumulate(extend, frame, reverse(defns));
  return evaluate(nexpr, newframe);
}

// ================ TASK 3C ================
/*
function eval_if_expr(expr, frame) {
    // PREDECLARED
}
*/

// ================ TASK 3D ================
// ========= FUNCTION APPLICATION ==========

//Format: [fn a1 a2 ... an]

// Is a Primitive/Source function, not defined by user.
function is_simple_function(x) {
  return is_function(x);
}

function eval_fn_parameters(expr, frame) {
  return map(x => evaluate(x, frame), array_to_list(expr));
}

function apply(list_expr) {
  const fn = head(list_expr);
  const params = tail(list_expr);
  // DO NOT MODIFY BELOW
  if (is_simple_function(fn)) {
    return apply_in_underlying_javascript(fn, params);
  } else {
    return apply_user_function(fn, params);
  }
}

function apply_user_function(fn, params) {
  return error("Not implemented yet. Implement in 3E");
}

// Question 3E
// The following functions are predeclared:
// array_to_list
// eval_if_expr

function is_self_evaluating(expr) {
  return is_number(expr) || is_boolean(expr);
}

function evaluate(expr, frame) {
  if (is_self_evaluating(expr)) {
    return expr;
  } else if (is_variable(expr)) {
    return lookup_name_value(expr, frame);
  } else if (is_let_expr(expr)) {
    return eval_let(expr, frame);
  } else if (is_if_expr(expr)) {
    return eval_if_expr(expr, frame);
  } else if (is_fn_defn(expr)) {
    return eval_fn_defn(expr, frame);
  } else if (is_fn_expr(expr)) {
    const literal_function_expr = eval_fn_parameters(expr, frame);
    return apply(literal_function_expr);
  } else {
    return error("Unknown expression: " + stringify(expr));
  }
}

_export("evaluate", evaluate); // DO NOT EDIT

function eval_stmts(stmts, env) {
  const list_stmts = reverse(stmts);
  const rv_expr = head(list_stmts);
  const defns = reverse(tail(list_stmts));
  const new_env = extend_environment(null, null, env);
  const fn_objs = map(defn => eval_fn_defn(defn, new_env), defns);
  for_each(fobj => insert_into_frame(get_name(fobj), fobj, new_env), fn_objs);
  return evaluate(rv_expr, new_env);
}

function evaluate_program(stmts) {
  return eval_stmts(array_to_list(stmts), make_global_frame());
}

// ================ AST DEFINITIONS ================
function is_variable(expr) {
  return is_string(expr);
}

//Format: [let*, [[var, expr]], expr]
function is_let_expr(expr) {
  return is_array(expr) && expr[0] === "let*";
}

//Format: [if cond true-branch false-branch]
function is_if_expr(expr) {
  return is_array(expr) && expr[0] === "if";
}

//Format: [define [fname a1 a2 ... an] ... fn-defn ... body]
function is_fn_defn(expr) {
  return is_array(expr) && expr[0] === "define";
}

//Format: [fn a1 a2 ... an]
function is_fn_expr(expr) {
  return is_array(expr);
}

// ================ TASK 3A ================

/*function array_to_list(A) {
    // PREDECLARED
}*/

// ============== ENVIRONMENT FRAMES ===============

const the_empty_environment = null;

// frames are pairs with a list of names as head
// an a list of pairs as tail (values). Each value
// pair has the proper value as head and a flag
// as tail, which indicates whether assignment
// is allowed for the corresponding name

function make_frame(names, values) {
  return pair(names, values);
}
function frame_names(frame) {
  return head(frame);
}
function frame_values(frame) {
  return tail(frame);
}

// The first frame in an environment is the
// "innermost" frame. The tail operation
// takes you to the "enclosing" environment

function first_frame(env) {
  return head(env);
}
function enclosing_environment(env) {
  return tail(env);
}
function enclose_by(frame, env) {
  return pair(frame, env);
}
function is_empty_environment(env) {
  return is_null(env);
}

// name lookup proceeds from the innermost
// frame and continues to look in enclosing
// environments until the name is found

function lookup_name_value(name, env) {
  function env_loop(env) {
    function scan(names, vals) {
      return is_null(names)
        ? env_loop(enclosing_environment(env))
        : name === head(names)
        ? head(vals)
        : scan(tail(names), tail(vals));
    }
    if (is_empty_environment(env)) {
      error(name, "Unbound name: ");
    } else {
      const frame = first_frame(env);
      const value = scan(frame_names(frame), frame_values(frame));
      return value;
    }
  }
  return env_loop(env);
}

// Hack which allows insertion of new values into existing frame
function insert_into_frame(name, value, env) {
  const frame = first_frame(env);
  set_head(frame, pair(name, head(frame))); // name
  set_tail(frame, pair(value, tail(frame))); // name
}

// applying a compound function to parameters will
// lead to the creation of a new environment, with
// respect to which the body of the function needs
// to be evaluated
// (also used for blocks)

function extend_environment(names, vals, base_env) {
  if (length(names) === length(vals)) {
    return enclose_by(make_frame(names, vals), base_env);
  } else if (length(names) < length(vals)) {
    error(
      "Too many arguments supplied: " +
        stringify(names) +
        ", " +
        stringify(vals)
    );
  } else {
    error(
      "Too few arguments supplied: " + stringify(names) + ", " + stringify(vals)
    );
  }
}

// ================ TASK 3B ================

/*const primitive_functions = list(
    // PREDECLARED
    );*/

function make_global_frame() {
  const primitive_function_names = map(f => head(f), primitive_functions);
  const primitive_function_values = map(
    f => head(tail(f)),
    primitive_functions
  );
  return extend_environment(
    primitive_function_names,
    primitive_function_values,
    the_empty_environment
  );
}

// ... other functions omitted ...

// ================= LET EXPRESSION ================
// ==================== Example ====================
//Format: [let*, [[id, val-expr] ... ], expr]

// Evaluates all the [[id1, expr1], [id2, expr2], ...]
// name-bindings.
// Each name binding is available for subsequent
// bindings to use
// Finally, the expr is evaluated in the newest frame
// Yes this generates an excessive number of frames

function eval_let(expr, frame) {
  const defns = array_to_list(expr[1]);
  const nexpr = expr[2];
  function extend(decl, frame) {
    const name = decl[0];
    const value = evaluate(decl[1], frame);
    return extend_environment(list(name), list(value), frame);
  }
  const newframe = accumulate(extend, frame, reverse(defns));
  return evaluate(nexpr, newframe);
}

// ================ TASK 3C ================
/*
function eval_if_expr(expr, frame) {
    // PREDECLARED
}
*/

// ================ TASK 3D ================
// ========= FUNCTION APPLICATION ==========

//Format: [fn a1 a2 ... an]

// Is a Primitive/Source function, not defined by user.
function is_simple_function(x) {
  return is_function(x);
}

function eval_fn_parameters(expr, frame) {
  return map(x => evaluate(x, frame), array_to_list(expr));
}

/*
function apply(list_expr) {
    // PREDEFINED
    if(is_simple_function(fn)) {
        return apply_in_underlying_javascript(fn, params);
    } else {
        return apply_user_function(fn, params);
    }
}
*/

// ==================== Task 2E ====================
// ============= USER DEFINED FUNCTIONS ============
//Format: [define [fname a1 a2 ... an] ... fn-defn ... body]

// Create a new function object from the expr
// The new function object should extend the current env
function eval_fn_defn(expr, env) {
  // YOUR SOLUTION HERE
  let lst_expr = array_to_list(expr);
  let name_and_params = array_to_list(list_ref(lst_expr, 1));
  display(name_and_params);

  return make_function_object(
    head(name_and_params),
    tail(name_and_params),
    tail(tail(lst_expr)),
    env
  );
}

function make_function_object(fname, params, body, frame) {
  // YOUR SOLUTION HERE
  return [fname, params, body, frame];
}

function get_name(user_function) {
  // YOUR SOLUTION HERE
  return user_function[0];
}

function get_params(user_function) {
  // YOUR SOLUTION HERE
  return user_function[1];
}

function get_body(user_function) {
  // YOUR SOLUTION HERE
  return user_function[2];
}

function get_frame(user_function) {
  // YOUR SOLUTION HERE
  user_function[3];
}

//Hint: eval_stmts
function apply_user_function(user_function, literal_call_params) {
  // YOUR SOLUTION HERE
  const new_env = extend_environment(
    get_params(user_function),
    literal_call_params,
    get_frame(user_function)
  );

  return eval_stmts(get_body(user_function), new_env);
}

_export("apply_user_function", apply_user_function); // DO NOT EDIT

// DO NOT EDIT: THESE ARE FOR TESTING
const f = ["define", ["f", "x"], ["+", "x", "x"]];

const neg = ["define", ["neg", "x"], ["-", 0, "x"]];

const fact_fn = [
  "define",
  ["fact", "n"],
  ["if", ["=", "n", 0], 1, ["*", "n", ["fact", ["-", "n", 1]]]]
];

const thrice = [
  "define",
  ["thrice", "f"],
  ["define", ["g", "x"], ["f", ["f", ["f", "x"]]]],
  "g"
];

const add_one = ["define", ["add_one", "x"], ["+", "x", 1]];
