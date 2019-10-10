// Question 1

/* function make_withdraw(balance) {
function withdraw(amount) {
if (balance >= amount) {
balance = balance - amount;
return balance;
} else {
return "Insufficient funds";
}
}
return withdraw;
} */

function make_withdraw(balance, user_password) {
  let num_incorrect_passwords = 0;

  function withdraw(amount, password) {
    if (num_incorrect_passwords === 3) {
      return "Account disabled";
    } else if (password !== user_password) {
      num_incorrect_passwords = num_incorrect_passwords + 1;

      return "Wrong password; no withdraw";
    } else {
      num_incorrect_passwords = 0;

      if (balance >= amount) {
        balance = balance - amount;
        return balance;
      } else {
        return "Insufficient funds";
      }
    }
  }
  return withdraw;
}

// Question 2
reflection_r8_qn_2.png;

// Question 3

/* let commission = 25; // my commission in dollars
return a calculator for total price
total price = (commission + cost) * (1 + tax_rate)
function make_price_calculator(tax_rate) {
function calculator(cost) {
return (commission + cost) * (1 + tax_rate);
}
return calculator;
}
const calc = make_price_calculator(0.07);
commission = 125;
calc(75); */

reflection_r8_qn_3.png;
