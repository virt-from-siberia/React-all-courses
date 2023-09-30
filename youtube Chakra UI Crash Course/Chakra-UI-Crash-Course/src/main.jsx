import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const fonts = {
  body: "system-ui, sans-serif",
  heading: "system-ui, sans-serif",
  mono: "Menlo, Monaco, Lucida Console, monospace",
};

const theme = extendTheme({ colors, fonts });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
