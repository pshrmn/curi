import React from "react";

export default function({ response }) {
  if (!response) {
    return null;
  }
  const { Main, Menu } = response.body;
  return (
    <div>
      {Menu ? <Menu /> : null}
      {Main ? <Main params={response.params} /> : null}
    </div>
  );
}
