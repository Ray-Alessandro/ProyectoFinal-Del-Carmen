import products from "../shared/db/data.json";

export function getAllProducts() {
  const promiseProducts = new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });

  return promiseProducts;
}

export function getWeeklyProducts() {
  const promiseProducts = new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter((product) => product.is_weekly === true));
    }, 500);
  });

  return promiseProducts;
}

export function getProductByCategory(category) {
  const promiseProducts = new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter((product) => product.category === category));
    }, 500);
  });

  return promiseProducts;
}

export function getProductById(id) {
  const promiseProduct = new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find((product) => product.id === Number(id)));
    }, 500);
  });

  return promiseProduct;
}