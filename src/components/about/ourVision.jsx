import React from 'react'
import visionIcon from '../../assets/image/about/our-vision.webp'
import { Button } from 'bootstrap'
import { useNavigate } from 'react-router-dom'

const OurVision = () => {

    const navigate = useNavigate()
    return (

        <div className="vision-sec">
            <div className='vision-left'>
                <img src={visionIcon} alt="" />
            </div>
            <div className='vision-right'>

                <h2>Our Vision</h2>
                <p>To become the leading AI-powered learning platform for domain-specific SQL mastery — equipping the next generation of data professionals with real-world business analytics skills through contextual practice, intelligent feedback, and job-focused learning paths.
                </p>
                <button className='join_btn ' onClick={() => navigate('/user-dashboard')}>Join Us</button>

            </div>
        </div>
    )
}

export default OurVision