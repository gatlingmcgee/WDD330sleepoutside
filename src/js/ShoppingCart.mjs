import { renderListWithTemplate } from "./utils.mjs";

function ShoppingCartTemplate(product) {
  return `<li class="product-card">
  <a href="#">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">${product.FinalPrice}</p>
  }
  </a>
</li>`;
}

export default class ShoppingCart {
  constructor(category, dataSource, listElement) {

    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  filterProducts(list, productIds) {
    return list.filter(product => productIds.includes(product.Id));

  }
  renderList(list) {
    renderListWithTemplate(ShoppingCartTemplate, this.listElement, list);

  }
}
