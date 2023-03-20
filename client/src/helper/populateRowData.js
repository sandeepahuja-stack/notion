function populateRowData(rowsData) {
  const len = rowsData.length;
  if (!!len)
    return {
      rowsList: {},
      rowsOrder: [],
    };
  let rowsList = {};
  const rowsOrder = rowsData.map((rowData) => {
    const { id, properties } = rowData;
    rowsList[id] = properties;
    return id;
  });

  return {
    rowsList,
    // rowsOrder if we have to drag and drop rows 
    rowsOrder,
  };
}

export default populateRowData;