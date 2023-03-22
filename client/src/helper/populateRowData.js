import { getFullDate } from "helper";

function populateRowData(rowsData, columnsOrder) {
  const len = rowsData.length;
  if (!len)
    return {
      rowsList: {},
      rowsOrder: [],
    };
  let rowsList = {};
  let rowsDataToShow = [];
  const rowsOrder = rowsData.map((rowData) => {
    const { id, properties } = rowData;

    const rowDataToShow = {};
    columnsOrder.forEach((col) => {
      const row = properties[col];
      rowDataToShow[col] = populateRowCellData(row);
    });
    rowsDataToShow.push(rowDataToShow);
    rowsList[id] = properties;
    return id;
  });

  return {
    rowsList,
    // rowsOrder if we have to drag and drop rows
    rowsOrder,
    rowsDataToShow,
  };
}

export default populateRowData;

const populateRowCellData = (rowData) => {
  const { type } = rowData;
  switch (type) {
    case "select":
      return rowData?.select?.name || "";
    case "date":
      return getFullDate(rowData?.date?.start) || "";
    case "multi_select":
      const col = (rowData[type] || []).reduce((acc, item, index) => {
        return `${acc} ${item.name}${
          index !== rowData[type].length - 1 ? ", " : ""
        } `;
      }, "");
      return col || "";

    case "created_time":
      return getFullDate(rowData?.created_time, true) || "";

    case "status":
      return rowData?.status?.name || "";

    case "title":
      return rowData?.title?.[0]?.plain_text || "";

    case "rich_text":
      return rowData?.rich_text?.[0]?.plain_text || "";

    case "number":
      return rowData?.number || "";

    case "checkbox":
      return rowData?.checkbox ? "completed" : "uncompleted";

    default:
      return "";
  }
};
