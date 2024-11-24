import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" loading="lazy" />
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
    this.products = []; // Array to store products
  }

  // async init() {
  //   const list = await this.dataSource.getData(this.category);
  //   this.products = list; // Save the products data
  //   this.renderList(list);
  //   this.addSortEventListener();
  // }

  async init() {
    try {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        this.products = list; // Save the products data
        this.addSortEventListener();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  addSortEventListener() {
    const sortDropdown = document.getElementById('sort');
    sortDropdown.addEventListener('change', (event) => {
      this.sortList(event.target.value);
    });
  }

  sortList(criteria) {
    let sortedList;

    switch (criteria) {
      case 'name-asc':
        sortedList = this.products.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case 'name-desc':
        sortedList = this.products.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case 'price-asc':
        sortedList = this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case 'price-desc':
        sortedList = this.products.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
      default:
        sortedList = this.products;
        break;
    }

    // Re-render the sorted list
    this.renderList(sortedList);
  }
}
