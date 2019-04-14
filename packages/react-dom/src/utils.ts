import { MouseEvent, AnchorHTMLAttributes } from "react";

export function canNavigate(event: MouseEvent<HTMLElement>, target?: string) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) &&
    (!target || target !== "_self")
  );
}
