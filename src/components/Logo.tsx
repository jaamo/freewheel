import styled from "styled-components";
import { motion } from "framer-motion";
import logoImage from "../assets/meditation.svg";

const LogoWrapper = styled(motion.div)`
  font-family: "Quicksand", sans-serif;
  color: white;
  font-size: 1.6rem;
  position: relative;
  width: 12rem;
  height: 12rem;
  margin-left: auto;
  margin-right: auto;
`;

const LogoImage = styled(motion.img)`
  position: absolute;
  width: 12rem;
  height: 12rem;
  opacity: 0.2;
`;

function Logo() {
  return (
    <LogoWrapper>
      <LogoImage
        animate={{ rotate: [0, 90] }}
        transition={{ ease: "linear", duration: 100, loop: Infinity }}
        src={logoImage}
      ></LogoImage>
      <LogoImage
        animate={{ rotate: [20, 110] }}
        transition={{ ease: "linear", duration: 20, loop: Infinity }}
        src={logoImage}
      ></LogoImage>
      <LogoImage
        animate={{ rotate: [40, 130] }}
        transition={{ ease: "linear", duration: 40, loop: Infinity }}
        src={logoImage}
      ></LogoImage>
    </LogoWrapper>
  );
}

export default Logo;
