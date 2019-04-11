import { MouseEvent, AnchorHTMLAttributes } from "react";

export function canNavigate(
  event: MouseEvent<HTMLElement>,
  forward: AnchorHTMLAttributes<HTMLAnchorElement>
) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) &&
    (!forward || !forward.target)
  );
}
