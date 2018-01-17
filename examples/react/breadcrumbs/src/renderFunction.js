import React from "react";

function render(response, action, router) {
  if (!response) {
    return null;
  }
  const { body: Body, params, data } = response;

  return <Body response={response} router={router} />;
}

export default render;
