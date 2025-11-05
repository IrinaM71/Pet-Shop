import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";

export const useCategories = (limit) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(
    (state) => state.categories,
    shallowEqual
  );

  useEffect(() => {
    if (items.length === 0 && status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, items.length, status]);

  const sliced = useMemo(
    () => (limit ? items.slice(0, limit) : items),
    [items, limit]
  );

  return { categories: sliced, status, error };
};
