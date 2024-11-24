// importing the product data from the ProductData.mjs
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import alert from '../js/alert.js';

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productListing = new ProductListing("tents", dataSource, listElement);

const alert = new alert('../dist/json/alerts.json');

alert.loadalerts('maintenance');
loadHeaderFooter();
productListing.init();
