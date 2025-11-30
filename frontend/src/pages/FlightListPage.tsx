import { PageTransition } from "../Animation/PageTransition";
import Navigation from "../components/FindFlight/Navigation";
import { FlightList } from "../components/FlightList/FlightList";
import { Header } from "../components/Header/Header";
function FlightListPage() {
  return (
    <PageTransition>
      <Header />
      <Navigation />
      <FlightList />
    </PageTransition>
  );
}
export default FlightListPage;
