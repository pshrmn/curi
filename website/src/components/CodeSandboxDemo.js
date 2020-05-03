import React from "react";

let CodeSandboxDemo = ({ id, view = "split", help = true, name }) => {
  let helpText = null;
  if (help) {
    helpText = (
      <p className="m-0 text-center italic">
        Use the three buttons at the top of the Sandbox to toggle view modes.
        Clicking the menu button in the top left corner opens a menu to switch
        between files.
      </p>
    );
  }
  return (
    <figure className="md:w-4/5 md:my-0 md:mx-auto">
      <iframe
        title={name}
        src={`https://codesandbox.io/embed/${id}?view=${view}`}
        width="100%"
        height="600px"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        tabIndex={-1}
      />
      {helpText}
    </figure>
  );
};

export default CodeSandboxDemo;
