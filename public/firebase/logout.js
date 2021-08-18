// Logout function

const handleLogout = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      console.log("hi");
      window.location.replace("../index.html");
    })
    .catch(function (error) {
      // An error happened.
      console.log(error.message);
    });
};

// logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogout();
});
