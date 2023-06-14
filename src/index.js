// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import client from "./Client";
import { ApolloProvider } from "@apollo/client";

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
