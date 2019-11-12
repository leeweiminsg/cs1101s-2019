// Question 2A
// The following are provided for you:

function make_point(x, y) {
  return pair(x, y);
}

function x_of(pt) {
  return head(pt);
}

function y_of(pt) {
  return tail(pt);
}

// Given a list of points xs
// Returns a pair of two items
// The first item is the point with the smallest x value
// The second item is the point with largest x value

function extremes(xs) {
  // YOUR SOLUTION HERE
  function update(pt, accum) {
    if (x_of(pt) < head(head(accum))) {
      set_head(accum, pt);
    } else {
    }

    if (x_of(pt) > head(tail(accum))) {
      set_tail(accum, pt);
    } else {
    }

    return accum;
  }

  return accumulate(update, pair(head(xs), head(xs)), xs);
}

// Question 2B
// The following are provided for you:

function make_point(x, y) {
  return pair(x, y);
}

function x_of(pt) {
  return head(pt);
}

function y_of(pt) {
  return tail(pt);
}

// Suppose you are standing at a point A and facing B
// Determines if a point P is to the left, right or on the line AB.
// Returns
// 1 if P is to the left of the line AB
// 0 if P is on the line AB
// -1 if P is to the right of the line AB

function sign(A, B, P) {
  const s_x = x_of(A) - x_of(P);
  const s_y = y_of(A) - y_of(P);
  const t_x = x_of(B) - x_of(P);
  const t_y = y_of(B) - y_of(P);
  const m = s_x * t_y - t_x * s_y;
  return m === 0 ? m : m / math_abs(m);
}

// Given the endpoints of a line v_1 and v_2 and a list of points xs
// Returns a pair of two items
// The first item is the list of all points to left or on the line
// The second item is the list of all points to right of the line
function partition(v_1, v_2, xs) {
  // YOUR SOLUTION HERE
  let left = filter(pt => sign(v_1, v_2, pt) >= 0, xs);
  let right = filter(pt => sign(v_1, v_2, pt) < 0, xs);

  return pair(left, right);
}

// TEST CASE 1/2, DO NOT EDIT:
const a1 = make_point(0, -1);
const b1 = make_point(0, 1);
const pts1 = list(make_point(1, 0));

// TEST CASE 3/4, DO NOT EDIT:
/* partition(a2, b2, pts2); and partition(b2, a2, pts2);
[0, 0] should be in the left partition. */
const a2 = make_point(-1, -1);
const b2 = make_point(1, 1);
const pts2 = list(make_point(-1, 1), make_point(0, 0), make_point(1, -1));

// TEST CASE 5, DO NOT EDIT:

const l_1 = make_point(-1.0, 5.5);
const l_2 = make_point(7.0, 4.5);
const p_1 = make_point(2.0, 5.0);
const p_2 = make_point(5.0, 5.5);
const p_3 = make_point(2.5, 7.0);
const p_4 = make_point(5.5, 4.0);
const s = list(p_1, p_2, p_3, p_4);

// Question 2C
// The following are provided for you:

function make_point(x, y) {
  return pair(x, y);
}

function x_of(pt) {
  return head(pt);
}

function y_of(pt) {
  return tail(pt);
}

// Suppose you are standing at a point A and facing B
// Determines if a point P is to the left, right or on the line AB.
// Returns
// 1 if P is to the left of the line AB
// 0 if P is on the line AB
// -1 if P is to the left of the line AB
function sign(A, B, P) {
  const s_x = x_of(A) - x_of(P);
  const s_y = y_of(A) - y_of(P);
  const t_x = x_of(B) - x_of(P);
  const t_y = y_of(B) - y_of(P);
  const m = s_x * t_y - t_x * s_y;
  return m === 0 ? m : m / math_abs(m);
}

function distance(A, B) {
  const s_x = x_of(B) - x_of(A);
  const s_y = y_of(B) - y_of(A);
  return math_sqrt(s_x * s_x + s_y * s_y);
}

// Given a line AB, determines the perpendicular distance to P.
function perp_distance(A, B, P) {
  const s_x = x_of(A) - x_of(P);
  const s_y = y_of(A) - y_of(P);
  const t_x = x_of(B) - x_of(P);
  const t_y = y_of(B) - y_of(P);
  const m = s_x * t_y - t_x * s_y;
  const d = distance(A, B);
  return math_abs(m / d);
}

// Given a list of points xs
// Returns the point with the greatest
// perpendicular distance from the line V1V2

function furthest(V1, V2, xs) {
  // YOUR SOLUTION HERE
  return accumulate(
    (pt, max_dist_pt) =>
      perp_distance(V1, V2, pt) > perp_distance(V1, V2, max_dist_pt)
        ? pt
        : max_dist_pt,
    head(xs),
    xs
  );
}

// TEST CASE 1, DO NOT EDIT:
const a1 = make_point(0, -1);
const b1 = make_point(0, 1);
const pts1 = list(
  make_point(-1, 0),
  make_point(0, 0),
  make_point(1, 0),
  make_point(2, 0)
);

// TEST CASE 2, DO NOT EDIT:
const a2 = make_point(-1, -1);
const b2 = make_point(1, 1);
const pts2 = list(
  make_point(2, 0),
  make_point(-1, 1),
  make_point(2, 1),
  make_point(0, 0),
  make_point(1, -1)
);

// Question 2D

// Question 3A
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
  return eval_stmts(array_to_list(stmts), make_global_environment());
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

// .... Other functions omitted ...
