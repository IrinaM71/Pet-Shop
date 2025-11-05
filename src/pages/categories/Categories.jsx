import styles from "./Categories.module.css";
import CategoriesList from "../../components/categoriesList/CategoriesList";
import ProductsList from "../../components/productsList/ProductsList";
import BreadcrumbsNav from "../../ui/breadcrumbs/BreadcrumbsNav";
import ProductFilter from "../../ui/productFilter/ProductFilter";
import { http } from "../../shared/http";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Categories() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(!id);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    discountOnly: false,
    sortBy: "default",
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchCategory = async () => {
        try {
          const { data } = await http.get(`/categories/${id}`);
          setCategory(data.category);
        } catch {
          setCategory(null);
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    }
  }, [id]);

  const title = id
    ? loading
      ? "loading..."
      : category?.title || "Category"
    : "Categories";

  const items = id
    ? [
        { path: "/", label: "Main Page" },
        { path: "/categories", label: "Categories" },
        { label: title },
      ]
    : [{ path: "/", label: "Main Page" }, { label: title }];

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      <h1 className={styles.title}>{title}</h1>
      {id ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ProductFilter filters={filters} onChange={setFilters} />
            <ProductsList categoryId={Number(id)} filters={filters} />
          </>
        )
      ) : (
        <CategoriesList />
      )}
    </div>
  );
}

export default Categories;
