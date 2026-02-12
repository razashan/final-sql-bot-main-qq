import React from 'react'
// import Button from '../shared/button'
import { useNavigate } from 'react-router-dom'

import aboutVectorDesign from '../../assets/image/about/about-design.svg'

const AboutUs = () => {

    const navigte = useNavigate()
    return (
        <div className="aboutUs-text-sec">

            <img src={aboutVectorDesign} alt="" className='about-vector' />
            <h1> About Us</h1>
            <h3 className='color-text-sec'>Welcome to QueryFlo </h3>
            <p>
                QueryFlo is an AI-powered SQL learning platform built by analysts — for analysts.
                We believe that learning SQL should go beyond memorizing syntax. That’s why we created QueryFlo — a practice-first, domain-specific platform where aspiring analysts and data professionals can build real-world SQL skills with the help of AI.
            </p>

            <button className='aboutPrimary_btn'
                onClick={() => navigte('/login')}>
                Start Learning SQL
            </button>
        </div>
    )
}

export default AboutUs