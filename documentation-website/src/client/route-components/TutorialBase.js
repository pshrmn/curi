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
      <Note>
        We will only be building the front end. Any time that we would need to
        add back end code for a "real" website, we will just simulate this with
        a fake API.
      </Note>

      <Section title="What is Curi?" id="what">
        <p>
          Before we get started, let's quickly define what Curi <em>is</em> and{" "}
          <em>is not</em>.
        </p>
        <ol>
          <li>
            Curi is an asynchronous single-page application router. This means:
            <ol style={{ listStyleType: "upper-roman" }}>
              <li>
                You can navigate to pages within your application without
                sending requests to the server.
              </li>
              <li>
                You can load data (and code) prior to rendering a new page
                instead of rendering loading screens while you wait for data to
                be fetched.
              </li>
            </ol>
          </li>
          <li>
            Curi is response based. Whenever a user navigates within an
            application, a <IJS>response</IJS> object will be created to provide
            data about the route that matched. These are what you will use to
            render your application.
          </li>
          <li>
            Curi doesn't care how you plan to render your application7; Curi is
            only concerned with navigation and route matching. There are some
            official framework packages (e.g. <IJS>@curi/react</IJS> and{" "}
            <IJS>@curi/vue</IJS>) that provide integration with Curi and those
            frameworks, but these are helpful, not requirements.
          </li>
        </ol>
      </Section>

      <Section title="Prerequisites" id="prereqs">
        <p>
          These tutorials aim to be quite easy to pick up without a lot of prior
          knowledge required. However, there are a couple things you should keep
          in mind.
        </p>
        <ol>
          <li>
            You should be familiar with JavaScript. We will be using ES6+ syntax
            (module <IJS>import</IJS>/<IJS>export</IJS>, arrow functions,
            Promises, etc.). You don't have to be a JavaScript master, but it
            still helps to be familiar with ES6.
          </li>
          <li>
            If you plan to follow along locally, you need to have Node/NPM
            installed.
          </li>
          <li>
            Again, if you plan to follow along locally, you should be
            comfortable with basic terminal (command line) usage. Nothing crazy,
            just commands like <IJS>cd</IJS>, <IJS>touch</IJS>, <IJS>mkdir</IJS>{" "}
            and running <IJS>npm</IJS> commands.
          </li>
          <li>
            You should be familiar with either React or Vue. These aren't the
            only frameworks that you can use with Curi, but they <em>are</em>{" "}
            the only ones that this tutorial is (currently) written for.
          </li>
        </ol>
      </Section>
    </div>

    <div className="sidebar">
      <h2>Tutorials</h2>
      <TutorialLinks />
    </div>
  </div>
);
