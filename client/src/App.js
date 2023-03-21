import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { populateColumnHead } from "helper";
import useModal from "hooks/useModal";
import Loader from "components/Loader";
import fetchTableData from "services/fetchTableData";
import fetchFilterData from "services/fetchFilterData";

const FilterContainer = lazy(() => import("components/FilterContainer"));

const TableContainer = lazy(() => import("components/TableContainer"));

function App() {
  const [data, updateData] = useState(null);
  const { columnsHead: columnsHeadResponse, rowsData: rowsDataResponse } =
    data || { columnsHead: {}, rowsData: [] };
  const [filterState, updateFilterState] = useState(null);

  const [isLoading, setLoading] = useState(true);
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


  const filter = (body) => {
    setLoading(true);
    fetchFilterData({
      body,
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
  const { handleClose, open, handleOpen } = useModal();

  return (
    <div>
      {isLoading && <Loader />}
      {!!(columnsHead.columnsOrder.length > 0) && (
        <>
          <Box textAlign="right" width="100%">
            <Button onClick={handleOpen}>Filter</Button>
          </Box>
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
            <FilterContainer
              handleClose={handleClose}
              open={open}
              columnsHead={columnsHead}
              filter={filter}
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
