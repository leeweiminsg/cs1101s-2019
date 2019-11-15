// Question 1F
function smallest_of_ascending_list(xs) {
  return head(xs);
}

// Question 1G
function largest_of_ascending_list(xs) {
  return list_ref(xs, length(xs) - 1);
}

// ALternative
function largest_of_ascending_list(xs) {
  return head(reverse(xs));
}

// Tests
largest_of_ascending_list(list(35, 56, 56, 79)); // returns 79

// Question 1H
function median(xs) {
  if (length(xs) % 2 === 1) {
    return list_ref(xs, math_floor(length(xs) / 2));
  } else {
    let left = list_ref(xs, length(xs) / 2 - 1);
    let right = list_ref(xs, length(xs) / 2);

    return (left + right) / 2;
  }
}

// Tests
median(list(20, 50, 60)); // returns 50
median(list(3, 17, 40, 50, 84, 99)); // returns 45

// Question 3
function permutations (xs) { ... }
permutations (list (3 ,1 ,2));
// returns list( list(3,1,2), list(1,3,2), list(1,2,3),
// list(3,2,1), list(2,3,1), list(2,1,3) )

// Question 3A
function is_sorted(xs) {
  if (is_null(xs) || length(xs) === 1) {
    //is_null(tail(xs)))
    return true;
  } else {
    return head(xs) <= head(tail(xs)) && is_sorted(tail(xs));
  }
}

// Tests
is_sorted(list(3, 2, 1)); // returns false
is_sorted(list(3, 1, 2)); // returns false
is_sorted(list(4, 5, 5)); // returns true
is_sorted(list(1, 2, 3)); // returns true
is_sorted(list(1)); // returns true
is_sorted(null); // returns true

// Question 3B
Theta(n);

// Question 3C
function sort(xs) {
  let permutations_xs = permutations(xs);

  return head(filter(permutation => is_sorted(permutation), permutations_xs));
}

// Tests
sort(list(2, 1, 3)); // returns same as: list(1,2,3)
sort(list(17, 35, 17, 4)); // returns same as: list(4,17,17,35)


// Question 3D
Theta(n(n!))

// Question 3E
/* No, this technique is much slower (not polynomial) than the sorting technique from the PE, which
had quadratic runtime. */

// Question 4B
function has_token(r) {
    let start = r;

    function helper(xs) {
        if (xs === start) {
            return head(xs) ? 1 : 0;
        } else if (head(xs)) {
            return 1 + helper(tail(xs));
        } else {
            return 0 + helper(tail(xs));
        }
    }

    return helper(tail(r)) === 1;
}

// Alternative
function has_token(xs) {
    function has_token_until (xs ,ys) {
        if (head(xs)) {
            return true;
        } else {
            if (tail(xs) === ys) {
            return false;
        } else {
            return has_token_until(tail(xs),ys);
        }
        }
        }
    return has_token_until (xs ,xs);
}

// Tests
let token_ring_1 = list(false ,true );
set_tail(tail( token_ring_1 ), token_ring_1 );
// now token_ring_1 is a token ring of two elements
// and one of its elements has the token
let token_ring_2 = list(false ,false ,false );
set_tail(tail(tail( token_ring_2 )), token_ring_2 );
// now token_ring_2 is a token ring of three elements
// and none of its elements has the token
has_token( token_ring_1 ); // returns true
has_token( token_ring_2 ); // returns false

// Question 4C
function move_token(xs) {
    if (head(xs)) {
        set_head(xs, false);
        set_head(tail(xs), true);
    } else {
        return move_token(tail(xs));
    }
}

// Tests
let token_ring_3 = list(false ,false ,false );
set_tail(tail(tail( token_ring_3 )), token_ring_3 );
set_head(token_ring_3 , true ); // now element 0 has the token
move_token( token_ring_3 ); // now element 1 has the token
move_token( token_ring_3 ); // now element 2 has the token
move_token( token_ring_3 ); // now element 0 has the token
// draw_data(token_ring_3);


// Question 4D
function add_element(xs) {
    let element = pair(false, null);
    let end_pt = tail(xs);

    set_tail(xs, element);
    set_tail(element, end_pt);
}

let token_ring_4 = list(true ,false ,false );
set_tail(tail(tail( token_ring_4 )), token_ring_4 );
// now token_ring_4 is a token ring with three elements
add_element ( token_ring_4 );
// now token_ring_4 is a token ring with four elements
draw_data(token_ring_4);

// Question 4E
function ring_to_stream(xs) {
    return pair(head(xs), () => ring_to_stream(tail(xs)));
}

// Tests
let token_ring_5 = list(true ,false ,false );
set_tail(tail(tail( token_ring_5 )), token_ring_5 );
let token_stream_5 = ring_to_stream ( token_ring_5 );
// token_stream_5 is the stream:
// true, false, false, true, false, false, true, false, false,...
eval_stream(token_stream_5, 9);

// Question 5
let s = list (1,2,1,5,8);
let sequence_1 = list (1 ,1 ,5);
let sequence_2 = list (2 ,1 ,1);
let sequence_3 = null;
let sequence_4 = list (1,2,1,5,8);

// Question 5A
function is_subsequence(xs, ys) {
    if (is_null(xs)) {
        return true;
    } else if (is_null(ys)) {
      return false;
    } else if (head(xs) === head(ys)) {
      return is_subsequence(tail(xs), tail(ys));
    } else {
      return is_subsequence(xs, tail(ys));
    }
}

// is_subsequence (sequence_1 , s); // returns true
// is_subsequence (sequence_2 , s); // returns false
// is_subsequence (sequence_3 , s); // returns true
// is_subsequence (sequence_4 , s); // returns true

// Question 5B
function all_subsequences(xs) {
  if (is_null(xs)) {
    return list(null);
  } else {
    let y = all_subsequences(tail(xs));

    return append(y, map(ys => pair(head(xs), ys), y));
  }
}

all_subsequences (list(1 ,2 ,3));
// returns the following subsequences:
// list(null, list(1), list(2), list(3),
// list(1,2), list(1,3), list(2,3),
// list(1,2,3)
// )

// Question 5C
function longest_subsequence_length (xs ,ys) {
  let lxs = length(xs);
  let lys = length(ys);
  
  // copy xs to array x, starting at 1 (set x[0] to 0)
  let x = [];
  x[0] = 0;

  for (i = 1; i <= lxs; i++) {
    x[i] = list_ref(xs ,i -1);
  }
  // copy ys to array y, starting at 1 (set y[0] to 0)
  let y = [];
  y[0] = 0;

  for (j = 1; j <= lys; j++) {
    y[j] = list_ref(ys ,j -1);
  }

  let len = [];
  
  // run the dynamic programming loop, using the two properties
  for (i = 0; i <= lxs; i++) {
    len[i] = [];
    for (j = 0; j <= lys; j++) {
    len[i][j] = 0;
    }
  }

  for (i = 1; i <= lxs; i++) {
    for (j = 1; j <= lys; j++) {
      if (x[i] === y[j]) {
        len[i][j] = len[i -1][j-1] + 1;
      } else {
        len[i][j] = math_max(len[i][j-1], len[i -1][j]);
      }
    }
  }
  
  return len[lxs][lys];
}
