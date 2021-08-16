const add = document.querySelector("#address").textContent;

// Copy wallet address to clipboard
const copy = document.querySelector("#copy");
function copyBTCAddress() {
  navigator.clipboard.writeText(add);
  alert("Address has been copied");
}

copy.addEventListener("click", () => {
  copyBTCAddress();
});