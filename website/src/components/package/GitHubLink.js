import React from "react";

export default function GitHubLink({ name, dir }) {
  return (
    <a
      href={`https://github.com/pshrmn/curi/tree/master/packages/${
        dir ? dir + "/" : ""
      }${name}`}
      className="m-0 mr-1 mb-1"
    >
      <img
        style={{ height: 16, marginRight: 5 }}
        src="/static/img/github-logo.png"
        alt="GitHub logo"
        className="inline-block"
      />
      GitHub Repo
    </a>
  );
}
