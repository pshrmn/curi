import React from "react";
import { Link } from "@curi/react";

import { InlineJS as IJS } from "../components/PrismBlocks";
import { Note } from "../components/Messages";
import { Section } from "../components/Sections";
import TutorialLinks from "../Tutorials/base/TutorialLinks";

export default () => (
  <div className="tutorial">
    <div className="content">
      <h1>Curi Tutorial</h1>
      <p>
        In this set of tutorials, we will be building a single-page application
        from scratch using Curi. The application will be a website for a book
        store where users will be able to browse through books and "purchase"
        ones that they want.
      </p>
      <p>
        There are two versions of this tutorial available. One uses React to
        render, while the other uses Vue. A lot of the code is shared between
        the two, so only the sections with framework-specific code are split
        apart.
      </p>
      <Note>
        We will only be building the front end. Any time that we would need to
        add back end code for a "real" website, we will just simulate this with
        a fake API.
      </Note>

      <Section title="Prerequisites" id="prereqs">
        <p>
          These tutorials aim to be quite easy to pick up without a lot of prior
          knowledge. However, there are a few things that you should be familiar
          with.
        </p>
        <ol>
          <li>
            JavaScript - We will be using ES6+ syntax (module <IJS>import</IJS>/<IJS
            >
              export
            </IJS>, arrow functions, Promises, etc.). You don't have to be a
            JavaScript master, but it still helps to be familiar with ES6.
          </li>
          <li>
            Node/NPM - If you plan to follow along locally, you will need to
            have Node and NPM (or Yarn if you prefer) installed.
          </li>
          <li>
            Basic terminal commands - We won't do anything crazy and the
            tutorial will always tell you what you need to run, but you should
            be comfortable moving around and making files/directories (with{" "}
            <IJS>cd</IJS>, <IJS>touch</IJS>, <IJS>mkdir</IJS>) as well as
            running <IJS>npm</IJS> commands.
          </li>
          <li>
            React or Vue - These aren't the only frameworks that you can use
            with Curi, but they <em>are</em> the only ones that this tutorial is
            (currently) written for.
          </li>
        </ol>
      </Section>
      <p>
        Let's dive in with{" "}
        <Link to="Tutorial" params={{ name: "01-setup" }}>
          Part One
        </Link>, where we will setup our project.
      </p>
    </div>

    <div className="sidebar">
      <h2>Tutorials</h2>
      <TutorialLinks />
    </div>
  </div>
);
