import MaterialReactTable from "material-react-table";
const Table = (props) => {
  const { columns, data } = props;
  return (
    <MaterialReactTable
      enableColumnDragging
      enableColumnOrdering
      enableColumnResizing
      columns={columns}
      data={data}
      enableTopToolbar={false}
      enableSorting={false}
      enableColumnActions={false}
      enableBottomToolbar={false}
    />
  );
};
export default Table;
