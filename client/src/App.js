import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { populateColumnHead } from "helper";
import Loader from "components/Loader";
import fetchTableData from "services/fetchTableData";
import fetchFilterData from "services/fetchFilterData";

import populateReqFilter from "helper/filter/populateReuqestFilter";

const FilterContainer = lazy(() => import("components/FilterContainer"));
const SortContainer = lazy(() => import("components/SortContainer"));
const TableContainer = lazy(() => import("components/TableContainer"));

function App() {
  const [data, updateData] = useState(null);
  const { columnsHead: columnsHeadResponse, rowsData: rowsDataResponse } =
    data || { columnsHead: {}, rowsData: [] };
  const [filterState, updateFilterState] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const [sortState, updateSortState] = useState([]);
  useEffect(() => {
    fetchTableData({
      onSuccess: (data) => {
        updateData(data);
      },
      onFinally: () => {
        setLoading(false);
      },
      onFailure: (err) => {
        console.log(err);
      },
    });
  }, []);


  // const rowsData = useMemo(() => {
  //   return populateRowData(rowsDataResponse);
  // }, [rowsDataResponse]);

  const columnsHead = useMemo(() => {
    return populateColumnHead(columnsHeadResponse);
  }, [columnsHeadResponse]);


  const filterCall = () => {
    setLoading(true);

    const filterReqobj = filterState ? populateReqFilter(
      filterState,
      columnsHead["columnsIdNameMap"],
      columnsHead.columnsDetails
    ) : null;
    const sortReqObj = sortState.length > 0 ? sortState: null;

    fetchFilterData({
      body:{
        ...(filterReqobj && {filter: filterReqobj}),
        ...(sortReqObj && {sorts: sortReqObj}),
        
      },
      onSuccess: (data) => {
        updateData({
          columnsHead: columnsHeadResponse,
          rowsData: data.rowsData,
        });
      },
      onFinally: () => {
        setLoading(false);
      },
      onFailure: (err) => {
        console.log(err);
      },
    });
  };

  
  return (
    <div>
      {isLoading && <Loader />}
      {!!(columnsHead.columnsOrder.length > 0) && (
        <>
          
            
          
          <Suspense
            fallback={
              <Box
                sx={{
                  m: 10,
                }}
              >
                Loading Filter...{" "}
              </Box>
            }
          >
            <SortContainer
            columnsHead={columnsHead}  sortState={sortState} updateSortState={updateSortState} 
            filterCall={filterCall}
            />
            <FilterContainer
              columnsHead={columnsHead}
              filterCall={filterCall}
              filterState={filterState}
              updateFilterState={updateFilterState}
              updateData={updateData}
            />
          </Suspense>
          
        </>
      )}
      <Suspense
        fallback={
          <Box
            sx={{
              m: 10,
            }}
          >
            Loading Table...{" "}
          </Box>
        }
      >
        {!!columnsHead.columnsOrder.length && (
          <Box
            sx={{
              opacity: isLoading ? 0.2 : 1,
            }}
          >
            <TableContainer
              rowsList={rowsDataResponse}
              columnsHead={columnsHead}
            />
          </Box>
        )}
      </Suspense>
    </div>
  );
}

export default App;
