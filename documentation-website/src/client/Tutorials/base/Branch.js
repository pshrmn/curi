import React from 'react';
import { InlineJS as IJS, PrismBlock } from '../../components/PrismBlocks';

export const TutorialBranch = ({ name }) => (
  <div className="tutorial-branch">
    <p>
      If you are following along using the{' '}
      <a href="https://github.com/pshrmn/curi-tutorial">tutorial repo</a>,
      please checkout the <IJS>{name}</IJS> branch.
    </p>
    <PrismBlock lang="bash">{`git checkout ${name}`}</PrismBlock>
  </div>
);

export const TutorialBranches = ({ names }) => (
  <div className="tutorial-branch">
    <p>
      If you are following along using the{' '}
      <a href="https://github.com/pshrmn/curi-tutorial">tutorial repo</a>,
      please checkout the appropriate branch for your rendering framework.
    </p>
    <PrismBlock lang="bash">
      {names.map(n => `git checkout ${n}`).join('\n')}
    </PrismBlock>
  </div>
);

export const CompleteBranch = ({ name }) => (
  <div className="tutorial-branch">
    <p>
      You can view the completed source code for this tutorial{' '}
      <a href={`https://github.com/pshrmn/curi-tutorial/tree/${name}`}>
        on GitHub
      </a>.
    </p>
  </div>
);

export const Outline = ({ children }) => (
  <div className="tutorial-outline">
    <p>In this tutorial, we will be doing the following:</p>
    {children}
  </div>
);
