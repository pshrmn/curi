import { Observer, Emitted } from "@curi/types";
export declare type AriaLiveValue = "assertive" | "polite" | "off";
export default function create_aria_live_side_effect(fmt: (emitted: Emitted) => string, mode?: AriaLiveValue): Observer;
