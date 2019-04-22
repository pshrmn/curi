export function canNavigate(event: MouseEvent, target?: string) {
  return (
    !event.defaultPrevented &&
    (event.button !== undefined && event.button === 0) &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) &&
    (!target || target === "_self")
  );
}
