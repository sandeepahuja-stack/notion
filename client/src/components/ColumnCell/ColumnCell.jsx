import { Box, Divider } from "@mui/material";
import { memo } from "react";
import TableCell from "@mui/material/TableCell";

const ColumnCell = (props) => {
  const { title, isHeading = false } = props;
  return (
    <>
    
      <Box
        sx={{
          fontWeight: isHeading ? "bold" : "normal",
          textAlign: "center",
          padding: " 20px",
          minHeight: 30,
          minWidth: 150,
          fontSize: 12
        }}
      >
        {title}
        {props.children}
        
      </Box>
    </>
  );
};

export default memo(ColumnCell);
