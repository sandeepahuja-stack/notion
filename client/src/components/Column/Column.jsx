import { memo } from "react";
import { Box, Checkbox, Grid } from "@mui/material";
import ColumnCell from "../ColumnCell";
import { Draggable } from "react-beautiful-dnd";


const Column = (props) => {
  const { columnDetail, rowsList, index, id } = props;
  const { name } = columnDetail;

  return (
    <Draggable draggableId={name} index={index} key={name}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            sx={{
              minWidth: 100,
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              
            }}
          >
            <ColumnCell title={name} isHeading />
            {/* {rowsList.map((item) => {
              const { properties, id } = item;
              const rowData = properties[name];
              return <RowCell rowData={rowData} key={id} />;
            })} */}
          </Box>
        </div>
      )}
    </Draggable>
  );
};
export default memo(Column);
