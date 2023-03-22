import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { populateColumnHead, populateRowData } from "helper";
import Loader from "components/Loader";
import fetchTableData from "services/fetchTableData";
import fetchFilterData from "services/fetchFilterData";

import populateReqFilter from "helper/filter/populateReuqestFilter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "components/Layout/Layout";
import ErrorBoundary from "components/ErrorBoundary";
import Home from "components/pages/Home";

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          height: "30px",
          fontSize: "12px",
          padding: "0",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: "30px",
          fontSize: "12px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: "30px",
          fontSize: "12px",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          height: "30px",
          fontSize: "12px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "30px",
          fontSize: "12px",
          padding: "0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "30px",
          fontSize: "12px",
        },
      },
    },
  },
});
const FilterContainer = lazy(() => import("components/FilterContainer"));
const SortContainer = lazy(() => import("components/SortContainer"));
const Table = lazy(() => import("components/common/Table"));

// const TableContainer = lazy(() => import("components/TableContainer"));

function App() {
  // const [data, updateData] = useState(null);
  // const { columnsHead: columnsHeadResponse, rowsData: rowsDataResponse } =
  //   data || { columnsHead: {}, rowsData: [] };
  // const [filterState, updateFilterState] = useState(null);

  // const [isLoading, setLoading] = useState(true);

  // const [sortState, updateSortState] = useState([]);
  // useEffect(() => {
  //   fetchTableData({
  //     onSuccess: (data) => {
  //       updateData(data);
  //     },
  //     onFinally: () => {
  //       setLoading(false);
  //     },
  //     onFailure: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }, []);

  // const columnsHead = useMemo(() => {
  //   return populateColumnHead(columnsHeadResponse);
  // }, [columnsHeadResponse]);

  // const rowsData = useMemo(() => {
  //   return populateRowData(rowsDataResponse, columnsHead.columnsOrder);
  // }, [rowsDataResponse, columnsHead]);
  // const filterCall = () => {
  //   setLoading(true);

  //   const filterReqobj = filterState
  //     ? populateReqFilter(
  //         filterState,
  //         columnsHead["columnsIdNameMap"],
  //         columnsHead.columnsDetails
  //       )
  //     : null;
  //   const sortReqObj = sortState.length > 0 ? sortState : null;

  //   fetchFilterData({
  //     body: {
  //       ...(filterReqobj && { filter: filterReqobj }),
  //       ...(sortReqObj && { sorts: sortReqObj }),
  //     },
  //     onSuccess: (data) => {
  //       updateData({
  //         columnsHead: columnsHeadResponse,
  //         rowsData: data.rowsData,
  //       });
  //     },
  //     onFinally: () => {
  //       setLoading(false);
  //     },
  //     onFailure: (err) => {
  //       console.log(err);
  //     },
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
