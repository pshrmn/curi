import React from "react";

export default function GitHubLink({ name, dir }) {
  return (
    <a
      href={`https://github.com/pshrmn/curi/tree/master/packages/${
        dir ? dir + "/" : ""
      }${name}`}
    >
      <img
        style={{ height: 16, marginRight: 5 }}
        src="/static/img/github-logo.png"
        alt="GitHub logo"
      />GitHub Repo
    </a>
  );
}
