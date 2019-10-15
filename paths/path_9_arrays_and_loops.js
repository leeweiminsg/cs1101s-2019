// Question 1
function dot_product(A, B) {
  let sum = 0;

  for (let i = 0; i < array_length(A); i = i + 1) {
    sum = sum + A[i] * B[i];
  }

  return sum;
}

// Question 2
function array_accumulate(op, init, A) {
  let result = 0;

  for (let i = 0; i < array_length(A); i = i + 1) {
    if (i === 0) {
      result = op(init, A[0]);
    } else {
      result = op(result, A[i]);
    }
  }

  return result;
}

// Question 3
function array_filter(pred, A) {
  let filtered_A = [];

  for (let i = 0; i < array_length(A); i = i + 1) {
    if (pred(A[i])) {
      filtered_A[array_length(filtered_A)] = A[i];
    } else {
    }
  }

  return filtered_A;
}

// Question 4
function transpose(M) {
  let M_T = [];

  let rows = array_length(M);
  let cols = array_length(M[0]);

  for (let i = 0; i < cols; i = i + 1) {
    M_T[i] = [];
    for (let j = 0; j < rows; j = j + 1) {
      M_T[i][j] = M[j][i];
    }
  }

  return M_T;
}
