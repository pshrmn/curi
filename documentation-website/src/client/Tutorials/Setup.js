import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
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
    <p>
      Since this tutorial is starting from scratch, we're going to start
      in the terminal.
    </p>
    <Section
      title='The Basics'
      id='basics'
    >
      <p>
        In the terminal, navigate to the parent directory where you want to keep
        the code for your website and create a new directory for the website. We
        can then navigate into our new directory.
      </p>
      <PrismBlock lang='bash'>
        {
`mkdir curi-bookstore && cd curi-bookstore`
        }
      </PrismBlock>
      <p>
        Inside of the directory, run <IJS>npm init</IJS> to generate a{' '}
        <IJS>package.json</IJS> file. Then, we can install the most important
        package for Curi: <IJS>@curi/core</IJS>. We should also install{' '}
        <IJS>@hickory/browser</IJS>, which we'll cover later on.
      </p>
      <PrismBlock lang='bash'>
        {
`npm init
npm install @curi/core @hickory/browser`
        }
      </PrismBlock>
    </Section>
    <Section
      title='File Structure'
      id='structure'
    >
      <p>
        We should also get some of the directories/files for our website setup.
        There is no "right" way to layout your files, but the approach used in
        this project works well.
      </p>
      <PrismBlock lang='bash'>
        {
`mkdir src
touch src/index.js src/routes.js
mkdir -p public/js
touch public/index.html`
        }
      </PrismBlock>
      <p>
        That will leave us with the following project structure:
      </p>
      <PrismBlock>
        {
`curi-bookstore/
+- src/
|  +- index.js
|  +- routes.js
+- public/
|  +- index.html
|  +- js/
+- package.json`
        }
      </PrismBlock>
      <Note>
        We aren't going to cover getting build steps setup. The accompanying Git repo
        includes the necessary files for building the application. Alternatively,
        you can use build helper packages like <IJS>create-react-app</IJS> or{' '}
        <IJS>vue-cli</IJS> to have this automatically setup for you.
      </Note>
    </Section>
    <Section
      title='A Simple Server'
      id='server'
    >
      <p>
        Our website needs a server that can respond to dynamic requests. For this, we
        will use <a href="https://www.npmjs.com/package/express">express</a>. We'll
        just create a simple server that serves our static files (JS, CSS, etc.) and
        for all other requests, responds with our <IJS>public/index.html</IJS> file.
      </p>
      <PrismBlock lang='bash'>
        {
`npm install express
touch server.js`
        }
      </PrismBlock>
      <p>
        You can just copy the following code into <IJS>server.js</IJS>.
      </p>
      <PrismBlock lang='javascript'>
        {
`const express = require('express');
const path = require('path');

const STATIC_DIR = path.join(__dirname, 'public');
const INDEX_HTML = path.join(STATIC_DIR, 'index.html');

// respond to requests for files that begin with /static
// with the corresponding file in the /public directory
app.use('/static', express.static(STATIC_DIR));

// all other requests will respond with the index.html file
app.get('*', (req, res) => {
  res.sendFile(INDEX_HTML);
});

app.listen('8000', () => {
  console.log('Server started. Listening on port 8000');
});`
        }
      </PrismBlock>
      <p>
        To run the server, you just need to run <IJS>node server.js</IJS>.
      </p>
      <p>
        Our <IJS>index.html</IJS> file is a simple HTML file with with
        a <Cmp>script</Cmp> that loads our bundled application. You can copy
        the code below into your <IJS>public/index.html</IJS> file.
      </p>
      <PrismBlock lang='html'>
        {
`<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>`
        }
      </PrismBlock>
    </Section>

    <Section
      title='Next'
      id='next'
    >
      <p>
        With our project setup, we are now ready to continue the tutorial with{' '}
        <Link to='Tutorial' params={{ name: '03-routes' }}>Part 3: Routes</Link>.
      </p>
    </Section>
  </BaseTutorial>
);
