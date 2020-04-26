import React from "react";

export default function NPMLink({ name }) {
  return (
    <a
      href={`https://npmjs.com/package/@curi/${name}`}
      className="m-0 mr-1 mb-1"
    >
      <img
        style={{ height: 16, marginRight: 5 }}
        src="/static/img/npm-logo.png"
        alt="NPM logo"
        className="inline-block"
      />
      NPM Package
    </a>
  );
}
