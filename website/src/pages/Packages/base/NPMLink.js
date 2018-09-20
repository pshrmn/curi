import React from "react";

export default function NPMLink({ name }) {
  return (
    <a href={`https://npmjs.com/package/@curi/${name}`}>
      <img
        style={{ height: 16, marginRight: 5 }}
        src="/static/img/npm-logo.png"
        alt="NPM logo"
      />NPM Package
    </a>
  );
}
