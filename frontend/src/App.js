import styled from "styled-components";
import "./App.css";
import Content from "./components/blocks/Content";
import Footer from "./components/blocks/Footer";

function App() {
  return (
    <Wrapper>
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
`;
