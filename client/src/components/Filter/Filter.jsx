import {
  Autocomplete,
  Box,
  Card,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { filterField } from "../../helper/filter";
import useFilter from "./hooks/useFilter";
const Filter = (props) => {
  const {
    handleChange,
    setValue,
    type,
    selectedOperator,
    selectedProperty,
    value,
    columnsOrder,
    handleOperator
  } = useFilter(props);

  return (
    <Card>
      <Box display="flex">
        <Box
          sx={{
            display: "inline-block",
            width: 200,
          }}
        >
          <Autocomplete
            options={columnsOrder}
            onChange={handleChange}
            value={selectedProperty}
            getOptionLabel={(option) => {
              return option;
            }}
            renderInput={(params) => (
              <TextField {...params} label="Properties" />
            )}
          />
        </Box>

        <Box
          sx={{
            display: "inline-block",
            width: 200,
          }}
        >
          <Select
            sx={{
              width: 200,
            }}
            value={selectedOperator || Object.entries(filterField[type])[0][0]}
            onChange={handleOperator}
          >
            {Object.entries(filterField[type]).map(([key, value]) => {
              return <MenuItem value={key}>{key}</MenuItem>;
            })}
          </Select>
        </Box>
        <Box>
          <TextField
            placeholder="value"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default Filter;
