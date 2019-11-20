// Question 1B
function similar(nt1, nt2) {
  if (is_null(nt1) && is_null(nt2)) {
    return true;
  } else if (is_number(nt1) && is_number(nt2)) {
    return nt1 === nt2 || nt1 + 1 === nt2 || nt2 + 1 === nt1;
  } else if (is_list(nt1) && is_list(nt2)) {
    return similar(head(nt1), head(nt2)) && similar(tail(nt2), tail(nt2));
  } else {
    return false;
  }
}

// Question 1C
function differences(nt1, nt2) {
  if (is_null(nt1)) {
    return 0;
  } else if (is_number(nt1)) {
    return nt1 === nt2 ? 0 : 1;
  } else {
    return (
      differences(head(nt1), head(nt2)) + differences(tail(nt1), tail(nt2))
    );
  }
}

// Question 1D
function increment(nt) {
  return map_tree(function(x) {
    return x + 1;
  }, nt);
}

// Question 3A
function array_with_zeros(n) {
  let a = [];
  for (let i = 0; i < n; i = i + 1) {
    a[i] = 0;
  }
  return a;
}

// Question 3B
function make_histogram(array, max) {
  let len = array_length(array);
  let histogram = array_with_zeros(max + 1);
  for (let i = 0; i < len; i = i + 1) {
    histogram[array[i]] = histogram[array[i]] + 1;
  }
  return histogram;
}

// Question 3C
function enter_copies(a, n, value, from) {
  if (n === 0) {
    // done
  } else {
    a[from] = value;
    enter_copies(a, n - 1, value, from + 1);
  }
}

// Question 3D
function generate_sorted(histogram) {
  let sorted_array = [];
  let len = array_length(histogram);
  let sorted_pointer = 0;

  for (let i = 0; i < len; i = i + 1) {
    enter_copies(sorted_array, histogram[i], i, sorted_pointer);
    sorted_pointer = sorted_pointer + histogram[i];
  }

  return sorted_array;
}

// Question 5A
function distinct(xs) {
  if (is_null(xs) || is_null(tail(xs))) {
    return true;
  } else if (is_null(member(head(xs), tail(xs)))) {
    return distinct(tail(xs));
  } else {
    return false;
  }
}

function evaluate_function_definition(stmt, env) {
  let params = function_definition_parameters(stmt);
  if (distinct(params)) {
    return make_compound_function(
      map(name_of_name, function_definition_parameters(stmt)),
      function_definition_body(stmt),
      env
    );
  } else {
    display("parameters in function definition not unique");
  }
}

// Question 5C
