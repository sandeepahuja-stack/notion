import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const FilterValueFiled = (props) => {
  const { filterField, options = [], onChange, value = "" } = props;
  const [query, setQuery] = useState(value);
  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };
  switch (filterField) {
    case "select":
    case "checkbox":
      return (
        <Select
          sx={{
            width: 200,
          }}
          value={value}
          onChange={onChange}
        >
          {options.map((name) => {
            return (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      );
    case "multi_select":
    case "status":
      let opt = [...options];

      return (
        <Autocomplete
          sx={{
            width: 200,
          }}
          size="small"
          // unable to find multi select filter api doc
          // multiple
          options={opt}
          onChange={onChange}
          value={value.length > 0 ? value : opt[0]}
          disableClearable
          renderInput={(params) => <TextField {...params} />}
        />
      );

    default:
      return (
        <TextField
          onChange={onQueryChange}
          type={filterField}
          onBlur={onChange}
          value={query}
          sx={{
            width: 200,
          }}
        />
      );
  }
};
export default FilterValueFiled;
