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
  const [value, setValue] = useState(() => {
    return filteredValue;
  });

  const { operatorsList, defaultOperator, filterField } = useMemo(() => {
    return getOperators({
      property: selectedProperty,
      col: columnsDetails,
    });
  }, [selectedProperty, columnsDetails]);

  const handlePropChange = (event, property) => {
    setProperty(property);
    let { defaultOperator } = getOperators({
      property,
      col: columnsDetails,
    });
    setOperator(defaultOperator);
    setValue(null);

    handleFieldsChange({
      value: null,
      property,
      operator: defaultOperator,
    });
  };

  const handleOperator = (e) => {
    setOperator(e.target.value);
    handleFieldsChange({
      value,
      property: selectedProperty,
      operator: e.target.value,
    });
  };

  const filterFieldOnChange = (e, val = "") => {
    let tempVal = e.target.value;
    if (filterField === "multi_select" || filterField === "status") {
      tempVal = val;
    }
    setValue(tempVal);

    handleFieldsChange({
      value: tempVal,
      property: selectedProperty,
      operator: selectedOperator,
    });
  };
  const { filterFieldOptions } = useMemo(() => {
    let options =
      getPropertyDetail(selectedProperty, columnsDetails)?.[filterField]?.[
        "options"
      ] || [];
    if (filterField === "checkbox") {
      options = [{ name: "checked" }, { name: "unchecked" }];
    }
    options = options.map((item) => {
      return item.name;
    });
    return {
      filterFieldOptions: options || [],
    };
  }, [selectedProperty, filterField, columnsDetails]);

  const handleFieldsChange = ({ value, operator, property }) => {
    if (value || operator || property) {
      const propDetail = getPropertyDetail(property, columnsDetails);
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
            value: filterFieldMap[filterField][operator] === "true" || val,
          },
          operator: operator,
        },
      };
      updateFilter(obj);
    }
  };
  return {
    columnsOrder,
    defaultOperator,
    filterField,
    filterFieldOptions,
    filterFieldOnChange,
    filterFieldValue: value || "",
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
