import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { derivePricing, resolveImageUrl } from "../../shared/utils/product";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";
import { Box, IconButton, Typography } from "@mui/material";
import QuantitySelector from "../../ui/quantitySelector/QuantitySelector";
import { formatPrice } from "../../shared/utils/money";
import CloseIcon from "@mui/icons-material/Close";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const { hasDiscount, effectivePrice, oldPrice } = derivePricing(item);
  const imageSrc = resolveImageUrl(item.image);

  const handleRemove = () => dispatch(removeFromCart(item.id));

  const handleIncrease = () =>
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );

  const handleDecrease = () =>
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: Math.max(1, item.quantity - 1),
      })
    );

  return (
    <Box className={`${styles.item} ${styles.mui}`} component="li">
      <img src={imageSrc} alt={item.title} className={styles.image} />

      <Box className={styles.info}>
        <Box className={`${styles.titleWrapper} ${styles.mui}`}>
          <Typography
            component="h3"
            className={`${styles.title} ${styles.mui}`}
          >
            {item.title}
          </Typography>
          <IconButton
            className={styles.removeBtn}
            onClick={handleRemove}
            aria-label="remove"
          >
            <CloseIcon className={styles.removeIcon} />
          </IconButton>
        </Box>
        <Box className={styles.controls}>
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            fullWidth={false}
          />
          <Box className={styles.prices}>
            <Typography
              component="span"
              className={`${styles.newPrice} ${styles.mui}`}
            >
              {formatPrice(effectivePrice)}
            </Typography>

            {hasDiscount && oldPrice !== null && (
              <Typography
                component="span"
                className={`${styles.oldPrice} ${styles.mui}`}
              >
                {formatPrice(oldPrice)}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
