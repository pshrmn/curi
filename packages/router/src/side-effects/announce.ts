import { Observer, Emitted } from "@curi/types";

export type AriaLiveValue = "assertive" | "polite" | "off";

export default function announce(
  fmt: (emitted: Emitted) => string,
  mode: AriaLiveValue = "assertive"
): Observer {
  const announcer = document.createElement("div");
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
}
