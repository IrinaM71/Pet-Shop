import styles from "./Header.module.css";
import Logo from "../../assets/icons/logosvg";
import CartBadge from "./CartBadge";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Box, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import { selectCartCount } from "../../redux/selektors/cart";

const Header = () => {
  const itemCount = useSelector(selectCartCount);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  const navLinks = useMemo(
    () => (
      <>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activ}` : styles.link
          }
        >
          Main Page
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activ}` : styles.link
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activ}` : styles.link
          }
        >
          All products
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activ}` : styles.link
          }
        >
          All sales
        </NavLink>
      </>
    ),
    []
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} aria-label="Home page">
          <img src={Logo} alt="Logo" />
        </NavLink>
        {isMobile ? (
          <div className={styles.actions}>
            <CartBadge count={itemCount} />
            <IconButton
              className={`${styles.menuBtn} ${styles.mui}`}
              aria-label="Open navigation menu"
              onClick={toggleDrawer(true)}
              sx={{ marginLeft: "9px" }}
            >
              <MenuIcon
                className={`${styles.menuIcon}`}
                sx={{ fontSize: "40px" }}
              />
            </IconButton>

            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                className={styles.drawer}
                onClick={toggleDrawer(false)}
                role="navigation"
                aria-label="Primary navigation"
              >
                {navLinks}
              </Box>
            </Drawer>
          </div>
        ) : (
          <>
            <nav className={styles.nav} aria-label="Primary navigation">
              {navLinks}
            </nav>
            <CartBadge count={itemCount} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
