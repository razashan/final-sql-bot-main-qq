import React from "react";
import Contact from "../components/home/contact";
import Community from "../components/home/communitySection";
import Learn from "../components/home/learn";
import GetStarted from "../components/home/getStarted";
import PracticeBanner from "../components/home/practiceBanner";
import BenefitBanner from "../components/home/benefitBanner";
import HelpSection from "../components/home/helpSection";
import Navbar from "../components/shared/navbar";
import Topbar from "../components/shared/topbar/topbar";
import Footer from "../components/shared/footer";
import PartnerWithUs from "../components/home/partnerWithUs";
import FeaturesSection from "../components/partnership/featuresSection";

const Home = () => {
  return (
    <>
      <div className="home">
        <Topbar />
        <Navbar />
        <Learn />
        <BenefitBanner />
        <HelpSection />
        {/* feature Section */}
        <FeaturesSection />
        <PracticeBanner />
        <Community />
        <PartnerWithUs />
        <GetStarted />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Home;
