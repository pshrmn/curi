import React from 'react';

const CodeSandboxDemo = ({ src }) => (
  <iframe
    src={src}
    width='100%'
    height='600px'
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
)

export default CodeSandboxDemo;
