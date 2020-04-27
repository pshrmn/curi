import React from "react";

import { Up, Down } from "../../svg";

let CollapsibleGroup = ({ initial, title, children }) => {
  let [collapsed, setCollapsed] = React.useState(initial || false);

  return (
    <ul>
      <li className="mb-3">
        <button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          title="Toggle group visibility"
          className="cursor-pointer text-left w-full bg-transparent border-0 p-0 text-purple"
        >
          {collapsed ? <Down /> : <Up />}
          {title}
        </button>
        {collapsed ? null : children}
      </li>
    </ul>
  );
};

export default CollapsibleGroup;
