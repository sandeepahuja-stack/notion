import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import COLORS from "constants /colors";

const rotate360 = keyframes`
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
    background: #000
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
    background: #fff
  }
`;

const LoaderContainer = styled.div({
  ".loading": {
    display: "inline-block",
    position: "relative",
    width: "64px",
    height: "64px",

    div: {
      position: "absolute",
      background: COLORS.WHITE,
      opacity: 1,
      borderRadius: "50%",
      animation: `${rotate360} 1.4s cubic-bezier(0, 0.2, 0.8, 1) infinite`,
      "&:nth-child(2)": {
        animationDelay: "-.7s",
      },
    },
  },
});

export default LoaderContainer;
