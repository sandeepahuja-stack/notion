import { Box, MenuItem, Select } from "@mui/material";
import useFilter from "./hooks/useFilter";
import FilterValueFiled from "./FilterValueField";
import ColumnHeadSelect from "./ColumnHeadSelect";
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
    showFilterFieldValue,
  } = useFilter(props);

  return (
    <>
      <Box display="flex">
        <ColumnHeadSelect
          options={columnsOrder}
          onChange={handlePropChange}
          value={selectedProperty}
        />

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
              return (
                <MenuItem value={value} key={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        {showFilterFieldValue ? (
          <Box>
            <FilterValueFiled
              filterField={filterField}
              options={filterFieldOptions}
              onChange={filterFieldOnChange}
              value={filterFieldValue}
            />
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Filter;
