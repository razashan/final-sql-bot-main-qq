import React from 'react'

import { useNavigate } from 'react-router-dom'

import partnerHand from '../../assets/image/home/partner-hand.webp'

const PartnerWithUs = () => {

    const navigate = useNavigate()
    return (

        <div className="partner-section-home">
            <div className='partner-left'>
                <h2>Partner With Us!
                    Empower Your Students with SQL Skills</h2>
                <p>Are you an institution, organization, or business looking to offer your students the opportunity to learn SQL for interview preparation? Partner with QueryFlo for exclusive access to premium content, real-world exercises, and hands-on practice.
                </p>
                <button className='join_btn ' onClick={() => navigate('/partnership')}>Start Your Partnership</button>
            </div>

            <div className='partner-right'>
                <img src={partnerHand} alt="" />
            </div>
        </div>
    )
}

export default PartnerWithUs;