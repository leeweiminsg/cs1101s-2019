// Question 1
/*
function make_search(A) {
return x => linear_search(A, x);
} 

const my_array = [3,41,20,1,5,16,4,0,14,6,17,8,4,0,2];
const my_search = make_search(my_array);
my_search(14); // returns true
... // many more calls to my_search
my_search(30); // returns false
*/
// Sort the list then use binary search for each function call

// Type your program in here!
function make_optimized_search(A) {
  let B = [];

  for (let i = 0; i < array_length(A); i = i + 1) {
    B[i] = A[i];
  }

  let sorted_B = merge_sort(B);

  return x => (!binary_search(sorted_B, x) ? false : true);
}

function binary_search(A, v) {
  function search(low, high) {
    if (low > high) {
      return false;
    } else {
      const mid = math_floor((low + high) / 2);
      return (
        v === A[mid] ||
        (v < A[mid] ? search(low, mid - 1) : search(mid + 1, high))
      );
    }
  }
  return search(0, array_length(A) - 1);
}

function merge_sort(A) {
  merge_sort_helper(A, 0, array_length(A) - 1);
}

function merge_sort_helper(A, low, high) {
  if (low < high) {
    const mid = math_floor((low + high) / 2);
    merge_sort_helper(A, low, mid);
    merge_sort_helper(A, mid + 1, high);
    merge(A, low, mid, high);
  } else {
  }
}

function merge(A, low, mid, high) {
  const B = [];
  let left = low;
  let right = mid + 1;
  let Bidx = 0;

  while (left <= mid && right <= high) {
    if (A[left] <= A[right]) {
      B[Bidx] = A[left];
      left = left + 1;
    } else {
      B[Bidx] = A[right];
      right = right + 1;
    }
    Bidx = Bidx + 1;
  }

  while (left <= mid) {
    B[Bidx] = A[left];
    Bidx = Bidx + 1;
    left = left + 1;
  }
  while (right <= high) {
    B[Bidx] = A[right];
    Bidx = Bidx + 1;
    right = right + 1;
  }

  for (let k = 0; k < high - low + 1; k = k + 1) {
    A[low + k] = B[k];
  }
}

// Question 2
// Part A
function fib(n) {
  if (n <= 1) {
    return n;
  } else {
    let memo = [];
    memo[0] = 0;
    memo[1] = 1;

    for (let i = 2; i < n + 1; i = i + 1) {
      memo[i] = memo[i - 1] + memo[i - 2];
    }

    return memo[array_length(memo) - 1];
  }
}

// Part B
function fib(n) {
  if (n <= 1) {
    return n;
  } else {
    let first = 0;
    let second = 1;
    let temp = null;

    for (let i = 2; i < n + 1; i = i + 1) {
      temp = first;
      first = second;
      second = temp + second;
    }

    return second;
  }
}

// Question 3
/* function mchoose(n, k) {
if (read(n, k) !== undefined) {
return read(n, k);
} else {
const result = (k > n) ?
0 : (k === 0 || k === n) ?
1 : mchoose(n - 1, k) +
mchoose(n - 1, k - 1);
write(n, k, result);
return result;
}
} */

// Time complexity: Theta((n -k)(k))
// Space complexity: Theta(nk)
