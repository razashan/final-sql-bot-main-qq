import React from 'react'
import "./Exercises.scss"
const Exercisescard = ({heading,content1,content2,setOpen}) => {
   const  handleSubmit=()=>
    {
        if(heading==="Exercise 1")
        {
            setOpen(true);
        }
    }
    
  return (
    <div className='exercisescard' >
      <div className="exer1">
        <div className='exerhead'> <h3>{heading}</h3></div>
       <div className="exercont" onClick={handleSubmit}>
        <p>
        {content1}
        </p>
        <p>
        {content2}
        </p>
       </div>
      </div>
    </div>
  )
}

export default Exercisescard
