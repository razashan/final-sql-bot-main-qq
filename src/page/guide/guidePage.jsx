import { useState } from "react";
import IntroSQL from "../../components/guide/introSQL";
import aboutVectorDesign from "../../assets/image/about/about-design.svg";
import TerminologieSQL from "../../components/guide/terminologieSQL";
import DataTypeSQL from "../../components/guide/dataTypeSQL";
import ERD from "../../components/guide/ERD";
import BasicCommand from "./../../components/guide/basicCommand";
import WindowFunction from "../../components/guide/windowFunction";
import AdvancedCommand from "./../../components/guide/advanceCommand";
import IntermediateCommand from "./../../components/guide/intermediateCommand";
import AcidTransaction from "../../components/guide/acidTransaction";
import CommandCategories from "./../../components/guide/commandCategories";

const GuidePage = () => {
  const [Navlink, setNavlink] = useState("sql-intro");
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="guide-main">
      {/* <Navbar /> */}
      <img src={aboutVectorDesign} alt="" className="guide-vector" />
      <div className="guide-page">
        {/* sidebar-icon */}
        <img
          src={`${
            showSidebar ? "/icons/sidebar-1.svg" : "/icons/sidebar-2.svg"
          }`}
          alt="sidebar-icon"
          className={`sidebar-icon  `}
          onClick={() => setShowSidebar(!showSidebar)}
        />

        {/* sidebar */}
        <div className={` ${showSidebar ? "hideSidebar" : "sidebar"} sidebar`}>
          <div className="guide-sidebar">
            <h5 className="title">SQL Tutorial</h5>
            <div className="side-links">
              <ul className="links">
                <li
                  className={`${Navlink == "sql-intro" ? "active" : ""}`}
                  onClick={() => setNavlink("sql-intro")}
                >
                  Introduction of SQL{" "}
                </li>

                <li
                  className={`${Navlink == "sql-terminologie" ? "active" : ""}`}
                  onClick={() => setNavlink("sql-terminologie")}
                >
                  {" "}
                  SQL Terminologies
                </li>

                <li
                  className={`${Navlink == "sql-data-type" ? "active" : ""}`}
                  onClick={() => setNavlink("sql-data-type")}
                >
                  {" "}
                  SQL Data types{" "}
                </li>

                <li
                  className={`${Navlink == "sql-erd" ? "active" : ""}`}
                  onClick={() => setNavlink("sql-erd")}
                >
                  {" "}
                  ER Diagram & Data modal
                </li>

                <li
                  className={`${Navlink == "sql-categories" ? "active" : ""}`}
                  onClick={() => setNavlink("sql-categories")}
                >
                  {" "}
                  Categories of SQL command{" "}
                </li>

                <li
                  className={`${Navlink == "sql-basic" ? "active" : ""}`}
                  onClick={() => setNavlink("sql-basic")}
                >
                  {" "}
                  Basic SQL command{" "}
                </li>

                <li
                  className={`${Navlink == "sql-intermediate" ? "active" : ""}`}
                  onClick={() => setNavlink("sql-intermediate")}
                >
                  {" "}
                  Intermediate SQL command{" "}
                </li>

                <li
                  className={`${Navlink == "sql-acid" ? "active" : ""}`}
                  onClick={() => setNavlink("sql-acid")}
                >
                  {" "}
                  ACID Properties of transaction{" "}
                </li>

                <li
                  className={`${Navlink == "sql-advanced" ? "active" : ""}`}
                  onClick={() => setNavlink("sql-advanced")}
                >
                  {" "}
                  Advanced SQL command{" "}
                </li>

                <li
                  className={`${
                    Navlink == "sql-window-functions" ? "active" : ""
                  }`}
                  onClick={() => setNavlink("sql-window-functions")}
                >
                  {" "}
                  Common window functions{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* main-content */}
        <div className="main">
          {Navlink == "sql-intro" && <IntroSQL setNavlink={setNavlink} />}
          {Navlink == "sql-terminologie" && (
            <TerminologieSQL setNavlink={setNavlink} />
          )}
          {Navlink == "sql-data-type" && (
            <DataTypeSQL setNavlink={setNavlink} />
          )}
          {Navlink == "sql-erd" && <ERD setNavlink={setNavlink} />}
          {Navlink == "sql-categories" && (
            <CommandCategories setNavlink={setNavlink} />
          )}
          {Navlink == "sql-basic" && <BasicCommand setNavlink={setNavlink} />}
          {Navlink == "sql-intermediate" && (
            <IntermediateCommand setNavlink={setNavlink} />
          )}
          {Navlink == "sql-acid" && <AcidTransaction setNavlink={setNavlink} />}
          {Navlink == "sql-advanced" && (
            <AdvancedCommand setNavlink={setNavlink} />
          )}
          {Navlink == "sql-window-functions" && (
            <WindowFunction setNavlink={setNavlink} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
