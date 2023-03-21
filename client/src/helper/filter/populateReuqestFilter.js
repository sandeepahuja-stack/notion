const populateReqFilter = (reqFilters, idNameMap, filterDetail) => {
  let obj = {};
  const keys = Object.keys(reqFilters);
  if (keys.includes("filters")) {
    const operator = reqFilters["operator"];

    obj[operator] = reqFilters["filters"].map((reqFilter) => {
      return populateReqFilter(reqFilter, idNameMap, filterDetail);
    });
  } else if (keys.includes("filter")) {
    const {
      property,
      filter: { operator, value: { type = null, value = null } = {} },
    } = reqFilters;

    
    const prop = idNameMap[property];

    let tempType = type;
    if(type === null) {
      tempType = filterDetail[prop]['type']
    }

    let tempVal = value === null ? "" : value;
    if (tempType === "checkbox") {
      tempVal = tempVal === "checked";
    }

    obj = {
      ...obj,
      property: prop,
      [tempType]: {
        [operator]: tempVal,
      },
    };
  }
  return obj;
};

export default populateReqFilter;
