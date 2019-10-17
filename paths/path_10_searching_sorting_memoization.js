// Question 1
function search_cond(A, cond) {
  if (is_null(A)) {
    return -1;
  } else {
    let i = 0;
    while (i < array_length(A)) {
      if (cond(A[i])) {
        return i;
      } else {
        i = i + 1;
      }
    }

    return -1;
  }
}

// Question 2
function insert(A, pos, x) {
  for (let i = array_length(A); i > pos; i = i - 1) {
    A[i] = A[i - 1];
  }

  A[pos] = x;

  return A;
}

// Question 3
/* Assume following functions are given:

function search_cond(A, cond) {
    const len = array_length(A);
    let i = 0;
    while (i < len && !cond(A[i])) {
        i = i + 1;
    }
    return (i < len) ? i : -1;
}

function insert(A, pos, x) {
    let j = array_length(A) - 1;
    while (j >= 0 && j >= pos) {
        A[j + 1] = A[j]; // shift right
        j = j - 1;
    }
    A[pos] = x;
    return A;
}*/
function insertion_sort(A) {
  let copy = [];
  copy[0] = A[0];

  for (let i = 1; i < array_length(A); i = i + 1) {
    let x = A[i];
    let cond = y => y > x;
    let pos = search_cond(copy, cond);
    if (pos !== -1) {
      insert(copy, pos, x);
    } else {
      copy[i] = x;
    }
  }

  return copy;
}

// Question 4
function first_denomination(kinds_of_coins) {
  return kinds_of_coins === 1
    ? 5
    : kinds_of_coins === 2
    ? 10
    : kinds_of_coins === 3
    ? 20
    : kinds_of_coins === 4
    ? 50
    : kinds_of_coins === 5
    ? 100
    : 0;
}

const mem = [];

function cc(amount, kinds_of_coins) {
  // MODIFY THIS
  if (amount === 0) {
    return 1;
  } else if (amount < 0 || kinds_of_coins === 0) {
    return 0;
  } else if (read(amount, kinds_of_coins) !== undefined) {
    return read(amount, kinds_of_coins);
  } else {
    const result =
      cc(amount - first_denomination(kinds_of_coins), kinds_of_coins) +
      cc(amount, kinds_of_coins - 1);
    write(amount, kinds_of_coins, result);

    return result;
  }
}

function read(n, k) {
  return mem[n] === undefined ? undefined : mem[n][k];
}

function write(n, k, value) {
  if (mem[n] === undefined) {
    mem[n] = [];
  } else {
  }

  mem[n][k] = value;
}
