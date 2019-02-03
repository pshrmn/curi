import React from "react";

const Method = ({ response }) => (
  <div>Please do not contact us by {response.params.method}</div>
);

export default Method;
