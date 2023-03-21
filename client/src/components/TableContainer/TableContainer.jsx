import { memo, useEffect, useState } from "react";
import Column from "../Column";
import { Grid } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Row from "../Row";


const TableContainer = (props) => {
  const {
    rowsList,
    columnsHead: { columnsOrder = [], columnsDetails = {} },
  } = props;
  const [colOrder, updateColumnOrder] = useState(columnsOrder);

  useEffect(() => {
    updateColumnOrder(columnsOrder);
  }, [columnsOrder]);

  const onDragEnd = (result) => {
      const { destination, source, draggableId } = result;
      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;
    
        

      const newColumnOrder = [...colOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      updateColumnOrder(newColumnOrder);
    }
  return (
    <>
     <div style={{
            height: '60px'
        }}>
    <DragDropContext
      // onDragStart
      // onDragUpdate
      onDragEnd={onDragEnd}
    >
       
      <Droppable droppableId={"id"} key={"id"} direction="horizontal">
        {(provided) => {
            if (typeof provided?.draggableProps?.onTransitionEnd === 'function') {
                queueMicrotask(() =>
                    provided.draggableProps.onTransitionEnd?.({
                        propertyName: 'transform',
                    })
                );
            }
            return (
          <div ref={provided.innerRef} {...provided.droppableProps} >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              display="flex"
              rowGap={2}
            >
              {colOrder.map((column, index) => {
                const columnDetail = columnsDetails[column];
                const { id, name } = columnDetail;
                return (
                  <Column
                    columnDetail={columnDetail}
                    rowsList={rowsList}
                    id={`${name}_${id}_${index}`}
                    key={`${name}_${id}_${index}`}
                    index={index}
                  />
                );
              })}

              {provided.placeholder}
            </Grid>
          </div>
        )}}
      </Droppable>
    
    </DragDropContext>
    </div>
    <Row colOrder={colOrder} rowsList={rowsList} />
    </>
  );
};
export default memo(TableContainer);
