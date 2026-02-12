import React from 'react'
import Navbar from './../../components/shared/navbar';
import Footer from './../../components/shared/footer';
import AboutUs from '../../components/about/aboutUs';
import OurVision from '../../components/about/ourVision';
import OurMission from '../../components/about/ourMission';
import OurStory from '../../components/about/ourStory';
import WeServe from '../../components/about/weServe';


const About = () => {
    return (
        <>
            <Navbar />
            <div className="about-page">
                <AboutUs />
                <OurStory />
                <OurMission />
                <WeServe />
                <OurVision />
            </div>
            <Footer />
        </>
    )
}

export default About