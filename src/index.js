// index.js (소문자로 변경)

import React from "react";
import { createRoot } from "react-dom/client"; // createRoot를 react-dom/client에서 가져옴
import { ApolloProvider } from "@apollo/client";

import App from "./App";
import client from "./Client";

const root = document.getElementById("root");
createRoot(root).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

