// sign-in
const loginError = `
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
      Please fill all the fields.
    </div>
  `;

const message = document.querySelector("#message");

const signin = () => {
  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;

  if (email === "" || password === "") {
    message.innerHTML = loginError;
  } else {
    message.innerHTML = "";
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        window.location.replace("../dashboard/dashboard.html");
      })
      .catch(function (error) {
        console.log(error.message);
        const fireError = `
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
      There was an error while trying to login. please check credentials and try again.
    </div>
  `;

        message.innerHTML = fireError;
      });
  }
};

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signin();
});
