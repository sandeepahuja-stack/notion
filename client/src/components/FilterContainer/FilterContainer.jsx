import { memo, useEffect } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import FilterGroup from "components/FilterGroup";
import { Button } from "@mui/material";
import getPropertyDetail from "helper/filter/getPropertyId";
import { filterField } from "helper/filter";
import useModal from "hooks/useModal";
import ModalContainer from "components/common/ModalContainer/style";

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

  const handleGroupDelete = (index) => {
    const deepObj = JSON.parse(JSON.stringify(filterState));
    deepObj.filters.splice(index, 1);
    updateFilterState(deepObj);
  };

  if (!filterState) return;

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          m: "10px",
        }}
      >
        Filter
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
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
              handleGroupDelete={handleGroupDelete}
              isRoot
              nestedCount={0}
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
        </ModalContainer>
      </Modal>
    </>
  );
}
export default memo(FilterContainer);
