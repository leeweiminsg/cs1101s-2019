// ==================== Task 1A ====================
function fizzbuzz(n) {
  function update(x) {
    if (x % 3 === 0 && x % 5 === 0) {
      return "FizzBuzz";
    } else if (x % 3 === 0) {
      return "Fizz";
    } else if (x % 5 === 0) {
      return "Buzz";
    } else {
      return x;
    }
  }

  return map(update, enum_list(1, n));
}

//Task 1A Tests
assert(
  "1A",
  () => fizzbuzz(15),
  list(
    1,
    2,
    "Fizz",
    4,
    "Buzz",
    "Fizz",
    7,
    8,
    "Fizz",
    "Buzz",
    11,
    "Fizz",
    13,
    14,
    "FizzBuzz"
  ),
  []
);

// ==================== Task 1B ====================
function fizzbuzzer(n, ls) {
  const integers = enum_list(1, n);
  const result = map(function(x) {
    const satisfied = filter(divisor => x % head(divisor) === 0, ls);
    const satisfied_strings = map(x => tail(x), satisfied);
    const concat_string = accumulate(
      (x, str) => x + str,
      "",
      satisfied_strings
    );
    return concat_string === "" ? x : concat_string;
  }, integers);
  return result;
}

//Task 1B Tests
let fizzbuzz_alt = n => fizzbuzzer(n, list(pair(3, "Fizz"), pair(5, "Buzz")));
assert(
  "1B_1",
  () => fizzbuzz_alt(15),
  list(
    1,
    2,
    "Fizz",
    4,
    "Buzz",
    "Fizz",
    7,
    8,
    "Fizz",
    "Buzz",
    11,
    "Fizz",
    13,
    14,
    "FizzBuzz"
  ),
  ["fizzbuzz"]
);

assert(
  "1B_2",
  () => fizzbuzzer(6, list(pair(1, "a"), pair(2, "ha"), pair(3, "haha"))),
  list("a", "aha", "ahaha", "aha", "a", "ahahaha"),
  ["fizzbuzz"]
);

//More comprehensible version of above
assert(
  "1B_3",
  () => fizzbuzzer(6, list(pair(1, "a"), pair(2, "b"), pair(3, "c"))),
  list("a", "ab", "ac", "ab", "a", "abc"),
  ["fizzbuzz"]
);
