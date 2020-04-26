import React from "react";

export default function StyledMain({ children, ...rest }) {
  return (
    <main
      {...rest}
      className="w-screen max-w-full pt-3 px-3 pb-0 mb-10 md:pt-10 md:px-0 md:mb-0"
    >
      {children}
    </main>
  );
}
