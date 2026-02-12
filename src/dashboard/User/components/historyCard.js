import React from "react";

function HistoryCard({bookmarkId,bookmarkedQuestionId,questionName}) {
  return (
    <div className="history_card">
      <div className="question">
        {/* <h4>Q </h4> */}
        {/* <h4>:</h4> */}
        <span>
          {" "}
          <h4> {questionName}</h4>
        
        </span>
      </div>
      <div className="answer">
        {/* <h1>A </h1>
        <h1>:</h1> */}
        {/* <span>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
          lacus gravida, tristique tellus consectetur, iaculis turpis. Aliquam
          neque lacus, rutrum at pulvinar vel, faucibus ac est. Mauris
          condimentum porttitor posuere. Orci varius natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Sed velit nibh, porta
          ut quam sit amet, sollicitudin venenatis velit.
          
        </span> */}
        <span>Read more</span>
      </div>
    </div>
  );
}

export default HistoryCard;
