import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import COLORS from "constants /colors";

const ModalContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "700px",
  background: COLORS.WHITE,
  padding: "40px",
});

export default ModalContainer;
