import React, { useState, useEffect, useRef } from "react";
import styles from "./FindFlight.module.css";
import { useNavigate, createSearchParams } from "react-router-dom";

interface Airport {
  code: string;
  city: string;
  country: string;
}

const airportsData: Airport[] = [
  { code: "ABZ", city: "Aberdeen", country: "Anh" },
  {
    code: "AUH",
    city: "Abu Dhabi",
    country: "Các Tiểu vương quốc Ả Rập thống nhất",
  },
  { code: "ADL", city: "Adelaide", country: "Úc" },
  { code: "QXB", city: "Aix en Provence TGV", country: "Pháp" },
  { code: "AXT", city: "Akita", country: "Nhật Bản" },
  { code: "SGN", city: "Hồ Chí Minh ", country: "Việt Nam" },
  { code: "HAN", city: "Hà Nội ", country: "Việt Nam" },
  { code: "DAD", city: "Đà Nẵng", country: "Việt Nam" },
];

const FlightSearch: React.FC = () => {
  const navigate = useNavigate();
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [dateDepart, setDateDepart] = useState<string>("");

  const [showFromDropdown, setShowFromDropdown] = useState<boolean>(false);
  const [showToDropdown, setShowToDropdown] = useState<boolean>(false);

  const fromWrapperRef = useRef<HTMLDivElement>(null);
  const toWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDateDepart(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        fromWrapperRef.current &&
        !fromWrapperRef.current.contains(event.target as Node)
      ) {
        setShowFromDropdown(false);
      }
      if (
        toWrapperRef.current &&
        !toWrapperRef.current.contains(event.target as Node)
      ) {
        setShowToDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getFilteredAirports = (searchTerm: string) => {
    if (!searchTerm) return airportsData;
    const lowerTerm = searchTerm.toLowerCase();
    return airportsData.filter(
      (airport) =>
        airport.city.toLowerCase().includes(lowerTerm) ||
        airport.code.toLowerCase().includes(lowerTerm) ||
        `${airport.city} (${airport.code})`.toLowerCase().includes(lowerTerm)
    );
  };

  const handleSelectAirport = (airport: Airport, type: "from" | "to") => {
    const displayValue = `${airport.city} (${airport.code})`;

    if (type === "from") {
      if (displayValue === toValue) {
        alert(
          "Điểm đi không được trùng với điểm đến! Vui lòng chọn điểm khác."
        );
        return;
      }
      setFromValue(displayValue);
      setShowFromDropdown(false);
    } else {
      if (displayValue === fromValue) {
        alert(
          "Điểm đến không được trùng với điểm đi! Vui lòng chọn điểm khác."
        );
        return;
      }
      setToValue(displayValue);
      setShowToDropdown(false);
    }
  };

  const handleSearch = () => {
    // 1. Validate dữ liệu
    if (!fromValue || !toValue) {
      alert("Vui lòng chọn đầy đủ điểm đi và điểm đến!");
      return;
    }

    if (fromValue === toValue) {
      alert("Lỗi: Điểm khởi hành và điểm đến đang trùng nhau.");
      return;
    }

    const extractCode = (val: string) => {
      const match = val.match(/\(([^)]+)\)/);
      return match ? match[1] : val;
    };

    const fromCode = extractCode(fromValue);
    const toCode = extractCode(toValue);

    navigate({
      pathname: "/flightList",
      search: createSearchParams({
        from: fromCode,
        to: toCode,
        date: dateDepart,
      }).toString(),
    });
  };
  const backToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWidget}>
        <div className={styles.widgetTitle}>Tìm Chuyến Bay</div>

        <div className={styles.formRow}>
          <div className={styles.inputGroup} ref={fromWrapperRef}>
            <label className={styles.inputLabel}>Từ</label>
            <input
              type="text"
              className={styles.customInput}
              placeholder="Chọn điểm khởi hành"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              onFocus={() => setShowFromDropdown(true)}
            />
            {showFromDropdown && (
              <div className={styles.dropdownList}>
                {getFilteredAirports(fromValue).length > 0 ? (
                  getFilteredAirports(fromValue).map((airport) => {
                    return (
                      <div
                        key={airport.code}
                        className={styles.dropdownItem}
                        onClick={() => handleSelectAirport(airport, "from")}
                      >
                        <span className={styles.airportName}>
                          {airport.city} ({airport.code})
                        </span>
                        <span className={styles.airportCountry}>
                          {airport.country}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className={styles.dropdownItem}
                    style={{ cursor: "default" }}
                  >
                    <span className={styles.airportCountry}>
                      Không tìm thấy kết quả
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.inputGroup} ref={toWrapperRef}>
            <label className={styles.inputLabel}>Đến</label>
            <input
              type="text"
              className={styles.customInput}
              placeholder="Chọn điểm đến"
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              onFocus={() => setShowToDropdown(true)}
            />
            {showToDropdown && (
              <div className={styles.dropdownList}>
                {getFilteredAirports(toValue).length > 0 ? (
                  getFilteredAirports(toValue).map((airport) => (
                    <div
                      key={airport.code}
                      className={styles.dropdownItem}
                      onClick={() => handleSelectAirport(airport, "to")}
                    >
                      <span className={styles.airportName}>
                        {airport.city} ({airport.code})
                      </span>
                      <span className={styles.airportCountry}>
                        {airport.country}
                      </span>
                    </div>
                  ))
                ) : (
                  <div
                    className={styles.dropdownItem}
                    style={{ cursor: "default" }}
                  >
                    <span className={styles.airportCountry}>
                      Không tìm thấy kết quả
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Ngày đi</label>
            <input
              type="date"
              className={styles.customInput}
              value={dateDepart}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDateDepart(e.target.value)}
            />
          </div>

          <button className={styles.btnSearch} onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button className={styles.btnSearch} onClick={backToHome}>
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
