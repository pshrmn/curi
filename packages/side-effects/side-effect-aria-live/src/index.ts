import { Observer, Emitted } from "@curi/types";

export type AriaLiveValue = "assertive" | "polite" | "off";

export default function createAriaLiveSideEffect(
  fmt: (emitted: Emitted) => string,
  mode: AriaLiveValue = "assertive"
): Observer {
  const announcer = document.createElement("div");
  announcer.setAttribute("aria-live", mode);
  // https://snook.ca/archives/html_and_css/hiding-content-for-accessibility
  announcer.setAttribute(
    "style",
    "position: absolute !important; height: 1px; " +
      "width: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px);"
  );
  document.body.appendChild(announcer);

  return function(emitted: Emitted): void {
    announcer.textContent = fmt(emitted);
  };
}
