import { useEffect, useMemo, useState } from "react";
import { populateColumnHead, populateRowData } from "./helper";
import TableContainer from "./components/TableContainer";

import Filter from "./components/Filter/Filter";
import FilterGroup from "./components/FilterGroup/FilterGroup";
import { obj3 } from "./one";
import getPropertyDetail from "./helper/filter/getPropertyId";
import { filterField } from "./helper/filter";

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
    let d = {
      or: [
        {
          property: "todo",
          checkbox: {
            equals: true,
          },
        },
      ],
    };
    fetch(`http://localhost:8000/filterSort/?filter=${JSON.stringify(d)}`)
      .then((response) => response.json())
      .then((res) => {
        const columnsHeadRes = { ...columnsHeadResponse };

        updateData({
          columnsHead: columnsHeadRes,
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
  useEffect(() => {
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
  }, [columnsHead]);

  
  return (
    <div>
      {!!columnsHead.columnsOrder.length && (
        <TableContainer rowsList={rowsDataResponse} columnsHead={columnsHead} />
      )}
      {!!columnsHead.columnsOrder.length && filterState && (
        <FilterGroup
          updateFilterGroup={updateFilterState}
          data={filterState}
          columnInfo={columnsHead}
        />
      )}
      <button onClick={filter}>filter</button>
    </div>
  );
}

export default App;
