import Header from "./modules/landing/header";
import Hero from "./modules/landing/Hero";
import Features from "./modules/landing/features";
import Showcase from "./modules/landing/showcase";
import HowItWorks from "./modules/landing/howItWorks";
import Privacy from "./modules/landing/privacy";
import CTA from "./modules/landing/cta";
import Footer from "./modules/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <HowItWorks />
        <Privacy />
        <CTA />
      </main>
      <Footer />
    </>
  );
}