import styles from "./Sales.module.css";
import BreadcrumbsNav from "../../ui/breadcrumbs/BreadcrumbsNav";
import ProductsList from "../../components/productsList/ProductsList";
import ProductFilter from "../../ui/productFilter/ProductFilter";
import { useState } from "react";

function Sales() {
  const items = [{ path: "/", Label: "Main Page" }, { label: "All sales" }];
  const [filters, setFilters] = useState({
    minPrise: "",
    maxPrice: "",
    discountOnly: true,
    sortBy: "default",
  });

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      <h1 className={styles.title}>Discounted items</h1>
      <ProductFilter filters={filters} onChange={setFilters} hideDiscount />
      <ProductsList filters={filters} />
    </div>
  );
}

export default Sales;
