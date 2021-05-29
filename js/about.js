const productsCartNumber = document.querySelector("nav a span");
let cartNumber = Number(localStorage.getItem("productsNumber"));
productsCartNumber.textContent = localStorage.getItem("productsNumber") ? localStorage.getItem("productsNumber") : 0