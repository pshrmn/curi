import { Observer, Emitted } from "@curi/types";

type AriaLiveValue = "assertive" | "polite" | "off";

export let announce = (
  fmt: (emitted: Emitted) => string,
  mode: AriaLiveValue = "assertive"
): Observer => {
  let announcer = document.createElement("div");
  announcer.setAttribute("aria-live", mode);
  // https://hugogiraudel.com/2016/10/13/css-hide-and-seek/
  announcer.setAttribute(
    "style",
    [
      "border: 0 !important;",
      "clip: rect(1px, 1px, 1px, 1px) !important;",
      "-webkit-clip-path: inset(50%) !important;",
      "clip-path: inset(50%) !important;",
      "height: 1px !important;",
      "overflow: hidden !important;",
      "padding: 0 !important;",
      "position: absolute !important;",
      "width: 1px !important;",
      "white-space: nowrap !important;",
      "top: 0;"
    ].join(" ")
  );
  document.body.appendChild(announcer);

  return function(emitted) {
    announcer.textContent = fmt(emitted);
  };
};

export let scroll = (): Observer => {
  return function({ response, navigation }) {
    if (navigation.action === "pop") {
      return;
    }

    // wait until after the re-render to scroll
    setTimeout(() => {
      let { hash } = response.location;
      if (hash !== "") {
        let element = document.getElementById(hash);
        if (element && element.scrollIntoView) {
          element.scrollIntoView();
          return;
        }
      }
      // if there is no hash, no element matching the hash,
      // or the browser doesn't support, we will just scroll
      // to the top of the page
      window.scrollTo(0, 0);
    }, 0);
  };
};

type TitleBuilder = (emitted: Emitted) => string;

export let title = (callback: TitleBuilder): Observer => {
  return function(emitted) {
    document.title = callback(emitted);
  };
};
