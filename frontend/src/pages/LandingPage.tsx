import { PageTransition } from "../Animation/PageTransition";
import { Assitance } from "../components/Assistance/Assistance";
import { Connect } from "../components/Connect/Connect";
import { Experience } from "../components/Experience/Experience";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import { Trust } from "../components/Trust/Trust";

function LandingPage() {
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <PageTransition>
        <Header />
        <Hero />
        <Assitance />
        <Experience />
        <Connect />
        <Trust />
        <Footer />
      </PageTransition>
    </div>
  );
}

export default LandingPage;
