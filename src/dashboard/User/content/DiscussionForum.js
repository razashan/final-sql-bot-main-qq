import React, { useState } from "react";
import { GRAPHICS } from "../assets";
import { Button, TopBar } from "../components";
import DiscussCommunity from "./discussCommunity";

const DiscussionForum = ({ isSideMenuOpen, toggleSideMenu }) => {
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <>
      <div>
        <TopBar
          heading={"Discussion"}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
          search={false}
        />
      </div>

      {showCommunity ? (
        <>
          <DiscussCommunity
            backBtn={() => {
              setShowCommunity(false);
            }}
          />
        </>
      ) : (
        <div className="discussion_form_section">
          <div className="discussion_img">
            {" "}
            <img src={GRAPHICS.Discussion_Img} alt="" />
          </div>

          <div className="join-btn">
            <Button
              text="Join Our Community"
              active={true}
              onClick={() => {
                setShowCommunity(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DiscussionForum;
