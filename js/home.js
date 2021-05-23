const urlProducts = "https://afternoon-falls-30227.herokuapp.com/api/v1/products/"
let dataItems = []

const xhr = new XMLHttpRequest();
xhr.open("GET",urlProducts);
xhr.send();
xhr.onload = ()=>{
  if(xhr.status === 200){
    for(const item of JSON.parse(xhr.response).data){
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");
      const productHead = document.createElement("div");
      productHead.classList.add("product-head");
      productBox.appendChild(productHead)
      const title = document.createElement("h2");
      title.textContent = item.Name
      productHead.appendChild(title)
      const image = document.createElement("img");
      image.src= item.ProductPicUrl;
      productHead.appendChild(image);
      
      const productBottom = document.createElement("div");
      productBottom.classList.add("product-bottom");
      productBox.appendChild(productBottom);
      const productPrice = document.createElement("p");
      productPrice.textContent = `${item.CurrencyCode} ${item.Price}`;
      productBottom.appendChild(productPrice);
      const addToCartImg = document.createElement("img");
      addToCartImg.src = "../images/carts.svg"
      addToCartImg.classList.add("add-to-card")
      productBottom.appendChild(addToCartImg);
      
      mainContainer.appendChild(productBox);
      //console.log(dataItems);
    }
  }else{
    document.body.innerHTML="Something wrong now, try again later";
  }
}

const mainContainer = document.querySelector("#products .container");
//console.log(dataItems);







