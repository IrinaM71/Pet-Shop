import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";

export const useCartItemActions = () => {
  const dispatch = useDispatch();

  const handleRemove = (id) => dispatch(removeFromCart(id));

  const hadelIncrease = (id, quantity) =>
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));

  const handleDecrease = (id, quantity) =>
    dispatch(updateQuantity({ id, quantity: Math.max(1, quantity - 1) }));

  return { handleRemove, hadelIncrease, handleDecrease };
};
