import React from 'react'
import buldImg from '../../assets/image/about/bulb.webp';
import iconLeft from '../../assets/image/about/story-right-icn.webp'
import iconRight from '../../assets/image/about/story-left-icn.webp'
import buldLight from '../../assets/image/about/story-bulb-light.webp';

const OurStory = () => {
    return (
        <div className="story-sec ">

            <img src={iconLeft} alt="" className='img-left' />
            <img src={iconRight} alt="" className='img-right' />

            <div className='story-left'>
                <h3>Our Origin Story</h3>

                <p className='color-text-sec '>After training over 1,000 non-technical professionals and helping them transition into various analytics roles, our founder noticed a common struggle.</p>

                <p>“Where can I keep practicing SQL — but not just generic stuff… I want questions related to my field like marketing, product, or finance.”
                </p>

                <p className='color-text-sec'>QueryFlo was born to solve this exact problem — bridging the gap between SQL syntax and real-world business application.
                </p>


            </div>

            <div className='story-right'>
                <img src={buldLight} alt="" className='bulb-light'/>
                <img src={buldImg} alt="bulb-img" className='bulb' />
            </div>

        </div>

    )
}

export default OurStory