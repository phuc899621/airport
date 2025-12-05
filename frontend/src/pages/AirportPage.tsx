import { PageTransition } from "../Animation/PageTransition";
import { Header } from "../components/Header/Header";
import { AirportList } from "../components/AirportList/AirportList";

function AirportPage() {
  return (
    <PageTransition>
      <Header />
      <AirportList />
    </PageTransition>
  );
}

export default AirportPage;
