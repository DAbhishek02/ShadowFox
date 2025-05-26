// Optional: Simple alert on form submit
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for reaching out!");
  this.reset();
});
