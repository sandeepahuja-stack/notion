import { Box } from "@mui/material";
import LoaderContainer from "./style";
const Loader = () => {
  return (
    <Box
      position="fixed"
      sx={{
        top: "50%",
        left: "50%",
      }}
    >
      <LoaderContainer>
      <div className="loading">
        <div></div>
        <div></div>
      </div>
      </LoaderContainer>
    </Box>
  );
};

export default Loader;
