import CategoryCard from "../categoryCard/CategoryCard";
import CategoryCardSkeleton from "../categoryCard/Skeleton";
import { useCategories } from "../../features/categories/hooks";
import styles from "./CategoriesList.module.css";

const SKELETON_FALLBACK = 8;

const CategoriesList = ({ limit }) => {
  const { categories, status, error } = useCategories(limit);

  const isLoading = status === "loading";
  const isEmpty = status === "succeeded" && categories.length === 0;
  const skeletonCount = limit || SKELETON_FALLBACK;

  return (
    <section className={styles.section} aria-busy={isLoading}>
      <ul className={styles.list}>
        {isLoading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <CategoryCardSkeleton key={`s-${i}`} />
          ))}

        {!isLoading &&
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}

        {!isLoading && isEmpty && <li className={styles.empty}>No category</li>}

        {status === "failed" && (
          <li className={styles.error}>
            Unable to load categories{error ? `: ${error}` : ""}.
          </li>
        )}
      </ul>
    </section>
  );
};

export default CategoriesList;
