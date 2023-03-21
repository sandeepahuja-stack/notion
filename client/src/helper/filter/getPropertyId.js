const getPropertyDetail = (colName, columnDetails) => {
  const colDetail = columnDetails[colName];
  const { id, name, type } = colDetail;
  return {
    id,
    name,
    type,
    [type]: colDetail[type],
  };
};

export default getPropertyDetail;
