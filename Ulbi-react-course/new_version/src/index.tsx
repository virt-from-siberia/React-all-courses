import { render } from "react-dom";
import { BrowserRouter, Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./app/App";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { ErrorBoundary } from "app/providers/ErrorBoundary";

render(
  <ChakraProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
