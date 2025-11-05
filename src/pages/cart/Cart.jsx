import styles from "Cart.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import SectionHeading from "../../ui/sectionHeanding/SectionHeading";
import CartList from "../../components/cartList/CartList";
import OrderDetails from "../../components/orderDetails/OrderDatails";
import OrderModal from "../../components/orderModal/OrderModal";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleSuccess = () => {
    setIsOrderPlaced(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsOrderPlaced(false);
    dispatch(clearCart());
  };

  return (
    <div className={styles.container}>
      <SectionHeading
        title="Shopping cart"
        to="/"
        buttonText="Back to the store"
      />
      {items.length ? (
        <div className={styles.content}>
          <CartList />
          <OrderDetails
            onSuccess={handleSuccess}
            isOrderPlaced={isOrderPlaced}
          />
        </div>
      ) : (
        <>
          <p className={styles.cartMessage}>
            Looks like you have no items in your busket corrently.
          </p>
          <Button
            className={`${styles.continueShoppingBtn} ${styles.mui}`}
            component={NavLink}
            to="/"
            variant="contained"
          >
            Continue Shopping
          </Button>
        </>
      )}
      <OrderModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Cart;
