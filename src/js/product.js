import ProductData from "./ProductData.mjs";
import { setLocalStorage } from "./utils.mjs";

const dataSource = new ProductData("tents");

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("product");
}

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

async function addToCartHandler() {
  const product = await dataSource.findProductById(getProductId());
  addProductToCart(product);
}

async function init() {
  const product = await dataSource.findProductById(getProductId());

  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.Name;
  document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").textContent = product.Description;

  const image = document.getElementById("productImage");
  image.src = product.Image;
  image.alt = product.Name;

  document
    .getElementById("addToCart")
    .setAttribute("data-id", product.Id);

  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

init();
