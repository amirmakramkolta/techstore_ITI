


const productsCartNumber = document.querySelector("nav a span");
let cartNumber = Number(localStorage.getItem("productsNumber"));
productsCartNumber.textContent = localStorage.getItem("productsNumber") ? localStorage.getItem("productsNumber") : 0

const totalPrice = document.querySelector(".total-price");
function allStorageProductItems() {

  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    if (localStorage.getItem(keys[i]).indexOf("{") != -1 && localStorage.getItem(keys[i]).indexOf("}") != -1 && localStorage.getItem(keys[i]).indexOf(":") != -1)
      values.push(JSON.parse(localStorage.getItem(keys[i])));
  }

  return values;
}
const items = allStorageProductItems();
if (items == "") {
  const table = document.querySelector("table");
  table.innerHTML = `<h2 class="empty-cart">you don't selected any items.</h2>`;
  const totalPrice = document.querySelector("#totalPrice .container");
  totalPrice.textContent = "";
} else {
  for (const item of items) {
    const tbody = document.querySelector("tbody");
    const tr = document.createElement("tr");
    const productImgName = document.createElement("th");
    productImgName.classList.add("productImgName");
    const productImg = document.createElement("img");
    productImg.src = item.ProductPicUrl;
    productImgName.appendChild(productImg);
    const productName = document.createElement("h2");
    productName.textContent = item.Name;
    productImgName.appendChild(productName);
    tr.appendChild(productImgName);
    const productPrice = document.createElement("th");
    productPrice.classList.add("productPrice");
    productPrice.textContent = `${item.Price} ${item.CurrencyCode}`
    tr.appendChild(productPrice);
    const productQuantity = document.createElement("th");
    productQuantity.classList.add("productQuantity");
    const inputQuantity = document.createElement("p");
    inputQuantity.textContent = item.inCart;
    const more = document.createElement("button");
    more.id = "more"
    more.textContent = "↑"

    const less = document.createElement("button");
    less.id = "less"
    less.textContent = "↓"

    if (item.Quantity == 0) {
      more.disabled = true
    } else {
      less.disabled = false
    }

    if (item.inCart == 0) {
      less.disabled = true
    } else {
      more.disabled = false
    }
    
    productQuantity.appendChild(inputQuantity);
    productQuantity.appendChild(more);
    productQuantity.appendChild(less);
    tr.appendChild(productQuantity);
    const productTotalPrice = document.createElement("th");
    productTotalPrice.classList.add("productTotalPrice");
    productTotalPrice.innerHTML = `<span>${item.Price * item.inCart}</span> ${item.CurrencyCode}`;
    tr.appendChild(productTotalPrice);
    tbody.appendChild(tr);



    more.addEventListener("click", () => {
      item.inCart++;
      item.Quantity--;
      cartNumber++;
      if (item.Quantity <= 0) {
        more.disabled = true;
        item.inCart=item.inCart + item.Quantity;
        item.Quantity=0;
      } else {
        less.disabled = false
      }
      productsCartNumber.textContent = cartNumber;
      productTotalPrice.innerHTML = `<span>${item.Price * item.inCart}</span> ${item.CurrencyCode}`
      inputQuantity.textContent = item.inCart;
      localStorage.setItem("productsNumber", cartNumber);
      localStorage.setItem(item.ProductId, JSON.stringify(item));
      calcTotalItemsPrice();
    });

    less.addEventListener("click", () => {
      item.inCart--;
      item.Quantity++;
      cartNumber--;
      if (item.inCart == 0) {
        less.disabled = true
      } else {
        more.disabled = false
      }
      productsCartNumber.textContent = cartNumber;
      productTotalPrice.textContent = `${item.Price * item.inCart} ${item.CurrencyCode}`
      inputQuantity.textContent = item.inCart;
      localStorage.setItem("productsNumber", cartNumber);
      localStorage.setItem(item.ProductId, JSON.stringify(item));
      calcTotalItemsPrice();
    });

  }
  calcTotalItemsPrice();
}

function calcTotalItemsPrice() {
  const itemsForTotalPrice = allStorageProductItems();
  let totalPriceAll = 0;
  for (const item of itemsForTotalPrice) {
    totalPriceAll += item.inCart * item.Price;
  }
  totalPrice.textContent = totalPriceAll + " EUR";
}