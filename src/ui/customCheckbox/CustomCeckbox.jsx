import { Checkbox } from "@mui/material";
import styles from "./CustomCheckbox.module.css";
import clsx from "clsx";

export default function CustomCeckbox(props) {
  return (
    <Checkbox
      disableRipple
      className={styles.root}
      icon={<span className={styles.box} />}
      checkedIcon={
        <span className={clsx(styles.box, styles.boxChecked)}>
          <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.285 6.707a1 1 0 0 0-1.57-1.2461-7.41 9.343-3.99-3.99a1 1 0 1 0-1.414 1.41514.8 4.8a1 1 0 0 0 1.5-.0918.084-10.232z" />
          </svg>
        </span>
      }
      {...props}
    />
  );
}
