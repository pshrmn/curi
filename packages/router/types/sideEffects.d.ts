import { Observer, Emitted } from "@curi/types";
declare type AriaLiveValue = "assertive" | "polite" | "off";
export declare let announce: (fmt: (emitted: Emitted) => string, mode?: AriaLiveValue) => Observer;
export declare let scroll: () => Observer;
declare type TitleBuilder = (emitted: Emitted) => string;
export declare let title: (callback: TitleBuilder) => Observer;
export {};
