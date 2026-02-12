import React from 'react'

import { useNavigate } from 'react-router-dom'

import partnerHand from '../../assets/image/home/partner-hand.webp'

const LetsTalk = () => {

    const navigate = useNavigate()
    return (

        <div className="lets-talk-sec">
            <div className='talk-left'>
                <h2>Let's Talk</h2>
                <p>We offer flexible licensing options starting with as few as 10 seats, all the way up to campus-wide rollouts. <br />  Interested in bringing QueryFlo to your school or program?
                </p>

                <div className='talk-bttns'>

                    <button className='active_btn' onClick={() => navigate('/partnership-contact')}>Schedule a Demo
                    </button>

                    <button className='join_btn ' onClick={() => navigate('/partnership-contact')}>Contact Us for a Partnership Quote
                    </button>
                </div>
            </div>

            <div className='talk-right'>
                <img src={partnerHand} alt="" />
            </div>
        </div>
    )
}

export default LetsTalk;