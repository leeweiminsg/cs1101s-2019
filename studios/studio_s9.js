// Question 1
// 0

// Question 2
function d_reverse(xs) {
  if (is_null(xs) || is_null(tail(xs))) {
    return xs;
  } else {
    const temp = d_reverse(tail(xs));
    set_tail(tail(xs), xs);
    set_tail(xs, null);
    return temp;
  }
}

// Question 3
// Implement filter without creating new pairs
function d_filter(pred, xs) {
  if (is_null(xs)) {
    return xs;
  } else if (pred(head(xs))) {
    set_tail(xs, d_filter(pred, tail(xs)));
  } else {
    d_filter(pred, tail(xs));
  }
}

// Question 4
/* function count_pairs(x) {
if (!is_pair(x)) {
return 0;
} else {
return 1 + count_pairs(head(x)) + count_pairs(tail(x));
}
} */

// To display three pairs
const empty_pair = pair(null, null);
const three = pair(empty_pair, empty_pair);

// To display four
const four = pair(three, null);

// To display seven
const seven = pair(three, three);

// Infinite loop
const empty_cycle = list(1, 2);
set_tail(empty_cycle, empty_cycle);

// Correct version
let track = list();

function count_pairs(x) {
  if (!is_pair(x) || !is_null(member(x, track))) {
    return 0;
  } else {
    track = pair(x, track);
    return 1 + count_pairs(head(x)) + count_pairs(tail(x));
  }
}

// Test cases
const empty_pair = pair(null, null);
const three = pair(empty_pair, empty_pair);

const four = pair(three, null);

const seven = pair(three, three);

const empty_cycle = list(1, 2);
set_tail(empty_cycle, empty_cycle);

// Question 5
let a = 10;
function foo(x) {
  let b = 0;
  function goo(x) {
    let a = 30;
    if (x <= 2) {
      a = a + x;
      b = b + x;
      // Breakpoint #4
    } else {
      // Breakpoint #3
      goo(x - 1);
    }
  }
  a = a + x;
  b = b + x;
  // Breakpoint #2
  goo(3);
}
// Breakpoint #1
foo(1);
// Breakpoint #5

// Breakpoint 1
breakpoint_1.png;

// Breakpoint 2
breakpoint_2.png;

// Breakpoint 3
breakpoint_3.png;

// Breakpoint 4
breakpoint_4.png;

// Breakpoint 5
breakpoint_5.png;
