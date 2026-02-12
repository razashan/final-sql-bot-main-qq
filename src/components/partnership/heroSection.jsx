import React from 'react'
import heroImg from '../../assets/image/partnership/hero-img.webp'
import heroElisp from '../../assets/image/partnership/hero-bg-elisp.webp'
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
    const navigate = useNavigate()
    return (
        <div className='partnership-hero-sec'>
            <img src={heroElisp} alt="" className='hero-elips' />
            <div className="partnership-left">
                <h1>QueryFlo for Institutions </h1>
                <div className='bottom-sec'>
                    <h3 className='color-text-sec'>Empower Your Students with Real-World SQL Skills</h3>
                    <p>QueryFlo is the AI-powered SQL practice platform designed for modern data education. Whether you're a university, bootcamp, or training provider, our platform gives your students access to real-world datasets, domain-specific practice questions, and AI support — all in one place.
                    </p>
                    <button className='active_btn' onClick={()=>navigate('/partnership-contact')} >Start Your Partnership</button>
                </div>
            </div>
            <div className="partnership-right">
                <img src={heroImg} alt="" />
            </div>
        </div>
    )
}

export default HeroSection