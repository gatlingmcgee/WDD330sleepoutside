//Import Data
import ProductData from './js/ProductData.mjs';
import ProductListing from './js/ProductList.mjs';

//Initialize ProductData
const productData = new ProductData();

//Load the Product Data
async function loadProducts() {
   const products = await productData.loadData();
   console.log(products);
}

// Get the HTML element where the products will be listed (e.g., a div with id="product-list")
const listElement = document.getElementById('product-list');

// Create an instance of ProductListing for the "tents" category
const tentsListing = new ProductListing('tents', productData, listElement);

// Call the init method to load and render products
tentsListing.init();

loadProducts();