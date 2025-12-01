import styles from "./Trust.module.css";
import { motion } from "framer-motion";
export const Trust = () => {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.005 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      <div className={styles.contentZone}>
        <div className={styles.titleZone}>
          <h1 className={styles.title}>
            TRUSTED BY <br /> WORLD PASSENGERS
          </h1>
        </div>
        <div className={styles.descZone}>
          <img src="/images/trustlogo.png" alt="" />
          <h2>Hàng ngàn khách hàng hài lòng </h2>
          <p className={styles.content}>
            Khách hàng hài lòng vì sự tận tâm và chuyên nghiệp của đội ngũ, giúp
            mọi thủ tục diễn ra nhanh chóng và suôn sẻ. Họ đặc biệt yêu thích sự
            thoải mái trên khoang và cảm giác an toàn tuyệt đối trong suốt hành
            trình. Đây là một trải nghiệm vượt trội, khiến chuyến bay không còn
            là sự di chuyển mà là một niềm vui trọn vẹn.
          </p>
        </div>
      </div>
      <div className={styles.image}>
        <div className={`${styles.box} ${styles.box1}`}>
          <img src="/images/cus5.webp" alt="" />
        </div>
        <div className={`${styles.box} ${styles.box2}`}>
          <img src="/images/cus6.jpg" alt="" />
        </div>
      </div>
    </motion.section>
  );
};
