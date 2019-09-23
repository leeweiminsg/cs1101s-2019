// Question 1
function flatten_once(xs) {
  // YOUR SOLUTION HERE
  return accumulate(append, null, xs);
}

// Question 2
// If you are using double map, you will need this.
function flatten_once(xs) {
  return accumulate(append, null, xs);
}

function product(xs, ys) {
  // YOUR SOLUTION HERE
  return flatten_once(map(x => map(y => pair(x, y), ys), xs));
}

// Question 3
function combinations(xs, r) {
  // I have modified the first condition for you
  if ((r !== 0 && xs === null) || r < 0) {
    // BASE CASE 1
    return null;
  } else if (r === 0) {
    // BASE CASE 2
    return list(null);
  } else {
    // YOUR SOLUTION HERE
    const to_use = map(x => pair(head(xs), x), combinations(tail(xs), r - 1));
    const not_to_use = combinations(tail(xs), r);
    return append(to_use, not_to_use);
  }
}
