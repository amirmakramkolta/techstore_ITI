const productId = location.href.substr(location.href.indexOf("?")+1);

const urlApi = `https://afternoon-falls-30227.herokuapp.com/api/v1/products/${productId}`

const productsCartNumber = document.querySelector("nav a span");
productsCartNumber.textContent = localStorage.getItem("productsNumber")?localStorage.getItem("productsNumber"):0

const xhr = new XMLHttpRequest();
xhr.open("GET",urlApi);
xhr.send();

xhr.onload = ()=>{
  if(xhr.status===200){
    let item = JSON.parse(xhr.response).data;
    // console.log(item);
    const pageTitle = document.querySelector("title");
    const productTitle = document.querySelector("#productTitle h1");
    const productDetails = document.querySelector("#productDetails p"); 
    const productImg = document.querySelector("#productImg img");
    const productAvailable = document.querySelector("#isAvailable");
    const productPrice = document.querySelector("#price");
    const productQuantity = document.querySelector("#quantity input");
    const addToCardBtn = document.querySelector("#addToCard button");

    pageTitle.textContent = `${item.Name} | Tech store`
    productTitle.textContent  = item.Name;
    productDetails.textContent = item.Description;
    productImg.src = item.ProductPicUrl;
    productPrice.textContent = `${item.Price} ${item.CurrencyCode}`

    if(item.Status!="Available"){
      productAvailable.textContent = "No";
      productAvailable.classList.add("no")
    }else{
      productAvailable.textContent = "Yes";
      productAvailable.classList.add("yes");
    }
    productQuantity.addEventListener("input",(e)=>{
      let availableQuantityNeeded = Number(e.target.value);
      let selectedProduct = JSON.parse(localStorage.getItem(productId))?JSON.parse(localStorage.getItem(productId)):item.Quantity;
      if(availableQuantityNeeded >item.Quantity||availableQuantityNeeded<=0||availableQuantityNeeded>selectedProduct.Quantity){
        addToCardBtn.disabled = true;
        productPrice.textContent = `Sorry, Out of stock.`
      }else{
        addToCardBtn.disabled = false;
        productPrice.textContent = `${item.Price*availableQuantityNeeded} ${item.CurrencyCode}`
      }
    })
    addToCardBtn.addEventListener("click",()=>{
      let selectedProduct = JSON.parse(localStorage.getItem(productId));
      if(selectedProduct){
        if(selectedProduct.Quantity>=Number(productQuantity.value)){
          selectedProduct.Quantity-=Number(productQuantity.value);
          console.log(selectedProduct.Quantity);
          selectedProduct.inCart += Number(productQuantity.value);
          localStorage.setItem(productId,JSON.stringify(selectedProduct));
          productsNumber(productQuantity.value);
        }else{
          addToCardBtn.disabled = true;
          productPrice.textContent = `Sorry, Out of stock.`
          alert("Sorry out of stock");
        }
      }else{
        localStorage.setItem(productId,JSON.stringify(item));
        let newData = JSON.parse(localStorage.getItem(productId));
        newData.Quantity -= productQuantity.value;
        newData.inCart = 0;
        newData.inCart += productQuantity.value;
        localStorage.setItem(productId,JSON.stringify(newData));
        productsNumber(productQuantity.value);
      }
    });

  }else{
    document.body.innerHTML = "Something wrong now, try again later";
  }

}

function productsNumber(amount){
  let productsNumber = localStorage.getItem("productsNumber");
  if(productsNumber){
    productsNumber = Number(productsNumber);
    productsNumber += Number(amount);
    localStorage.setItem("productsNumber",productsNumber);
    productsCartNumber.textContent=localStorage.getItem("productsNumber");
  }else{
    localStorage.setItem("productsNumber",amount);
    productsCartNumber.textContent=localStorage.getItem("productsNumber");
  }
  
}
