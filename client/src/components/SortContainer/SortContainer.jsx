import { memo, useEffect } from "react";
import Box from "@mui/material/Box";
import ModalContainer from "components/common/ModalContainer/style";
import Modal from "@mui/material/Modal";

import { Button } from "@mui/material";

import useModal from "hooks/useModal";

import Sort from "./Sort";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "700px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function SortContainer(props) {
  const { columnsHead, sortState, updateSortState, filterCall } = props;
  const { columnsOrder = [] } = columnsHead;
  const { handleClose, open, handleOpen } = useModal();

  const addFirstDefaultSort = () => {
    if (columnsOrder.length > 0) {
      updateSortState([
        {
          property: columnsOrder[0],
          direction: "ascending",
        },
      ]);
    }
  };
  useEffect(() => {
    addFirstDefaultSort();
  }, [columnsOrder]);

  const addSort = () => {
    const tempSort = [...sortState];
    tempSort.push({
      property: columnsOrder[0],
      direction: "ascending",
    });
    updateSortState(tempSort);
  };
  const applySort=()=>{
    handleClose();
    filterCall();
    
  }
  return (
    <>
      <Button onClick={handleOpen} sx={{
        my: '10px'
      }} >Sort</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          {(sortState||[]).map(({ property, direction }, i) => {
            return (
              <Box as="div" m="10px" key={`${property}_${i}_${direction}`}>
                <Sort
                  property={property}
                  direction={direction}
                  updateSortState={updateSortState}
                  sortState={sortState}
                  index={i}
                  columnsOrder={columnsOrder}
                />
              </Box>
            );
          })}

          {sortState.length !== columnsOrder.length && (
            <Button onClick={addSort}>Add Sort</Button>
          )}

          <Box textAlign='right'><Button onClick={applySort} >Apply Sort</Button></Box>
          </ModalContainer>
        
      </Modal>
    </>
  );
}
export default memo(SortContainer);
