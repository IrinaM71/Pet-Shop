import styles from "./NotFound.module.css"
import NotFoundImg from "../../assets/images/404.png"
import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"


function NotFound() {
  return (
     <div className={styles.container}>
      <img src={NotFoundImg} alt="404" />
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.text}>
          We’re sorry, the page you requested could not be found.
          Please go back to the homepage.
        </p>
        <Button
        className={styles.button}
        component={NavLink}
        to="/"
        variant="contained">
          Go Home
        </Button>
      </div>
     </div>

  );
}

export default NotFound;
