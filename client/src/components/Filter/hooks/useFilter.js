import { useEffect, useState } from "react";
import { filterField } from "../../../helper/filter";

const useFilter = (props) => {
  const { columnInfo, updateFilter, data } = props;

  const { columnsOrder, columnsDetails, columnsIdNameMap } = columnInfo;
  // already present filter data
  const {
    property,
    filter: { operator, value: { value: filteredValue = "" } = {} },
  } = data;

  // selected property = column title
  // property selected column id
  // ex: name, company, skills and many more
  const [selectedProperty, setProperty] = useState(columnsIdNameMap[property]);

  //    select | muti_select | checkbox
  const filterType = columnsDetails[selectedProperty].type;
  const [type, setType] = useState(filterType);

  // equals, doesnot equal and many more
  const [selectedOperator, setOperator] = useState(operator);
  const [value, setValue] = useState(filteredValue);

  const handleChange = (event, newValue) => {
    setProperty(newValue || columnsIdNameMap[property]);
    const type = columnsDetails[newValue || columnsIdNameMap[property]]["type"];
    setType(type);

    setOperator(Object.entries(filterField[type])[0][0]);
  };

  const handleOperator = (e) => {
    setOperator(e.target.value);
  };
  useEffect(() => {
    if (type && value && selectedOperator && selectedProperty) {
      let obj = {
        property: columnsDetails[selectedProperty].id,
        filter: {
          value: {
            type,
            value,
          },
          operator: selectedOperator,
        },
      };
      updateFilter(obj);
    }
  }, [type, value, selectedOperator, selectedProperty]);

  return {
    handleChange,
    setValue,
    type,
    selectedOperator,
    selectedProperty,
    value,
    columnsOrder,
    handleOperator,
  };
};

export default useFilter;
