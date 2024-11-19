import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">${product.FinalPrice}</p>
  ${
    product.FinalPrice < product.SuggestedRetailPrice
      ? `<p class="discount">${Math.round(
          ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
        )}% OFF</p>`
      : ""
  }
  </a>
</li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {

    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData();
    const filteredList = this.filterProducts(list, [
      "880RR",
      "985RF",
      "344YJ",
      "985PR"
    ]);
    this.renderList(filteredList);
  }
  filterProducts(list, productIds) {
    return list.filter(product => productIds.includes(product.Id));

  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }
}