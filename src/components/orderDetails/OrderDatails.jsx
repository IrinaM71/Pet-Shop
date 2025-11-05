import { useSelector } from "react-redux";
import styles from "./OrderDatails.module.css";
import { derivePricing } from "../../shared/utils/product";
import { formatPrice } from "../../shared/utils/money";
import OrderForm from "../orderForm/OrderForm";

const OrderDatails = ({ onSuccess, orderPlased }) => {
  const { items } = useSelector((state) => state.cart);

  const itemCount = items.reduce(
    (sum, cartItem) => sum + (cartItem.quantity || 0),
    0
  );

  const totalAmount = items.reduce((sum, cartItem) => {
    const { effectivePrice } = derivePricing(cartItem);
    const lineTotal = (Number(effectivePrice) || 0) * (cartItem.quantity || 0);
    return sum + lineTotal;
  }, 0);

  return (
    <div className={styles.wrapper} aria-live="polite">
      <h2 className={styles.title}>Order details</h2>
      <p className={styles.items}>
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>
      <div className={styles.totalPow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalPrice}>{formatPrice(totalAmount)}</span>
      </div>
      <OrderForm onSuccess={onSuccess} orderPlaced={orderPlased} />
    </div>
  );
};

export default OrderDatails;
