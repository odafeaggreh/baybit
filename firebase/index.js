const userInfoSection = document.querySelector("#userInfoSection");
const dashboardBalances = document.querySelector("#dashboardBalances");
const copy = document.querySelector("#copy");
const add = document.querySelector("#address").textContent;

// Copy wallet address to clipboard
function copyBTCAddress() {
  navigator.clipboard.writeText(add);
  alert("Address has been copied");
}

copy.addEventListener("click", () => {
  copyBTCAddress();
});

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

const setupUserDetails = (user) => {
  if (user) {
    // display user info

    db.collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        console.log(doc.data());

        // display user basic info on dashboard
        const initialInvest = doc
          .data()
          .Initial_Investment.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
        const tradeBal = doc.data().Trade_Balance.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        const userInfo = `
        <div class="container">
          <div class="row align-center">
            <div class="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
              <header
                class="
                  crumina-module crumina-heading
                  heading--h1 heading--with-decoration
                "
              >
                <h1 class="">
                  <span class="heading--half-colored">
                  ${initialInvest}</span>
                </h1>
                <div class="heading-text">
                  <b class="heading--half-colored">${doc.data().name}</b> / ${
          doc.data().plan
        }
                </div>
                <div class="medium-padding40">
                  <a
                    href="fund.html"
                    class="btn btn--large btn--transparent btn--primary"
                    >Fund Wallet</a
                  >
                  <a
                    data-scroll
                    href="withdraw.html"
                    class="btn btn--large btn--transparent btn--primary"
                    >Withdraw</a
                  >
                </div>
              </header>
            </div>
          </div>
        </div>
        `;

        userInfoSection.innerHTML = userInfo;

        // display user balances

        const balances = `
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12 mb30">
              <div class="crumina-module crumina-crypto-converter">
                <div class="current-crypto">Initial Investment</div>
                <div class="result-crypto">${initialInvest}</div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12 mb30">
              <div class="crumina-module crumina-crypto-converter">
                <div class="current-crypto">Trade Balance</div>
                <div class="result-crypto">${tradeBal}</div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12 mb30">
              <div class="crumina-module crumina-crypto-converter">
                <div class="current-crypto">Return on Investment</div>
                <div class="result-crypto">${doc.data().RIO}</div>
              </div>
            </div>
          </div>
        </div>
        `;

        dashboardBalances.innerHTML = balances;
      });
  }
};
