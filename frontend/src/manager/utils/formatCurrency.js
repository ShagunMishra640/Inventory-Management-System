const formatCurrency = (amount, options = {}) => {
  const number = Number(amount);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(Number.isFinite(number) ? number : 0);
};

export default formatCurrency;
