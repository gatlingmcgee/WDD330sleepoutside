// importing the product data from the ProductData.mjs
//import ProductData from "./ProductData.mjs"
//import ProductListing from "./ProductList.mjs";

//const dataSource = new ProductData("tents");
//const listElement = document.querySelector(".product-list");
//const productListing = new ProductListing("tents", dataSource, listElement);

//productListing.init();



// src/js/product-listing.js
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

// Extract the category from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "tents";  // Default to "tents" if no category is provided

// Create the data source for the selected category
const dataSource = new ProductData(category);

// Get the product-list container
const listElement = document.querySelector(".product-list");

// Instantiate and initialize the product listing for the selected category
const productListing = new ProductListing(category, dataSource, listElement);
productListing.init();
