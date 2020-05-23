import { Observer, Emitted } from "@curi/types";
export declare type AriaLiveValue = "assertive" | "polite" | "off";
declare let announce: (fmt: (emitted: Emitted) => string, mode?: AriaLiveValue) => Observer;
export default announce;
