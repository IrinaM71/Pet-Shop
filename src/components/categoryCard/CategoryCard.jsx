import { NavLink } from "react-router-dom";
import { CONFIG } from "../../shared/config";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ category }) => {
  const imgSrc = category.image?.startsWith("http")
    ? category.image
    : `${CONFIG.API_URL}/${category.image}`;

  return (
    <li className={styles.item}>
      <NavLink to={`/categories/${category.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img src={imgSrc} alt={category.title} className={styles.image} />
        </div>
        <p className={styles.name}>{category.title}</p>
      </NavLink>
    </li>
  );
};

export default CategoryCard;
