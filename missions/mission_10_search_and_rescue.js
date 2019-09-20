function binary_search_tree_to_string(bst) {
  // Your answer here
  return is_empty_tree(bst)
    ? ""
    : binary_search_tree_to_string(left_branch(bst)) +
        entry(bst) +
        "; " +
        binary_search_tree_to_string(right_branch(bst));
}

const h = make_tree("h", make_empty_tree(), make_empty_tree());
const a = make_tree("a", make_empty_tree(), make_empty_tree());
const n = make_tree("n", h, make_empty_tree());
const c = make_tree("c", a, make_empty_tree());
const test_bst = make_tree("e", c, n);

// Test

//binary_search_tree_to_string(test_bst);

//binary_search_tree_to_string(cadet_names);

// Question 2
function insert(bst, item) {
  // your solution goes here
  function insert_helper(bst, item) {
    return is_empty_tree(bst)
      ? make_tree(item, null, null)
      : item < entry(bst)
      ? make_tree(
          entry(bst),
          insert_helper(left_branch(bst), item),
          right_branch(bst)
        )
      : make_tree(
          entry(bst),
          left_branch(bst),
          insert_helper(right_branch(bst), item)
        );
  }

  return insert_helper(bst, item);
}

// Copy your binary_search_tree_to_string function here from the previous task
function binary_search_tree_to_string(bst) {
  return is_empty_tree(bst)
    ? ""
    : binary_search_tree_to_string(left_branch(bst)) +
        entry(bst) +
        "; " +
        binary_search_tree_to_string(right_branch(bst));
}

// Test

// binary_search_tree_to_string(insert(make_empty_tree(), "x"));
// Should produce "x; "

// const bst = accumulate((item, bst) =>
//                           insert(bst, item),
//                       make_empty_tree(),
//                       list("g", "a", "r", "x", "p"));
// binary_search_tree_to_string(bst);
// Should produce "a; g; p; r; x; "

// const cadet_names_with_aaaron =  insert(cadet_names, "AAARON");
// binary_search_tree_to_string(cadet_names_with_aaaron);
// Should produce "AAARON; ..."

// Question 3
function find(bst, name) {
  // Your answer here
  return is_empty_tree(bst)
    ? false
    : equal(entry(bst), name)
    ? true
    : find(left_branch(bst), name) || find(right_branch(bst), name);
}

// Test
find(cadet_names, "LEE WEI MIN");

// Question 4
// Part 1
const bst1 = make_tree(
  "a",
  make_empty_tree(),
  make_tree(
    "b",
    make_empty_tree(),
    make_tree(
      "c",
      make_empty_tree(),
      make_tree(
        "d",
        make_empty_tree(),
        make_tree(
          "e",
          make_empty_tree(),
          make_tree(
            "f",
            make_empty_tree(),
            make_tree("hello", make_empty_tree(), make_empty_tree())
          )
        )
      )
    )
  )
);

// Part 2
const bst2 = make_tree(
  "hello",
  make_tree(
    "b",
    make_tree("a", make_empty_tree(), make_empty_tree()),
    make_tree("c", make_empty_tree(), make_empty_tree())
  ),
  make_tree(
    "j",
    make_tree("i", make_empty_tree(), make_empty_tree()),
    make_tree("k", make_empty_tree(), make_empty_tree())
  )
);

// Part 3
const part3 = "Theta(log(n))";
