import { PageTransition } from "../Animation/PageTransition";
import FlightSearch from "../components/FindFlight/FindFlight";
import { Header } from "../components/Header/Header";

function FindFlightPage() {
  return (
    <PageTransition>
      <Header />
      <FlightSearch />
    </PageTransition>
  );
}
export default FindFlightPage;
