import React from 'react'
import messionLeftIcon from '../../assets/image/about/mession-left-design.webp'
import messionRightIcon from '../../assets/image/about/mession-right-design.webp'
import ourMessionImg from '../../assets/image/about/our-mession-img.webp'
// import Button from '../shared/button'
import star from '../../assets/image/about/ph_starfourfill.webp'
import { useNavigate } from 'react-router-dom'


const OurMission = () => {

    const navigate = useNavigate()
    return (

        <div className="mession-sec">
            <img src={messionLeftIcon} alt="" className='img-left' />
            <img src={messionRightIcon} alt="" className='img-right' />

            <div className="mession-top">
                <div className="top-left">
                    <img src={ourMessionImg} alt="our mession img" />
                </div>
                <div className="top-right">
                    <h3>Our <span>MISSION! </span> </h3>
                    <p>To empower learners to master SQL through AI, role-relevant practice, and datasets that mirror the work analysts do every day.
                    </p>
                    <div className='mission-btn'>

                        <button className='join_btn ' onClick={() => navigate('/login')} >Get Started</button>
                    </div>
                </div>
            </div>

            <div className="mession-bottom">
                <h3 className='main-text'> What Makes Us <span>DIFFERENT? </span> </h3>

                <div className="qas-main">
                    <div className="qas-left">

                        <div className="qas">
                            <div>
                                <img src={star} alt="" />
                            </div>
                            <div>
                                <h4>Built by Industry Expert</h4>
                                <p>from Google, top tech companies, and leading data teams
                                </p>
                            </div>
                        </div>

                        <div className="qas">
                            <div>
                                <img src={star} alt="" />
                            </div>
                            <div>
                                <h4>AI Text-to-SQL</h4>
                                <p>Learn to turn business problems into real queries
                                </p>
                            </div>
                        </div>

                        <div className="qas">
                            <div>

                                <img src={star} alt="" />
                            </div>
                            <div>
                                <h4>Built on Business Context</h4>
                                <p>not just SQL tricks</p>
                            </div>
                        </div>

                        <div className="qas">
                            <div>

                                <img src={star} alt="" />
                            </div>
                            <div>
                                <h4>Designed for Career Readiness</h4>
                                <p>analyst-focused learning, not just technical drills</p>
                            </div>
                        </div>


                    </div>

                    <div className="qas-right">

                        <div className="qas">
                            <div>
                                <img src={star} alt="" />
                            </div>
                            <div>
                                <h4>Domain-Specific Practice Questions</h4>
                                <p>across Product, Marketing, Finance, and more   </p>
                            </div>
                        </div>

                        <div className="qas">
                            <div>
                                <img src={star} alt="" />
                            </div>
                            <div>
                                <h4>Instant Feedback</h4>
                                <p>Practice smarter with AI-assisted hints and explanations

                                </p>
                            </div>
                        </div>

                        <div className="qas">
                            <div>
                                <img src={star} alt="" />
                            </div>
                            <div>
                                <h4>AI-Powered Learning Tools</h4>
                                <p>text-to-SQL, error feedback, and smart hints</p>
                            </div>
                        </div>

                    </div>

                </div>


            </div>

        </div>

    )
}

export default OurMission