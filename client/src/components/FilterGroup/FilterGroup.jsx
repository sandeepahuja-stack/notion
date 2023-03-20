import { Box, Button } from "@mui/material";
import Filter from "../Filter/Filter";
import React, { useRef } from "react";

const FilterGroup = (props) => {
  const { data, updateFilterGroup, columnInfo, index } = props;

  // not group
  //   const lastFilterIndex = useRef(0);

  const handleUpdateFilterGroup = (index, updateData) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.filters[index] = updateData;
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

  let lastFilterIndex = 0;
  return (
    <Box
      sx={{
        marginLeft: "120px",
      }}
    >
      {data.filters.map((filterObj, i) => {
        lastFilterIndex = "filters" in filterObj ? lastFilterIndex : i;
        return (
          <Box key={`${data.operator}_${index}_${i}_${lastFilterIndex}`}>
            {i !== 0 ? data.operator : "WHERE"}
            {"filters" in filterObj ? (
              <FilterGroup
                data={filterObj}
                updateFilterGroup={(data) => handleUpdateFilterGroup(i, data)}
                columnInfo={columnInfo}
                index={i}
              />
            ) : (
              <div
                style={{
                  padding: "10px",
                }}
              >
                <Filter
                  data={filterObj}
                  updateFilter={(data) => handleUpdateFilterGroup(i, data)}
                  columnInfo={columnInfo}
                  lastIndex={i === data.filters.length - 1}
                  index={i}
                />
              </div>
            )}

            {i === data.filters.length - 1 ? (
              <>
                <Button onClick={() => addFilter(lastFilterIndex)}>
                  Add Filter
                </Button>

                <Button onClick={() => addFilter(lastFilterIndex, true)}>
                  Add Filter Group
                </Button>
              </>
            ) : (
              ""
            )}
          </Box>
        );
      })}
    </Box>
  );
};
export default FilterGroup;
