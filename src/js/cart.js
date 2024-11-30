import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  //change cartitems into an arry, because before, it was a single object

  //Independant task, Remove from cart feature: make sure the cart items are in an array: sean 11/16
  const updatedCartItems = Array.isArray(cartItems) ? cartItems : [cartItems];
  //const updatedCartItems = [cartItems];

  const htmlItems = updatedCartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //event listener for quantity change #1: sean 11/23
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach(input => {
    if (input.value === "" || isNaN(input.value) || parseInt(input.value) < 1) {
      input.value = 1;
    }
  });

  const totalPrice = updatedCartItems.reduce((acc, item) => acc + (item.FinalPrice * item.quantity), 0);
  document.querySelector(".cart-total").innerHTML = `Total: $${totalPrice.toFixed(2)}`;

  //Independant task, Remove from cart feature: added an eventlistener to remove items from cart: sean 11/16
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      removeItemFromCart(productId);
    });
  });

  //event listener for quantity change #2: sean 11/23
  quantityInputs.forEach(input => {
    input.addEventListener("change", (event) => {
      const productId = event.target.getAttribute("data-id");
       const newQuantity = parseInt(event.target.value);
      updateItemQuantity(productId, newQuantity);
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
  <div class="cart-card__quantity">
  <p>Quantity: <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-id="${item.Id}" /></p>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
</li>`;
  
  return newItem;
}

// Independant task, Empty Cart Error: cart.html: added an eventlistener to check if cart is empty to relay empty cart message Sean 11/16
document.addEventListener("DOMContentLoaded", () => {

  const cart = getLocalStorage("so-cart") || [];
  const emptyCartMessage = document.getElementById("emptyCartMessage");

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
   } else {
    renderCartContents();
   }

});


//Independant task, add cart quantity feature: added the update item quantity function: sean 11/23
function updateItemQuantity(productId, newQuantity) {
  
  
  if (newQuantity < 1 || isNaN(newQuantity)) return;
  
  let cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) {
    cart = [cart]
  }

  const itemIndex = cart.findIndex(item => item.Id === productId);
  
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
    setLocalStorage("so-cart", cart);
    renderCartContents();
  }
};

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

