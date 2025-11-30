import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.cloudFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerCol}>
          <div className={styles.footerLogo}>
            <img src="/images/airlinelogo.jpg" alt="Cloud Airlines Logo" />
            <span>CLOUD AIRLINES</span>
          </div>

          <h3 className={styles.footerHeading}>LIÊN HỆ</h3>
          <p className={styles.footerText}>
            Địa chỉ:Đường số 7, Linh Xuân, Thủ Đức, Hồ Chí Minh
          </p>
          <p className={styles.footerText}>
            <i className="fa-solid fa-envelope"></i>{" "}
            <a href="mailto:cloudss@gmail.com" className={styles.email}>
              clouds@gmail.com
            </a>
          </p>
          <p className={styles.phoneContact}>
            <i className="fa-solid fa-phone"></i> 0800 269 330
          </p>
        </div>

        <div className={styles.footerCol}>
          <h3 className={styles.footerHeading}>DỊCH VỤ KHÁCH HÀNG</h3>
          <ul className={styles.footerLinks}>
            <li>
              <a href="/find">Vé & Đặt chỗ</a>
            </li>
            <li>
              <a href="#">Thông tin hành trình</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h3 className={styles.footerHeading}>VỀ CHÚNG TÔI</h3>
          <ul className={styles.footerLinks}>
            <li>
              <a href="#header">Cloud Airlines</a>
            </li>
            <li>
              <a href="#safety">Tin tức</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h3 className={styles.footerHeading}>THEO DÕI & ĐĂNG KÝ</h3>
          <div className={styles.socialIcons}>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>

          <p className={styles.newsletterLabel}>Newsletter</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Sign up newsletter" required />
          </form>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2024 Cloud Airlines. All rights reserved.</p>
      </div>
    </footer>
  );
};
