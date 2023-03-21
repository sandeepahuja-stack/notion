import { useEffect, useMemo, useState } from "react";
import { populateColumnHead } from "./helper";
import TableContainer from "./components/TableContainer";

import FilterGroup from "./components/FilterGroup/FilterGroup";
import getPropertyDetail from "./helper/filter/getPropertyId";
import { filterField } from "./helper/filter";
import { Button } from "@mui/material";

function App() {
  const [data, updateData] = useState(null);
  const { columnsHead: columnsHeadResponse, rowsData: rowsDataResponse } =
    data || { columnsHead: {}, rowsData: [] };

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((payload) => {
        updateData(payload);
      });
  }, []);

  const filter = (data) => {
    fetch(`http://localhost:8000/filterSort/`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          ...data,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        updateData({
          columnsHead: columnsHeadResponse,
          rowsData: res.rowsData,
        });
        console.log("Success:", res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const rowsData = useMemo(() => {
  //   return populateRowData(rowsDataResponse);
  // }, [rowsDataResponse]);

  const columnsHead = useMemo(() => {
    return populateColumnHead(columnsHeadResponse);
  }, [columnsHeadResponse]);

  const [filterState, updateFilterState] = useState(null);
  const addFirstDefaultFilter = () => {
    if (columnsHead.columnsOrder.length > 0) {
      const defaultSelectedFilter = getPropertyDetail(
        columnsHead.columnsOrder[0],
        columnsHead.columnsDetails
      );
      const defaultSelectedFilterOperator = Object.keys(
        filterField[defaultSelectedFilter["type"]]
      )[0];
      updateFilterState({
        operator: "and",
        filters: [
          {
            property: defaultSelectedFilter.id,
            filter: {
              operator: defaultSelectedFilterOperator,
            },
          },
        ],
      });
    }
  };
  useEffect(() => {
    addFirstDefaultFilter();
  }, [columnsHead]);

  const populateReqFilter = (reqFilters) => {
    let obj = {};
    const keys = Object.keys(reqFilters);
    if (keys.includes("filters")) {
      const operator = reqFilters["operator"];

      obj[operator] = reqFilters["filters"].map((reqFilter) => {
        return populateReqFilter(reqFilter);
      });
    } else if (keys.includes("filter")) {
      const {
        property,
        filter: { operator, value: { type = "", value = null } = {} },
      } = reqFilters;

      const prop = columnsHead["columnsIdNameMap"][property];
      let tempVal = value === null ? "" : value;
      if (type === "checkbox") {
        tempVal = tempVal === "checked";
      }

      obj = {
        ...obj,
        property: prop,
        [type]: {
          [operator]: tempVal,
        },
      };
    }
    return obj;
  };
  const applyFilter = () => {
    if (filterState) {
      console.log(filterState);
      const obj = populateReqFilter(filterState);
      console.log(obj);
      filter(obj);
    }
  };
  return (
    <div>
      {!!columnsHead.columnsOrder.length && (
        <TableContainer rowsList={rowsDataResponse} columnsHead={columnsHead} />
      )}
      {!!columnsHead.columnsOrder.length && filterState && (
        <>
          <FilterGroup
            updateFilterGroup={updateFilterState}
            data={filterState}
            columnInfo={columnsHead}
          />
          <Button onClick={applyFilter}>Apply Filter</Button>
          {filterState.filters.length === 0 && (
            <button
              onClick={() => {
                addFirstDefaultFilter();
              }}
            >
              filter
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
