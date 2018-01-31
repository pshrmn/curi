import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

export default ({ router }) => {
  ReactDOM.render(<App router={router} />, document.getElementById("root"));
};
