import React from "react";
import { GRAPHICS } from "../../assets";

const Card = ({ Tag1, Tag2, userimage, image, details, name, username, id, content, likes, comments, reShare }) => {
  return (
    <>
      <div className="card">
        <div className="header">
          <div className="card_profile">
            <img className="profile_img" src={userimage} />

            <div className="profile_content">
              <div>
                <h1>{name}</h1>
                <p>@{username}</p>
              </div>
              <img src={GRAPHICS.Tick} className="tick" />
            </div>
          </div>

          <div>
            <img src={GRAPHICS.Twitter_Mini} />
          </div>
        </div>

        <div className="details">
          <p>
            {details}
          </p>

          <span>#{Tag1}</span>
          <br />
          <span>#{Tag2}</span>
        </div>

        <div className="social_links">
          <div>
            <img src={GRAPHICS.Comment} />
            <span>321</span>
          </div>

          <div>
            <img src={GRAPHICS.Share} />
            <span>220</span>
          </div>

          <div>
            <img src={GRAPHICS.Like} />
            <span>155k</span>
          </div>
          <div>
            <img src={GRAPHICS.Download} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
