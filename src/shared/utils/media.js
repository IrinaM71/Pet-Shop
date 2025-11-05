import { CONFIG } from "../config";

export const resolveImageUrl = (Image) => {
  if (!image) return "";
  return image.startWith("http") ? image : `${CONFIG.API_URL}/${image}`;
};
