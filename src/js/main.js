// importing the product data from the ProductData.mjs
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from '../js/alert.js';

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productListing = new ProductListing("tents", dataSource, listElement);

const alert = new Alert('../dist/json/alerts.json');

alert.loadAlerts('maintenance');
loadHeaderFooter();
productListing.init();
