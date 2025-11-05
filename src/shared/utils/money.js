const FALLBACK_LOCALE = "en-Us";
const FALLBACK_CURRENCY = "USD";

export const formatPrice = (
  value,
  locale = FALLBACK_LOCALE,
  currency = FALLBACK_CURRENCY
) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    num
  );
};
