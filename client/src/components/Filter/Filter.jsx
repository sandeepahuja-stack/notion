import {
  Autocomplete,
  Box,
  Card,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useFilter from "./hooks/useFilter";
import FilterValueFiled from "./FilterValueField";
const Filter = (props) => {
  const {
    handlePropChange,
    
    selectedOperator,
    selectedProperty,
    columnsOrder,
    handleOperator,
    operatorsList,
    defaultOperator,
    filterField,

    filterFieldOptions,
    filterFieldOnChange,
    filterFieldValue,
    showFilterFieldValue
  } = useFilter(props);

  return (
    <>
      <Box display="flex">
        <Box
          sx={{
            display: "inline-block",
            width: 200,
          }}
        >
          <Autocomplete
            options={columnsOrder}
            onChange={handlePropChange}
            value={selectedProperty}
            getOptionLabel={(option) => {
              return option;
            }}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} />
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
            value={selectedOperator || defaultOperator}
            onChange={handleOperator}
          >
            {operatorsList.map((value) => {
              return <MenuItem value={value} key={value}>{value}</MenuItem>;
            })}
          </Select>
        </Box>
       {showFilterFieldValue ?  <Box>
          <FilterValueFiled
            filterField={filterField}
            options={filterFieldOptions}
            onChange={filterFieldOnChange}
            value={filterFieldValue}
          />
          
        </Box> : null}
      </Box>
    </>
  );
};

export default Filter;
