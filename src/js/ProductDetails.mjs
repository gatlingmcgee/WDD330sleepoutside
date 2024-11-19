import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  const suggestedRetailPrice = product.SuggestedRetailPrice || 0;
  const listPrice = product.ListPrice || 0;
  const discount = suggestedRetailPrice > 0 ? ((suggestedRetailPrice - listPrice) / suggestedRetailPrice * 100).toFixed(0) : 0;
  const discountedPrice = listPrice.toFixed(2); 

  let priceHTML = `<p class="product-card__price">$${listPrice}</p>`;
  let discountHTML = '';

  
  if (discount > 0) {
    priceHTML = `<p class="product-card__price">
                  <span class="original-price" style="text-decoration: line-through; color: gray;">$${suggestedRetailPrice}</span>
                  <span class="discounted-price">$${discountedPrice}</span>
                </p>`;
    discountHTML = `<p class="discount-percentage">-${discount}% OFF</p>`; 
  }

  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
    ${priceHTML} ${discountHTML}
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
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

  addToCart() {
    setLocalStorage("so-cart", this.product);
  }
  
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}
