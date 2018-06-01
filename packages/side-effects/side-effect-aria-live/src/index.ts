import warning from "warning";

import { Observer, Emitted } from "@curi/core";

export default function createAriaLiveSideEffect(
  el: HTMLElement,
  fmt: (emitted: Emitted) => string
): Observer {
  warning(
    el.hasAttribute("aria-live"),
    `The provided element does not have an "aria-live" attribute, so it cannot announce location changes to screen readers.`
  );
  return function(emitted: Emitted): void {
    el.textContent = fmt(emitted);
  };
}
