import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      Copyright © Winner - Sohyeon Kim, Minhee Kim, Suyeon Oh All rights
      reserved.
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: black;
  font-size: 16px;
  align-items: flex-end;
`;
