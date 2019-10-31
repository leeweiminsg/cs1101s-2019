// Question 1
// Modifed parts are commented as:
/*  MODIFIED  */

/*
Evaluator for a calculator language (subset of Source §1)

This is an evaluator for a language that can carry
out simple arithmetic calculations. 

The covered sublanguage of Source §1 is:

statement  ::= expression ;
expression ::= expression binop expression
            |  number
            |  ( expression )
binop      ::= + | - | * | / | %

The usual operator precedences apply, and parentheses
can be used freely.

Note that the evaluator is a bit more complex
than necessary, to be consistent with the more
powerful evaluators that will follow.
*/

/*
CONSTANTS: NUMBERS
*/

// numbers are considered
// "self-evaluating". This means, they
// represent themselves in the syntax tree
function is_self_evaluating(stmt) {
  return is_number(stmt);
}

// all other statements and expressions are
// tagged lists. Their tags tell us what
// kind of expression they are.
function is_tagged_list(stmt, the_tag) {
  return is_pair(stmt) && head(stmt) === the_tag;
}

/* NAMES */

// In this evaluator, the operators are referred
// to as "names" in expressions.

// Names are tagged with "name".
// In this evaluator, typical names
// are
// list("name", "+")
// and
// list("name", "pair")

function is_name(stmt) {
  return is_tagged_list(stmt, "name");
}

function name_of_name(stmt) {
  return head(tail(stmt));
}

/* OPERATOR APPLICATION */

// The core of our evaluator is formed by the
// implementation of operator applications.
// Applications are tagged with "application"
// and have an "operator" and "operands"
function is_application(stmt) {
  return is_tagged_list(stmt, "application");
}
function operator(stmt) {
  return head(tail(stmt));
}
function operands(stmt) {
  return head(tail(tail(stmt)));
}
function no_operands(ops) {
  return is_null(ops);
}
function first_operand(ops) {
  return head(ops);
}
function rest_operands(ops) {
  return tail(ops);
}

/* PRIMITIVE FUNCTION OBJECTS */

// our primitive operators are represented
// by primimitive function values, which
// are objects tagged with "primitive"
function is_primitive_function(fun) {
  return is_tagged_list(fun, "primitive");
}
function primitive_implementation(fun) {
  return head(tail(fun));
}
function make_primitive_function(impl) {
  return list("primitive", impl);
}

// thankfully our parser distinguishes the applications
// of lazy boolean operators using the special tag
// "boolean_operation"
function is_boolean_operation(stmt) {
  return is_tagged_list(stmt, "boolean_operation");
}

/* APPLY */

// apply_in_underlying_javascript allows us
// to make use of JavaScript's primitive functions
// in order to access operators such as addition
function apply_primitive_function(fun, argument_list) {
  return apply_in_underlying_javascript(
    primitive_implementation(fun),
    argument_list
  );
}

// all functions in this language are primitive
// functions: built-in functions as given in the
// global environment
function apply(fun, args) {
  if (is_primitive_function(fun)) {
    return apply_primitive_function(fun, args);
  } else {
    error("Unknown function type in apply: ", fun);
  }
}

// list_of_values evaluates a given
// list of expressions
function list_of_values(exps) {
  if (no_operands(exps)) {
    return null;
  } else {
    return pair(
      evaluate(first_operand(exps)),
      list_of_values(rest_operands(exps))
    );
  }
}

/* ENVIRONMENT */

// we store our primitive functions in a data structure called
// environment, which is a list of frames.
//
// In this evaluator, there is only one frame, the global frame,
// and only one environment, the global environment.
//
// A frame is a pair consisting of a list of names and a list
// of corresponding values.

/*  MODIFIED: Part A  */
const primitive_functions = list(
  pair("+", (x, y) => x + y),
  pair("-", (x, y) => x - y),
  pair("*", (x, y) => x * y),
  pair("/", (x, y) => x / y),
  pair("%", math_pow)
);

const the_empty_environment = null;

// We store our primitive functions as objects tagged as "primitive".
// The actual functions are in property "implementation".
// We store the primitive functions in a global environment that
// consists of one single frame: the global frame, which is
// initially empty.
function setup_environment() {
  const primitive_function_names = map(f => head(f), primitive_functions);
  const primitive_function_values = map(
    f => make_primitive_function(tail(f)),
    primitive_functions
  );
  return extend_environment(
    primitive_function_names,
    primitive_function_values,
    the_empty_environment
  );
}

function make_frame(names, values) {
  return pair(names, values);
}

function extend_environment(names, vals, base_env) {
  return pair(make_frame(names, vals), base_env);
}

const the_global_environment = setup_environment();

// with such a simple global environment,
// looking up a name is very easy...
function lookup_name_value(name) {
  const frame = head(the_global_environment);
  function scan(names, vals) {
    return is_null(names)
      ? error(name, "name not found: ")
      : name === head(names)
      ? head(vals)
      : scan(tail(names), tail(vals));
  }
  return scan(head(frame), tail(frame));
}

/* EVALUATE */

// The workhorse of our evaluator is the evaluate function.
// It dispatches on the kind of statement at hand, and
// invokes the appropriate implementations of their
// evaluation process, as described above.
function evaluate(stmt) {
  return is_self_evaluating(stmt)
    ? stmt
    : is_name(stmt)
    ? lookup_name_value(name_of_name(stmt))
    : is_boolean_operation(stmt)
    ? eval_boolean_operation(stmt)
    : is_application(stmt)
    ? apply(evaluate(operator(stmt)), list_of_values(operands(stmt)))
    : error(stmt, "Unknown expression type in evaluate: ");
}

// evaluation of laziness avoids evaluation of
// the right-hand side, if the evaluation of the
// left-hand side already determines the result
function eval_boolean_operation(stmt) {
  if (operator(stmt) === "&&") {
    if (is_true(evaluate(first_operand(operands(stmt))))) {
      return evaluate(first_operand(rest_operands(operands(stmt))));
    } else {
      return false;
    }
  } else {
    if (is_true(evaluate(first_operand(operands(stmt))))) {
      return true;
    } else {
      return evaluate(first_operand(rest_operands(operands(stmt))));
    }
  }
}

// For single-statement programs, the parse function returns
// a one-element list. The element is the expression statement,
// which we pass to evaluate
function parse_and_evaluate(str) {
  return evaluate(parse(str));
}

/*
example for self-evaluating statement:
is_self_evaluating(12);
evaluate(parse("1;"));

peek into the primitive operations:
head(tail(lookup_name_value("+")))(3,4);


a typical calculator program:
const my_prog = "1 + 3 * 4;";
const my_parse_tree = parse("1 + 3 * 4;");
stringify(my_parse_tree);
evaluate(my_parse_tree);

program examples:
parse_and_evaluate("1;");
head(tail(lookup_name_value("+")))(3,4);
parse_and_evaluate("1 + 1;");
parse_and_evaluate("1 + 3 * 4;");
parse_and_evaluate("0 / 0;");
parse_and_evaluate("1.4 / 2.3 + 70.4 * 18.3;");

*/

// No, interpreter evaluates b % e before applying it with % n
// Change order of evaluation: evaluate right operand first
