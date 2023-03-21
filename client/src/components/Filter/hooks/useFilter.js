import { useEffect, useMemo, useState } from "react";
import { filterField as filterFieldMap } from "helper/filter";
import getOperators from "helper/filter/getOperators";
import getPropertyDetail from "helper/filter/getPropertyId";

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

  // equals, doesnot equal and many more
  const [selectedOperator, setOperator] = useState(operator);
  const [value, setValue] = useState(()=>{

    return filteredValue;
  });

  const { operatorsList, defaultOperator, filterField } = useMemo(() => {
    return getOperators({
      property: selectedProperty,
      col: columnsDetails,
    });
  }, [selectedProperty, columnsDetails]);

  useEffect(() => {
    if (value || selectedOperator || selectedProperty) {
      const propDetail = getPropertyDetail(selectedProperty, columnsDetails);
      const { id, type } = propDetail;
      let val = value;

      if (type === "number") {
        val = parseFloat(val);
      }
      

      let obj = {
        property: id,
        filter: {
          value: {
            type,
            value:
              filterFieldMap[filterField][selectedOperator] === "true" || val,
          },
          operator: selectedOperator,
        },
      };
      updateFilter(obj);
    }
  }, [value, selectedOperator, selectedProperty, filterField, columnsDetails, updateFilter]);

  const handlePropChange = (event, property) => {
    setProperty(property);
    let { defaultOperator } = getOperators({
      property,
      col: columnsDetails,
    });
    setOperator(defaultOperator);
    setValue(null);
  };

  const handleOperator = (e) => {
    setOperator(e.target.value);
  };

  const filterFieldOnChange = (e, val = "") => {
    if (filterField === "select" || filterField === "checkbox") {
      setValue(e.target.value);
      return;
    }
    if (filterField === "multi_select" || filterField === "status") {
      setValue(val);
      return;
    }
    setValue(e.target.value);
  };
  const { filterFieldOptions } = useMemo(() => {
    let options =
      getPropertyDetail(selectedProperty, columnsDetails)?.[filterField]?.[
        "options"
      ] || [];
    if (filterField === "checkbox") {
      options = [{ name: "checked" }, { name: "unchecked" }];
    }
    options = options.map((item)=>{
      return item.name
    });
    return {
      filterFieldOptions: options || [],
    };
  }, [selectedProperty, filterField, columnsDetails]);
  
  return {
    columnsOrder,
    defaultOperator,
    filterField,
    filterFieldOptions,
    filterFieldOnChange,
    filterFieldValue: value|| "",
    handlePropChange,
    handleOperator,
    operatorsList,
    showFilterFieldValue:
      filterFieldMap[filterField][selectedOperator] !== "true",
    selectedOperator,
    selectedProperty,
  };
};

export default useFilter;
