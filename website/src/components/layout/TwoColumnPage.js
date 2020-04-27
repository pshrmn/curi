import React from "react";

let TwoColumnPage = ({ base, menu }) => {
  return (
    <div className="relative md:flex md:flex-row md:flex-no-wrap md:max-w-full">
      <div
        className="hidden md:block md:w-64 md:bg-gray-100 md:fixed md:bottom-0 md:overflow-auto md:flex-grow-0 md:flex-shrink-0 md:p-6 md:mr-6"
        style={{ top: "2rem" }}
      >
        {menu}
      </div>
      <article className="md:ml-64 md:pl-8">{base}</article>
    </div>
  );
};

export default TwoColumnPage;
