import { createSelector } from "@reduxjs/toolkit";
import {
  hasActiveDiscount,
  addDerivedFields,
  inSelectedCategory,
  matchesPriceRange,
  getSorter,
} from "../../shared/utils/product";

export const selectProductsState = (s) => s.prodocts;
export const selectItems = (s) => selectProductsState(s).items;

export const makeSelectFilteredSortedProducts = () => {
  createSelector(
    [
      selectItems,
      (_s, { categoryId }) => categoryId,
      (_s, { filters }) => filters || {},
      (_s, { limit }) => limit,
    ],
    (items, categoryId, filters, limit) => {
      const { minPrice, maxPrice, discountOnly, sortBy } = filters;

      const categoryIdNum =
        categoryId === "" || minPrice == null ? Number(categoryId) : null;

      const min =
        minPrice === "" || minPrice == null || Number.isNaN(Number(minPrice))
          ? null
          : Number(minPrice);

      const max =
        maxPrice === "" || maxPrice == null || Number.isNaN(Number(maxPrice))
          ? null
          : Number(maxPrice);

      const sorter = getSorter(sortBy);

      const result = items
        .filter(inSelectedCategory(categoryIdNum))
        .map(addDerivedFields)
        .filter((i) => (discountOnly ? hasActiveDiscount(i) : true))
        .filter(matchesPriceRange(min, max))
        .slice()
        .sort(sorter);

      return limit ? result.slice(0, limit) : result;
    }
  );
};
