const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

export const getProductStock = (product = {}) =>
  toNumber(product.stock ?? product.qty ?? product.quantity);

export const getProductPrice = (product = {}) =>
  toNumber(
    product.price ??
      product.sellingPrice ??
      product.purchasePrice ??
      product.productId?.sellingPrice ??
      product.productId?.price
  );

export const getProductMinStock = (product = {}, defaultMinStock = 10) =>
  toNumber(product.minStock ?? product.productId?.minStock ?? defaultMinStock);

export const getProductStockStatus = (product = {}, defaultMinStock = 10) => {
  const stock = getProductStock(product);
  const minStock = getProductMinStock(product, defaultMinStock);

  if (stock <= 0) return "Out Of Stock";
  if (stock <= minStock) return "Low Stock";

  return "In Stock";
};

// Total Stock Quantity
export const calculateTotalStock = (products = []) => {
  if (!Array.isArray(products)) return 0;

  return products.reduce(
    (total, product) => total + getProductStock(product),
    0
  );
};

// Total Stock Value
export const calculateStockValue = (products = []) => {
  if (!Array.isArray(products)) return 0;

  return products.reduce(
    (total, product) =>
      total + getProductStock(product) * getProductPrice(product),
    0
  );
};

// Low Stock Count
export const calculateLowStock = (products = [], defaultMinStock = 10) => {
  if (!Array.isArray(products)) return 0;

  return products.filter(
    (product) =>
      getProductStockStatus(product, defaultMinStock) === "Low Stock"
  ).length;
};

// Out Of Stock Count
export const calculateOutOfStock = (products = []) => {
  if (!Array.isArray(products)) return 0;

  return products.filter(
    (product) => getProductStockStatus(product) === "Out Of Stock"
  ).length;
};

// In Stock Count
export const calculateInStock = (products = [], defaultMinStock = 10) => {
  if (!Array.isArray(products)) return 0;

  return products.filter(
    (product) =>
      getProductStockStatus(product, defaultMinStock) === "In Stock"
  ).length;
};
