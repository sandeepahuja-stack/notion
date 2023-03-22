import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
} from "@mui/material";
import Filter from "../Filter";
import React, { useState } from "react";

const FilterGroup = (props) => {
  const {
    data,
    updateFilterGroup,
    columnInfo,
    index = 0,
    handleGroupDelete,
  } = props;

  const handleUpdateFilterGroup = (index, updateData) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.filters[index] = updateData;
    updateFilterGroup(dataCopy);
  };

  const removeUpdateFilterGroup = (index) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    // dataCopy.filters[index] = updateData;
    console.log(data);
    dataCopy.filters.splice(index, 1);
    updateFilterGroup(dataCopy);
    console.log(dataCopy);
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
      {data.filters.length > 0 && (
        <Card
          sx={{
            border: "1px solid #dfdfdf",
          }}
        >
          <CardContent>
            {(data.filters || []).map((filterObj, i) => {
              if (!filterObj) return null;
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
                  <Box
                    sx={{
                      my: "10px",
                    }}
                  >
                    {i === 1 ? (
                      <Select
                        sx={
                          {
                            // width: 100,
                            // height: 30,
                            // fontSize: 12,
                          }
                        }
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
                    ) : i !== 0 ? (
                      data.operator
                    ) : (
                      "WHERE"
                    )}
                  </Box>
                  {"filters" in filterObj ? (
                    <>
                      <FilterGroup
                        data={filterObj}
                        updateFilterGroup={(data) =>
                          handleUpdateFilterGroup(i, data)
                        }
                        columnInfo={columnInfo}
                        index={i}
                        handleGroupDelete={() => removeUpdateFilterGroup(i)}
                      />
                    </>
                  ) : (
                    <Box>
                      <Filter
                        data={filterObj}
                        updateFilter={(data) =>
                          handleUpdateFilterGroup(i, data)
                        }
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
                          color="error"
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
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => addFilter(lastFilterIndex)}
                color="primary"
                variant="contained"
              >
                Add Filter
              </Button>

              <Button
                onClick={() => addFilter(lastFilterIndex, true)}
                color="secondary"
                variant="contained"
              >
                Add Filter Group
              </Button>
              <Button
                onClick={() => handleGroupDelete(index)}
                color="error"
                variant="contained"
              >
                remove filter group
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};
export default FilterGroup;
