import { Observer, Emitted } from "@curi/router";
export declare type AriaLiveValue = "assertive" | "polite" | "off";
export default function createAriaLiveSideEffect(fmt: (emitted: Emitted) => string, mode?: AriaLiveValue): Observer;
