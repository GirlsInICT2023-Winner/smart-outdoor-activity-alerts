import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import Content from "./components/blocks/Content";
import Footer from "./components/blocks/Footer";

function App() {
  const [test, setTest] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then((response) => response.text())
      .then((test) => {
        setTest(test);
      });
  }, []);

  return (
    <Wrapper>
      <div>{test}</div>
      <Content></Content>
      <Footer></Footer>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
