import ProductCard from "../productCard/ProductCard";
import ProductCardSkeleton from "../productCard/Skeleton";
import styles from "./ProductsList.module.css";
import {
  useProducts,
  useEnsureProductsLoaded,
} from "../../features/products/hooks";

const SKELETON_FALLBACK = 8;

const ProductsList = ({ limit, categoryId, filters = {} }) => {
  useEnsureProductsLoaded();

  const { products, status } = useProducts({ limit, categoryId, filters });

  const isLoading = status === "loading" || status === "idle";
  const hasError = status === "failed";
  const isEmpty = !isLoading && !hasError && products.length === 0;

  const SkeletonCount = limit || SKELETON_FALLBACK;

  return (
    <section className={styles.section}>
      {hasError && (
        <p className={styles.error}>
          Couldn't load products. Please try again.
        </p>
      )}

      {isEmpty && (
        <p className={styles.emty}>Nothing found. Try changing the filters</p>
      )}

      <ul className={styles.list}>
        {isLoading
          ? Array.from({ length: SkeletonCount }).map((_, index) => (
              <ProductCardSkeleton key={`s-${index}`} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </ul>
    </section>
  );
};

export default ProductsList;
