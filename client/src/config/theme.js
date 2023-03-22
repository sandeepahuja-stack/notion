import { createTheme } from "@mui/material/styles";
const getTheme = () => {
  return createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            height: "30px",
            fontSize: "12px",
            padding: "0",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            height: "30px",
            fontSize: "12px",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            height: "30px",
            fontSize: "12px",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            height: "30px",
            fontSize: "12px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: "30px",
            fontSize: "12px",
            padding: "0",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            height: "30px",
            fontSize: "12px",
          },
        },
      },
    },
  });
};
export default getTheme;
