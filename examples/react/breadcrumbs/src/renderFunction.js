import React from "react";

function render(response, navigation, router) {
  if (!response) {
    return null;
  }
  const { body: Body, params, data } = response;

  return <Body response={response} router={router} />;
}

export default render;
