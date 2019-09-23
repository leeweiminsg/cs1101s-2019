// Question 1
function factorial(n) {
  return accumulate((x, y) => x * y, 1, build_list(n, x => x + 1));
}

// Question 2
function maximizer(p, low, high) {
  if (low > high) {
    return NaN;
  } else {
    return p(high) ? high : maximizer(p, low, high - 1);
  }
}
