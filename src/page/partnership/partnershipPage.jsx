import React from 'react'
import Navbar from '../../components/shared/navbar';
import Footer from '../../components/shared/footer';
// import PartnerWithUs from './../../components/home/partnerWithUs';
import LetsTalk from '../../components/partnership/letsTalk';
import HeroSection from '../../components/partnership/heroSection';
import WhyPartnerSection from '../../components/partnership/whyPartnerSection';
import FeaturesSection from '../../components/partnership/featuresSection';

const PartnershipPage = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <WhyPartnerSection />
            <FeaturesSection />
            <LetsTalk />
            <Footer />
        </div>
    )
}

export default PartnershipPage;