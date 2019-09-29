// Question 1
// Part A
function conditional(a, b, c) {
  if (a) {
    return b();
  } else {
    return c();
  }
}

// Part B
const True = (x, y) => x;

const False = (x, y) => y;

// Part C
function simple_conditional(a, b, c) {
  if (a) {
    return b;
  } else {
    return c;
  }
}

// Question 2
// Part A
const diff = x => y => y - x;

// Question 3
// Part A
compose1(square, add_one)(7);

// Part B
compose2(square, add_one(7));

// Question 4
// Part A
function list_to_tsil(xs) {
  return is_null(xs) ? null : pair(list_to_tsil(tail(xs)), head(xs));
}

// Question 5
// Part A

// No

// Part B
function sum_of_list(xs) {
  function sum_of_list_helper(xs, current_sum) {
    return is_null(xs)
      ? current_sum
      : sum_of_list_helper(tail(xs), current_sum + head(xs));
  }

  return sum_of_list_helper(xs, 0);
}

// Part C
function multi_map(f, xss) {
  return is_null(head(xss))
    ? null
    : pair(f(map(head, xss)), multi_map(f, map(tail, xss)));
}

// Question 6
// Part A
function make_cordinates(row, column) {
  return pair(row, column);
}

function get_x(coordinates) {
  return head(coordinates);
}
function get_y(coordinates) {
  return tail(coordinates);
}

// Part B
function access(coordinates, grid) {
  return list_ref(list_ref(grid, get_x(coordinates)), get_y(coordinates));
}

// Part C
// Theta(n)

// Part D
function all_different(xs) {
  return is_null(xs)
    ? true
    : is_null(member(head(xs), tail(xs))) && all_different(tail(xs));
}

// Theta(n^2)

// Part F
function make_row_coordinates_list(row) {
  function make_row_coordinates_col_helper(cols) {
    return cols < 0
      ? null
      : pair(
          make_cordinates(row, cols),
          make_row_coordinates_col_helper(cols - 1)
        );
  }
}

// Suggested solution
function make_row_coordinates_list(row) {
    return build_list (9, col => make_coordinates (row ,col);
}

// Part G
function test_coordinates_list(grid , coordinates_list) {
    const xs = map(coordinates => access(coordinates , grid), coordinates_list);
    return all_different(xs);
}

// Part H
function test_sudoku (grid) {
    return accumulate((coordinates_list , sofar) => sofar && test_coordinates_list(grid , coordinates_list),
    true,
    make_sudoku_coordinates_list_list());
}