import styles from "./ForgotPass.module.css";

export const ForgotPassword = () => {
  const toLogin = () => {
    window.location.href = "/login";
  };
  return (
    <>
      <section className={styles.forgotZone}>
        <div className={styles["login-container"]}>
          <div className={styles["logo-area"]}>
            <img
              src="/images/airlinelogo.jpg"
              alt=""
              className={styles["logo-icon"]}
            />

            <h1 className={styles["app-title"]}>Khôi phục mật khẩu</h1>
            <p className={styles["app-subtitle"]}>
              Đừng lo lắng! Hãy nhập email đăng ký, Cloud Airlines sẽ gửi mã xác
              nhận cho bạn.
            </p>
          </div>

          <form action="#" method="POST">
            <div className={styles["form-group"]}>
              <label htmlFor="email" className={styles["form-label"]}>
                Email đăng ký
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles["form-input"]}
                placeholder="name@example.com"
                required
              />
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <button
                type="submit"
                className={`${styles.btn} ${styles["btn-primary"]}`}
              >
                GỬI MÃ XÁC NHẬN
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
            Quay lại Đăng nhập
          </button>
        </div>
      </section>
    </>
  );
};
