import React from "react";

const Detail = ({ response }) => (
  <div>
    <div
      style={{
        width: "80%",
        height: "25%",
        minHeight: 200,
        background: response.params.color || "#666"
      }}
    />
    <p>Previewing paint color {response.params.color}</p>
  </div>
);

export default Detail;
