import React from "react";

export default function Root({ children, ...rest }) {
  return (
    <div
      {...rest}
      className="font-serif text-small-screen md:text-regular-screen font-light m-0 box-border"
    >
      {children}
    </div>
  );
}
