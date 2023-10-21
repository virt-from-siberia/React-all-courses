import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./app/App";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import { StoreProvider } from "app/providers/StoreProvider";

render(
  <BrowserRouter>
    <StoreProvider>
      <ChakraProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
