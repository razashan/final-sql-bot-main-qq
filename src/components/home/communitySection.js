import React from "react";
import Button from "../../components/shared/button";
import { GRAPHICS } from "../../assets";
import Card from "./card";
import { DATA2 } from "../../utilis/Testimonials ";
const Community = () => {
  return (
    <>
      <div className="community_section">
        <div className="join_us">
          <img src={GRAPHICS.Community_Img} alt="community" />
          <div className="content">
            <h1>
              Join Our
              <span> COMMUNITY!</span>
            </h1>

            <p>
              A Hub of Interactive Learning! Join our dynamic platform where SQL
              enthusiasts converge.
            </p>

            <div className="join_btn">
              <Button
                text={"Join Us"}
                onClick={() => {}}
                join
                route={"/user-dashboard"}
              />
            </div>
          </div>
        </div>

        <div className="cards">
          {DATA2.map((data) => {
            return (
              <>
                <Card
                  name={data.name}
                  username={data.userName}
                  details={data.details}
                  userimage={data.img}
                  Tag1={data.tag1}
                  Tag2={data.tag2}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Community;
