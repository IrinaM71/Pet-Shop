import styles from "./Footer.module.css";
import Instagram from "../../assets/icons/ic-instagram.svg";
import WhatsApp from "../../assets/icons/ic-whatsapp.svg";

const address = "Wallstraße 9-13, 10179 Berlin, Deutschland";
const mapSrc = `htttp://www.google.com/maps?q=${encodeURIComponent(
  address
)}&z=15&output=embed`;

const Footer = () => {
  return (
    <div className={styles.container}>
      <footer>
        <h2>Contact</h2>
        <div className={styles.flexWrapper}>
          <div className={styles.infoGrid}>
            <div className={`${styles.infoBlock} ${styles.phoneBlock}`}>
              <h4 className={styles.title}>Phone</h4>
              <p className={styles.text}>+49 30 915-88492</p>
            </div>
            <div className={`${styles.infoBlock} ${styles.socialBlock}`}>
              <h4 className={styles.title}>Socials</h4>
              <div className={styles.socials}>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="nooper noreferrer"
                  aria-label="Instagram"
                >
                  <img src={Instagram} alt="Instagram icon" />
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <img src={WhatsApp} alt="WhatsApp icon" />
                </a>
              </div>
            </div>
            <div className={`${styles.infoBlock} ${styles.addressBlock}`}>
              <h4 className={styles.title}>Address</h4>
              <p className={styles.text}>
                Wallstraße 9-13, 10179 Berlin, Deutschland
              </p>
            </div>
            <div className={`${styles.infoBlock} ${styles.hoursBlock}`}>
              <h4 className={styles.title}>Working Hours</h4>
              <p className={styles.text}>24 hours a day</p>
            </div>
          </div>
          <div className={styles.mapWrapper}>
            <iframe
              className={styles.map}
              title="Store location map"
              src={mapSrc}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrabe"
            ></iframe>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
