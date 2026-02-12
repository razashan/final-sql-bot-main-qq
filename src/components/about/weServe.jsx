import React from 'react'
// import serveiconLeft from '../../assets/image/about/serv-left-icn.webp'
// import servericonRight from '../../assets/image/about/serv-right-icn.webp'

import newServe from '../../assets/image/about/new-serve.png'
import servImg1 from '../../assets/image/about/serve-icon1.webp'
import servImg2 from '../../assets/image/about/serve-icon2.webp'
import servImg3 from '../../assets/image/about/serve-icon3.webp'
import servImg4 from '../../assets/image/about/serve-icon4.webp'

const WeServe = () => {
    return (

        <div className="serve-sec">

            {/* style={{ width: "200px", height: "200px" }} */}

            <img src={newServe} alt="img-left" className='img-left' />
            <img src={newServe} alt="img-right" className='img-right' />

            <div className="serve-top">
                <h3>Who We <span>Serve </span> </h3>
                <p>Empowering Learners to Query Like Pros</p>
            </div>

            <div className="serve-bottom">


                <div className='serv-box1'>

                    <div className='serv-box'>
                        <img src={servImg1} alt="" />
                        <p className='font-sec'>Students learning SQL for the first time</p>
                    </div>

                    <div className='serv-box'>
                        <img src={servImg2} alt="" />
                        <p className='font-sec'>Analysts preparing for interviews
                        </p>
                    </div>
                </div>

                <div className='serv-box2'>

                    <div className='serv-box'>
                        <img src={servImg3} alt="" />
                        <p className='font-sec'>Bootcamps & universities training future data pros
                        </p>
                    </div>

                    <div className='serv-box'>
                        <img src={servImg4} alt="" />
                        <p className='font-sec'>Career switchers entering the world of data
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default WeServe