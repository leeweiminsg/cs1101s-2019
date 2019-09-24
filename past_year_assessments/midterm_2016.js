// Question 2
// Part A
function make_uniform_configuration(state, n) {
  return build_list(n, i => make_ring(state, n - i));
}

// Part B
// Theta(n)

// Part C
// Theta(n)

// Question 3
// Part A
function make_free_configuration(first_state, n) {
  return n === 0
    ? null
    : n === 1
    ? list(make_ring(first_state, n))
    : append(
        list(make_ring(first_state, n)),
        make_uniform_configuration("off", n - 1)
      );
}

// Part B
function check_free_configuration(first_state, rings) {
  return is_null(rings)
    ? true
    : ring_state(head(rings)) === first_state &&
        ring_id(head(rings)) === length(rings) &&
        accumulate(
          (ring, id) =>
            ring_id(ring) !== id && ring_state(ring) !== "off" ? -1 : id + 1,
          1,
          tail(rings)
        ) !== -1;
}

// Suggested solution (modified)
function check_free_configuration(first_state, rings) {
  return is_null(rings)
    ? true
    : ring_state(head(rings)) === first_state &&
        ring_id(head(rings)) === length(rings) &&
        tail(
          accumulate(
            (ring, result) =>
              pair(
                head(result) + 1,
                tail(result) &&
                  ring_state(ring) === "off" &&
                  ring_id(ring) === head(result)
              ),
            pair(1, true),
            tail(rings)
          )
        );
}

// Question 4
// Part A
function make_step(action, id) {
  return pair(action, id);
}

function step_action(step) {
  return head(step);
}

function step_id(step) {
  return tail(step);
}

function step_to_string(step) {
  return step_action(step) + " ring " + stringify(step_id(step));
}

// Part B
function steps_to_string(steps) {
  return accumulate(
    (step_string, accum_string) => step_string + accum_string,
    "",
    map(step => step_to_string(step) + "\n", steps)
  );
}

// Question 5
function flip(ring) {
  return make_step(
    ring_state(ring) === "on" ? "remove" : "insert",
    ring_id(ring)
  );
}

// Question 6
function solve(n) {
  return steps_to_free_configuration(
    "off",
    make_uniform_configuration("on", n)
  );
}

// Question 7
function steps_to_free_configuration(desired_first_state, rings) {
  return is_null(rings)
    ? null
    : ring_state(head(rings)) === desired_first_state
    ? steps_to_free_configuration("off", tail(rings))
    : append(
        steps_to_free_configuration("on", tail(rings)),
        pair(
          flip(head(rings)),
          steps_to_free_configuration(
            "off",
            make_free_configuration("on", length(rings) - 1)
          )
        )
      );
}

// Question 8
// Part A
function step_to_legal_move(step) {
  // is_legal returns true if and only if step can be
  // carried out (is legal) on the configuration cfg.
  function is_legal(cfg) {
    const n = length(cfg);
    if (step_id(step) > n) {
      return false;
    } else {
      const the_ring = list_ref(cfg, n - step_id(step));
      const right = tail(member(the_ring, cfg));
      return (
        step_action(flip(the_ring)) === step_action(step) &&
        check_free_configuration("on", right)
      );
    }
  }

  return config =>
    is_legal(config)
      ? map(ring =>
          ring_id(ring) === step_id(step)
            ? make_ring(
                ring_state(ring) === "off" ? "on" : "off",
                ring_id(ring)
              )
            : ring
        )
      : config;
}

// Part B
function tryout(n) {
  const config1 = pair(
    make_ring("on", n),
    make_free_configuration("on", n - 1)
  );
  const config2 = pair(
    make_ring("off", n),
    make_free_configuration("on", n - 1)
  );
  return legal_move(config1) !== config1
    ? make_step("remove", n)
    : legal_move(config2) !== config2
    ? make_step("insert", n)
    : tryout(n + 1);
}
return tryout(1);

// Part C
function check_solver(n, solve) {
  const steps = solve(n);
  const legal_moves = map(step_to_legal_move, steps);
  const final_config = accumulate(
    (legal_move, config) => legal_move(config),
    make_uniform_configuration("on", n),
    reverse(legal_moves)
  );

  return check_free_configuration("off", final_config);
}
