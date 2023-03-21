import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { populateColumnHead } from "helper";
import useModal from "hooks/useModal";
import Loader from "components/Loader";

const FilterContainer = lazy(() => import("components/FilterContainer"));

const TableContainer = lazy(() => import("components/TableContainer"));

function App() {
  const [data, updateData] = useState(null);
  const { columnsHead: columnsHeadResponse, rowsData: rowsDataResponse } =
    data || { columnsHead: {}, rowsData: [] };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((payload) => {
        setLoading(false);
        updateData(payload);
      })
      .finally(() => {
        setLoading(false);
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

  const { handleClose, open, handleOpen } = useModal();
  if (isLoading) return <Loader />;
  return (
    <div>
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
          <TableContainer
            rowsList={rowsDataResponse}
            columnsHead={columnsHead}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
