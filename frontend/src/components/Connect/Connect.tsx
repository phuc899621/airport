import styles from "./Connect.module.css";
import { motion } from "framer-motion";
export const Connect = () => {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.005 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      <div className={styles.contentZone}>
        <h1 className={styles.title}>CONNECT THE WORLD</h1>
        <p className={styles.content}>
          <div className={styles.circle}></div>
          <span>Mở rộng địa giới</span> <br />
          <br />
          Tuyến bay của chúng tôi phủ sóng các thành phố lớn và các điểm đến du
          lịch nổi tiếng trên toàn cầu. Khả năng kết nối linh hoạt giữa các
          chuyến bay (layover) giúp hành trình của bạn trở nên liền mạch. Khám
          phá thế giới chưa bao giờ dễ dàng đến thế!
        </p>
        <p className={styles.content}>
          <div className={styles.circle}></div>
          <span>Kết Nối Rộng Khắp</span> <br />
          <br />
          Chúng tôi tự hào với mạng lưới bay rộng khắp, kết nối bạn đến các điểm
          đến quan trọng trong nước và quốc tế. Lịch trình bay linh hoạt và tần
          suất cao giúp bạn dễ dàng sắp xếp mọi kế hoạch du lịch và công việc.
        </p>
      </div>
      <div className={styles.image}>
        <p className={styles.content}>
          <div className={styles.circle}></div>
          <span>Đảm Bảo Đúng Giờ</span>
          <br />
          <br />
          Cam kết về độ tin cậy. Chúng tôi duy trì chỉ số đúng giờ cao (On-time
          Performance), đảm bảo hành trình của bạn thông suốt và không bị trì
          hoãn.
        </p>
        <img src="/images/connect.png" alt="" />
      </div>
    </motion.section>
  );
};
