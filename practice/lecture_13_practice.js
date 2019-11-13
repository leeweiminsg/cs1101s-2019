// Question 1
let A = [];

function stream_to_array(s, n) {
  for (let i = 0; i < n; i = i + 1) {
    if (is_null(s)) {
      A[i] = 0;
    } else {
      A[i] = head(s);
      s = stream_tail(s);
    }
  }

  return A;
}

// Tests
const s = pair(10, () => pair(20, () => null));
stream_to_array(s, 3); // returns [10, 20, 0]

// Question 2
function array_to_stream(A) {
  return build_stream(array_length(A), i => A[i]);
}

// Tests
const a = [];
a[0] = 10;
a[2] = 30;
array_to_stream(a);
// returns stream containing 10, undefined , 30

// Question 3
function extend(bno) {
  function bso(xss, yss) {
    return pair(bno(head(xss), head(yss)), () =>
      bso(stream_tail(xss), stream_tail(yss))
    );
  }
}

// Tests
const integers = pair(1, () => stream_map(x => x + 1, integers));
const mult_streams = extend((x, y) => x * y);
const my_stream = mult_streams(integers, integers);
// my_stream now has elements 1 4 9 16...
