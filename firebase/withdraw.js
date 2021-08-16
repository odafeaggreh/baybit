const withdrawForm = document.querySelector("#withdrawForm");
const withdrawAmount = document.querySelector("#withdrawAmount");
const withdrawAddress = document.querySelector("#withdrawAddress");

const handleWithdraw = (user) => {
  withdrawForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const withdrawAmountValue = withdrawAmount.value;
    const withdrawAddressValue = withdrawAddress.value;
    const with_err = document.querySelector("#with-err");

    // get user data
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        const balance = doc.data().Trade_Balance;
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
            Please enter a valid amount and wallet address.
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
                Insufficient funds
            </div>
        `;
        const success = `
            <div
            style="
            color: #0f5132;
            background-color: #d1e7dd;
            border-color: #badbcc;
            padding: 1rem 1rem;
            margin-bottom: 1rem;
            margin-top: 1.5rem;
            border: 1px solid transparent;
            border-radius: .25rem;"
            >
                Your withdrawal request has been posted! Please contact your portfolio manager now for further instructions.

                you could head back to the <a href="../dashboard/dashboard.html" style="color: black;  font-weight: bold">home</a> page now.
            </div>
        `;

        if (withdrawAddressValue === "" || withdrawAmountValue === "") {
          with_err.innerHTML = error;
        } else if (withdrawAmountValue > balance) {
          with_err.innerHTML = error2;
        } else {
          with_err.innerHTML = success;
        }
      });
  });
};

// Listen for auth state change
auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log(user.uid);
    handleWithdraw(user);
    try {
      setupUserDetails(user);
    } catch (error) {
      console.error(error.message);
    }
  } else {
    // User is signed out.
  }
});
