import { useEffect, useState } from "react";
import styles from "./AirportList.module.css";
import "../PageContent.css";

interface Airport {
  MaSanBay: number;
  TenSanBay: string;
  QuocGia: string;
}

export const AirportList = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    tenSanBay: "",
    quocGia: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const fetchAirports = async () => {
    try {
      const response = await fetch("http://localhost:3000/san-bay");
      const data = await response.json();
      
      if (data.success) {
        setAirports(data.data);
      }
    } catch (err) {
      console.error("Lỗi lấy dữ liệu sân bay:", err);
      setError("Không thể tải danh sách sân bay");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  if (loading) {
    return (
      <div className="page-content">
        <h2 className="page-title">Quản lý Sân bay</h2>
        <p className="page-subtitle">Danh sách và thông tin các sân bay</p>
        <div className="content-placeholder">
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Đang tải danh sách sân bay...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content">
        <h2 className="page-title">Quản lý Sân bay</h2>
        <p className="page-subtitle">Danh sách và thông tin các sân bay</p>
        <div className="content-placeholder">
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddAirport = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ tenSanBay: "", quocGia: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/san-bay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Thêm sân bay thành công!");
        handleCloseModal();
        fetchAirports();
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (err) {
      console.error("Lỗi thêm sân bay:", err);
      alert("Không thể thêm sân bay");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-content">
      <div className={styles.headerSection}>
        <div>
          <h2 className="page-title">Quản lý Sân bay</h2>
          <p className="page-subtitle">Danh sách và thông tin các sân bay</p>
        </div>
        <button className={styles.addButton} onClick={handleAddAirport}>
          ✈️ Thêm Sân Bay
        </button>
      </div>
      <div className="content-placeholder">
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT   </th>
                <th>Tên Sân Bay</th>
                <th>Quốc Gia</th>
              </tr>
            </thead>
            <tbody>
              {airports.length > 0 ? (
                airports.map((airport, index) => (
                  <tr key={airport.MaSanBay}>
                    <td>{index + 1}</td>
                    <td className={styles.airportName}>{airport.TenSanBay}</td>
                    <td>
                      <span className={styles.country}>{airport.QuocGia}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noData}>
                    <span className={styles.noDataIcon}>✈️</span>
                    <p>Không có sân bay nào trong hệ thống</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={styles.footer}>
            <p className={styles.totalCount}>
              Tổng số: <strong>{airports.length}</strong> sân bay
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>✈️ Thêm Sân Bay Mới</h3>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="tenSanBay">Tên Sân Bay</label>
                <input
                  type="text"
                  id="tenSanBay"
                  name="tenSanBay"
                  value={formData.tenSanBay}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Sân bay Quốc tế Nội Bài"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="quocGia">Quốc Gia</label>
                <input
                  type="text"
                  id="quocGia"
                  name="quocGia"
                  value={formData.quocGia}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Việt Nam"
                  required
                />
              </div>
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={submitting}
                >
                  {submitting ? "Đang thêm..." : "Thêm Sân Bay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
