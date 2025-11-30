import styles from "./Assistance.module.css";
import { motion } from "framer-motion";
export const Assitance = () => {
  return (
    <>
      <motion.section
        className={styles.Assistance}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.005 }}
        transition={{ delay: 0.3, duration: 1 }}
        id="safety"
      >
        <div className={styles.imageZone}>
          <img src="/images/plane2.png" alt="" className={styles.image} />
        </div>
        <div className={styles.contentZone}>
          <h1 className={styles.title}>SAFETY FOR EVERY FLIGHT</h1>
          <p className={styles.content}>
            Tại Cloud Airlines, sự an toàn của bạn luôn là ưu tiên hàng đầu. Mỗi
            chuyến bay được vận hành theo các tiêu chuẩn quốc tế nghiêm ngặt,
            với công nghệ máy bay hiện đại và đội ngũ phi hành đoàn được đào tạo
            chuyên sâu, luôn sẵn sàng bảo vệ hành trình của bạn.{" "}
          </p>
          <p className={styles.content}>
            Từ khi cất cánh đến lúc hạ cánh, chúng tôi liên tục theo dõi từng
            chi tiết để đảm bảo một trải nghiệm an toàn, thoải mái và trọn vẹn.
            Với Cloud Airlines, bạn có thể yên tâm tận hưởng chuyến bay của
            mình, vì sự an toàn của bạn luôn được chăm sóc trong từng khoảnh
            khắc trên bầu trời.
          </p>
        </div>
      </motion.section>
    </>
  );
};
