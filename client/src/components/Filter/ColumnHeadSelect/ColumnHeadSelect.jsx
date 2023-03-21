import { memo } from "react";

import  { Autocomplete, Box, TextField } from "@mui/material";


const ColumnHeadSelect = (props) => {
  const { options, value, onChange } = props;
  return (
    <Box
      sx={{
        display: "inline-block",
        width: 200,
      }}
    >
      <Autocomplete
        options={options}
        onChange={onChange}
        value={value}
        getOptionLabel={(option) => {
          return option;
        }}
        disableClearable
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
};

export default memo(ColumnHeadSelect);
