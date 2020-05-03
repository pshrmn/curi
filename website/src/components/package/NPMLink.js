import React from "react";

let NPMLink = ({ name }) => {
  return (
    <a
      href={`https://npmjs.com/package/@curi/${name}`}
      className="m-0 mr-1 mb-1"
    >
      <img
        src="/static/img/npm-logo.png"
        alt="NPM logo"
        className="inline-block mr-2 h-4"
      />
      NPM Package
    </a>
  );
};

export default NPMLink;
