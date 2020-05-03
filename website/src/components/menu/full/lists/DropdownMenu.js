import React from "react";

let DropdownMenu = ({ children, ...rest }) => {
  return (
    <menu {...rest} className="my-0 mx-5">
      {children}
    </menu>
  );
};

export default DropdownMenu;
