import React from "react";

let GitHubLink = ({ name, dir }) => {
  return (
    <a
      href={`https://github.com/pshrmn/curi/tree/master/packages/${
        dir ? dir + "/" : ""
      }${name}`}
      className="m-0 mr-1 mb-1"
    >
      <img
        src="/static/img/github-logo.png"
        alt="GitHub logo"
        className="inline-block mr-2 h-4"
      />
      GitHub Repo
    </a>
  );
};

export default GitHubLink;
