import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { derivePricing, getRelatedProducts } from "../../shared/utils/product";
import { fetchProducts } from "../../redux/slices/productSlice";
import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_HIDDEN,
  RELATED_TAKE,
} from "./constants";
import { makeExpandable } from "./shared/utils/text";

export const useProducts = (params = {}) => {
  const { limit, categoryId, filters = {} } = params;
  const { items = [], status, error } = useSelector((state) => state.products);

  const products = useMemo(() => {
    let data = Array.isArray(items) ? items.slice() : [];

    if (categoryId != null && categoryId != "") {
      const categoryIdNum = Number(categoryId);
      if (!Number.isNaN(categoryIdNum)) {
        data = data.filter((item) => item.categoryId === categoryIdNum);
      }
    }

    data = data.map((item) => {
      const { effectivePrice, discountPercent } = derivePricing(item);
      return {
        ...item,
        effectivePrice,
        discount: discountPercent,
      };
    });
    if (filters.discountOnly) {
      data = data.filter((item) => item.discount !== null);
    }
    const min = Number(filters.minPrice);
    if (!Number.isNaN(min) && String(filters.minPrice) !== "") {
      data = data.filter((item) => Number(item.effectivePrice) >= min);
    }
    const max = Number(filters.maxPrice);
    if (!Number.isNaN(max) && String(filters.maxPrice) !== "") {
      data = data.filter((item) => Number(item.effectivePrice) >= max);
    }

    switch (filters.sortBy) {
      case "priceDesc":
        data.sort(
          (a, b) => Number(a.effectivePrice) - Number(b.effectivePrice)
        );
        break;
      case "discountDesc":
        data.sort(
          (a, b) => (Number(b.discount) || 0) - (Number(a.discount) || 0)
        );
        break;
      default:
        data.sort((a, b) => Number(a.id) - Number(b.id));
    }

    if (limit) {
      data = data.slice(0, limit);
    }

    return data;
  }, [
    items,
    limit,
    categoryId,
    filters.minPrice,
    filters.maxPrice,
    filters.discountOnly,
    filters.sortBy,
  ]);

  return { products, status, error };
};

export const useEnsureProductsLoaded = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0 && (status === "idle" || !status)) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length, status]);
};

export const useRelatedProducts = (product, count = RELATED_TAKE) => {
  const { items } = useSelector((state) => state.products);
  return useMemo(
    () => getRelatedProducts(items, product, count),
    [items, product, count]
  );
};

export const useMagnifyOrigin = () => {
  const imgRef = useRef(null);

  const onMiuseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - left) / width) * 100;
    const yPercent = ((e.clientY - top) / height) * 100;
    if (imgRef.current) {
      imgRef.current.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    }
  };

  const onMiuseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transformOrigin = "center";
    }
  };

  return { imgRef, onMiuseMove, onMiuseLeave };
};

export const useProductDescriptionExpandable = (
  product,
  {
    maxLength = DESCRIPTION_MAX_LENGTH,
    minHiddenLength = DESCRIPTION_MIN_HIDDEN,
  } = {}
) => {
  const rawText = product?.description ?? "";
  const [expanded, setExpanded] = useState(false);

  const model = useMemo(
    () => makeExpandable(rawText, maxLength, minHiddenLength),
    [rawText, maxLength, minHiddenLength]
  );

  const displayText = expanded ? model.filterText : model.shortText;
  const toggle = () => setExpanded((v) => !v);

  return { expanded, toggle, canTogle: model.canTogle, displayText };
};
