import React from "react";
import StrokeButton from "../../../components/shared/strokeButton";
import { SupportCard } from "../components";

const SUPPORT_DATA = [
  {
    id: 1,
    heading: "Teams",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus
    leo, feugiat id faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim
    urna eu iaculis. Suspendisse nulla tortor, volutpat Lorem ipsum dolor
    sit amet, consectetur adipiscing elit. Mauris lacus leo, feugiat id
    faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim urna eu
    iaculis. Suspendisse nulla tortor, volutpat Lorem ipsum dolor sit
    amet, consectetur adipiscing elit. Mauris lacus leo, feugiat id
    faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim urna eu
    iaculis. Suspendisse nulla tortor, volutpat`,
    link: "Get In Touch",
  },
  {
    id: 2,
    heading: "Talents",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus
    leo, feugiat id faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim
    urna eu iaculis. Suspendisse nulla tortor, volutpat Lorem ipsum dolor
    sit amet, consectetur adipiscing elit. Mauris lacus leo, feugiat id
    faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim urna eu
    iaculis. Suspendisse nulla tortor, volutpat Lorem ipsum dolor sit
    amet, consectetur adipiscing elit. Mauris lacus leo, feugiat id
    faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim urna eu
    iaculis. Suspendisse nulla tortor, volutpat`,
    link: "Get In Touch",
  },
  {
    id: 3,
    heading: "Quizzes",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus
    leo, feugiat id faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim
    urna eu iaculis. Suspendisse nulla tortor, volutpat Lorem ipsum dolor
    sit amet, consectetur adipiscing elit. Mauris lacus leo, feugiat id
    faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim urna eu
    iaculis. Suspendisse nulla tortor, volutpat Lorem ipsum dolor sit
    amet, consectetur adipiscing elit. Mauris lacus leo, feugiat id
    faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim urna eu
    iaculis. Suspendisse nulla tortor, volutpat`,
    link: "Get In Touch",
  },
  {
    id: 4,
    heading: "Community",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus
    leo, feugiat id faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim
    urna eu iaculis. Suspendisse nulla tortor, volutpat Lorem ipsum dolor
    sit amet, consectetur adipiscing elit. Mauris lacus leo, feugiat id
    faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim urna eu
    iaculis. Suspendisse nulla tortor, volutpat Lorem ipsum dolor sit
    amet, consectetur adipiscing elit. Mauris lacus leo, feugiat id
    faucibus in, rhoncus eu nisi. Nunc tincidunt dignissim urna eu
    iaculis. Suspendisse nulla tortor, volutpat`,
    link: "Get In Touch",
    onClick: `onClick={() => setShowContact(!showContact)}`,
  },
];

const Support = ({ showContact, setShowContact }) => {
  return (
    <>
      {/* <h1 onClick={() => setShowContact(!showContact)}>Show Contact Page</h1> */}
      <div className="support_section">
        <div className="support_heading">
          <h1>Support & Feedback</h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            lacus leo, feugiat id faucibus in, rhoncus eu nisi. Nunc tincidunt
            dignissim urna eu iaculis. Suspendisse nulla tortor, volutpat
            @Loremipsum
          </p>

          <StrokeButton
            text="Get in touch"
            active={true}
            onClick={() => setShowContact(!showContact)}
          />
        </div>

        <div className="cards_heading">
          <h1>Our products & services</h1>
        </div>

        <div className="support_cards">
          {SUPPORT_DATA.map((data) => {
            return (
              <>
                <SupportCard
                  heading={data.heading}
                  content={data.content}
                  link={data.link}
                  onClick={() => setShowContact(!showContact)}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Support;
