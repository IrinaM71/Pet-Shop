export const sanitizePhone = (value = "") =>
  value.replace(/[^\d+()\s-]/g, "").trim();

export const normalizeEmail = (value = "") => value.trim().toLowerCase();

export const isNotEmptyString = (value) =>
  typeof value === "string" && value.trim() !== "";
