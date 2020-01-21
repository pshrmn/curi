import React from "react";

let Method = ({ response }) => (
  <div>Please do not contact us by {response.params.method}</div>
);

export default Method;
