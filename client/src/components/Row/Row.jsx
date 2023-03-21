import React, { memo } from "react";
import RowCell from "../RowCell";
import { Divider, Grid } from "@mui/material";

const Row = (props) => {
  const { colOrder, rowsList } = props;
  return (
    <>
      {rowsList.map((item) => {
        const { properties, id } = item;
        return (
          <React.Fragment key={id}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              display="flex"
              rowGap={2}
            >
              {colOrder.map((colName) => {
                const rowData = properties[colName];
                return <RowCell rowData={rowData} key={colName} />;
              })}
            </Grid>
            <Divider />
          </React.Fragment>
        );
      })}
    </>
  );
};
export default memo(Row);
