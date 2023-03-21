import { filterField as filterFieldMap } from ".";

const getOperators = ({ property, col }) => {
  
  const type = col[property]?.type;
  const operatorsList = Object.keys(filterFieldMap[type]);
  

  return {
    defaultOperator: operatorsList[0],
    operatorsList: operatorsList,
    filterField: type
  };
};

export default getOperators;