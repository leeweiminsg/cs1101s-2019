// Question 1
/*
The insertion sort implementation given in Lecture L6.

function insert(x, xs) {
    return is_null(xs) ? list(x)
        : x <= head(xs) ? pair(x, xs)
            : pair(head(xs), insert(x, tail(xs)));
}
function insertion_sort(xs) {
    return (is_null(xs)) ? xs
        : insert(head(xs),
            insertion_sort(tail(xs)));
}
*/

function cmp(x, y) {
  return head(x) < head(y) || (head(x) === head(y) && tail(x) > tail(y));
}

function insert_mod(x, xs) {
  return is_null(xs)
    ? list(x)
    : cmp(x, head(xs))
    ? pair(x, xs)
    : pair(head(xs), insert_mod(x, tail(xs)));
}

// Test
const L = list(
  pair(3, 4),
  pair(6, 2),
  pair(5, 1),
  pair(3, 2),
  pair(5, 3),
  pair(4, 2),
  pair(3, 7),
  pair(6, 5),
  pair(5, 1),
  pair(6, 4)
);
const S = insertion_sort_mod(L);
S;

// Expected result:
// list(pair(3, 7), pair(3, 4), pair(3, 2), pair(4, 2),
//      pair(5, 3), pair(5, 1), pair(5, 1), pair(6, 5),
//      pair(6, 4), pair(6, 2))

// Question 2

function rotate_matrix(M) {
  let n = array_length(M);

  function swap(r1, c1, r2, c2) {
    let temp = M[r1][c1];
    M[r1][c1] = M[r2][c2];
    M[r2][c2] = temp;
  }

  for (let r = 0; r < n; r = r + 1) {
    for (let c = r + 1; c < n; c = c + 1) {
      swap(r, c, c, r);
    }
  }

  for (let r = 0; r < n; r = r + 1) {
    for (let c = 0; c < math_floor(n / 2); c = c + 1) {
      swap(r, c, r, n - 1 - c);
    }
  }
}

// Test
const M = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
rotate_matrix(M);
M;

// Expected result:
// [[13, 9, 5, 1],
//  [14, 10, 6, 2],
//  [15, 11, 7, 3],
//  [16, 12, 8, 4]]
