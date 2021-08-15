// Listen for auth state change
auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    setupUserDetails(user);
  } else {
    // User is signed out.
  }
});

// Sign up user

const signupForm = document.querySelector("#registerForm");

// Firebase sign-in
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   Get user input values
  const name = signupForm["name"].value;
  const email = signupForm["email"].value;
  const phone = signupForm["phone"].value;
  const password = signupForm["password"].value;
  const password_confirmation = signupForm["password_confirmation"].value;

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
            Initial_Investment: 0,
            Trade_Balance: 0,
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
});
