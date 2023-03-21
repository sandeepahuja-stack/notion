import { Button, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import ColumnHeadSelect from "components/Filter/ColumnHeadSelect";

const Sort = (props) => {
  const {
    columnsOrder,
    property,
    direction,
    updateSortState,
    sortState,
    index,
  } = props;

  const handleChange = (type) => (event, value) => {
    const tempSort = [...sortState];
    if (type === "property") {
      tempSort[index].property = value;
    } else if (type === "direction") {
      tempSort[index].direction = event.target.value;
    } else {
      tempSort.splice(index, 1);
      console.log(tempSort);
    }
    updateSortState(tempSort);
  };
  const directionList = ["ascending", "descending"];

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <ColumnHeadSelect
          options={columnsOrder}
          onChange={handleChange("property")}
          value={property}
        />
        <Box>
          <Select
            sx={{
              width: 200,
            }}
            value={direction}
            onChange={handleChange("direction")}
          >
            {directionList.map((value) => {
              return (
                <MenuItem value={value} key={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Box>
          <Button color="error" onClick={handleChange("remove")}>
            Remove
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Sort;
