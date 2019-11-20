// Question 1A1
function last_member(x, xs) {
  function find_last_member(ys, current_last) {
    let next = member(x, ys);
    // WRITE INSIDE THE BOX

    if (is_null(next)) {
      return current_last;
    } else {
      return find_last_member(tail(next), next);
    }
  }

  return find_last_member(xs, null);
}

// Question 1A2
// Theta(n)

// QUestion 1A3
// Theta(1)

// Question 1B
function is_subset(S, T) {
  if (is_null(S)) {
    return true;
  } else if (is_null(T)) {
    return false;
  } else if (head(S) < head(T)) {
    return false;
  } else if (head(S) === head(T)) {
    return is_subset(tail(S), tail(T));
  } else {
    return is_subset(S, tail(T));
  }
}

// Question 1C1
// structurally equal to list(1, 3, 5, 7);
// structurally equal to list(2, 4, 7);

// Question 1C2
// structurally equal to list("A", "T", "Q", "U", "R", "P");

// Question 1D
function mutable_append(xs, ys) {
  if (is_null(xs)) {
    return ys;
  } else {
    set_tail(xs, mutable_append(tail(xs)), ys);
    return xs;
  }
}

// Question 1E
function display_tree(tree) {
  if (is_null(tree)) {
  } else if (is_list(head(tree))) {
    display_tree(head(tree));
    display_tree(tail(tree));
  } else {
    display(stringify(head(tree)) + " ");
    display_tree(tail(tree));
  }
}

function transform_tree(t) {
  return reverse(map(x => (is_list(x) ? transform_tree(x) : x), t));
}

// My long solution
function transform_tree(t) {
  function helper(curr_t, t) {
    if (is_null(t)) {
      return curr_t;
    } else if (is_number(head(t))) {
      let new_t = pair(head(t), curr_t);

      return helper(new_t, tail(t));
    } else {
      let new_t_first = transform_tree(tail(t));
      let new_t_second = transform_tree(head(t));

      return append(list(new_t_first, new_t_second), list(curr_t));
    }
  }

  return helper(null, t);
}

// Example:
let tree1 = list(1, 2, 3, list(4, 5)); // a tree of numbers
let tree2 = transform_tree(tree1);
display_tree(tree1); // displays a sequence of numbers
display_tree(tree2); // displays a reverse of the above

// Question 1F
function shorten_stream(s, k) {
  if (is_null(s) || k <= 0) {
    return null;
  } else {
    return pair(head(s), () => shorten_stream(stream_tail(s), k - 1));
  }
}

// Question 2
let A_node = list("A");
let B_node = list("B");
let C_node = list("C");
let D_node = list("D");
let E_node = list("E");
set_tail(A_node, list(B_node, C_node));
set_tail(B_node, list(A_node, C_node));
set_tail(C_node, list(B_node, A_node, D_node));
set_tail(D_node, list(C_node));

// Question 2B
function is_linked(x, y) {
  return !is_null(member(y, x));
}

// My long solution
function is_linked(x, y) {
  if (is_null(tail(x)) || is_null(tail(y))) {
    return false;
  } else {
    return !is_null(filter(node => equal(head(node), head(y)), tail(x)));
  }
}

// Tests
is_linked(B_node, C_node); // returns true
is_linked(B_node, D_node); // returns false
is_linked(C_node, E_node); // returns false

// Question 2C
function is_proper(x) {
  return accumulate(
    (node, result) => result && is_linked(x, node) && is_linked(node, x),
    true,
    tail(x)
  );
}

// Question 2D
function is_connected(x, y) {
  if (x === y) {
    return true;
  } else if (is_linked(x, y)) {
    return true;
  } else {
    let x_tail = tail(x);
    set_tail(x, null);
    let res = accumulate((a, b) => is_connected(a, y) || b, false, x_tail);
    set_tail(x, x_tail);
    return res;
  }
}

// Tests
is_connected(B_node, C_node); // returns true
is_connected(A_node, D_node); // returns true
is_connected(A_node, E_node); // returns false
is_connected(E_node, E_node); // returns true

// Question 3
function plus(x, y) {
  return x + y;
}

function plus_cps(x, y, ret) {
  return ret(x + y);
}

// Question 3A
function sum_cps(x, y, z, ret) {
  return plus_cps(
    plus_cps(x, y, x => x),
    z,
    ret
  );
}
sum_cps(1, 2, 3, display); // displays the value 6

// Alternative
function sum_cps(x, y, z, ret) {
  return plus_cps(x, y, x_plus_y => plus_cps(x_plus_y, z, ret));
}

// Question 3B
function factorial_cps(n, ret) {
  if (n <= 0) {
    return ret(1);
  } else {
    return factorial_cps(n - 1, result => ret(n * result));
  }
}

factorial_cps(5, display); // displays the value 120

// Question 3C
function fact_iter_cps(n, acc, ret) {
  if (n <= 0) {
    return ret(acc);
  } else {
    return fact_iter_cps(n - 1, acc * n, ret);
  }
}

function factorial_iter_cps(n, ret) {
  return fact_iter_cps(n, 1, ret);
}

factorial_iter_cps(5, display); // displays 120

// Question 4B
function make_compound_function(parameters, body, env) {
  return list("compound_function", parameters, body, env);
}
function function_body(f) {
  return list_ref(f, 2);
}

function hot_reload(cf1, cf2) {
  set_head(function_body(cf1), head(function_body(cf2)));
}

// Tests
function h(x) {
  return x + 1;
}
let p = pair(h, null);
display(head(p))(3); // displays 4
hot_reload(h, x => x * 2);
display(head(p))(3); // displays 6
