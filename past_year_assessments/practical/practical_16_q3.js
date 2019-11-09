// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.

////////////////////////////////////////////////////////////
// Question 3A
////////////////////////////////////////////////////////////

function evaluate_BAE_tree(bae_tree) {
  // WRITE HERE.
  if (is_number(bae_tree)) {
    return bae_tree;
  } else {
    let l = evaluate_BAE_tree(head(bae_tree));
    let r = evaluate_BAE_tree(head(tail(tail(bae_tree))));
    let op = head(tail(bae_tree));

    if (op === "+") {
      return l + r;
    } else if (op === "-") {
      return l - r;
    } else if (op === "*") {
      return l * r;
    } else {
      return l / r;
    }
  }
}

////////////////////////////////////////////////////////////
// Question 3B
////////////////////////////////////////////////////////////

function build_BAE_tree(bae_list) {
  // WRITE HERE.`
  let next = bae_list;

  function build_tree() {
    if (equal(head(next), "(")) {
      next = tail(next);
      let left_tree = build_tree();
      let op = head(next);
      next = tail(next);
      let right_tree = build_tree();
      next = tail(next);

      return list(left_tree, op, right_tree);
    } else {
      let n = head(next);
      next = tail(next);

      return n;
    }
  }

  return build_tree();
}

////////////////////////////////////////////////////////////
// Question 3C
////////////////////////////////////////////////////////////

function evaluate_BAE(bae_list) {
  // WRITE HERE.
  return evaluate_BAE_tree(build_BAE_tree(bae_list));
}

////////////////////////////////////////////////////////////
// Question 3D
////////////////////////////////////////////////////////////

function check_parentheses(paren_list) {
  // WRITE HERE.
  let count = 0;

  function helper(xs) {
    if (is_null(xs)) {
      return count === 0;
    } else if (count < 0) {
      return false;
    } else {
      count = head(xs) === "(" ? count + 1 : count - 1;
      return helper(tail(xs));
    }
  }

  return helper(paren_list);
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

//===========================================================
// This function is provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===========================================================
function assert(f, test_name, fnames) {
  display(test_name + ": " + (f() ? "PASS" : "FAIL"));
}
//===========================================================

////////////////////////////////////////////////////////////
// Test Cases for Q3A
////////////////////////////////////////////////////////////

assert(
  () => {
    const bae_tree = 23;
    return equal(evaluate_BAE_tree(bae_tree), 23);
  },
  "Q3A-T1",
  ["evaluate_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(5, "*", 6);
    return equal(evaluate_BAE_tree(bae_tree), 30);
  },
  "Q3A-T2",
  ["evaluate_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(5, "*", list(7, "+", 3));
    return equal(evaluate_BAE_tree(bae_tree), 50);
  },
  "Q3A-T3",
  ["evaluate_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(list(8, "-", 2), "*", list(7, "+", 3));
    return equal(evaluate_BAE_tree(bae_tree), 60);
  },
  "Q3A-T4",
  ["evaluate_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(list(list(20, "/", 2), "-", 2), "*", list(7, "+", 3));
    return equal(evaluate_BAE_tree(bae_tree), 80);
  },
  "Q3A-T5",
  ["evaluate_BAE_tree"]
);

assert(
  () => {
    const bae_tree = 100;
    return equal(evaluate_BAE_tree(bae_tree), 100);
  },
  "Q3A-T6",
  ["evaluate_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(70, "-", 15);
    return equal(evaluate_BAE_tree(bae_tree), 55);
  },
  "Q3A-T7",
  ["evaluate_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(
      list(list(7, "+", 5), "*", 3),
      "/",
      list(list(20, "/", 2), "-", list(100, "-", 94))
    );
    return equal(evaluate_BAE_tree(bae_tree), 9);
  },
  "Q3A-T8",
  ["evaluate_BAE_tree"]
);

////////////////////////////////////////////////////////////
// Test Cases for Q3B
////////////////////////////////////////////////////////////

assert(
  () => {
    const bae_tree = 23;
    const bae_list = list(23);
    return equal(build_BAE_tree(bae_list), bae_tree);
  },
  "Q3B-T1",
  ["build_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(5, "*", 6);
    const bae_list = list("(", 5, "*", 6, ")");
    return equal(build_BAE_tree(bae_list), bae_tree);
  },
  "Q3B-T2",
  ["build_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(5, "*", list(7, "+", 3));
    const bae_list = list("(", 5, "*", "(", 7, "+", 3, ")", ")");
    return equal(build_BAE_tree(bae_list), bae_tree);
  },
  "Q3B-T3",
  ["build_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(list(8, "-", 2), "*", list(7, "+", 3));
    const bae_list = list(
      "(",
      "(",
      8,
      "-",
      2,
      ")",
      "*",
      "(",
      7,
      "+",
      3,
      ")",
      ")"
    );
    return equal(build_BAE_tree(bae_list), bae_tree);
  },
  "Q3B-T4",
  ["build_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(list(list(20, "/", 2), "-", 2), "*", list(7, "+", 3));
    const bae_list = list(
      "(",
      "(",
      "(",
      20,
      "/",
      2,
      ")",
      "-",
      2,
      ")",
      "*",
      "(",
      7,
      "+",
      3,
      ")",
      ")"
    );
    return equal(build_BAE_tree(bae_list), bae_tree);
  },
  "Q3B-T5",
  ["build_BAE_tree"]
);

assert(
  () => {
    const bae_tree = 100;
    const bae_list = list(100);
    return equal(build_BAE_tree(bae_list), bae_tree);
  },
  "Q3B-T6",
  ["build_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(70, "-", 15);
    const bae_list = list("(", 70, "-", 15, ")");
    return equal(build_BAE_tree(bae_list), bae_tree);
  },
  "Q3B-T7",
  ["build_BAE_tree"]
);

assert(
  () => {
    const bae_tree = list(
      list(list(7, "+", 5), "*", 3),
      "/",
      list(list(20, "/", 2), "-", list(100, "-", 94))
    );
    const bae_list = list(
      "(",
      "(",
      "(",
      7,
      "+",
      5,
      ")",
      "*",
      3,
      ")",
      "/",
      "(",
      "(",
      20,
      "/",
      2,
      ")",
      "-",
      "(",
      100,
      "-",
      94,
      ")",
      ")",
      ")"
    );
    return equal(build_BAE_tree(bae_list), bae_tree);
  },
  "Q3B-T8",
  ["build_BAE_tree"]
);

////////////////////////////////////////////////////////////
// Test Cases for Q3C
////////////////////////////////////////////////////////////

assert(
  () => {
    const bae_list = list(23);
    return equal(evaluate_BAE(bae_list), 23);
  },
  "Q3C-T1",
  ["evaluate_BAE"]
);

assert(
  () => {
    const bae_list = list("(", 5, "*", 6, ")");
    return equal(evaluate_BAE(bae_list), 30);
  },
  "Q3C-T2",
  ["evaluate_BAE"]
);

assert(
  () => {
    const bae_list = list(
      "(",
      "(",
      "(",
      20,
      "/",
      2,
      ")",
      "-",
      2,
      ")",
      "*",
      "(",
      7,
      "+",
      3,
      ")",
      ")"
    );
    return equal(evaluate_BAE(bae_list), 80);
  },
  "Q3C-T3",
  ["evaluate_BAE"]
);

////////////////////////////////////////////////////////////
// Test Cases for Q3D
////////////////////////////////////////////////////////////

assert(
  () => {
    const paren_list = list();
    return equal(check_parentheses(paren_list), true);
  },
  "Q3D-T1",
  ["check_parentheses"]
);

assert(
  () => {
    const paren_list = list("(", ")");
    return equal(check_parentheses(paren_list), true);
  },
  "Q3D-T2",
  ["check_parentheses"]
);

assert(
  () => {
    const paren_list = list(
      "(",
      "(",
      "(",
      ")",
      ")",
      "(",
      "(",
      ")",
      "(",
      ")",
      ")",
      ")"
    );
    return equal(check_parentheses(paren_list), true);
  },
  "Q3D-T3",
  ["check_parentheses"]
);

assert(
  () => {
    const paren_list = list(")", "(");
    return equal(check_parentheses(paren_list), false);
  },
  "Q3D-T4",
  ["check_parentheses"]
);

assert(
  () => {
    const paren_list = list("(", "(", ")", ")", ")", "(", "(", ")");
    return equal(check_parentheses(paren_list), false);
  },
  "Q3D-T5",
  ["check_parentheses"]
);

assert(
  () => {
    const paren_list = list("(", "(", ")", "(");
    return equal(check_parentheses(paren_list), false);
  },
  "Q3D-T6",
  ["check_parentheses"]
);

assert(
  () => {
    const paren_list = list("(", ")", "(", ")", "(", ")");
    return equal(check_parentheses(paren_list), true);
  },
  "Q3D-T7",
  ["check_parentheses"]
);

assert(
  () => {
    const paren_list = list(
      "(",
      "(",
      "(",
      ")",
      ")",
      "(",
      "(",
      ")",
      ")",
      ")",
      ")",
      ")"
    );
    return equal(check_parentheses(paren_list), false);
  },
  "Q3D-T8",
  ["check_parentheses"]
);
