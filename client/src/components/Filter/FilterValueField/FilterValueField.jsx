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
      break;
    case "multi_select":
    case "status":
      let opt = [...options];

      console.log(opt, value);
      return (
        <Autocomplete
          sx={{
            width: 200,
          }}
          // multiple
          options={opt}
          onChange={onChange}
          value={value.length > 0 ? value : opt[0]}
          // getOptionLabel={(option) => option.name}
          // getOptionSelected={(option, value) => option.name === value.name}
          // isOptionEqualToValue={(option, value) => option.name === value.name}
          disableClearable
          renderInput={(params) => <TextField {...params} />}
        />
      );

    default:
      return (
        <TextField
          onChange={onChange}
          value={value}
          sx={{
            width: 200,
          }}
        />
      );
      break;
  }
};
export default FilterValueFiled;
