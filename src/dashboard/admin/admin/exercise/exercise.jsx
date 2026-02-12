import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./exercise.scss";
function Exercise(props) {
  const { setActiveInnerFilter } = props;
  // console.log("Vlue of Activefilter", props);
  let navigate = useNavigate();
  const [activeLocal, setActiveLocal] = useState();

  const setexercise = () => {
    setActiveInnerFilter("Added");
  };
  return (
    <section className="exercise-sec">
      <h2>
        Exercise <span>01</span>
      </h2>
      <div className="detail">
        <div className="first">
          <h4>An introduction about soccer Database</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
            lacus gravida, tristique tellus consectetur, iaculis turpis. Aliquam
            neque lacus, rutrum at pulvinar vel, faucibus ac est. Mauris
            condimentum porttitor posuere. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Sed velit
            nibh, porta ut quam sit amet, sollicitudin venenatis velit.
          </p>
        </div>
        <div className="second">
          <h4>Sample Database description:</h4>
          <p>
            The sample database represents some of the data storage and
            retrieval about a soccer tournament based on EURO CUP 2016. You
            might love football, and for all the football lovers we are
            providing a detail information about a football tournament. This
            design of database will make it easier to understand the various
            questions comes in your mind about a soccer tournament.
          </p>
        </div>
        <div className="third">
          <h4>List of tables in the soccer database:</h4>
          <div className="small-tabs">
            <div>
              <p>soccer_country</p>
            </div>
            <div>
              <p>soccer_city</p>
            </div>
            <div>
              <p>soccer_venue</p>
            </div>
            <div>
              <p>soccer_team</p>
            </div>
            <div>
              <p>playing_position</p>
            </div>
            <div>
              <p>player_mast</p>
            </div>
            <div>
              <p>soccer_country</p>
            </div>
            <div>
              <p>playing_position</p>
            </div>
          </div>
        </div>
        <button
          onClick={setexercise}
          style={{
            width: "90px",
            border: "none",
            background: "dodgerblue",
            height: "30px",
            color: "whitesmoke",
            fontWeight: "bold",
          }}
        >
          Back
        </button>
      </div>
    </section>
  );
}

export default Exercise;
