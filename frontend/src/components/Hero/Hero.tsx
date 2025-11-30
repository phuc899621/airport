import styles from "./Hero.module.css";
import { motion } from "framer-motion";

export const Hero = () => {
  const toFind = () => {
    window.location.href = "#safety";
  };
  const getStarted = () => {
    window.location.href = "/find";
  };
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h2 className={styles.airLineName}>CloudAirline</h2>
          <h1 className={styles.title}>
            EXPLORE THE <br /> WORLD TODAY
          </h1>
          <p className={styles.desc}>
            Chúng tôi nỗ lực không ngừng để biến mỗi giờ bay của bạn thành một
            trải nghiệm thư thái, đẳng cấp với tiêu chuẩn phục vụ hàng đầu.
          </p>
          <div className={styles.button}>
            <button
              style={{ color: "#fff", background: "#5696b8" }}
              onClick={getStarted}
            >
              Bắt đầu
            </button>
            <button style={{ background: "#ccc" }} onClick={toFind}>
              Tìm hiểu thêm
            </button>
          </div>
        </div>
        <motion.img
          src="/images/plane.png"
          alt="Plane"
          className={styles.imgPlane}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </section>
    </>
  );
};
