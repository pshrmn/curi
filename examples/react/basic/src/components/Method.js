import React from "react";

const ContactMethod = ({ response }) => (
  <div>Please do not contact us by {response.params.method}</div>
);

export default ContactMethod;
