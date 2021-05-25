const productId = location.href.substr(location.href.indexOf("?")+1);

const urlApi = `https://afternoon-falls-30227.herokuapp.com/api/v1/products/${productId}`

const xhr = new XMLHttpRequest();
xhr.open("GET",urlApi);
xhr.send();

xhr.onload = ()=>{
  if(xhr.status===200){
    let item = JSON.parse(xhr.response).data;
    console.log(item);
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
      let availableQuantityNeeded = e.target.value;
      if(availableQuantityNeeded >item.Quantity||availableQuantityNeeded<=0){
        addToCardBtn.disabled = true;
        productPrice.textContent = `Sorry, Out of stock.`
      }else{
        addToCardBtn.disabled = false;
        productPrice.textContent = `${item.Price*availableQuantityNeeded} ${item.CurrencyCode}`
      }
    })
  }else{
    document.body.innerHTML = "Something wrong now, try again later";
  }

}


