import { getLocalStorage, setLocalStorage, loadHeaderFooter, alertMessage } from "./utils.mjs";

function productDetailsTemplate(product) {
  const suggestedRetailPrice = product.SuggestedRetailPrice || 0;
  const listPrice = product.ListPrice || product.FinalPrice || 0;
  const discount = suggestedRetailPrice > 0
    ? ((suggestedRetailPrice - listPrice) / suggestedRetailPrice * 100).toFixed(0)
    : 0;

  let priceHTML = `<p class="product-card__price">$${listPrice.toFixed(2)}</p>`;
  let discountHTML = "";
  let discountFlag = "";  // Variable for the discount flag

  if (discount > 0) {
    priceHTML = `
      <p class="product-card__price">
        <span class="original-price">$${suggestedRetailPrice.toFixed(2)}</span>
        <span class="discounted-price">$${listPrice.toFixed(2)}</span>
      </p>`;
    
    discountFlag = `<span class="discount-flag">-${discount}%</span>`;  // Discount flag
  }

  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <div class="product-image-container">
      <img
        srcset="${product.Images.PrimarySmall} 480w, 
                ${product.Images.PrimaryMedium} 768w, 
                ${product.Images.PrimaryLarge} 1024w"
        sizes="(max-width: 480px) 480px, 
              (max-width: 768px) 768px, 
              1024px"
        src="${product.Images.PrimaryLarge}" 
        alt="${product.NameWithoutBrand}" 
        loading="lazy"
      />
      ${discountFlag} <!-- The discount flag here -->
    </div>
    ${priceHTML}
    ${discountHTML}
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>

    <!-- Add Comment Form -->
    <div class="product-detail__comments">
      <h3>Comments</h3>
      <ul id="comments-list"></ul>
      <textarea id="comment-text" placeholder="Add a comment..."></textarea>
      <button id="submit-comment" data-id="${product.Id}">Submit Comment</button>
    </div>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}


export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

//  addToCart() {
//    const cartIcon = document.querySelector(".cart-icon");
//    setLocalStorage("so-cart", this.product);
//    cartIcon.classList.add("animate");
//    setTimeout(() => {
//      cartIcon.classList.remove("animate");
//    },500);

//    cartContents.push(this.product);
//    setLocalStorage("so-cart", cartContents);
//    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
//  }

  addToCart() {

    const cartIcon = document.querySelector(".cart-icon");
    setLocalStorage("so-cart", this.product);
    cartIcon.classList.add("animate");
    setTimeout(() => {
    cartIcon.classList.remove("animate");
    },500);

    let cartContents = getLocalStorage("so-cart");
    //check to see if there was anything there
    if (!cartContents) {
      cartContents = [];
    }
    // then add the current product to the list
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }
  
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}

loadHeaderFooter();
