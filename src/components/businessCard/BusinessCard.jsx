import { Button } from "@mui/material";
import styles from "./BusinessCard.jsx";
import { NavLink } from "react-router-dom";

const BusinessCard = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Amazing Discounts on Pets Products!</h1>
          <Button
            component={NavLink}
            to="/sales"
            variant="contained"
            className={styles.button}
          >
            Check out
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BusinessCard;
