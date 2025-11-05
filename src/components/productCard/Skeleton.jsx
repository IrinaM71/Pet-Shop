import { Skeleton } from "@mui/material";
import styles from "./ProductCard.module.scc";

const ProductCardSkeleton = () => {
  return (
    <li className={styles.item}>
      <div className={styles.imageWrapper}>
        <Skeleton
          variant="rounded"
          width="100%"
          height={0}
          sx={{ paddingBottom: "100%", borderRadius: "8px" }}
        />
      </div>
      <Skeleton
        width="60%"
        height={24}
        className={styles.name}
        sx={{ mx: "auto" }}
      />
    </li>
  );
};

export default ProductCardSkeleton;
