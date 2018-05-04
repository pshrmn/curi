import { Observer } from "@curi/core";
export interface TitleOptions {
    prefix?: string;
    suffix?: string;
    delimiter?: string;
}
declare function createTitleSideEffect(options?: TitleOptions): Observer;
export default createTitleSideEffect;
