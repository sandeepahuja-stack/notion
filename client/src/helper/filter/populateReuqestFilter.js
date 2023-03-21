const populateReqFilter = (reqFilters, idNameMap) => {
  let obj = {};
  const keys = Object.keys(reqFilters);
  if (keys.includes("filters")) {
    const operator = reqFilters["operator"];

    obj[operator] = reqFilters["filters"].map((reqFilter) => {
      return populateReqFilter(reqFilter, idNameMap);
    });
  } else if (keys.includes("filter")) {
    const {
      property,
      filter: { operator, value: { type = "", value = null } = {} },
    } = reqFilters;

    const prop = idNameMap[property];
    let tempVal = value === null ? "" : value;
    if (type === "checkbox") {
      tempVal = tempVal === "checked";
    }

    obj = {
      ...obj,
      property: prop,
      [type]: {
        [operator]: tempVal,
      },
    };
  }
  return obj;
};

export default populateReqFilter;
