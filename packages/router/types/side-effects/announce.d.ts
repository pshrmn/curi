import { SideEffect, Emitted } from "@curi/types";
export declare type AriaLiveValue = "assertive" | "polite" | "off";
export default function announce(fmt: (emitted: Emitted) => string, mode?: AriaLiveValue): SideEffect;
