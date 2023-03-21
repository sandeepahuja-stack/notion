function populateColumnHead(columnsHead = {}) {
  
  let columnsIdNameMap = {};
  const columnsOrder = Object.keys(columnsHead);
  columnsOrder.forEach((name)=>{
    let id = columnsHead[name]['id']
    columnsIdNameMap[id] = name;
  })
  return {
    // if we have to drag and drop columns
    columnsOrder,
    columnsDetails: columnsHead || {},
    columnsIdNameMap
  };
}


export default populateColumnHead;
