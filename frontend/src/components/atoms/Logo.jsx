import React from "react";
import styled from "styled-components";

const Logo = () => {
  return (
    <LogoImg
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Ericsson-LG_logo.svg/1200px-Ericsson-LG_logo.svg.png"
      alt="ericssonlg logo"
    />
  );
};

export default Logo;

const LogoImg = styled.img`
  height: 60px;
`;
