const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const calculateSales = (sales = []) => {
  if (!Array.isArray(sales)) return 0;

  return sales.reduce((total, item) => {
    return total + toNumber(item.quantity ?? item.qty) * toNumber(item.price);
  }, 0);
};

export default calculateSales;
