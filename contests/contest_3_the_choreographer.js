// My contest entry
function curves_contest_LEE_WEI_MIN() {
  const connect_results = (n, f) =>
    draw_connected_full_view(n)(t =>
      unit_circle(f(math_round(t * n)) / n / 0.008)
    );

  const wheel = n =>
    connect_results(n * 3, k => {
      const v = math_round((k - 1) / 3);
      return k % 3 === 1 ? (v + n / 2) * 3 : v * 3;
    });

  return wheel(200);
}

curves_contest_LEE_WEI_MIN();
