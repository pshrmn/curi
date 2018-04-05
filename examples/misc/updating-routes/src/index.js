import React from "react";
import ReactDOM from "react-dom";
import curi from "@curi/core";
import Browser from "@hickory/browser";

import App from "./components/App";
import { baseRoutes } from "./routes";

const history = Browser();
const router = curi(history, baseRoutes);

ReactDOM.render(<App router={router} />, document.getElementById("root"));
