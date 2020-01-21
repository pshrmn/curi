import React from "react";

let ContactMethod = ({ response }) => (
  <div>Please do not contact us by {response.params.method}</div>
);

export default ContactMethod;
