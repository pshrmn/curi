import { MouseEvent } from "react";

export function canNavigate(event: MouseEvent<HTMLElement>, target?: string) {
  return (
    !event.defaultPrevented &&
    !target &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
}
