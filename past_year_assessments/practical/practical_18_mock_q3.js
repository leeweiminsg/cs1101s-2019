// Question 2A
function left_most(row) {
  for (let i = 0; i < array_length(row); i = i + 1) {
    //First non-zero
    if (row[i] !== 0) {
      return i;
    } else {
    }
  }
  return array_length(row); //Cannot find inside.
}
function swap(matrix, k) {
  //Start at row k + 1
  let target_row = k;
  for (let row = k + 1; row < array_length(matrix); row = row + 1) {
    if (left_most(matrix[row]) < left_most(matrix[target_row])) {
      target_row = row;
    } else {
    }
  }
  //Actually swap
  const temp = matrix[target_row];
  matrix[target_row] = matrix[k];
  matrix[k] = temp;
  return matrix;
}

// Question 2B
function add_rows(row1, row2) {
  const result = [];
  for (let i = 0; i < array_length(row1); i = i + 1) {
    result[i] = row1[i] + row2[i];
  }
  return result;
}

function scale_row(row, scalar) {
  for (let i = 0; i < array_length(row1); i = i + 1) {
    row[i] = row[i] * scalar;
  }

  return row;
}

function eliminate_row(curr_row, eliminator) {
  //Add some multiple of current row to target_row
  const target_column = left_most(eliminator);
  if (target_column === array_length(row) || curr_row[target_column] === 0) {
    return curr_row;
  } else {
    const scale_factor = -curr_row[target_column] / eliminator[target_column];
    return add_rows(curr_row, scale_row(eliminator, scale_factor));
  }
}

function eliminate(matrix, k) {
  //for each target_row below current row
  const eliminator = matrix[k];
  let num_rows = array_length(matrix);
  for (let i = k + 1; i < num_rows; i = i + 1) {
    matrix[i] = eliminate_row(matrix[i], eliminator);
  }
  return matrix;
}

// Question 2C
function gaussian_elimination(matrix) {
  let num_rows = array_length(matrix);
  for (let i = 0; i < num_rows; i = i + 1) {
    matrix = swap(matrix, i);
    matrix = eliminate(matrix, i);
  }
  return matrix;
}
