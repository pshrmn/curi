import React from "react";

let Container = ({ hidden, children }) => {
  return (
    <div
      className={`${
        hidden ? "hidden" : "block"
      } absolute w-screen left-0 text-purple border-0 border-b-2 border-purple`}
    >
      <ul className="flex flex-row flex-no-wrap justify-start bg-light-blue list-none m-0 p-0">
        {children}
      </ul>
    </div>
  );
};

export default Container;
