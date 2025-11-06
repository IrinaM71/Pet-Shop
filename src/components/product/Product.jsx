import { useDispatch, useSelector } from "react-redux";
import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import { Box, Button, sliderClasses, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import QuantitySelector from "../../ui/quantitySelector/QuantitySelector";
import { derivePricing, resolveImageUrl } from "../../shared/utils/product";
import {
  useEnsureProductsLoaded,
  useRelatedProducts,
  useMagnifyOrigin,
  useProductDescriptionExpandable,
} from "../../features/products/hooks";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  useSelector((state) => state.products);

  const [quantity, setQuantity] = useState(1);
  useEnsureProductsLoaded();

  const relatedItems = useRelatedProducts(product);
  const { imgRef, onMouseMove, onMouseLeave } = useMagnifyOrigin();
  const {
    expanded: showFull,
    toggle: toggleShowFull,
    canToggle: canToggleDescription,
    displayText: descriptionText,
  } = useProductDescriptionExpandable(product);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  const { effectivePrice, oldPrice, discountPercent } = derivePricing(product);
  const imgSrc = resolveImageUrl(product.image);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  return (
    <Box
      className={`${styles.wrapper} ${styles.mui}`}
      component="section"
      sx={{
        height: showFull || !canToggleDescription ? "auto" : "572px",
        "@media (max-width: 1200px)": { height: "auto" },
      }}
    >
      <Typography
        component="h1"
        className={`${styles.title} ${styles.titleMobile} ${styles.mui}`}
      >
        {product.title}
      </Typography>
      <Box className={`${styles.left} ${styles.mui}`}>
        {relatedItems.map((relatedItems) => (
          <NavLink
            className={styles.thumb}
            key={relatedItems.id}
            to={`/products/${relatedItems.id}`}
          >
            <img
              src={resolveImageUrl(relatedItems.image)}
              alt={relatedItems.title}
            />
          </NavLink>
        ))}
      </Box>
      <Box
        className={`${styles.imageWrapper} ${styles.mui}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <img
          className={styles.mainImage}
          ref={imgRef}
          src={imgSrc}
          alt={product.title}
        />
      </Box>
      <Box className={`${styles.info} ${styles.mui}`}>
        <Typography
          className={`${styles.title} ${styles.desctopTitle} ${styles.mui}`}
          component="h1"
        >
          {product.title}
        </Typography>
        <Box className={`${styles.prices} ${styles.mui}`}>
          <Typography
            className={`${styles.newPrice} ${styles.mui}`}
            component="span"
          >
            ${effectivePrice}
          </Typography>
          {discountPercent !== null && (
            <>
              <Typography
                className={`${styles.oldPrice} ${styles.mui}`}
                component="span"
              >
                ${oldPrice}
              </Typography>
              <Typography
                className={`${styles.badge} ${styles.mui}`}
                component="span"
              >
                -{discountPercent}%
              </Typography>
            </>
          )}
        </Box>
        <Box className={`${styles.controls} ${styles.mui}`}>
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            onIncrease={() => setQuantity(quantity + 1)}
          />
          <Button
            className={`${styles.addButton} ${styles.mui}`}
            variant="contained"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </Box>
        <Typography
          className={`${sliderClasses.descTitle} ${styles.mui}`}
          component="h3"
        >
          Description
        </Typography>
        <Typography
          className={`${styles.description} ${styles.mui} ${
            showFull ? styles.expanded : ""
          }`}
          component="p"
        >
          {descriptionText}
        </Typography>
        {canToggleDescription && (
          <Button
            className={`${styles.readMoreBtn} ${styles.mui}`}
            onClick={toggleShowFull}
          >
            {showFull ? "Hide" : "Red more"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Product;
