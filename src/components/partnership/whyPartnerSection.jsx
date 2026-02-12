import React from 'react'
import cross from '../../assets/image/partnership/cross.webp'
import tick from '../../assets/image/partnership/tick.webp'
import designLeft from '../../assets/image/partnership/design-left.webp'
import designRight from '../../assets/image/partnership/design-right.webp'



const WhyPartnerSection = () => {
    const challangeData = [
        {
            img: cross,
            Challangetext: " No domain-specific or career-focused SQL practice paths "
        },
        {
            img: cross,
            Challangetext: "No career-aligned or SQL database tailored to analytics career paths"
        },
        {
            img: cross,
            Challangetext: "Learners struggle to apply SQL to real-world business problems"
        },
        {
            img: cross,
            Challangetext: "Hard to find practical SQL practice after bootcamps or training"
        },
        {
            img: cross,
            Challangetext: "Expensive or inflexible licensing options"
        },
    ]

    const helpData = [
        { img: tick, Challangetext: "Business-context questions across domains like Product, Marketing, Finance, Healthcare" },
        { img: tick, Challangetext: "Practice SQL on domain-specific databases tailored to your career path." },
        { img: tick, Challangetext: "Self-paced, auto-graded, and AI-supported learning system" },
        { img: tick, Challangetext: "AI Text-to-SQL & instant feedback reduce instructor load" },
        { img: tick, Challangetext: "Affordable institutional licensing with custom seat plans" },
    ]

    return (
        <div className='why-partner-section' >

            <img src={designLeft} alt="" className='design-left' />
            <img src={designRight} alt="" className='design-right' />


            <h2>Why Partner <span>with QueryFlo? </span></h2>

            <div className='partner-boxes'>
                <div className="left-part">
                    <h3 className='font-paraa'>Pain points</h3>
                    {challangeData.map((challange, index) => <div key={index}>
                        <div className="challanges">
                            <img src={challange.img} alt="" />
                            <p>{challange.Challangetext}</p>

                        </div>

                    </div>)}

                </div>

                <div className="right-part">
                    <h3 className='font-paraa'>How We Help</h3>
                    {helpData.map((challange, index) => <div key={index}>
                        <div className="challanges">
                            <img src={challange.img} alt="" />
                            <p>{challange.Challangetext}</p>

                        </div>

                    </div>)}

                </div>

            </div>

        </div >
    )
}

export default WhyPartnerSection