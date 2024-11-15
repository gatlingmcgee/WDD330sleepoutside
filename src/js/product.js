import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = setLocalStorage("product");

const product = new ProductDetails(productId, dataSource);
product.init();
