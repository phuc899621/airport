import styles from "./Navigation.module.css";
import { useSearchParams } from "react-router-dom";

const Navigation = () => {
  const [searchParams] = useSearchParams();
  const fromCode = searchParams.get("from");
  const toCode = searchParams.get("to");
  const date = searchParams.get("date");
  return (
    <div className={styles.bookingBar}>
      <div className={styles.flightInfo}>
        <div className={`${styles.infoGroup} ${styles.routeGroup}`}>
          <div className={styles.routeCodes}>
            <span className={styles.code}>{fromCode}</span>
            <div className={styles.flightLine}>
              <span className={styles.dots}>................</span>
              <i className={`fa-solid fa-plane ${styles.planeIcon}`}></i>
            </div>
            <span className={styles.code}>{toCode}</span>
          </div>
          <div className={styles.routeCities}>
            <span>TP. Hồ Chí Minh</span>
            <span>Đà Nẵng</span>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.infoGroup}>
          <span className={styles.label}>Chuyến đi</span>
          <span className={styles.value}>{date}</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.infoGroup}>
          <span className={styles.label}>Hành khách</span>
          <span className={styles.value}>
            1 <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <div className={styles.bookingTab}>
        <i className="fa-solid fa-cart-shopping"></i>
        <span>THÔNG TIN ĐẶT CHỖ</span>
      </div>
    </div>
  );
};

export default Navigation;
