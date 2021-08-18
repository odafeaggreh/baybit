const address = document.querySelector("#address");

// Copy wallet address to clipboard
const copy = document.querySelector("#copy");
function copyBTCAddress() {
  navigator.clipboard.writeText(address.textContent);
  console.log(address.textContent);
  alert("Address has been copied");
}

copy.addEventListener("click", () => {
  copyBTCAddress();
});

db.collection("admin_details")
  .doc("SWjB1x68GFmyPoybpJJi")
  .onSnapshot((doc) => {
    address.textContent = doc.data().Wallet_Address;
  });
