import { memo } from "react";
import ColumnCell from "../ColumnCell";

const RowCell = (props) => {
  const { rowData } = props;
  const { type } = rowData;
  if (type === "select") {
    return <ColumnCell title={rowData?.select?.name || ""} />;
  }
  if (type === "date") {
    return <ColumnCell title={rowData?.date?.start} />;
  }
  if (type === "multi_select") {
    const col = (rowData[type] || []).reduce((acc, item, index) => {
      return `${acc} ${item.name}${
        index != rowData[type].length - 1 ? ", " : ""
      } `;
    }, "");
    return <ColumnCell title={col} />;
  }
  if (type === "created_time") {
    return <ColumnCell title={rowData?.created_time} />;
  }
  if (type === "status") {
    return <ColumnCell title={rowData?.status?.name} />;
  }
  if (type === "title") {
    return <ColumnCell title={rowData?.title?.[0]?.plain_text} />;
  }

  if (type === "rich_text") {
    return <ColumnCell title={rowData?.rich_text?.[0]?.plain_text} />;
  }
  if (type === "number") {
    return <ColumnCell title={rowData?.number} />;
  }

  if (type === "checkbox") {
    return (
      <ColumnCell
        title={rowData?.checkbox ? "completed" : "uncompleted"}
      ></ColumnCell>
    );
  }

  return <ColumnCell title={""} />;
};

export default memo(RowCell)