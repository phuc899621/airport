import { useEffect, useState } from "react";
import styles from "./FlightListAdmin.module.css";
import "../PageContent.css";

interface SanBayTrungGian {
  MaSanBay: string;
  ThuTuDung: number;
  ThoiGianDung: string;
  GhiChu: string;
}

interface Flight {
  MaChuyenBay: number;
  MaHienThi: string;
  TenSanBayDi: string;
  TenSanBayDen: string;
  NgayGio: string;
  MaMayBay?: string;
  LoaiMayBay?: string;
  ThoiGianBay?: string;
  SLGheHang1?: number;
  SLGheHang2?: number;
  SLGheHang1ConLai?: string;
  SLGheHang2ConLai?: string;
  GiaVe?: number;
  GiaVeHang1?: number;
  GiaVeHang2?: number;
  ThoiGianDi?: string;
  ThoiGianDen?: string;
  SanBayTrungGian?: SanBayTrungGian[];
}

const FlightListAdmin = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:3000/chuyen-bay/lich");
        const data = await response.json();

        if (data.success) {
          setFlights(data.data);
        }
      } catch (err) {
        console.error("Lỗi lấy dữ liệu chuyến bay:", err);
        setError("Không thể tải danh sách chuyến bay");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activeFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.NgayGio);
    return flightDate >= today;
  });

  const completedFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.NgayGio);
    return flightDate < today;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleViewDetail = (flightId: number) => {
    const flight = flights.find((f) => f.MaChuyenBay === flightId);
    if (flight) {
      setSelectedFlight(flight);
      setShowDetailModal(true);
    }
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedFlight(null);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " VNĐ";
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  if (loading) {
    return (
      <div className="page-content">
        <h2 className="page-title">Quản lý Chuyến bay</h2>
        <p className="page-subtitle">Danh sách và quản lý các chuyến bay</p>
        <div className="content-placeholder">
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Đang tải danh sách chuyến bay...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content">
        <h2 className="page-title">Quản lý Chuyến bay</h2>
        <p className="page-subtitle">Danh sách và quản lý các chuyến bay</p>
        <div className="content-placeholder">
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddFlight = () => {
    alert("Chức năng thêm chuyến bay - Sẽ được phát triển sau");
  };

  return (
    <div className="page-content">
      <div className={styles.headerSection}>
        <div>
          <h2 className="page-title">Quản lý Chuyến bay</h2>
          <p className="page-subtitle">Danh sách và quản lý các chuyến bay</p>
        </div>
        <button className={styles.addButton} onClick={handleAddFlight}>
          ✈️ Thêm Chuyến Bay
        </button>
      </div>

      <div className={styles.sectionsContainer}>
        {/* Chuyến bay đang hoạt động */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>✈️ Chuyến bay đang hoạt động</h3>
            <span className={styles.badge}>{activeFlights.length}</span>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã chuyến bay</th>
                  <th>Sân bay đi</th>
                  <th>Sân bay đến</th>
                  <th>Ngày bay</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {activeFlights.length > 0 ? (
                  activeFlights.map((flight, index) => (
                    <tr key={flight.MaChuyenBay}>
                      <td>{index + 1}</td>
                      <td>
                        <span className={styles.flightCode}>
                          {flight.MaHienThi}
                        </span>
                      </td>
                      <td className={styles.airportName}>
                        {flight.TenSanBayDi}
                      </td>
                      <td className={styles.airportName}>
                        {flight.TenSanBayDen}
                      </td>
                      <td>{formatDate(flight.NgayGio)}</td>
                      <td>
                        <button
                          className={styles.detailButton}
                          onClick={() =>
                            handleViewDetail(flight.MaChuyenBay)
                          }
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.noData}>
                      <span className={styles.noDataIcon}>✈️</span>
                      <p>Không có chuyến bay nào đang hoạt động</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chuyến bay đã kết thúc */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>📋 Chuyến bay đã kết thúc</h3>
            <span className={styles.badge}>{completedFlights.length}</span>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã chuyến bay</th>
                  <th>Sân bay đi</th>
                  <th>Sân bay đến</th>
                  <th>Ngày bay</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {completedFlights.length > 0 ? (
                  completedFlights.map((flight, index) => (
                    <tr key={flight.MaChuyenBay}>
                      <td>{index + 1}</td>
                      <td>
                        <span className={styles.flightCode}>
                          {flight.MaHienThi}
                        </span>
                      </td>
                      <td className={styles.airportName}>
                        {flight.TenSanBayDi}
                      </td>
                      <td className={styles.airportName}>
                        {flight.TenSanBayDen}
                      </td>
                      <td>{formatDate(flight.NgayGio)}</td>
                      <td>
                        <button
                          className={styles.detailButton}
                          onClick={() =>
                            handleViewDetail(flight.MaChuyenBay)
                          }
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.noData}>
                      <span className={styles.noDataIcon}>📋</span>
                      <p>Không có chuyến bay nào đã kết thúc</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Chi tiết chuyến bay */}
      {showDetailModal && selectedFlight && (
        <div className={styles.modalOverlay} onClick={handleCloseDetailModal}>
          <div
            className={styles.detailModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>✈️ Chi tiết chuyến bay {selectedFlight.MaHienThi}</h3>
              <button
                className={styles.closeButton}
                onClick={handleCloseDetailModal}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailSection}>
                <h4>Thông tin chuyến bay</h4>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Mã chuyến bay:</span>
                    <span className={styles.value}>
                      {selectedFlight.MaHienThi}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Sân bay đi:</span>
                    <span className={styles.value}>
                      {selectedFlight.TenSanBayDi}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Sân bay đến:</span>
                    <span className={styles.value}>
                      {selectedFlight.TenSanBayDen}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Ngày giờ bay:</span>
                    <span className={styles.value}>
                      {formatDateTime(selectedFlight.NgayGio)}
                    </span>
                  </div>
                  {selectedFlight.ThoiGianDi && (
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Thời gian đi:</span>
                      <span className={styles.value}>
                        {formatDateTime(selectedFlight.ThoiGianDi)}
                      </span>
                    </div>
                  )}
                  {selectedFlight.ThoiGianDen && (
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Thời gian đến:</span>
                      <span className={styles.value}>
                        {formatDateTime(selectedFlight.ThoiGianDen)}
                      </span>
                    </div>
                  )}
                  {selectedFlight.ThoiGianBay && (
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Thời gian bay:</span>
                      <span className={styles.value}>
                        {selectedFlight.ThoiGianBay}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {selectedFlight.MaMayBay && (
                <div className={styles.detailSection}>
                  <h4>Thông tin máy bay</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Mã máy bay:</span>
                      <span className={styles.value}>
                        {selectedFlight.MaMayBay}
                      </span>
                    </div>
                    {selectedFlight.LoaiMayBay && (
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Loại máy bay:</span>
                        <span className={styles.value}>
                          {selectedFlight.LoaiMayBay}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className={styles.detailSection}>
                <h4>Thông tin ghế và giá vé</h4>
                <div className={styles.seatPriceGrid}>
                  <div className={styles.seatCard}>
                    <div className={styles.seatHeader}>Hạng 1</div>
                    <div className={styles.seatInfo}>
                      <p>
                        Tổng ghế: <strong>{selectedFlight.SLGheHang1}</strong>
                      </p>
                      <p>
                        Còn lại:{" "}
                        <strong>{selectedFlight.SLGheHang1ConLai}</strong>
                      </p>
                      {selectedFlight.GiaVeHang1 && (
                        <p className={styles.price}>
                          {formatCurrency(selectedFlight.GiaVeHang1)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.seatCard}>
                    <div className={styles.seatHeader}>Hạng 2</div>
                    <div className={styles.seatInfo}>
                      <p>
                        Tổng ghế: <strong>{selectedFlight.SLGheHang2}</strong>
                      </p>
                      <p>
                        Còn lại:{" "}
                        <strong>{selectedFlight.SLGheHang2ConLai}</strong>
                      </p>
                      {selectedFlight.GiaVeHang2 && (
                        <p className={styles.price}>
                          {formatCurrency(selectedFlight.GiaVeHang2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {selectedFlight.SanBayTrungGian &&
                selectedFlight.SanBayTrungGian.length > 0 && (
                  <div className={styles.detailSection}>
                    <h4>Sân bay trung gian</h4>
                    <div className={styles.stopoverList}>
                      {selectedFlight.SanBayTrungGian.map((stop, index) => (
                        <div key={index} className={styles.stopoverItem}>
                          <div className={styles.stopNumber}>{index + 1}</div>
                          <div className={styles.stopInfo}>
                            <p>
                              <strong>Sân bay:</strong> {stop.MaSanBay}
                            </p>
                            <p>
                              <strong>Thời gian dừng:</strong>{" "}
                              {stop.ThoiGianDung}
                            </p>
                            {stop.GhiChu && (
                              <p>
                                <strong>Ghi chú:</strong> {stop.GhiChu}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightListAdmin;
