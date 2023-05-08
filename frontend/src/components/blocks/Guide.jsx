import React from "react";
import "./Modal.css";

const Guide = ({ handleCloseModal, modalRef }) => {
  return (
    <div>
      <div className="ModalOverlay">
        <div className="ModalWrapper" ref={modalRef}>
          <div className="ModalHeader">
            <button className="ModalCloseButton" onClick={handleCloseModal}>
              X
            </button>
          </div>
          <div className="ModalBody">
            <div className="Wrapper_">
              <h1>How to Set Standard For Children</h1>
              <img
                src="https://wpvip.edutopia.org/wp-content/uploads/2022/10/iStock-896461594_master.jpg?w=2880&quality=85"
                alt="img"
              />

              <br />
              <div>
                Children are more vulnerable to air pollution because their
                lungs, kidneys, and immune systems are immature and their
                breathing is faster.
                <br />
                <br />
                We therefore define new standards for children. Air quality
                refers to the concentration detected in the air by benzene and
                some other flammable gases as well as carbon monoxide (CO) and
                ammonia (NH3).
                <br />
                <br />
                level 1 -{" "}
                <u>
                  <strong>PERMITTED</strong>
                </u>
                : perfect weather for outdoor activities <br />
                If fine dust is between 0 and 50, ultrafine dust is between 0
                and 25, and air quality is between 0 and 499.
                <br />
                <br />
                level 2 -{" "}
                <u>
                  <strong>CAUTION</strong>
                </u>
                : perfect weather for outdoor activities <br />
                If fine dust and ultrafine dust are between stages 1-2 and air
                quality is 0-499.
                <br />
                <br />
                level 3 -{" "}
                <u>
                  <strong>PROHIBITED</strong>
                </u>
                : perfect weather for outdoor activities <br />
                <br />
                If fine dust is 101 or higher, ultrafine dust is 51 or higher,
                or air quality is 500 or higher.
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
