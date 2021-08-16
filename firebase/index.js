const userInfoSection = document.querySelector("#userInfoSection");
const dashboardBalances = document.querySelector("#dashboardBalances");

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


