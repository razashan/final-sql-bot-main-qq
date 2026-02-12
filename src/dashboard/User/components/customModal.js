import React from "react";
import { Modal } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Button from "./button";

const CustomModal = ({
  show,
  setShow,
  heading,
  textareaHeading,
  textareaRows,
  modalBtn,
  customInput,
  modalAiBtn,
}) => {
  return (
    <>
      <div className="custom_modal">
        <Modal
          centered
          size="lg"
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <div className="custom_modal_head">
              <div className="question_icon">
                <Icon icon="octicon:question-24" width="28" height="28" />
              </div>
              <div className="heading">
                <h4>{heading}</h4>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body className="modal_body_flex">
            <div className="custom_modal_body">
              <div
                className={
                  customInput ? "modal_input_box_show" : "modal_input_box_hide"
                }
              >
                <p>Add Your Question</p>
                <textarea
                name="question"
                id="question"
                placeholder="Ask question.."
                cols="80"
                rows={textareaRows}
              ></textarea>
              </div>
           
         
            </div>
            <div className="custom_modal_btn">

              <Button text={modalBtn} active={"active"} onClick={() => {}} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CustomModal;
