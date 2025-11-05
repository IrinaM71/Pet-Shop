import { useEffect, useMemo, useRef, useState } from "react";
import Basket from "../../assets/icons/Basket.svg";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { Badge } from "@mui/material";

const usePrefersReducedMotion = () => {
  const [reduced, setRedused] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setRedused(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
  }, []);
  return reduced;
};

const CartBadge = ({ count }) => {
  const [animateCart, setAnimataCart] = useState(false);
  const timeoutRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const play = () => {
      if (reducedMotion) return;
      setAnimataCart(true);
      timeoutRef.current = setTimeout(() => setAnimataCart(false), 500);
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (count > 0) {
      play();

      const loop = () => {
        play();
        timeoutRef.current = setTimeout(loop, 6000);
      };
      timeoutRef.current = setTimeout(loop, 6000);
    } else {
      setAnimataCart(false);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [count, reducedMotion]);

  const ariaLabel = useMemo(
    () => (count ? `${count} item${count !== 1 ? "s" : ""}` : "Cart, empty"),
    [count]
  );

  return (
    <NavLink to="/cart" className={styles.cartLink} aria-label="Cart">
      <Badge className={styles.badge} badgeContent={count} color="primary">
        <img
          className={`${styles.cart} ${animateCart ? styles.cartAnimated : ""}`}
          src={Basket}
          alt={ariaLabel}
        />
      </Badge>
    </NavLink>
  );
};

export default CartBadge;
