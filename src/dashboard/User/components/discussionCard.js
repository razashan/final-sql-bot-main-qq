import React from "react";

const DiscussionCard = (
  {questionBody,index}

) => {
  return (
    <>
      <div className="discussion_card">
        <h2>
          Question no: {index}
        </h2>
        <p>
         {questionBody}
        </p>
      </div>
    </>
  );
};

export default DiscussionCard;
