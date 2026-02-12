import React from 'react'

import featureElips from '../../assets/image/partnership/feature-elips.webp'
import WhiteVectorLeft from '../../assets/image/partnership/left-vector.webp'
import WhiteVectorRight from '../../assets/image/partnership/vector-right.webp'
import dataSienc from '../../assets/image/partnership/datascience_6099399.webp'
import onlineTraning from '../../assets/image/partnership/onlinelearning_2910679.webp'
import universityPrograms from '../../assets/image/partnership/insight_7020128.webp'
import corporatePrograms from '../../assets/image/partnership/teching_7156184.webp'
import linefram from '../../assets/image/partnership/line-frame.png'
import { useLocation, useNavigate } from 'react-router-dom'

const FeaturesSection = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname;

    return (
        <div className='partner-feature-section'>

            <img src={featureElips} alt="" className='feature-elips' />
            <img src={WhiteVectorLeft} alt="" className='vector-left' />

            {path === '/partnership' ?
                <img src={WhiteVectorRight} alt="" className='vector-right' />
                : null
            }

            {/* Feature-Top-Part */}
            <div className="feature-top">

                <h2>Features Your Students Will Love</h2>
                <h5 className='color-text-sec font-paraa'>Tired of endless textbooks and dry tutorials? we have a lot of features for you.</h5>
            </div>

            {/* Feature-Center-Part */}
            <div className="feature-center">
                <div className='card'>
                    <div>
                        <h4>01.</h4>
                        <h4>AI Text-to-SQL</h4>
                    </div>
                    <p>Learn by asking questions in plain English</p>
                </div>

                <div className='card'>
                    <div>
                        <h4>02.</h4>
                        <h4>Domain-specific databases</h4>
                    </div>
                    <p>marketing, product, healthcare, sales, web, SaaS, and more.</p>
                </div>

                <div className='card'>
                    <div>
                        <h4>03.</h4>
                        <h4>Real-World Datasets</h4>
                    </div>
                    <p>Practice with business-style tables and metrics</p>
                </div>

                {/* 3 -6  */}
                <div className='card'>
                    <div>
                        <h4>04.</h4>
                        <h4>Feedback on the Spot</h4>
                    </div>
                    <p>AI explains errors and suggests improvements</p>
                </div>

                <div className='card'>
                    <div>
                        <h4>05.</h4>
                        <h4>Progress Tracking</h4>
                    </div>
                    <p>View performance by domain, topic, or skill level</p>
                </div>

                <div className='card'>
                    <div>
                        <h4>06.</h4>
                        <h4>Dashboards for Instructors</h4>
                    </div>
                    <p>Monitor student engagement & performance
                    </p>
                </div>

            </div>

            {/* Feature-Bottom-Part */}
            {/* {path === '/partnership' ? */}
            <div className="feature-bottom">

                <div className="bottom-part1">
                    <div className="part1-top">
                        <h5>Data Science & <br /> Analytics Bootcamps</h5>
                        <img src={dataSienc} alt="" />
                    </div>
                    <div className="part1-bottom">
                        <h5>Online Training <br /> Companies</h5>
                        <img src={onlineTraning} alt="" />
                    </div>

                </div>

                <div className="bottom-part2">
                    <p>Perfect for</p>
                    <img src={linefram} alt="" className='line-frame' />
                </div>

                <div className="bottom-part3">
                    <div className="part1-top">
                        <img src={universityPrograms} alt="" />
                        <h5>University Data Science/ <br /> Analytics Programs</h5>
                    </div>
                    <div className="part1-bottom">
                        <img src={corporatePrograms} alt="" />
                        <h5>Corporate Training <br /> Programs</h5>
                    </div>

                </div>


            </div>
            {/* : null */}
            {/* } */}

            {/* for mobile screens */}
            {/* {path === '/partnership' ? */}

            <div className="feature-bottom-mobile">
                <p>Perfect for</p>
                <div className='perfectFor-wraper'>
                    <div className='perfectFor-box'>
                        <img src={dataSienc} alt="" />
                        <h5>Data Science & Analytics Bootcamps  </h5>
                    </div>

                    <div className='perfectFor-box'>
                        <img src={universityPrograms} alt="" />
                        <h5>University Data Science/Analytics Programs</h5>
                    </div>

                    <div className='perfectFor-box'>
                        <img src={onlineTraning} alt="" />
                        <h5>Online Training Companies </h5>
                    </div>

                    <div className='perfectFor-box'>
                        <img src={corporatePrograms} alt="" />
                        <h5>Corporate Training Programs</h5>
                    </div>
                </div>
            </div>
            {/* : null */}
            {/* } */}

            {path === '/partnership' ?
                <div className='feature-btn'>
                    <button className='active_btn' onClick={() => navigate('/partnership-contact')} >Get Started</button>
                </div>
                : null
            }
        </div>
    )
}

export default FeaturesSection