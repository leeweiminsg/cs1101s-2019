// Question 1A
function make_k_list(k, d) {
  return d === 0 ? 0 : build_list(k, i => make_k_list(k, d - 1));
}

// Question 1B
function sum_k_list(klist) {
  return is_number(klist)
    ? klist
    : accumulate((x, acc) => sum_k_list(x) + acc, 0, klist);
}

// Question 1C
function map_k_list(f, klist) {
  return is_number(klist) ? f(klist) : map(x => map_k_list(f, x), klist);
}

// Question 2A
function route_distance(mat, route) {
  if (is_null(tail(route))) {
    return 0;
  } else {
    return (
      mat[head(route)][head(tail(route))] + route_distance(mat, tail(route))
    );
  }
}

// QUestion 2B
function shortest_paper_route(n, mat, start) {
  // You can keep, modify or remove the permutations function.
  function permutations(ys) {
    return is_null(ys)
      ? list(null)
      : accumulate(
          append,
          null,
          map(x => map(p => pair(x, p), permutations(remove(x, ys))), ys)
        );
  }

  let current_distance = Infinity;
  let current_route = undefined;
  let other_houses = remove(start, enum_list(0, n - 1));
  for (
    let routes = map(
      p => pair(start, append(p, list(start))),
      permutations(other_houses)
    );
    !is_null(routes);
    routes = tail(routes)
  ) {
    const route = head(routes);
    const distance = route_distance(mat, route);
    if (distance < current_distance) {
      current_distance = distance;
      current_route = route;
    } else {
    }
  }
  return pair(current_route, current_distance);
}

// Question 3A
// enter_at enters bae in pfe starting
// at position i; returns next free
// position in pfe

function enter_at(bae, i, pfe) {
  if (is_number(bae)) {
    pfe[i] = bae;
    return i + 1;
  } else {
    const after_left = enter_at(bae[0], i, pfe);
    const after_right = enter_at(bae[2], after_left, pfe);
    pfe[after_right] = bae[1];
    return after_right + 1;
  }
}

function make_postfix_exp(bae) {
  const pfe = [];
  enter_at(bae, 0, pfe);
  return pfe;
}

// Question 3B
function eval_postfix_exp(pfe) {
  let stack = null;

  function push(x) {
    stack = pair(x, stack);
  }

  function pop() {
    const x = head(stack);
    stack = tail(stack);
    return x;
  }

  for (let i = 0; i < array_length(pfe); i = i + 1) {
    push(
      is_number(pfe[i])
        ? pfe[i]
        : pfe[i] === "+"
        ? pop() + pop()
        : pfe[i] === "-"
        ? -pop() + pop() // subtraction comes first
        : pfe[i] === "*"
        ? pop() * pop()
        : // pfe[i] === "/" ?
          (1 / pop()) * pop()
    ); // divisor comes first
  }

  return pop();
}
