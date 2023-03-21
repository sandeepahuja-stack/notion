import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";

const FilterValueFiled = (props) => {
  const { filterField, options = [], onChange, value = "" } = props;

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
          onChange={onChange}
          value={value}
          type={filterField === 'date' ? 'date' : 'text'}
          sx={{
            width: 200,
          }}
        />
      );
  }
};
export default FilterValueFiled;
