import dedent from "dedent";

import { Questions } from "inquirer";

export interface UIAnswers {
  ui: string;
}

export interface InteractionAnswers {
  active: boolean;
  ancestors: boolean;
  prefetch: boolean;
}

export interface SideEffectAnswers {
  ariaLive: boolean;
  scroll: boolean;
  title: boolean;
}

export interface HistoryAnswers {
  testing: boolean;
  ssr: boolean;
}

export const uiQuestions: Questions<UIAnswers> = [
  {
    type: "list",
    name: "ui",
    message: "What will you use to render your application?",
    choices: [
      {
        name: `React DOM`,
        value: "@curi/react-dom"
      },
      {
        name: `React Native`,
        value: "@curi/react-native"
      },
      {
        name: `Vue`,
        value: "@curi/vue"
      },
      {
        name: `Svelte`,
        value: "@curi/svelte"
      },
      {
        name: `other`,
        value: undefined
      }
    ],
    pageSize: 5
  }
];

export const interactionQuestions: Questions<InteractionAnswers> = [
  {
    type: "confirm",
    name: "active",
    message: dedent`
      Do you need to detect when a route is "active"?
      (installs @curi/route-active)
    `,
    default: false
  },
  {
    type: "confirm",
    name: "ancestors",
    message: dedent`
      Do you need to determine a route's ancestors (e.g. for breadcrumbs)?
      (installs @curi/route-ancestors)
    `,
    default: false
  },
  {
    type: "confirm",
    name: "prefetch",
    message: dedent`
      Do you need to prefetch data for a route?
      (installs @curi/route-prefetch)
    `,
    default: false
  }
];

export const sideEffectQuestions: Questions<SideEffectAnswers> = [
  {
    type: "confirm",
    name: "ariaLive",
    message: dedent`
      Should your app announce navigation to screen reader users for better accessibility?
      (installs @curi/side-effect-aria-live)
    `,
    default: true
  },
  {
    type: "confirm",
    name: "scroll",
    message: dedent`
      Should your app automatically scroll when navigating to a location with a hash?
      (installs @curi/side-effect-scroll)
    `,
    default: true
  },
  {
    type: "confirm",
    name: "title",
    message: dedent`
      Should your app set the document's title after navigating?
      (installs @curi/side-effect-title)
    `,
    default: true
  }
];

export const webHistoryQuestions: Questions<HistoryAnswers> = [
  {
    type: "confirm",
    name: "testing",
    message:
      "Will you be writing tests for the application that will run in Node (e.g. with Jest)?"
  },
  {
    type: "confirm",
    name: "ssr",
    message:
      "Will you be using server-side rendering or static site generation?"
  }
];
