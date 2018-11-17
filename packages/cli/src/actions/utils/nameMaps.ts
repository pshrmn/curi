export function mapHistoryName(history: string) {
  switch (history) {
    case "@hickory/browser":
      return "Browser";
    case "@hickory/hash":
      return "Hash";
    case "@hickory/in-memory":
      return "InMemory";
    default:
      return "H"; // this should never happen
  }
}

export function mapInteractionName(interaction: string) {
  switch (interaction) {
    case "@curi/route-active":
      return "active";
    case "@curi/route-ancestors":
      return "ancestors";
    case "@curi/route-prefetch":
      return "prefetch";
    default:
      return "unknown";
  }
}

export function mapSideEffectName(interaction: string) {
  switch (interaction) {
    case "@curi/side-effect-aria-live":
      return "ariaLive";
    case "@curi/side-effect-scroll":
      return "scroll";
    case "@curi/side-effect-title":
      return "title";
    default:
      return "unknown";
  }
}
