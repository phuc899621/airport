import styles from "./FlightList.module.css";
import { useSearchParams } from "react-router-dom";

export const FlightList = () => {
  interface FlightDetail {
    id: number;
    timeFrom: string;
    timeArrive: string;
    locationFrom: string;
    locationArrive: string;
    typeOfFlight: string;
    flightTime: string;
    desc: string;
    cost: number;
    numberOfFirstClass: number;
    numberOfSecondClass: number;
    fromCode: string;
    toCode: string;
    date: string;
  }

  const flights: FlightDetail[] = [
    {
      id: 1,
      timeFrom: "07:00",
      timeArrive: "09:10",
      locationFrom: "Hồ Chí Minh (SGN)",
      locationArrive: "Hà Nội (HAN)",
      typeOfFlight: "Bay thẳng",
      flightTime: "2h 10m",
      desc: "Vietnam Airlines - VN214 - Airbus A321",
      cost: 1500000,
      numberOfFirstClass: 16,
      numberOfSecondClass: 180,
      fromCode: "SGN",
      toCode: "HAN",
      date: "2025-11-30",
    },
    {
      id: 2,
      timeFrom: "10:30",
      timeArrive: "11:50",
      locationFrom: "Hà Nội (HAN)",
      locationArrive: "Đà Nẵng (DAD)",
      typeOfFlight: "Bay thẳng",
      flightTime: "1h 20m",
      desc: "VietJet Air - VJ512 - Airbus A320",
      cost: 650000,
      numberOfFirstClass: 0,
      numberOfSecondClass: 180,
      fromCode: "HAN",
      toCode: "DAD",
      date: "2024-11-30",
    },
    {
      id: 3,
      timeFrom: "08:15",
      timeArrive: "09:15",
      locationFrom: "Hồ Chí Minh (SGN)",
      locationArrive: "Đà Nẵng (DAD)",
      typeOfFlight: "Bay thẳng",
      flightTime: "1h 00m",
      desc: "Bamboo Airways - QH1521 - Embraer 190",
      cost: 3200000,
      numberOfFirstClass: 6,
      numberOfSecondClass: 90,
      fromCode: "SGN",
      toCode: "DAD",
      date: "2025-11-27",
    },
    {
      id: 4,
      timeFrom: "09:00",
      timeArrive: "11:00",
      locationFrom: "Hà Nội (HAN)",
      locationArrive: "Bangkok (BKK)",
      typeOfFlight: "Nhiều chặng",
      flightTime: "2h 00m",
      desc: "Thai Airways - TG561 - Boeing 777",
      cost: 2800000,
      numberOfFirstClass: 30,
      numberOfSecondClass: 250,
      fromCode: "HAN",
      toCode: "BKK",
      date: "2024-11-30",
    },
    {
      id: 5,
      timeFrom: "14:00",
      timeArrive: "17:00",
      locationFrom: "Hồ Chí Minh (SGN)",
      locationArrive: "Singapore (SIN)",
      typeOfFlight: "Nhiều chặng",
      flightTime: "2h 00m",
      desc: "Singapore Airlines - SQ178 - Airbus A350",
      cost: 4500000,
      numberOfFirstClass: 42,
      numberOfSecondClass: 210,
      fromCode: "SGN",
      toCode: "SIN",
      date: "2024-11-30",
    },
    {
      id: 6,
      timeFrom: "23:00",
      timeArrive: "05:30 (+1)",
      locationFrom: "Đà Nẵng (DAD)",
      locationArrive: "Seoul (ICN)",
      typeOfFlight: "Nhiều chặng",
      flightTime: "4h 30m",
      desc: "Korean Air - KE462 - Boeing 787",
      cost: 8900000,
      numberOfFirstClass: 24,
      numberOfSecondClass: 245,
      fromCode: "DAD",
      toCode: "ICN",
      date: "2024-11-30",
    },
    {
      id: 7,
      timeFrom: "00:10",
      timeArrive: "07:00",
      locationFrom: "Hà Nội (HAN)",
      locationArrive: "Tokyo (NRT)",
      typeOfFlight: "Bay thẳng",
      flightTime: "4h 50m",
      desc: "Japan Airlines - JL752 - Boeing 787 Dreamliner",
      cost: 25000000,
      numberOfFirstClass: 38,
      numberOfSecondClass: 190,
      fromCode: "HAN",
      toCode: "NRT",
      date: "2024-11-30",
    },
    {
      id: 8,
      timeFrom: "15:00",
      timeArrive: "16:10",
      locationFrom: "Nha Trang (CXR)",
      locationArrive: "Hồ Chí Minh (SGN)",
      typeOfFlight: "Bay thẳng",
      flightTime: "1h 10m",
      desc: "VietTravel Airlines - VU301 - Airbus A321",
      cost: 550000,
      numberOfFirstClass: 0,
      numberOfSecondClass: 200,
      fromCode: "CXR",
      toCode: "SGN",
      date: "2024-11-30",
    },
    {
      id: 9,
      timeFrom: "21:00",
      timeArrive: "09:25 (+1)",
      locationFrom: "Hồ Chí Minh (SGN)",
      locationArrive: "Melbourne (MEL)",
      typeOfFlight: "Nhiều chặng",
      flightTime: "8h 25m",
      desc: "Vietnam Airlines - VN781 - Boeing 787-9",
      cost: 18500000,
      numberOfFirstClass: 28,
      numberOfSecondClass: 215,
      fromCode: "SGN",
      toCode: "MEL",
      date: "2024-11-30",
    },
    {
      id: 10,
      timeFrom: "06:00",
      timeArrive: "08:05",
      locationFrom: "Hải Phòng (HPH)",
      locationArrive: "Hồ Chí Minh (SGN)",
      typeOfFlight: "Bay thẳng",
      flightTime: "2h 05m",
      desc: "VietJet Air - VJ281 - Airbus A321",
      cost: 1200000,
      numberOfFirstClass: 0,
      numberOfSecondClass: 220,
      fromCode: "HPH",
      toCode: "SGN",
      date: "2024-11-30",
    },

    {
      id: 11,
      timeFrom: "05:30",
      timeArrive: "06:50",
      locationFrom: "Hồ Chí Minh (SGN)",
      locationArrive: "Đà Nẵng (DAD)",
      typeOfFlight: "Bay thẳng",
      flightTime: "1h 20m",
      desc: "VietJet Air - VJ620 - Airbus A320",
      cost: 850000,
      numberOfFirstClass: 0,
      numberOfSecondClass: 150,
      fromCode: "SGN",
      toCode: "DAD",
      date: "2024-11-30",
    },

    {
      id: 12,
      timeFrom: "18:00",
      timeArrive: "19:20",
      locationFrom: "Hồ Chí Minh (SGN)",
      locationArrive: "Đà Nẵng (DAD)",
      typeOfFlight: "Bay thẳng",
      flightTime: "1h 20m",
      desc: "Vietnam Airlines - VN138 - Airbus A321",
      cost: 1950000,
      numberOfFirstClass: 12,
      numberOfSecondClass: 160,
      fromCode: "SGN",
      toCode: "DAD",
      date: "2024-11-30",
    },
    // 3. DAD -> SGN (Chiều ngược lại)
    {
      id: 13,
      timeFrom: "14:15",
      timeArrive: "15:45",
      locationFrom: "Đà Nẵng (DAD)",
      locationArrive: "Hồ Chí Minh (SGN)",
      typeOfFlight: "Bay thẳng",
      flightTime: "1h 30m",
      desc: "Bamboo Airways - QH163 - Airbus A320Neo",
      cost: 1100000,
      numberOfFirstClass: 8,
      numberOfSecondClass: 170,
      fromCode: "DAD",
      toCode: "SGN",
      date: "2024-11-30",
    },
    // 4. HAN -> SGN (Tuyến hot nhất)
    {
      id: 14,
      timeFrom: "08:00",
      timeArrive: "10:10",
      locationFrom: "Hà Nội (HAN)",
      locationArrive: "Hồ Chí Minh (SGN)",
      typeOfFlight: "Bay thẳng",
      flightTime: "2h 10m",
      desc: "Vietnam Airlines - VN203 - Boeing 787",
      cost: 2100000,
      numberOfFirstClass: 20,
      numberOfSecondClass: 250,
      fromCode: "HAN",
      toCode: "SGN",
      date: "2024-11-30",
    },
    // 5. HAN -> SGN (Giá rẻ)
    {
      id: 15,
      timeFrom: "22:30",
      timeArrive: "00:40 (+1)",
      locationFrom: "Hà Nội (HAN)",
      locationArrive: "Hồ Chí Minh (SGN)",
      typeOfFlight: "Bay thẳng",
      flightTime: "2h 10m",
      desc: "VietJet Air - VJ155 - Airbus A321",
      cost: 980000,
      numberOfFirstClass: 0,
      numberOfSecondClass: 210,
      fromCode: "HAN",
      toCode: "SGN",
      date: "2024-11-30",
    },
    // 6. SGN -> CXR (Đi Nha Trang nghỉ dưỡng)
    {
      id: 16,
      timeFrom: "11:00",
      timeArrive: "12:10",
      locationFrom: "Hồ Chí Minh (SGN)",
      locationArrive: "Nha Trang (CXR)",
      typeOfFlight: "Bay thẳng",
      flightTime: "1h 10m",
      desc: "Pacific Airlines - BL233 - Airbus A320",
      cost: 600000,
      numberOfFirstClass: 0,
      numberOfSecondClass: 180,
      fromCode: "SGN",
      toCode: "CXR",
      date: "2024-11-30",
    },

    {
      id: 17,
      timeFrom: "07:15",
      timeArrive: "09:25",
      locationFrom: "Hà Nội (HAN)",
      locationArrive: "Phú Quốc (PQC)",
      typeOfFlight: "Bay thẳng",
      flightTime: "2h 10m",
      desc: "Vietnam Airlines - VN1235 - Airbus A321",
      cost: 3500000,
      numberOfFirstClass: 10,
      numberOfSecondClass: 150,
      fromCode: "HAN",
      toCode: "PQC",
      date: "2024-11-30",
    },
    // 8. DAD -> HAN (Đà Nẵng ra Hà Nội)
    {
      id: 18,
      timeFrom: "16:45",
      timeArrive: "18:05",
      locationFrom: "Đà Nẵng (DAD)",
      locationArrive: "Hà Nội (HAN)",
      typeOfFlight: "Bay thẳng",
      flightTime: "1h 20m",
      desc: "VietJet Air - VJ520 - Airbus A321",
      cost: 750000,
      numberOfFirstClass: 0,
      numberOfSecondClass: 190,
      fromCode: "DAD",
      toCode: "HAN",
      date: "2024-11-30",
    },
    // 9. Quốc tế: SGN -> TPE (Đài Loan)
    {
      id: 19,
      timeFrom: "01:00",
      timeArrive: "05:25",
      locationFrom: "Hồ Chí Minh (SGN)",
      locationArrive: "Đài Bắc (TPE)",
      typeOfFlight: "Bay thẳng",
      flightTime: "3h 25m",
      desc: "Eva Air - BR382 - Boeing 777-300ER",
      cost: 5200000,
      numberOfFirstClass: 30,
      numberOfSecondClass: 250,
      fromCode: "SGN",
      toCode: "TPE",
      date: "2024-11-30",
    },
    // 10. Quốc tế: HAN -> LHR (London)
    {
      id: 20,
      timeFrom: "23:55",
      timeArrive: "06:20 (+1)",
      locationFrom: "Hà Nội (HAN)",
      locationArrive: "London (LHR)",
      typeOfFlight: "Bay thẳng",
      flightTime: "13h 25m",
      desc: "Vietnam Airlines - VN55 - Boeing 787-9 Dreamliner",
      cost: 28900000,
      numberOfFirstClass: 20,
      numberOfSecondClass: 200,
      fromCode: "HAN",
      toCode: "LHR",
      date: "2024-11-30",
    },
  ];
  const [searchParams] = useSearchParams();
  const fromCode = searchParams.get("from");
  const toCode = searchParams.get("to");
  const date = searchParams.get("date");

  const check: boolean = fromCode != null || toCode != null || date != null;
  function formatVNDCustom(amount: number): string {
    return amount.toLocaleString("vi-VN");
  }
  if (check) {
    return flights
      .filter(
        (flight) =>
          flight.fromCode == fromCode &&
          flight.toCode == toCode &&
          flight.date == date
      )
      .map((flight) => (
        <div className={styles.flightCard}>
          <div className={styles.flightInfo}>
            <div className={styles.routeInfo}>
              <div className={styles.point}>
                <span className={styles.time}>{flight.timeFrom}</span>
                <span className={styles.city}>{flight.locationFrom}</span>
                <div className={styles.terminal}>Nhà ga 3</div>
              </div>

              <div className={styles.connector}>
                <span>{flight.typeOfFlight}</span>
                <div className={styles.dottedLine}></div>
              </div>

              <div className={styles.point}>
                <span className={styles.time}>{flight.timeArrive}</span>
                <span className={styles.city}>{flight.locationArrive}</span>
                <div className={styles.terminal}>Nhà ga 1</div>
              </div>
            </div>

            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <span className={styles.icon}>⏱</span>
                Thời gian bay : {flight.flightTime}
              </div>
              <div className={styles.metaItem}>
                <span className={styles.airlineLogo}>🏵</span>
                <span>{flight.desc}</span>
              </div>
              <a href="#" className={styles.detailLink}>
                Chi tiết hành trình ↗
              </a>
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={`${styles.priceColumn} ${styles.colEconomy}`}>
              <div className={styles.seatsBadge}>
                {" "}
                {flight.numberOfFirstClass} ghế còn lại
              </div>
              <span className={styles.priceTagIcon}>🏷</span>
              <div className={styles.className}>Ghế hạng 1</div>
              <div className={styles.priceLabel}>từ</div>
              <div className={styles.priceAmount}>
                {formatVNDCustom(flight.cost)}
              </div>
              <div className={styles.currency}>VND</div>
              <div className={styles.arrowIcon}>﹀</div>
            </div>

            <div className={`${styles.priceColumn} ${styles.colBusiness}`}>
              <div className={styles.seatsBadge}>
                {flight.numberOfSecondClass} ghế còn lại
              </div>

              <span className={styles.priceTagIcon}>🏷</span>
              <div className={styles.className}>Ghế hạng 2</div>
              <div className={styles.priceLabel}>từ</div>
              <div className={styles.priceAmount}>
                {formatVNDCustom(flight.cost * 1.5)}
              </div>
              <div className={styles.currency}>VND</div>
              <div className={styles.arrowIcon}>﹀</div>
            </div>
          </div>
        </div>
      ));
  } else {
    return flights.map((flight) => (
      <div className={styles.flightCard}>
        <div className={styles.flightInfo}>
          <div className={styles.routeInfo}>
            <div className={styles.point}>
              <span className={styles.time}>{flight.timeFrom}</span>
              <span className={styles.city}>{flight.locationFrom}</span>
              <div className={styles.terminal}>Nhà ga 3</div>
            </div>

            <div className={styles.connector}>
              <span>{flight.typeOfFlight}</span>
              <div className={styles.dottedLine}></div>
            </div>

            <div className={styles.point}>
              <span className={styles.time}>{flight.timeArrive}</span>
              <span className={styles.city}>{flight.locationArrive}</span>
              <div className={styles.terminal}>Nhà ga 1</div>
            </div>
          </div>

          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <span className={styles.icon}>⏱</span>
              Thời gian bay : {flight.flightTime}
            </div>
            <div className={styles.metaItem}>
              <span className={styles.airlineLogo}>🏵</span>
              <span>{flight.desc}</span>
            </div>
            <a href="#" className={styles.detailLink}>
              Chi tiết hành trình ↗
            </a>
          </div>
        </div>

        <div className={styles.priceSection}>
          <div className={`${styles.priceColumn} ${styles.colEconomy}`}>
            <div className={styles.seatsBadge}>
              {" "}
              {flight.numberOfFirstClass} ghế còn lại
            </div>
            <span className={styles.priceTagIcon}>🏷</span>
            <div className={styles.className}>Ghế hạng 1</div>
            <div className={styles.priceLabel}>từ</div>
            <div className={styles.priceAmount}>
              {formatVNDCustom(flight.cost)}
            </div>
            <div className={styles.currency}>VND</div>
            <div className={styles.arrowIcon}>﹀</div>
          </div>

          <div className={`${styles.priceColumn} ${styles.colBusiness}`}>
            <div className={styles.seatsBadge}>
              {flight.numberOfSecondClass} ghế còn lại
            </div>

            <span className={styles.priceTagIcon}>🏷</span>
            <div className={styles.className}>Ghế hạng 2</div>
            <div className={styles.priceLabel}>từ</div>
            <div className={styles.priceAmount}>
              {formatVNDCustom(flight.cost * 1.5)}
            </div>
            <div className={styles.currency}>VND</div>
            <div className={styles.arrowIcon}>﹀</div>
          </div>
        </div>
      </div>
    ));
  }
};
