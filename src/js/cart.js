import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  //change cartitems into an arry, because before, it was a single object
  //const updatedCartItems = Array.isArray(JSON.parse(cartItems)) ? JSON.parse(cartItems) : [];

  //Independant task, Remove from cart feature: make sure the cart items are in an array: sean 11/16
  const updatedCartItems = Array.isArray(cartItems) ? cartItems : [cartItems];
  //const updatedCartItems = [cartItems];

  const htmlItems = updatedCartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //Independant task, Remove from cart feature: added an eventlistener to remove items from cart: sean 11/16
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      removeItemFromCart(productId);
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
</li>`;
  const price = `$${item.FinalPrice}`;
  document.getElementById("cart-card__price").innerHTML = price;
  
  return newItem;
}

// Independant task, Empty Card Error: cart.html: added an eventlistener to check if cart is empty to relay empty cart message Sean 11/16
document.addEventListener("DOMContentLoaded", () => {
  // Fetch cart data from localStorage
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Get the cart items list element
  const cartItemsElement = document.getElementById("cartItems");
  const emptyCartMessage = document.getElementById("emptyCartMessage");

  // Check if the cart is empty
  if (cart.length === 0) {
    // Show empty cart message
    emptyCartMessage.style.display = "block";
  } else {
    // Render cart items
    cart.forEach(product => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-card", "divider");
      cartItem.innerHTML = `
        <a href="product_pages/${product.Id}.html" class="cart-card__image">
          <img src="${product.Image}" alt="${product.Name}" />
        </a>
        <a href="product_pages/${product.Id}.html">
          <h2 class="card__name">${product.Name}</h2>
        </a>
        <p class="cart-card__color">${product.Colors[0]?.ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${product.FinalPrice}</p>
      `;
      cartItemsElement.appendChild(cartItem);
    });
  }
});

  //Independant task, Remove from cart feature: added the remove item from cart function: sean 11/16
  function removeItemFromCart(productId) {
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  // Get the current cart from localStorage
  let cart = getLocalStorage("so-cart");
  // If cart is a single object, convert it to an array
  if (!Array.isArray(cart)) {
    cart = [cart];
  }
  // Filter out the item to be removed
  const updatedCart = cart.filter(item => item.Id !== productId);
  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", updatedCart);
  // Re-render the cart
  renderCartContents();
  emptyCartMessage.style.display = "block";
}

loadHeaderFooter();
renderCartContents();

