import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { TutorialBranch, CompleteBranch } from './base/Branch';
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section } from '../components/Sections';

export default () => (
  <BaseTutorial>
    <h1>Part 2: Setting up Curi</h1>
    <p>Setup is never exciting, but a little bit of it is necessary.</p>
    <div>
      <p>In this tutorial, we will be doing the following:</p>
      <ul>
        <li>
          Initializing our project and installing the packages (from NPM) that
          are necessary to get started.
        </li>
        <li>
          Creating directories for our source and public files, as well as
          adding some empty files for future use.
        </li>
        <li>
          Setting up a simple Express server to serve our website contents.
        </li>
        <li>Setting up Babel/Webpack.</li>
      </ul>
    </div>
    <TutorialBranch name="02-setup" />
    <Section title="The Basics" id="basics">
      <p>
        In the terminal, navigate to the parent directory where you want to keep
        the code for your website and create a new directory for the website. We
        can then navigate into our new directory.
      </p>
      <PrismBlock lang="bash">
        {`# if you're using the tutorial repo, you should skip
# this because you'll be using the repo folder
mkdir curi-bookstore
cd curi-bookstore`}
      </PrismBlock>
      <p>
        Inside of the directory, run <IJS>npm init</IJS> to generate a{' '}
        <IJS>package.json</IJS> file. Then, we can install the most important
        package for Curi: <IJS>@curi/core</IJS>. We should also install{' '}
        <IJS>@hickory/browser</IJS>, which we'll cover later on.
      </p>
      <PrismBlock lang="bash">
        {`npm init
npm install @curi/core @hickory/browser`}
      </PrismBlock>
    </Section>
    <Section title="File Structure" id="structure">
      <p>
        We should also get some of the directories/files for our website setup.
        You can restructure your application however you want, but the approach
        used in this project can serve as a good starting point.
      </p>
      <PrismBlock lang="bash">
        {`mkdir src
touch src/index.js src/routes.js
mkdir -p public/js
touch public/index.html`}
      </PrismBlock>
      <p>
        The above commands will leave us with the following project structure:
      </p>
      <PrismBlock>
        {`curi-bookstore/
+- src/
|  +- index.js
|  +- routes.js
+- public/
|  +- index.html
|  +- js/
+- package.json`}
      </PrismBlock>
    </Section>
    <Section title="Building the Site" id="building">
      <p>
        We will be using Babel/Webpack to build our project. We won't be diving
        into the details of how these work, but will provide the code necessary
        to get this setup.
      </p>
      <p>
        We can start by installing the necessary packages as well as adding
        configuration files for both Babel and Webpack. We will be using Babel
        7, so we can use a JavaScript file instead of JSON for our Babel router.
      </p>
      <p>
        We will also be using <IJS>webpack-dev-server</IJS> in place of setting
        up a server. This allows us to have live reloading in development.
      </p>
      <PrismBlock lang="bash">
        {`touch .babelrc.js webpack.router.js
npm install -D webpack webpack-dev-server @babel/core
  @babel/preset-env babel-loader@next`}
      </PrismBlock>
      <PrismBlock lang="javascript">
        {`// .babelrc.js
module.exports = {
  presets: [
    ['@babel/env',{
      modules: false
    }]
  ]
};`}
      </PrismBlock>
      <PrismBlock lang="javascript">
        {`// webpack.router.js
const path = require('path');

const router = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true
  }
}

module.exports = router;`}
      </PrismBlock>
      <p>
        We also need to create the <IJS>index.html</IJS> file. This just needs
        to include the DOM element that we will render our application in and a{' '}
        <Cmp>script</Cmp> that loads our bundled application. You can copy the
        code below into your <IJS>public/index.html</IJS> file.
      </p>
      <PrismBlock lang="html">
        {`<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script src="/js/bundle.js"></script>
  </body>
</html>`}
      </PrismBlock>
      <p>
        Finally, we just need to add a script to our <IJS>package.json</IJS>{' '}
        file in order to build our bundle.
      </p>
      <PrismBlock lang="javascript">
        {`// package.json
{
  // ...,
  "scripts": {
    "dev": "webpack-dev-server"
  }
}`}
      </PrismBlock>
      <Note>
        If you're building this from scratch, you should also add a{' '}
        <IJS>.gitignore</IJS> file and ignore the <IJS>node_modules/</IJS>{' '}
        directory.
      </Note>
    </Section>
    <Section title="Review" id="review">
      <CompleteBranch name="03-routes" />
    </Section>
    <Section title="Next" id="next">
      <p>
        With our project setup, we are now ready to continue the tutorial with{' '}
        <Link to="Tutorial" params={{ name: '03-routes' }}>
          Part 3: Routes
        </Link>.
      </p>
    </Section>
  </BaseTutorial>
);
