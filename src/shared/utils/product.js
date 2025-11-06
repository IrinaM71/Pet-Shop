import { CONFIG } from "../config";
import { http } from "../http";

const toNumber = (value) => {
  if (value === null) return NaN;
  const normalized = String(value)
    .trim()
    .replace(/\s+/g, "")
    .replace(/[€$]/g, "")
    .replace(/,/g, ".");
  return Number(normalized);
};

export const resolveImageUrl = (imagePath) =>
  imagePath?.startsWith?.("http")
    ? imagePath
    : `${CONFIG.API_URL}/${imagePath}`;

export const hasActiveDiscount = (product) => {
  if (!product) return false;
  const basePrice = toNumber(product.price);
  const discountedPrice = toNumber(product.discount_price);
  return (
    Number.isFinite(basePrice) &&
    Number.isFinite(discountedPrice) &&
    discountedPrice < basePrice
  );
};

export const derivePricing = (product) => {
  if (!product) {
    return {
      hasDiscount: false,
      effectivePrice: null,
      oldPrice: null,
      discountPercent: null,
    };
  }

  const basePrice = toNumber(product.price);
  const discountedPrice = toNumber(product.discount_price);

  const hasDiscount =
    Number.isFinite(basePrice) &&
    Number.isFinite(discountedPrice) &&
    discountedPrice < basePrice;

  const effectivePrice = hasDiscount ? discountedPrice : basePrice;
  const oldPrice = hasDiscount ? basePrice : null;
  const discountPercent = hasDiscount
    ? Math.round(((basePrice - discountedPrice) / basePrice) * 100)
    : null;
  return { hasDiscount, effectivePrice, oldPrice, discountPercent };
};

export const shuffle = (array) => {
  const copy = Array.isArray(array) ? array.slice() : [];
  for (let index = copy.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
};

export const getRelatedProducts = (items, currentProduct, count = 3) => {
  if (!currentProduct || !Array.isArray(items)) return [];
  const sameCategory = items.filter(
    (item) =>
      item.categoryId === currentProduct.categoryId &&
      item.id !== currentProduct.id
  );
  return shuffle(sameCategory).slice(0, count);
};
