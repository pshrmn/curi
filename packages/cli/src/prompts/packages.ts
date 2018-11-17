import { prompt } from "inquirer";

import {
  uiQuestions,
  interactionQuestions,
  sideEffectQuestions,
  webHistoryQuestions
} from "../questions/install/deps";

// if anything in here throws, let this fns caller catch and handle it
export default async function packagesPrompts() {
  console.log("\nDependencies\n");

  console.log("UI");

  const uiAnswers = await prompt(uiQuestions);
  const uiPackage = uiAnswers.ui;
  const isReactNative = uiPackage === "@curi/react-native";

  console.log("Interactions");

  const interactionPkgs = [];
  const interactionAnswers = await prompt(interactionQuestions);
  if (interactionAnswers.active) {
    interactionPkgs.push("@curi/route-active");
  }
  if (interactionAnswers.ancestors) {
    interactionPkgs.push("@curi/route-ancestors");
  }
  if (interactionAnswers.prefetch) {
    interactionPkgs.push("@curi/route-prefetch");
  }

  console.log("Side Effects");

  // currently, all of the side effect packages are for browsers
  const sideEffectPkgs = [];
  if (!isReactNative) {
    const sideEffectAnswers = await prompt(sideEffectQuestions);
    if (sideEffectAnswers.ariaLive) {
      sideEffectPkgs.push("@curi/side-effect-aria-live");
    }
    if (sideEffectAnswers.scroll) {
      sideEffectPkgs.push("@curi/side-effect-scroll");
    }
    if (sideEffectAnswers.title) {
      sideEffectPkgs.push("@curi/side-effect-title");
    }
  }

  // hash history should not be encouraged, so assume that a browser
  // application will use @hickory/browser
  const historyDeps = [];
  const historyDevDeps = [];
  let appHistory: string;
  if (!isReactNative) {
    console.log("Development");

    const historyAnswers = await prompt(webHistoryQuestions);
    historyDeps.push("@hickory/browser");
    appHistory = "@hickory/browser";

    // make @hickory/in-memory a devDep when its Node use is only for testing
    if (historyAnswers.ssr) {
      historyDeps.push("@hickory/in-memory");
    } else if (historyAnswers.testing) {
      historyDevDeps.push("@hickory/in-memory");
    }
  } else {
    appHistory = "@hickory/in-memory";
    historyDeps.push("@hickory/in-memory");
  }

  return {
    deps: {
      ui: uiPackage,
      history: appHistory,
      interactions: interactionPkgs,
      sideEffects: sideEffectPkgs
    },
    install: {
      deps: [
        "@curi/router",
        "@curi/helpers",
        ...interactionPkgs,
        ...sideEffectPkgs,
        ...historyDeps
      ],
      devDeps: [...historyDevDeps]
    }
  };
}
