console.log("hiiii");

// Listen for auth state change
auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    try {
      setupUserDetails(user);
    } catch (error) {
      console.error(error.message);
    }
  } else {
    // User is signed out.
    console.log("user logged out");
    setupUserDetails(undefined);
    window.location.replace("../index.html");
  }
});

// Sign up user function
const signupForm = document.querySelector("#registerForm");
const registerMessage = document.querySelector("#registerMessage");
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
      Please fill all the fields.
    </div>
  `;
const passError = `
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
      Sorry, passwords do not match.
    </div>
  `;

const signup = () => {
  //Get user input values
  const name = signupForm["name"].value;
  const email = signupForm["email"].value;
  const phone = signupForm["phone"].value;
  const password = signupForm["password"].value;
  const password_confirmation = signupForm["password_confirmation"].value;

  if (
    name === "" ||
    email === "" ||
    phone === "" ||
    password === "" ||
    password_confirmation === ""
  ) {
    registerMessage.innerHTML = error;
  } else if (password !== password_confirmation) {
    registerMessage.innerHTML = passError;
  } else {
    registerMessage.innerHTML = "";
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        db.collection("users")
          .doc(response.user.uid)
          .set(
            {
              name,
              email,
              phone,
              plan: "Basic",
              RIO: "0.00%",
              Initial_Investment: "0",
              Trade_Balance: "0",
            },
            { merge: true }
          )
          .then(() => {
            window.location.replace("../dashboard/dashboard.html");
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};

// Firebase sign-in
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    signup();
  } catch (error) {
    console.error(error);
  }
});
