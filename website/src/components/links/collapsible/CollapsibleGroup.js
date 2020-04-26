import React from "react";

import { Up, Down } from "../../svg";

`
  ul {
    margin-left: 10px;
  }
`;

export default function CollapsibleGroup(props) {
  let [collapsed, setCollapsed] = React.useState(props.initial || false);

  let { title, children } = props;
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
}
