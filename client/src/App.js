import { ThemeProvider } from "@mui/material/styles";
import Layout from "components/Layout/Layout";
import ErrorBoundary from "components/ErrorBoundary";
import Home from "components/pages/Home";
import getTheme from "config/theme";

function App() {
  const theme = getTheme();
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
