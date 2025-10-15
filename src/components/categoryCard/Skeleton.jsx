import { Skeleton } from "@mui/material";
import styles from "./CategoryCard.module.css";

const CategoryCardSkeleton = () => {
  return (
    <li className={styles.item}>
      <div className={styles.imageWrapper}>
        <Skeleton
          variant="rounded"
          width="100%"
          height="100%"
          sx={{ borderRadius: "8px" }}
        />
      </div>
      <Skeleton
        width="60%"
        height={24}
        sx={{ mx: "auto" }}
        className={styles.name}
      />
    </li>
  );
};

export default CategoryCardSkeleton;
