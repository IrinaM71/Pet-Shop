import { useSelector } from "react-redux";
import styles from "./CartList.module.css";
import CartItem from "../cartItem/CartItem";

const CartList = () => {
  const { items } = useSelector((state) => state.cart);

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default CartList;
