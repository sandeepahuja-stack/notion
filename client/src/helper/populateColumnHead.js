function populateColumnHead(columnsHead = {}) {
  
  let columnsIdNameMap = {};
  const columnsOrder = Object.keys(columnsHead);
  let colsToShow = [];

  // accessorKey: 'firstName',
  // header: 'First Name',
  columnsOrder.forEach((name)=>{
    let id = columnsHead[name]['id']
    columnsIdNameMap[id] = name;
    colsToShow.push({
      accessorKey: name,
      header: name,
    })
  })
  return {
    // if we have to drag and drop columns
    columnsOrder,
    columnsDetails: columnsHead || {},
    columnsIdNameMap,
    colsToShow
  };
}


export default populateColumnHead;
