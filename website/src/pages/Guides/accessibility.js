import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  Explanation,
  CodeBlock,
  Warning,
  IJS,
  Cmp
} from "../../components/guide/common";

const meta = {
  title: "Accessibility"
};

export default function AccessibilityGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Explanation>
        <p>
          It is important to keep in mind that some visitors to your site rely
          on screen readers, so you should ensure that they have a pleasant
          experience. One "issue" with single-page applications is that they
          traditionally are more difficult for screen reader users because they
          do not have a great way for detecting navigation.
        </p>
        <p>
          Curi provides a couple approaches to help you make your site
          accessible.
        </p>
      </Explanation>

      <HashSection title="Announcing Navigation" id="aria-live">
        <Explanation>
          <p>
            When the content of{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions">
              ARIA live regions
            </a>{" "}
            change, the new content will be announced to screen reader users.
            The{" "}
            <Link
              name="Package"
              params={{ package: "side-effect-aria-live", version: "v1" }}
            >
              <IJS>@curi/side-effect-aria-live</IJS>
            </Link>{" "}
            package provides a side effect for creating a live region and
            updating its content to announce navigation.
          </p>
          <p>
            The side effect takes a function which returns a string that should
            be read by screen readers. This can be whatever you want it to be,
            but screen readers normally read a page's title, so if you are
            setting <IJS>title</IJS>s for your responses, it is probably a good
            idea to have those announced.
          </p>
        </Explanation>
        <CodeBlock>
          {`import ariaLive from "@curi/side-effect-aria-live";
  
const announcer = ariaLive(
  ({ response }) => \`Navigated to \${response.title}\`
);

const routes = prepareRoutes([
  {
    name: "Home",
    path: "",
    response() {
      return {
        title: "Home"
      };
    }
  }
]);

const router = curi(history, routes, {
  sideEffects: [announcer]
});

// when the user navigates to "/", the screen reader
// will read: "Navigated to Home"`}
        </CodeBlock>
      </HashSection>

      <HashSection title="Focusing Content" id="focus">
        <Explanation>
          <p>
            Screen readers read the content of elements in the page that are
            focused. They can move through the page to read different elements.
            When you navigate, the content of the site will be re-rendered, so
            it is important for you to focus on the new content so that users
            using screen readers don't have to tab around looking for the new
            content. This is focus management and there are a couple things to
            keep in mind when implementing it.
          </p>
        </Explanation>

        <Explanation>
          <p>
            When you focus an element, make sure to focus the specific content
            for a page. If you were to just focus the page's <Cmp>body</Cmp> or
            a root <Cmp>div</Cmp>, then the user might have to tab through less
            important content, like the page's menus, while looking for the new
            content.
          </p>
        </Explanation>
        <CodeBlock lang="html">
          {`<!--
  it is better to focus the important content (<main>)
  and not the entire page
-->
<div>
  <header></header>
  <main></main>
</div>`}
        </CodeBlock>

        <Explanation>
          <p>
            The element that you focus needs to be focusable. Elements can be
            natively focusable (e.g. <Cmp>input</Cmp>s and <Cmp>a</Cmp>s) or you
            can use the <IJS>tabIndex</IJS> property. A <IJS>tabIndex</IJS> of{" "}
            <IJS>-1</IJS> lets you focus an element, but keeps screen readers
            from accidentally focusing it when a user is tabbing through the
            page's contents.
          </p>
          <Warning>
            If you try to focus an element that is not focusable, then the
            document's <Cmp>body</Cmp> will be focused instead.
          </Warning>
        </Explanation>
        <CodeBlock lang="html">
          {`<!-- you can focus us -->
<input />
<a href="https://example.com">Example</a>
<div tabIndex="-1"></div>

<!-- but not me -->
<div></div>`}
        </CodeBlock>
        <HashSection
          title="Focusing in React Applications"
          id="focus-react"
          tag="h3"
        >
          <Explanation>
            <p>
              The <IJS>@curi/react-dom</IJS> package provides a <Cmp>Focus</Cmp>{" "}
              component that gives you a <IJS>ref</IJS> to attach to the
              component that should be focused. Whenever the user navigates, it
              will re-focus so that the screen reader is focused on the correct
              content.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { curiProvider, Focus } from "@curi/react-dom";

const Router = curiProvider(router);

ReactDOM.render((
  <Router>
    {({ response }) => {
      const { body:Body } = response;
      return (
        <Header />
        <Focus>
          {ref => (
            <main ref={ref} tabIndex={-1}>
            </main>
          )}
        </Focus>
      );
    }}
  </Router>
), holder);`}
          </CodeBlock>
        </HashSection>

        <HashSection
          title="Focusing in Vue Applications"
          id="focus-vue"
          tag="h3"
        >
          <Explanation>
            <p>
              The <IJS>@curi/vue</IJS> package provides a directive for focusing
              an element. The directive needs to be passed something that
              changes when the user navigates, so you can just pass it the
              current <IJS>response</IJS>
            </p>
          </Explanation>
          <CodeBlock lang="html">
            {`<template>
  <header>...</header>
  <main tabIndex="-1" v-curi-focus="$curi.response">
    <component :is="$curi.response.body" />
  </main>
</template>`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection title="More Resources" id="more">
        <Explanation>
          <p>
            The above content is great for making navigation within your
            application accessible, but those aren't the only steps that you
            should take to making your site more accessible.
          </p>
          <p>
            If you are interested in other resources for improving the
            accessibility of your website, I would recommend Google's{" "}
            <a href="https://developers.google.com/web/fundamentals/accessibility/">
              collection of accessibility articles
            </a>
            . WebAIM also provides a good{" "}
            <a href="https://webaim.org/standards/wcag/checklist">checklist</a>{" "}
            to consult.
          </p>
          <p>
            The{" "}
            <a href="https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en">
              ChromeVox
            </a>{" "}
            extension for Chrome is a free screen reader that you can use to
            experience your site like a user using a screen reader would. This
            documentation site uses the above announcement and focus techniques,
            so you can see how they work by activating a screen reader and
            navigating throughout this site.
          </p>
        </Explanation>
      </HashSection>
    </React.Fragment>
  );
}
