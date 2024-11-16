import { getLocalStorage } from "./utils.mjs";

/*
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  //change cartitems into an array, because before, it was a single object
  const updatedCartItems = [cartItems];
  const htmlItems = updatedCartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}
  */

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

<<<<<<< HEAD
  const newCartItems = Array.isArray(cartItems) ? cartItems : [cartItems];

  const htmlItems = newCartItems.map((item) => cartItemTemplate(item));
  
=======
  //change cartitems into an arry, because before, it was a single object
  //const updatedCartItems = Array.isArray(JSON.parse(cartItems)) ? JSON.parse(cartItems) : [];
  const updatedCartItems = [cartItems];

  const htmlItems = updatedCartItems.map((item) => cartItemTemplate(item));
>>>>>>> 210766a28bbaf8659986f66d020ac742c45c1377
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

