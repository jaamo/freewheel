import styled from "styled-components";
import "./App.css";
import { motion } from "framer-motion";
import Logo from "./components/Logo";

const Background = styled(motion.div)`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  overflow: hidden;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  left: -100px;
  right: -100px;
  top: -100px;
  bottom: -100px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 120s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Help = styled(motion.div)`
  text-align: center;
  color: white;
  margin-top: 20px;
  opacity: 0.6;
`;

const Page = styled(motion.div)`
  position: relative;
  padding: 2rem;
`;

function App() {
  return (
    <>
      <Background>
        <BackgroundImage></BackgroundImage>
      </Background>
      <Page>
        <Logo></Logo>
        <Help>Click anywhere to start loading.</Help>
      </Page>
    </>
  );
}

export default App;
