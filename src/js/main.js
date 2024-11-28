// importing the product data from the ExternalServices.mjs
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { searchTents } from "./ExternalServices.mjs";
import Alert from "./alert.js";

const dataSource = new ExternalServices("tents");
const listElement = document.querySelector(".product-list");
const productListing = new ProductListing("tents", dataSource, listElement);

const alert = new Alert("/json/alerts.json");

document.getElementById("newsletterForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
  
    document.getElementById("message").innerText = `Thank you for subscribing, ${email}!`;
    
    document.getElementById("email").value = "";
 });
 
alert.loadAlerts("maintenance");
loadHeaderFooter();
productListing.init();
searchTents();
