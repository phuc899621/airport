import styles from "./Experience.module.css";
import { motion } from "framer-motion";
export const Experience = () => {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.005 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      <div className={styles.image}>
        <img src="/images/doubleimage.png" />
      </div>
      <div className={styles.contentZone}>
        <h1 className={styles.title}>ENHANCE YOUR EXPERIENCE</h1>
        <p className={styles.content}>
          <span> Phục Vụ Tận Tâm Tuyệt Đối</span> <br /> <br />
          Đội ngũ tiếp viên chuyên nghiệp của chúng tôi luôn sẵn sàng phục vụ
          bạn với lòng hiếu khách và sự tận tâm tuyệt đối. Sự đào tạo chuyên sâu
          giúp họ mang lại dịch vụ chu đáo, từ quầy check-in đến cabin, đảm bảo
          bạn có một hành trình thoải mái và không gặp trở ngại. Bay cùng chúng
          tôi, bạn sẽ luôn cảm thấy được chăm sóc đặc biệt.
        </p>
        <p className={styles.content}>
          <span>Tiện Nghi Cabin Đỉnh Cao</span> <br /> <br />
          Chúng tôi chú trọng vào sự thoải mái cá nhân của bạn. Ghế ngồi
          ergonomic được thiết kế khoa học cùng với không gian rộng rãi sẽ giúp
          bạn thư giãn tối đa trên các chuyến bay dài. Hệ thống giải trí cá nhân
          đa dạng với phim, nhạc và trò chơi mới nhất luôn sẵn sàng để làm phong
          phú thêm trải nghiệm bay của bạn.
        </p>
        <p className={styles.content}>
          <span>Trải Nghiệm Ẩm Thực Tinh Tế</span> <br /> <br />
          Hãy nâng tầm vị giác của bạn với thực đơn ẩm thực chất lượng cao trên
          máy bay. Suất ăn được chuẩn bị bởi các đầu bếp hàng đầu từ nguyên liệu
          tươi ngon, cung cấp đa dạng lựa chọn phù hợp với mọi sở thích ăn uống.
          Đây là lời cam kết của chúng tôi về một trải nghiệm bay không chỉ an
          toàn mà còn tinh tế và đẳng cấp.
        </p>
        <div className={styles.number}>
          <p>01</p>
          <p>02</p>
          <p>03</p>
        </div>
      </div>
    </motion.section>
  );
};
