import styles from "./Products.module.css";
import BreadcrumbsNav from "../../ui/breadcrumbs/BreadcrumbsNav";
import ProductsList from "../../components/productsList/ProductsList";
import Product from "../../components/product/Product";
import ProductFilter from "../../ui/productFilter/ProductFilter";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { http } from "../../shared/http";

function Products() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    discountOnly: false,
    sortBy: "default",
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await http.get(`/products/${id}`);
          setProduct(data);
        } catch {
          setProduct(null);
        }
      };
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product?.categoryId) {
      const fetchCategory = async () => {
        try {
          const { data } = await http.get(`/categories/${product.categoryId}`);
          setCategory(data.category);
        } catch {
          setCategory(null);
        }
      };
      fetchCategory();
    }
  }, [product?.categoryId]);

  const title = id ? product?.title || "Loading..." : "All products";
  const categoryTitle = id ? category?.title || "Loading..." : null;
  const items = id
    ? [
        { path: "/", label: "MainPage" },
        { path: "/catecories", label: "Categories" },
        {
          path: category ? `/categories/${product.categoryId}` : null,
          label: categoryTitle,
        },
        { label: title },
      ]
    : [{ path: "/", label: "Main Page" }, { label: title }];

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      {id ? (
        product ? (
          <Product product={product} />
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <>
          <h1 className={styles.title}>{title}</h1>
          <ProductFilter filters={filters} onChane={setFilters} />
          <ProductsList filters={filters} />
        </>
      )}
    </div>
  );
}

export default Products;
