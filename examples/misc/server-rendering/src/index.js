import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import curi from "@curi/core";
import { CuriProvider } from "@curi/react";

import routes from "./routes";
import { responseHandler } from "./render";

const history = Browser();
const router = curi(history, routes);
const root = document.getElementById("root");

router.respond(responseHandler);
