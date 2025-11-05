export const parseOrNull = (v) => {
  if (v === "" || v == null) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

export const addDerivedFields = (item) => {
  const price = Number(item.price);
  const d = item.discount_price != null ? Number(item.discount_price) : null;
  const hasDiscount = typeof d === "number" && d < price;

  return {
    ...item,
    effectivePrice: hasDiscount ? d : price,
    discount: hasDiscount ? Math.round(((price - d) / price) * 100) : null,
  };
};
export const inSelectedCategory = (categoryIdNum) => (item) =>
  categoryIdNum == null || item.categoryId === categoryIdNum;

export const matchesPriceRange = (min, max) => (item) =>
  (min === null || item.effectivePrice >= min) &&
  (max === null || item.effectivePrice <= max);

export const hasActiveDiscount = (item) => item.discount !== null;

export const sorters = {
  priceDesc: (a, b) => b.effectivePrice - a.effectivePrice,
  priceAsc: (a, b) => a.effectivePrice - b.effectivePrice,
  discountDesc: (a, b) => (b.discount || 0) - (a.discount || 0),
  default: (a, b) => a.id - b.id,
};

export const getSorter = (key) => sorters[key] ?? sorters.default;

export const getRelatedProducts = (items, product, n = 3) =>
  items
    .filter((i) => i.categoryId === product.categoryId && i.id !== product.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, n);
