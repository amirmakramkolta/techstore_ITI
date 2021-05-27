const fullWebPage = location.href.substr(location.href.lastIndexOf("/")+1,location.href.lastIndexOf(".")-1);
const webPage = fullWebPage.substr(0,fullWebPage.indexOf("."));

const urlProducts2 = "https://afternoon-falls-30227.herokuapp.com/api/v1/products/";

const shoppingCartNumber = document.querySelector("nav a span");
if(localStorage.getItem("productsNumber")){
  shoppingCartNumber.textContent = localStorage.getItem("productsNumber");
}else{
  shoppingCartNumber.textContent = 0;
}

if(webPage==="home"){
  const xhr = new XMLHttpRequest();
  xhr.open("GET",urlProducts2);
  xhr.send();
  xhr.onload = ()=>{
    if(xhr.status==200){
      const data = JSON.parse(xhr.response).data;
      const shoppingCartImg = document.querySelectorAll(".product-bottom img");
      
      for (let i = 0; i < shoppingCartImg.length; i++) {
        const item = shoppingCartImg[i];
        item.addEventListener("click",()=>{
          let selectedProduct = localStorage.getItem(data[i].ProductId);
          // console.log(selectedProduct);
          if(selectedProduct){
            let selectedProductObj = JSON.parse(selectedProduct);
            if(selectedProductObj.Quantity>0){
              --selectedProductObj.Quantity;
              ++selectedProductObj.inCart;
              console.log(selectedProduct);
              localStorage.setItem(selectedProductObj.ProductId,JSON.stringify(selectedProductObj));
              productsNumber();
            }else{
              item.classList.add("out-of-stock");
            }
          }else{
            localStorage.setItem(data[i].ProductId,JSON.stringify(data[i]));
            let newData = localStorage.getItem(data[i].ProductId);
            let newDataObj = JSON.parse(newData);
            --newDataObj.Quantity;
            newDataObj.inCart = 1;
            console.log(newDataObj);
            localStorage.setItem(newDataObj.ProductId,JSON.stringify(newDataObj));
            productsNumber();
          }
        });
      }
    }
  }
}
function productsNumber(){
  let productsNumber = localStorage.getItem("productsNumber");
  if(productsNumber){
    productsNumber = Number(productsNumber);
    productsNumber++;
    localStorage.setItem("productsNumber",productsNumber);
    shoppingCartNumber.textContent=localStorage.getItem("productsNumber");
  }else{
    localStorage.setItem("productsNumber",1);
    shoppingCartNumber.textContent=localStorage.getItem("productsNumber");
  }
  
}