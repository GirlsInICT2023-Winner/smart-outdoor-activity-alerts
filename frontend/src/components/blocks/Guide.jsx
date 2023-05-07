import React from "react";
import styled from "styled-components";

const Guide = ({ showModal, handleCloseModal, modalRef }) => {
  return (
    <div>
      {/* {showModal && ( */}
      <ModalOverlay>
        <ModalWrapper ref={modalRef}>
          <ModalHeader>
            <ModalCloseButton onClick={handleCloseModal}>X</ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Wrapper>
              <h1>
                How to Set Standard <br />
                For Children
              </h1>
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
            </Wrapper>
          </ModalBody>
        </ModalWrapper>
      </ModalOverlay>
      {/* )} */}
    </div>
  );
};

export default Guide;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
`;

const Wrapper = styled.div`
  width: 432px;
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

const ModalCloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

const ModalBody = styled.div`
  padding: 1rem;
`;
