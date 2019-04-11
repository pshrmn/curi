import { Observer, Emitted } from "@curi/types";
export declare type AriaLiveValue = "assertive" | "polite" | "off";
export default function createAriaLiveSideEffect(fmt: (emitted: Emitted) => string, mode?: AriaLiveValue): Observer;
