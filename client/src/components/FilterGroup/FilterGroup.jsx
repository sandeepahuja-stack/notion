import { Box, Button, MenuItem, Select } from "@mui/material";
import Filter from "../Filter/Filter";
import React, { useRef, useState } from "react";

const FilterGroup = (props) => {
  const { data, updateFilterGroup, columnInfo, index = -1 } = props;

  const handleUpdateFilterGroup = (index, updateData) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.filters[index] = updateData;
    updateFilterGroup(dataCopy);
  };

  const removeFilter = (index) => {
    let dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy.filters.splice(index, 1);

    updateFilterGroup(dataCopy);
  };
  const addFilter = (lastFilterIndex, isGroup = false) => {
    const newFilterData = data.filters[lastFilterIndex];
    if (isGroup) {
      handleUpdateFilterGroup(data.filters.length, {
        operator: "or",
        filters: [newFilterData],
      });
    } else {
      handleUpdateFilterGroup(data.filters.length, newFilterData);
    }
  };

  const [operator, setOperator] = useState(data.operator);
  const handleOperator = (e) => {
    setOperator(e.target.value);
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.operator = e.target.value;
    updateFilterGroup(dataCopy);
  };
  let lastFilterIndex = 0;
  const operatorsList = ["or", "and"];
  return (
    <>
      <Box
        sx={{
          marginLeft: "120px",
        }}
      >
        {(data.filters || []).map((filterObj, i) => {
          if (!filterObj) return;
          lastFilterIndex = "filters" in filterObj ? lastFilterIndex : i;
          let key = `${data.operator}_${index}_${i}_${lastFilterIndex}`;

          if (!("filters" in filterObj)) {
            const { property = "", filter = {} } = filterObj || {};
            const { type = "", value = "" } = filter;
            key = `${key}_${type}_${property}_${
              typeof value === "object" ? JSON.stringify(value) : value
            }`;
          }

          return (
            <Box key={key}>
              {i !== 0 ? data.operator : "WHERE"}
              {i === 1 ? (
                <Select
                  sx={{
                    width: 100,
                    height: 30,
                    fontSize: 12,
                  }}
                  value={operator}
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
              ) : null}
              {"filters" in filterObj ? (
                <>
                  <FilterGroup
                    data={filterObj}
                    updateFilterGroup={(data) =>
                      handleUpdateFilterGroup(i, data)
                    }
                    columnInfo={columnInfo}
                    index={i}
                  />
                </>
              ) : (
                <Box
                  style={{
                    padding: "10px",
                  }}
                >
                  <Filter
                    data={filterObj}
                    updateFilter={(data) => handleUpdateFilterGroup(i, data)}
                    columnInfo={columnInfo}
                    lastIndex={i === data?.filters.length - 1}
                    index={i}
                  />
                  <Box
                    style={{
                      padding: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => {
                        removeFilter(i);
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          );
        })}
        <Box
          sx={{
            p: "10px 5px",
          }}
        >
          <Button onClick={() => addFilter(lastFilterIndex)}>Add Filter</Button>

          <Button onClick={() => addFilter(lastFilterIndex, true)}>
            Add Filter Group
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default FilterGroup;
