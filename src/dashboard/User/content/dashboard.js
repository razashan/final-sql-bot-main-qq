import { React, useState } from "react";
import { Button, HintBtn, TopBar, CustomModal } from "../components";

import { Modal } from "react-bootstrap";

const Dashboard = ({ isSideMenuOpen, toggleSideMenu }) => {
  const [show, setShow] = useState(false);
  const [aiShow, aisetShow] = useState(false);

  const [lgShow, setLgShow] = useState(false);
  const [smShow, setsmShow] = useState(false);
  return (
    <>
      <div>
        <TopBar
          heading={"Dashboard"}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
        />
      </div>

      <div className="dashboard_content">
        <div className="question_section">
          <h1>Question :</h1>

          <div className="box">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              non lacus gravida, .
            </p>

            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              non lacus gravida, tristique tellus consectetur, iaculis turpis.
              Aliquam neque lacus, rutrum at pulvinar vel, faucibus ac est.
              Mauris condimentum porttitor posuere. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Sed velit nibh, porta ut quam sit amet, sollicitudin venenatis
              velit.
            </span>
          </div>

          <div className="box">
            <p>Expected Output:</p>

            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              non lacus gravida, tristique tellus consectetur, iaculis turpis.
            </span>

            <div className="half_width">
              <div className="blue_box">
                <div className="box_header">
                  <span>sender_id</span>

                  <span>msgs</span>
                </div>

                <div className="box_details">
                  <div>
                    <span>01</span>

                    <span>35</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>Source Tables:</p>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              non lacus gravida, tristique tellus con.
            </span>

            <div className="blue_box">
              <div className="box_header">
                <span>twillio_sms_msgs</span>

                <span>msgs</span>
              </div>

              <div className="box_details">
                <div>
                  <span>connection_quality</span>

                  <span>text</span>
                </div>

                <div>
                  <span>message_content_hashed</span>

                  <span>text</span>
                </div>

                <div>
                  <span>message_id</span>

                  <span>bigint</span>
                </div>

                <div>
                  <span>receiver_id</span>

                  <span>bigint</span>
                </div>

                <div>
                  <span>sender_id</span>

                  <span>bigint</span>
                </div>

                <div>
                  <span>sent_at_date</span>

                  <span>datetime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feedback_section">
          <div className="header">
            <Button text={"Level"} onClick={() => setsmShow(true)} />
            <div>
              <Button
                text={"Submit Feedback"}
                onClick={() => {
                  setShow(true);
                }}
              />
              <HintBtn text={"View Hint"} onClick={() => setLgShow(true)} />
            </div>
          </div>

          <div className="box">
            <h1>
              Write your SQL queries or Python code to provide expected answers.
            </h1>
            <textarea
              placeholder={`"{id: 154, name: 'Chocolate Heaven'}"\n"{id: 154, name: 'Chocolate Heaven'}"\n"{id: 154, name: 'Chocolate Heaven'}"\n"{id: 154, name: 'Chocolate Heaven'}"\n"{id: 154, name: 'Chocolate Heaven'}"`}
            />
          </div>

          <div className="result_header">
            <h1>Query or Python code Output</h1>

            <div>
              <Button text={"AI Evaluation"} onClick={() => aisetShow(true)} />
              <Button text={"Run"} onClick={() => {}} active />
            </div>
          </div>

          <div className="result">
            <p>{"{id: 154, name: 'Chocolate Heaven'}"}</p>
            <p>{"{id: 154, name: 'Chocolate Heaven'}"}</p>
            <p>{"{id: 154, name: 'Chocolate Heaven'}"}</p>
          </div>
        </div>

        <Modal
          centered
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          className="view_hint_modal"
        >
          <Modal.Body>
            <div className="modal_question">
              Question 3 Solution | Top Message Sender and Receiver
            </div>
            <div className="answer_code">
              <p>import mysql.connector</p>
              <p className="mb-0">mydb = mysql.connector.connect(</p>
              <p className="ps-5 w-25 mb-0">
                host="localhost", user="yourusername", password="yourpassword",
                database="mydatabase"
              </p>
              <p className="mb-0">)</p>
              <p className="ps-3 mb-0">mycursor = mydb.cursor()</p>
              <p className="ps-1 mb-0">sql = "SELECT \</p>
              <p className="ps-5">
                {" "}
                users.name AS user, \ products.name AS favorite \ FROM users \
                INNER JOIN products ON users.fav = products.id
              </p>
              <p style={{ width: 220 }} className=" mb-0">
                {" "}
                "mycursor.execute(sql) myresult = mycursor.fetchall() for x in
                myresult:
              </p>
              <p className="ps-1 mb-0"> print(x)</p>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          centered
          // size="lg"
          show={smShow}
          onHide={() => setsmShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          className="level_modal"
        >
          <Modal.Body className="newmodal-body">
            <div className="levels">
              <div className="soft">Soft</div>
              <div className="easy">Easy</div>
              <div className="hard">Hard</div>
            </div>
          </Modal.Body>
        </Modal>

        <CustomModal
          show={show}
          setShow={setShow}
          heading={"Submit Feedback"}
          textareaHeading={"Write your feedback"}
          textareaRows={8}
          modalBtn={"Submit"}
        />

        <CustomModal
          show={aiShow}
          setShow={aisetShow}
          heading={"AI Evaluation"}
          textareaHeading={"The details of your problem are explained below"}
          textareaRows={8}
          modalBtn={"Copy"}
        />
      </div>
    </>
  );
};

export default Dashboard;
