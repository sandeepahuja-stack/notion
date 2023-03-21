import { memo, useEffect } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import FilterGroup from "components/FilterGroup";
import { Button } from "@mui/material";
import getPropertyDetail from "helper/filter/getPropertyId";
import { filterField } from "helper/filter";
import useModal from "hooks/useModal";

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

function FilterContainer(props) {
  const { columnsHead, filterCall, filterState, updateFilterState } = props;

  const { handleClose, open, handleOpen } = useModal();
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

  const applyFilter = () => {

    filterCall();
    handleClose();
  };

  if (!filterState) return;
  return (
    <>
      <Button onClick={handleOpen}>Filter</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "600px",
              overflow: "auto",
            }}
          >
            <FilterGroup
              updateFilterGroup={updateFilterState}
              data={filterState}
              columnInfo={columnsHead}
            />
            {filterState.filters.length === 0 && (
              <Button
                onClick={() => {
                  addFirstDefaultFilter();
                }}
              >
                Add Filter
              </Button>
            )}
          </Box>
          <Box textAlign="right">
            <Button onClick={applyFilter} color="primary" variant="contained">
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default memo(FilterContainer);
