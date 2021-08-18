const fundForm = document.querySelector("#fundForm");

// check if user entered a valid deposit amount
fundForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get deposit amount
  const amount = fundForm["amount"].value;
  const fundErro = document.querySelector("#fund-err");

  const error = `
    <div
      style="color: #842029;
      background-color: #f8d7da;
      border-color: #f5c2c7;
      padding: 1rem 1rem;
      margin-bottom: 1rem;
      margin-top: 1.5rem;
      border: 1px solid transparent;
      border-radius: .25rem;"
    >
      Please enter a valid amount.
    </div>
  `;

  const error2 = `
    <div
      style="color: #842029;
      background-color: #f8d7da;
      border-color: #f5c2c7;
      padding: 1rem 1rem;
      margin-bottom: 1rem;
      margin-top: 1.5rem;
      border: 1px solid transparent;
      border-radius: .25rem;"
    >
      Pay at least 100 USD.
    </div>
  `;

  if (amount === "") {
    fundErro.innerHTML = error;
  } else if (amount <= 0) {
    fundErro.innerHTML = error2;
  } else {
    fundErro.innerHTML = "";

    window.location.replace("../dashboard/fund_confirm.html");
  }
});