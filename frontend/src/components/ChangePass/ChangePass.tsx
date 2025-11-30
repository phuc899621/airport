import styles from "./ChangePass.module.css";

export const ChangePassword = () => {
  const toLogin = () => {
    window.location.href = "/login";
  };
  const toHome = () => {
    window.location.href = "/";
  };
  return (
    <>
      <section className={styles.changeZone}>
        <div className={styles["login-container"]}>
          <div className={styles["logo-area"]}>
            <img
              src="/images/airlinelogo.jpg"
              alt=""
              className={styles["logo-icon"]}
            />

            <h1 className={styles["app-title"]} onClick={toHome}>
              Cloud Airline
            </h1>
            <p className={styles["app-subtitle"]}>
              Cập nhật mật khẩu để bảo vệ tài khoản.
            </p>
          </div>

          <form action="#" method="POST">
            <div className={styles["form-group"]}>
              <label
                htmlFor="current_password"
                className={styles["form-label"]}
              >
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                className={styles["form-input"]}
                placeholder="Nhập mật khẩu đang dùng"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="new_password" className={styles["form-label"]}>
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                className={styles["form-input"]}
                placeholder="Nhập mật khẩu mới"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label
                htmlFor="confirm_new_password"
                className={styles["form-label"]}
              >
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                id="confirm_new_password"
                name="confirm_new_password"
                className={styles["form-input"]}
                placeholder="Nhập lại mật khẩu mới"
                required
              />
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <button
                type="submit"
                className={`${styles.btn} ${styles["btn-primary"]}`}
              >
                CẬP NHẬT &nbsp; 🛡️
              </button>
            </div>
          </form>

          <div className={styles.divider}>
            <span>HOẶC</span>
          </div>

          <button
            type="button"
            className={`${styles.btn} ${styles["btn-outline"]}`}
            onClick={toLogin}
          >
            Quay lại trang đăng nhập
          </button>
        </div>
      </section>
    </>
  );
};
