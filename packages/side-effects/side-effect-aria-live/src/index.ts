import { Observer, Emitted } from "@curi/router";

export type AriaLiveValue = "assertive" | "polite" | "off";

export default function createAriaLiveSideEffect(
  fmt: (emitted: Emitted) => string,
  mode: AriaLiveValue = "assertive"
): Observer {
  const announcer = document.createElement("div");
  announcer.setAttribute("aria-live", mode);
  announcer.setAttribute("style", "position: absolute; left: -999em");
  document.body.appendChild(announcer);

  return function(emitted: Emitted): void {
    announcer.textContent = fmt(emitted);
  };
}
